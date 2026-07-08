import { useState } from 'react';
import { X, Briefcase } from 'lucide-react';

interface ModalExperienciaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalExperiencia({ isOpen, onClose }: ModalExperienciaProps) {
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para guardar la experiencia en el estado global o base de datos
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-xl flex items-center justify-center shrink-0">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Agregar Experiencia</h3>
              <p className="text-xs text-gray-500 mt-0.5">Completa los datos de tu empleo anterior</p>
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
          <form id="form-experiencia" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Cargo desempeñado</label>
              <input 
                type="text" 
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ej. Técnico Electricista Senior" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Empresa o Lugar de Trabajo</label>
              <input 
                type="text" 
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Ej. Construcciones SAC" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Periodo</label>
              <input 
                type="text" 
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                placeholder="Ej. Ene 2021 - Actualidad" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Breve descripción de funciones</label>
              <textarea 
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Mantenimiento preventivo, lectura de planos, etc..." 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors resize-none text-sm"
                required
              ></textarea>
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
            form="form-experiencia"
            className="px-6 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-sm text-sm"
          >
            Guardar Experiencia
          </button>
        </div>

      </div>
    </div>
  );
}