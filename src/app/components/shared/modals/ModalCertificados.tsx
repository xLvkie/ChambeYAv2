import { useState } from 'react';
import { X, Award, Upload } from 'lucide-react';

interface ModalCertificadoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCertificado({ isOpen, onClose }: ModalCertificadoProps) {
  const [entidad, setEntidad] = useState('');
  const [anio, setAnio] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica para subir el PDF y guardar los datos
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-xl flex items-center justify-center shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">Subir Certificado</h3>
              <p className="text-xs text-gray-500 mt-0.5">Agrega un documento que valide tus estudios</p>
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
          <form id="form-certificado" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input de Archivo Personalizado */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Documento (Solo PDF)</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-blue-50/50 hover:border-[#0056B3] transition-colors text-center group cursor-pointer">
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Upload size={20} className="text-[#0056B3]" />
                  </div>
                  {archivo ? (
                    <span className="text-sm font-bold text-[#0056B3] truncate max-w-[200px]">{archivo.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-gray-700">Haz clic para subir un archivo</span>
                      <span className="text-xs text-gray-400">Máximo 5MB</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Entidad Emisora</label>
              <input 
                type="text" 
                value={entidad}
                onChange={(e) => setEntidad(e.target.value)}
                placeholder="Ej. SENATI" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Año de Emisión</label>
              <input 
                type="number" 
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                placeholder="Ej. 2023" 
                min="1980"
                max={new Date().getFullYear()}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm" 
                required
              />
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
            form="form-certificado"
            className="px-6 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-sm text-sm"
          >
            Subir Certificado
          </button>
        </div>

      </div>
    </div>
  );
}