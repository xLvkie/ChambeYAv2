import { useState } from 'react';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Search, Send, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

export default function ChatEmpresarialMobile() {
  const [mensaje, setMensaje] = useState('');
  const [conversacionActiva, setConversacionActiva] = useState<number | null>(null);

  const conversaciones = [
    {
      id: 1,
      nombre: 'Carlos Martínez',
      avatar: 'CM',
      ultimoMensaje: 'Me interesa mucho la oportunidad',
      hora: '10:30 AM',
      sinLeer: 2,
      online: true,
    },
    {
      id: 2,
      nombre: 'Luis Torres',
      avatar: 'LT',
      ultimoMensaje: '¿Cuál es el horario de trabajo?',
      hora: 'Ayer',
      sinLeer: 0,
      online: false,
    },
    {
      id: 3,
      nombre: 'Roberto Silva',
      avatar: 'RS',
      ultimoMensaje: 'Gracias por la oportunidad',
      hora: '2d',
      sinLeer: 0,
      online: true,
    },
  ];

  const mensajes = [
    {
      id: 1,
      emisor: 'yo',
      texto: 'Hola Carlos, hemos revisado tu perfil y nos interesa tu experiencia como electricista',
      hora: '10:15 AM'
    },
    {
      id: 2,
      emisor: 'otro',
      texto: 'Muchas gracias por contactarme. Me interesa mucho la oportunidad',
      hora: '10:18 AM'
    },
    {
      id: 3,
      emisor: 'yo',
      texto: '¿Cuándo podrías empezar?',
      hora: '10:30 AM'
    },
  ];

  if (conversacionActiva) {
    const conversacionSeleccionada = conversaciones.find(c => c.id === conversacionActiva);

    return (
      <LayoutEmpleadorMobile>
        <div className="flex flex-col h-[calc(100vh-80px)] bg-background">
          {/* Header de conversación */}
          <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setConversacionActiva(null)}
              className="p-2 hover:bg-gray-100 rounded-lg -ml-2"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {conversacionSeleccionada?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm truncate">{conversacionSeleccionada?.nombre}</h3>
              <p className="text-xs text-green-600">En línea</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
                <Phone size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
                <Video size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mensajes.map((msg) => (
              <div key={msg.id} className={`flex ${msg.emisor === 'yo' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.emisor === 'yo' ? 'bg-accent text-white' : 'bg-white border border-border text-gray-900'} rounded-2xl px-4 py-2.5`}>
                  <p className="text-sm leading-relaxed">{msg.texto}</p>
                  <p className={`text-xs mt-1 ${msg.emisor === 'yo' ? 'text-orange-100' : 'text-gray-500'}`}>{msg.hora}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input - Fixed at bottom but above bottom navigation */}
          <div className="bg-white border-t border-border p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-3 border border-input rounded-full bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              <button
                onClick={() => setMensaje('')}
                className="w-11 h-11 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </LayoutEmpleadorMobile>
    );
  }

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Mensajes</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="w-full pl-10 pr-4 py-2.5 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
        </div>

        {/* Conversaciones */}
        <div className="space-y-2">
          {conversaciones.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setConversacionActiva(conv.id)}
              className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl border border-border hover:border-accent active:bg-gray-50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{conv.nombre}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.hora}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conv.ultimoMensaje}</p>
              </div>
              {conv.sinLeer > 0 && (
                <div className="w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {conv.sinLeer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
