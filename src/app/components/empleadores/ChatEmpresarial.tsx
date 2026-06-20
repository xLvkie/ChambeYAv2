import { useState } from 'react';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Search, Send, Paperclip, MoreVertical } from 'lucide-react';

export default function ChatEmpresarial() {
  const [mensajeInput, setMensajeInput] = useState('');

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

  return (
    <LayoutEmpleador>
      <div className="h-[calc(100vh-2rem)] m-4 bg-white rounded-xl border border-border overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-96 border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mensajes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar conversaciones..."
                className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversaciones.map((conv) => (
              <div key={conv.id} className="p-4 border-b border-border hover:bg-gray-50 cursor-pointer">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold">
                      {conv.candidato.split(' ').map((n) => n[0]).join('')}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900 truncate">{conv.candidato}</p>
                      <span className="text-xs text-muted-foreground">{conv.hora}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{conv.puesto}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conv.ultimoMensaje}</p>
                      {conv.noLeidos > 0 && (
                        <span className="ml-2 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">{conv.noLeidos}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-orange-700 rounded-xl flex items-center justify-center text-white font-bold">
                CM
              </div>
              <div>
                <p className="font-bold text-gray-900">Carlos Martínez</p>
                <p className="text-sm text-green-600">En línea</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mensajes.map((mensaje) => (
              <div key={mensaje.id} className={`flex ${mensaje.emisor === 'yo' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-md">
                  <div className={`px-4 py-3 rounded-2xl ${
                    mensaje.emisor === 'yo' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{mensaje.texto}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${mensaje.emisor === 'yo' ? 'text-right' : 'text-left'}`}>
                    {mensaje.hora}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-border">
            <div className="flex gap-3">
              <button className="p-3 hover:bg-gray-100 rounded-xl">
                <Paperclip size={20} className="text-gray-600" />
              </button>
              <input
                type="text"
                value={mensajeInput}
                onChange={(e) => setMensajeInput(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl flex items-center gap-2">
                <Send size={20} />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}
