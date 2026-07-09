import { useState, useEffect, useRef } from 'react';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Search, Send, Paperclip, MoreVertical, ChevronLeft, MessageSquare } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../services/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from 'firebase/firestore';
import { enviarMensaje, activarChatEmpleador } from '../../../services/dbService';
import { useParams } from 'react-router-dom'; // Para capturar el ID si venimos de PerfilCandidato

export default function ChatEmpresarial() {
  const { currentUser } = useAuth();
  const { id: chatIdURL } = useParams(); // ID opcional en la URL
  
  const [mensajeInput, setMensajeInput] = useState('');
  const [mostrarChatMobile, setMostrarChatMobile] = useState(false);
  
  // Estados para los datos reales
  const [conversaciones, setConversaciones] = useState<any[]>([]);
  const [conversacionActiva, setConversacionActiva] = useState<any>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState('');
  
  // Referencia para hacer scroll automático al último mensaje
  const mensajesFinRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 1. CARGAR LISTA DE CONVERSACIONES
  // ==========================================
  useEffect(() => {
    if (!currentUser?.uid) return;

    // Escuchamos la colección "chats" donde participe el empleador actual
    const q = query(
      collection(db, 'chats'),
      where('participantes', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatsData = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const chat = { id: docSnap.id, ...docSnap.data() } as any;
        
        // Encontrar el ID del postulante (el que no es el empleador)
        const postulanteId = chat.participantes.find((id: string) => id !== currentUser.uid);
        
        // Buscar el nombre del postulante (puedes omitir esto si guardas el nombre directo en el chat)
        let nombreCandidato = "Candidato";
        if (postulanteId) {
          const userSnap = await getDoc(doc(db, "usuarios", postulanteId));
          if (userSnap.exists()) nombreCandidato = userSnap.data().nombre || "Candidato";
        }
        
        return {
          ...chat,
          candidato: nombreCandidato,
          postulanteId: postulanteId
        };
      }));
      
      // Ordenar por fecha del último mensaje
      chatsData.sort((a, b) => b.fechaActualizacion?.toMillis() - a.fechaActualizacion?.toMillis());
      setConversaciones(chatsData);

      // Si venimos de PerfilCandidato con una URL /chat/ID, la seleccionamos automáticamente
      if (chatIdURL && !conversacionActiva) {
        const chatUrl = chatsData.find(c => c.id === chatIdURL);
        if (chatUrl) {
          setConversacionActiva(chatUrl);
          setMostrarChatMobile(true);
        }
      }
    });

    return () => unsubscribe();
  }, [currentUser, chatIdURL]);

  // ==========================================
  // 2. CARGAR MENSAJES DE LA CONVERSACIÓN ACTIVA
  // ==========================================
  useEffect(() => {
    if (!conversacionActiva?.id) return;

    const q = query(
      collection(db, 'mensajes'),
      where('chatId', '==', conversacionActiva.id),
      orderBy('fecha', 'asc') // Asegura que los más antiguos salgan arriba
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msjs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMensajes(msjs);
      
      // Auto-scroll al fondo cuando llegan mensajes
      setTimeout(() => mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [conversacionActiva]);

  // ==========================================
  // 3. ENVIAR MENSAJE
  // ==========================================
  const handleEnviarMensaje = async () => {
    if (!mensajeInput.trim() || !conversacionActiva || !currentUser) return;
    
    try {
      const texto = mensajeInput.trim();
      setMensajeInput(''); // Limpiamos el input rápido para mejor UX
      
      await enviarMensaje(conversacionActiva.id, currentUser.uid, texto);
      
      // Si el chat estaba pendiente y el empleador envía un mensaje manual, lo activamos
      if (conversacionActiva.estado === 'pendiente') {
         await activarChatEmpleador(conversacionActiva.id, currentUser.uid);
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const handleSeleccionarConversacion = (conv: any) => {
    setConversacionActiva(conv);
    setMostrarChatMobile(true);
  };

  // Función de ayuda para formatear la hora (ej: "10:30 AM")
  const formatearHora = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filtramos las conversaciones en tiempo real
  const conversacionesFiltradas = conversaciones.filter((conv) => {
    const termino = busqueda.toLowerCase();
    const nombre = conv.candidato?.toLowerCase() || '';
    // Aquí puedes agregar más campos si quieres buscar por puesto, ej: conv.cargoPostulado?.toLowerCase()
    return nombre.includes(termino);
  });

  return (
    <LayoutEmpleador>
      <div className="flex h-[calc(100dvh-132px)] lg:h-[calc(100vh-2rem)] lg:m-4 bg-white lg:rounded-xl lg:border border-border overflow-hidden">
        
        {/* PANEL IZQUIERDO */}
        <div className={`${mostrarChatMobile ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 xl:w-96 border-r border-border flex-col`}>
          <div className="p-4 sm:p-6 border-b border-border bg-white">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Mensajes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white transition-all text-sm" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
            {conversacionesFiltradas.length > 0 ? (
              conversacionesFiltradas.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleSeleccionarConversacion(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    conversacionActiva?.id === conv.id ? 'bg-orange-50/50 border-l-4 border-l-[#FF8C00]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {conv.candidato.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-0.5 gap-2">
                        <p className="text-sm truncate font-medium text-gray-800">
                          {conv.candidato}
                        </p>
                        <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
                          {formatearHora(conv.fechaActualizacion)}
                        </span>
                      </div>
                      {/* Indicador de estado */}
                      {conv.estado === 'pendiente' && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full mb-1 inline-block">Bloqueado</span>
                      )}
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs truncate text-muted-foreground">
                          {conv.ultimoMensaje || 'Sin mensajes'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No hay conversaciones</p>
              </div>
            )}
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className={`${!mostrarChatMobile ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-gray-50/30`}>
          {conversacionActiva ? (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 lg:p-6 border-b border-border flex items-center justify-between bg-white shadow-sm z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setMostrarChatMobile(false)}>
                    <ChevronLeft size={24} />
                  </button>
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base border border-gray-200/60">
                      {conversacionActiva.candidato.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{conversacionActiva.candidato}</p>
                    {conversacionActiva.estado === 'activo' ? (
                      <p className="text-xs sm:text-sm text-green-600 font-medium">Activo</p>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Esperando respuesta</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Área de Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 hide-scrollbar">
                {mensajes.map((mensaje) => {
                  const esMio = mensaje.remitenteId === currentUser?.uid;
                  return (
                    <div key={mensaje.id} className={`flex ${esMio ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-md ${esMio ? 'order-2' : 'order-1'}`}>
                        <div className={`px-4 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base shadow-sm ${esMio ? 'bg-accent text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-bl-sm'}`}>
                          <p className="leading-relaxed">{mensaje.texto}</p>
                        </div>
                        <p className={`text-[11px] sm:text-xs text-muted-foreground mt-1 font-medium ${esMio ? 'text-right mr-1' : 'text-left ml-1'}`}>
                          {formatearHora(mensaje.fecha)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {/* Div invisible para forzar el scroll abajo */}
                <div ref={mensajesFinRef} />
              </div>

              {/* Área de Input */}
              <div className="p-3 sm:p-4 lg:p-6 border-t border-border bg-white">
                <div className="flex items-end gap-2 sm:gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={mensajeInput}
                      onChange={(e) => setMensajeInput(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white transition-all text-sm sm:text-base"
                      onKeyDown={(e) => { if (e.key === 'Enter') handleEnviarMensaje(); }}
                    />
                  </div>
                  <button
                    disabled={!mensajeInput.trim()}
                    onClick={handleEnviarMensaje}
                    className="px-4 sm:px-6 py-3 bg-[#FF8C00] hover:bg-orange-600 disabled:bg-gray-200 text-white rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    <span className="hidden sm:inline font-bold">Enviar</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Estado vacío cuando no hay conversación seleccionada
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
               <MessageSquare size={48} className="text-gray-300 mb-4" />
               <p className="text-lg font-medium">Selecciona una conversación</p>
               <p className="text-sm">Tus mensajes con los candidatos aparecerán aquí.</p>
            </div>
          )}
        </div>
      </div>
    </LayoutEmpleador>
  );
}