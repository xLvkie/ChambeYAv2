import { useState } from 'react';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Search, Send, Paperclip, MoreVertical, ChevronLeft } from 'lucide-react';

export default function ChatEmpresarial() {
  const [mensajeInput, setMensajeInput] = useState('');
  const [conversacionActiva, setConversacionActiva] = useState(1);
  const [mostrarChatMobile, setMostrarChatMobile] = useState(false);

  const conversaciones = [
    { id: 1, candidato: 'Carlos Martínez', puesto: 'Electricista', ultimoMensaje: 'Perfecto, estaré ahí mañana', hora: '10:30 AM', noLeidos: 0, online: true },
    { id: 2, candidato: 'Luis Torres', puesto: 'Carpintero', ultimoMensaje: 'Le envío mi CV actualizado', hora: 'Ayer', noLeidos: 1, online: false },
    { id: 3, candidato: 'Roberto Silva', puesto: 'Soldador', ultimoMensaje: 'Gracias por la oportunidad', hora: '2 días', noLeidos: 0, online: false },
  ];

  const mensajes = [
    { id: 1, emisor: 'yo', texto: 'Hola Carlos, hemos revisado tu perfil y nos interesa tu experiencia.', hora: '9:15 AM' },
    { id: 2, emisor: 'candidato', texto: 'Buenos días, muchas gracias. Estoy muy interesado en la posición.', hora: '9:20 AM' },
    { id: 3, emisor: 'yo', texto: '¿Estarías disponible para una entrevista mañana a las 10 AM?', hora: '9:25 AM' },
    { id: 4, emisor: 'candidato', texto: 'Sí, perfecto. Estaré ahí. ¿Cuál es la dirección?', hora: '9:28 AM' },
    { id: 5, emisor: 'yo', texto: 'Av. Los Constructores 123, San Juan de Lurigancho. Pregunta por el Sr. Pérez.', hora: '10:00 AM' },
    { id: 6, emisor: 'candidato', texto: 'Perfecto, estaré ahí mañana. Muchas gracias.', hora: '10:30 AM' },
  ];

  const handleSeleccionarConversacion = (id: number) => {
    setConversacionActiva(id);
    setMostrarChatMobile(true); // Al tocar en celular, abre el chat
  };

  return (
    <LayoutEmpleador>
      {/* Contenedor Principal: Sin márgenes ni bordes redondeados en móvil para ocupar 100% de la pantalla */}
      <div className="flex h-[calc(100dvh-132px)] lg:h-[calc(100vh-2rem)] lg:m-4 bg-white lg:rounded-xl lg:border border-border overflow-hidden">
        
        {/* ========================================================
            PANEL IZQUIERDO: LISTA DE CONVERSACIONES
            Visible en PC siempre. Visible en Móvil solo si mostrarChatMobile es false
            ======================================================== */}
        <div className={`${mostrarChatMobile ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 xl:w-96 border-r border-border flex-col`}>
          
          {/* Header del panel lateral */}
          <div className="p-4 sm:p-6 border-b border-border bg-white">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Mensajes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm"
              />
            </div>
          </div>

          {/* Lista scrolleable */}
          <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
            {conversaciones.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSeleccionarConversacion(conv.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  conversacionActiva === conv.id ? 'bg-orange-50/50 border-l-4 border-l-[#FF8C00]' : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {conv.candidato.split(' ').map((n) => n[0]).join('')}
                    </div>
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-0.5 gap-2">
                      <p className={`text-sm truncate ${conv.noLeidos > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                        {conv.candidato}
                      </p>
                      <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">{conv.hora}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1">{conv.puesto}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs truncate ${conv.noLeidos > 0 ? 'font-semibold text-gray-800' : 'text-muted-foreground'}`}>
                        {conv.ultimoMensaje}
                      </p>
                      {conv.noLeidos > 0 && (
                        <span className="shrink-0 bg-[#FF8C00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                          {conv.noLeidos}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PANEL DERECHO: CHAT ACTIVO
            Visible en PC siempre. Visible en Móvil solo si mostrarChatMobile es true
            ======================================================== */}
        <div className={`${!mostrarChatMobile ? 'hidden lg:flex' : 'flex'} flex-1 flex-col bg-gray-50/30`}>
          
          {/* Chat Header */}
          <div className="p-3 sm:p-4 lg:p-6 border-b border-border flex items-center justify-between bg-white shadow-sm z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Botón Atrás (Solo visible en móvil) */}
              <button 
                className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMostrarChatMobile(false)}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base border border-gray-200/60">
                  CM
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm sm:text-base truncate">Carlos Martínez</p>
                <p className="text-xs sm:text-sm text-green-600 font-medium">En línea</p>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 hide-scrollbar">
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`flex ${mensaje.emisor === 'yo' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] sm:max-w-md ${mensaje.emisor === 'yo' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`px-4 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-base shadow-sm ${
                      mensaje.emisor === 'yo'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-white border border-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="leading-relaxed">{mensaje.texto}</p>
                  </div>
                  <p className={`text-[11px] sm:text-xs text-muted-foreground mt-1 font-medium ${
                    mensaje.emisor === 'yo' ? 'text-right mr-1' : 'text-left ml-1'
                  }`}>
                    {mensaje.hora}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Área de Input (Donde se escribe) */}
          <div className="p-3 sm:p-4 lg:p-6 border-t border-border bg-white">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-all text-sm sm:text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && mensajeInput.trim()) {
                      setMensajeInput('');
                    }
                  }}
                />
              </div>
              <button
                disabled={!mensajeInput.trim()}
                onClick={() => {
                  if (mensajeInput.trim()) setMensajeInput('');
                }}
                className="px-4 sm:px-6 py-3 bg-[#FF8C00] hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline font-bold">Enviar</span>
              </button>
            </div>
            <p className="hidden lg:block text-xs text-muted-foreground mt-2 ml-14 font-medium">
              Presiona Enter para enviar
            </p>
          </div>
          
        </div>
      </div>
    </LayoutEmpleador>
  );
}