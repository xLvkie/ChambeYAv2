import { X, CheckCircle2, Clock, Calendar, MessageSquare, Building2, AlertCircle } from 'lucide-react';

// Propiedades que el modal recibirá desde la página "Mis Postulaciones"
interface ModalDetallePostulacionProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: string;
  cargo: string;
  estadoActual: 'enviado' | 'revision' | 'entrevista' | 'seleccionado' | 'rechazado';
  fechaPostulacion: string;
}

export default function ModalDetallePostulacion({ 
  isOpen, 
  onClose, 
  empresa, 
  cargo, 
  estadoActual,
  fechaPostulacion 
}: ModalDetallePostulacionProps) {
  
  if (!isOpen) return null;

  // Lógica para determinar el progreso visual de la línea de tiempo
  const getStepStatus = (step: 'enviado' | 'revision' | 'entrevista' | 'final') => {
    const states = ['enviado', 'revision', 'entrevista', 'seleccionado', 'rechazado'];
    const currentIndex = states.indexOf(estadoActual);
    
    let stepIndex = 0;
    if (step === 'revision') stepIndex = 1;
    if (step === 'entrevista') stepIndex = 2;
    if (step === 'final') stepIndex = 3;

    // Ajuste especial: si es rechazado antes de la entrevista, saltamos al final
    if (estadoActual === 'rechazado' && step === 'entrevista') return 'pending';
    if (estadoActual === 'rechazado' && step === 'final') return 'rejected';

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'current';
    return 'pending';
  };

  // Renderizador de los círculos de la línea de tiempo
  const renderIcon = (status: string, IconNormal: any) => {
    if (status === 'completed') return <CheckCircle2 size={16} className="text-white" />;
    if (status === 'rejected') return <X size={16} className="text-white" />;
    return <IconNormal size={16} className={status === 'current' ? 'text-white' : 'text-gray-400'} />;
  };

  // Colores de los círculos según el estado
  const getCircleColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500 border-green-500';
    if (status === 'current') return 'bg-[#0056B3] border-[#0056B3] ring-4 ring-blue-100';
    if (status === 'rejected') return 'bg-red-500 border-red-500';
    return 'bg-white border-gray-300';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Cabecera Fija */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Building2 size={24} className="text-gray-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{cargo}</h3>
              <p className="text-sm font-medium text-[#0056B3]">{empresa}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors border border-gray-200 shadow-sm shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido (Línea de tiempo) */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[1.125rem] before:w-0.5 before:bg-gray-200">
            
            {/* Paso 1: Postulación */}
            <div className="relative flex items-center gap-4">
              <div className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0 ${getCircleColor(getStepStatus('enviado'))}`}>
                {renderIcon(getStepStatus('enviado'), Clock)}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-base ${getStepStatus('enviado') === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>Postulación Enviada</h4>
                <p className="text-sm text-gray-500">{fechaPostulacion}</p>
              </div>
            </div>

            {/* Paso 2: Revisión */}
            <div className="relative flex items-center gap-4">
              <div className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0 ${getCircleColor(getStepStatus('revision'))}`}>
                {renderIcon(getStepStatus('revision'), CheckCircle2)}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-base ${getStepStatus('revision') === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>CV en Revisión</h4>
                {getStepStatus('revision') === 'current' ? (
                  <p className="text-sm text-[#0056B3] font-medium bg-blue-50 px-3 py-1.5 rounded-lg w-fit mt-1">La empresa está evaluando tu perfil</p>
                ) : getStepStatus('revision') === 'completed' ? (
                  <p className="text-sm text-gray-500">Perfil evaluado</p>
                ) : (
                  <p className="text-sm text-gray-400">Aún no visto</p>
                )}
              </div>
            </div>

            {/* Paso 3: Entrevista (Oculto si fue rechazado rápido) */}
            {getStepStatus('entrevista') !== 'pending' || estadoActual !== 'rechazado' ? (
              <div className="relative flex items-center gap-4">
                <div className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0 ${getCircleColor(getStepStatus('entrevista'))}`}>
                  {renderIcon(getStepStatus('entrevista'), Calendar)}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base ${getStepStatus('entrevista') === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>Entrevista Programada</h4>
                  {getStepStatus('entrevista') === 'current' && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                      <MessageSquare size={18} className="text-[#0056B3] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-700 font-medium leading-snug">Tienes un mensaje de la empresa para coordinar la entrevista.</p>
                        <button className="text-sm font-bold text-[#0056B3] hover:text-blue-800 mt-1">Ver mensajes</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Paso 4: Resultado Final */}
            <div className="relative flex items-center gap-4">
              <div className={`z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0 ${getCircleColor(getStepStatus('final'))}`}>
                {renderIcon(getStepStatus('final'), AlertCircle)}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-base ${
                  getStepStatus('final') === 'completed' ? 'text-green-600' : 
                  getStepStatus('final') === 'rejected' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {getStepStatus('final') === 'completed' ? '¡Seleccionado!' : 
                   getStepStatus('final') === 'rejected' ? 'No seleccionado' : 'Decisión Final'}
                </h4>
                {getStepStatus('final') === 'completed' && (
                  <p className="text-sm text-gray-700 mt-1">¡Felicidades! La empresa se contactará contigo para la formalización.</p>
                )}
                {getStepStatus('final') === 'rejected' && (
                  <p className="text-sm text-gray-600 mt-1">Tu perfil no avanzó en esta ocasión. ¡Sigue postulando!</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 text-center">
          <button 
            onClick={onClose}
            className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-bold transition-colors"
          >
            Cerrar detalle
          </button>
        </div>

      </div>
    </div>
  );
}