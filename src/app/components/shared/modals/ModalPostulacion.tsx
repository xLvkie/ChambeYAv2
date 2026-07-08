import { useState, useEffect } from 'react';
import { X, BrainCircuit, CheckCircle2, FileText, Briefcase } from 'lucide-react';

// Definimos las propiedades que recibirá el Modal
interface ModalPostulacionProps {
  isOpen: boolean;
  onClose: () => void;
  cargo: string;
  empresa: string;
}

export default function ModalPostulacion({ isOpen, onClose, cargo, empresa }: ModalPostulacionProps) {
  // Estado para controlar en qué paso del proceso estamos
  const [paso, setPaso] = useState(1);

  // Efecto para simular el tiempo de análisis de la IA cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setPaso(1); // Siempre empezamos en el paso 1
      const timer = setTimeout(() => {
        setPaso(2); // Pasamos al paso 2 después de 2.5 segundos
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Botón Cerrar (Solo visible en paso 2 o 3 para no interrumpir la "carga") */}
        {paso !== 1 && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <div className="p-6 sm:p-8">
          
          {/* ====================================================
              PASO 1: Analizando Compatibilidad (Simulación IA)
              ==================================================== */}
          {paso === 1 && (
            <div className="text-center py-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#0056B3] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="text-[#0056B3] animate-pulse" size={28} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analizando tu perfil...</h3>
              <p className="text-sm text-gray-500">Comparando tus habilidades con los requisitos de {empresa}</p>
            </div>
          )}

          {/* ====================================================
              PASO 2: Resultado y Confirmación
              ==================================================== */}
          {paso === 2 && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100">
                <span className="text-2xl font-black text-green-600">85%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">¡Alta compatibilidad!</h3>
              <p className="text-sm text-gray-600 mb-6">
                Tu perfil hace match con los requisitos para <strong className="text-gray-900">{cargo}</strong>.
              </p>

              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-left mb-6">
                <p className="text-xs font-bold text-[#0056B3] uppercase tracking-wider mb-3">Se enviará la siguiente información:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <FileText size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">CV_Carlos_Martinez.pdf</p>
                      <p className="text-xs text-gray-500">Actualizado hace 2 días</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Briefcase size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Perfil de ChambeaYa</p>
                      <p className="text-xs text-gray-500">3 experiencias, 2 certificados</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setPaso(3)}
                className="w-full bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Confirmar y Postular
              </button>
            </div>
          )}

          {/* ====================================================
              PASO 3: Éxito
              ==================================================== */}
          {paso === 3 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Postulación Enviada!</h3>
              <p className="text-gray-600 mb-8">
                La empresa {empresa} ha recibido tu perfil. Te notificaremos si hay actualizaciones.
              </p>
              
              <button 
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-xl font-bold transition-colors"
              >
                Entendido, volver a la vacante
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}