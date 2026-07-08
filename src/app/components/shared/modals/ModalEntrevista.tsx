import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Video, MessageSquare } from 'lucide-react';

interface ModalEntrevistaProps {
  isOpen: boolean;
  onClose: () => void;
  candidatoNombre: string;
  vacanteCargo: string;
}

export default function ModalEntrevista({ isOpen, onClose, candidatoNombre, vacanteCargo }: ModalEntrevistaProps) {
  const [modalidad, setModalidad] = useState<'virtual' | 'presencial'>('virtual');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [mensaje, setMensaje] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para guardar la entrevista y enviar la notificación al postulante
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 text-[#FF8C00] rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Agendar Entrevista</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Con <span className="font-bold text-gray-700">{candidatoNombre}</span> para {vacanteCargo}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors border border-gray-200 shadow-sm shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <form id="form-entrevista" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Modalidad Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Modalidad de la entrevista</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalidad('virtual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    modalidad === 'virtual' 
                    ? 'border-[#FF8C00] bg-orange-50 text-[#FF8C00]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Video size={18} /> Virtual
                </button>
                <button
                  type="button"
                  onClick={() => setModalidad('presencial')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                    modalidad === 'presencial' 
                    ? 'border-[#FF8C00] bg-orange-50 text-[#FF8C00]' 
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} /> Presencial
                </button>
              </div>
            </div>

            {/* Fecha y Hora (Grid) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Fecha</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Hora</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="time" 
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm" 
                    required
                  />
                </div>
              </div>
            </div>

            {/* Link o Dirección (Dinámico según modalidad) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                {modalidad === 'virtual' ? 'Enlace de la reunión (Meet, Zoom, etc.)' : 'Dirección de la entrevista'}
              </label>
              <div className="relative">
                {modalidad === 'virtual' ? (
                  <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                ) : (
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                )}
                <input 
                  type={modalidad === 'virtual' ? 'url' : 'text'} 
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder={modalidad === 'virtual' ? 'https://meet.google.com/...' : 'Ej. Av. Principal 123, Oficina 405'} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm" 
                  required
                />
              </div>
            </div>

            {/* Mensaje Adicional */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Mensaje para el candidato</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea 
                  rows={3}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Instrucciones adicionales, código de vestimenta, por quién preguntar..." 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm"
                ></textarea>
              </div>
            </div>

          </form>
        </div>

        {/* Footer con Botones */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl font-bold transition-colors text-sm"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            form="form-entrevista"
            className="px-6 py-2.5 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-bold transition-colors shadow-sm text-sm"
          >
            Confirmar y Enviar
          </button>
        </div>

      </div>
    </div>
  );
}