import { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreVertical, ChevronLeft, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { db } from '../../../services/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from 'firebase/firestore';
import { enviarMensaje, marcarComoLeido } from '../../../services/dbService';

import LayoutPostulante from '../shared/LayoutPostulante';

export default function ChatMensajes() {
  const { currentUser } = useAuth();
  
  const [mensajeInput, setMensajeInput] = useState('');
  const [mostrarChatMobile, setMostrarChatMobile] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  
  // Estados para Firebase
  const [conversaciones, setConversaciones] = useState<any[]>([]);
  const [conversacionActiva, setConversacionActiva] = useState<any>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  
  const mensajesFinRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 1. CARGAR LISTA DE CONVERSACIONES
  // ==========================================
  useEffect(() => {
    if (!currentUser?.uid) return;

    const q = query(
      collection(db, 'chats'),
      where('participantes', 'array-contains', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const chatsData = await Promise.all(snapshot.docs.map(async (docSnap) => {
        const chat = { id: docSnap.id, ...docSnap.data() } as any;
        
        // Encontrar el ID del empleador
        const empleadorId = chat.participantes.find((id: string) => id !== currentUser.uid);
        
        // Buscar el nombre de la empresa
        let nombreEmpresa = "Empresa Confidencial";
        if (empleadorId) {
          const userSnap = await getDoc(doc(db, "usuarios", empleadorId));
          if (userSnap.exists()) {
            const data = userSnap.data();
            nombreEmpresa = data.nombreEmpresa || data.nombre || "Empresa Confidencial";
          }
        }
        
        return {
          ...chat,
          empresa: nombreEmpresa,
          empleadorId: empleadorId
        };
      }));
      
      chatsData.sort((a, b) => b.fechaActualizacion?.toMillis() - a.fechaActualizacion?.toMillis());
      setConversaciones(chatsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // ==========================================
  // 2. CARGAR MENSAJES
  // ==========================================
  useEffect(() => {
    if (!conversacionActiva?.id) return;

    // Quitamos el orderBy de Firebase para evitar el error de Índice Compuesto
    const q = query(
      collection(db, 'mensajes'),
      where('chatId', '==', conversacionActiva.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msjs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Ordenamos los mensajes cronológicamente usando JavaScript
      msjs.sort((a: any, b: any) => {
        // Usamos un fallback a Date.now() en caso de que serverTimestamp() aún esté procesándose
        const timeA = a.fecha?.toMillis ? a.fecha.toMillis() : Date.now();
        const timeB = b.fecha?.toMillis ? b.fecha.toMillis() : Date.now();
        return timeA - timeB;
      });

      setMensajes(msjs);
      
      // Auto-scroll al fondo
      setTimeout(() => mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, (error) => {
      console.error("Error al escuchar los mensajes:", error);
    });

    return () => unsubscribe();
  }, [conversacionActiva]);

  // ==========================================
  // 3. ENVIAR MENSAJE
  // ==========================================
  const handleEnviarMensaje = async () => {
    if (!mensajeInput.trim() || !conversacionActiva || !currentUser) return;
    if (conversacionActiva.estado === 'pendiente') return; // Validación extra de seguridad
    
    try {
      const texto = mensajeInput.trim();
      setMensajeInput(''); 

      await enviarMensaje(conversacionActiva.id, currentUser.uid, conversacionActiva.empleadorId, texto);
      
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const handleSeleccionarConversacion = async (conv: any) => {
    setConversacionActiva(conv);
    setMostrarChatMobile(true);

    if (conv.noLeidos && conv.noLeidos[currentUser?.uid || ''] > 0) {
      await marcarComoLeido(conv.id, currentUser!.uid);
    }
  };

  const formatearHora = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const conversacionesFiltradas = conversaciones.filter((conv) => {
    return conv.empresa?.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <LayoutPostulante>
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
                placeholder="Buscar por empresa..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm"
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
                    conversacionActiva?.id === conv.id ? 'bg-blue-50/50 border-l-4 border-l-[#0056B3]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl font-bold text-gray-700 border border-gray-200/60">
                        {conv.empresa.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1 gap-2">
                        <p className="text-sm truncate font-medium text-gray-800">
                          {conv.empresa}
                        </p>
                        <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
                          {formatearHora(conv.fechaActualizacion)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-xs truncate ${
                          (conv.noLeidos && conv.noLeidos[currentUser?.uid || ''] > 0) 
                            ? 'font-bold text-gray-900' 
                            : 'text-muted-foreground'
                        }`}>
                          {conv.ultimoMensaje || 'Sin mensajes'}
                        </p>
                        
                        {(conv.noLeidos && conv.noLeidos[currentUser?.uid || ''] > 0) && (
                          <span className="shrink-0 bg-[#0056B3] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                            {conv.noLeidos[currentUser!.uid]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="p-6 text-center text-gray-500 text-sm">No se encontraron conversaciones.</div>
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
                  <button 
                    className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setMostrarChatMobile(false)}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="relative shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center text-lg font-bold text-gray-700 border border-gray-200/60">
                       {conversacionActiva.empresa.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{conversacionActiva.empresa}</p>
                    <p className="text-xs sm:text-sm text-green-600 font-medium">Empresa Verificada</p>
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
                        <div
                          className={`px-4 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base shadow-sm ${
                            esMio
                              ? 'bg-[#0056B3] text-white rounded-br-sm'
                              : 'bg-white border border-gray-100 text-gray-900 rounded-bl-sm'
                          }`}
                        >
                          <p className="leading-relaxed">{mensaje.texto}</p>
                        </div>
                        <p className={`text-[11px] sm:text-xs text-muted-foreground mt-1 font-medium ${
                          esMio ? 'text-right mr-1' : 'text-left ml-1'
                        }`}>
                          {formatearHora(mensaje.fecha)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={mensajesFinRef} />
              </div>

              {/* Área de Input (Donde se escribe) */}
              <div className="p-3 sm:p-4 lg:p-6 border-t border-border bg-white">
                {conversacionActiva.estado === 'pendiente' ? (
                  <div className="bg-blue-50 border border-blue-100 text-blue-800 p-3 sm:p-4 rounded-xl flex items-center gap-3 justify-center text-sm sm:text-base">
                    <Lock size={18} className="shrink-0" />
                    <p className="font-medium text-center">
                      El chat está bloqueado. Podrás responder cuando la empresa inicie el contacto.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-end gap-2 sm:gap-3">
                      <button className="p-2.5 sm:p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors shrink-0 mb-0.5">
                        <Paperclip size={20} />
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={mensajeInput}
                          onChange={(e) => setMensajeInput(e.target.value)}
                          placeholder="Escribe un mensaje..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-all text-sm sm:text-base"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleEnviarMensaje();
                          }}
                        />
                      </div>
                      <button
                        disabled={!mensajeInput.trim()}
                        onClick={handleEnviarMensaje}
                        className="px-4 sm:px-6 py-3 bg-[#0056B3] hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
                      >
                        <Send size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline font-bold">Enviar</span>
                      </button>
                    </div>
                    <p className="hidden lg:block text-xs text-muted-foreground mt-2 ml-14 font-medium">
                      Presiona Enter para enviar
                    </p>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                 <MoreVertical size={32} className="text-gray-400" />
               </div>
               <p className="text-lg font-bold text-gray-700">Tus postulaciones</p>
               <p className="text-sm mt-2 max-w-sm">Selecciona una conversación a la izquierda para ver el historial o responder a las empresas.</p>
            </div>
          )}
        </div>
      </div>
    </LayoutPostulante>
  );
}