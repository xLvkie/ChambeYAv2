import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';

export default function EditarMiNegocio() {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/empleador/dashboard'); // Redirige al dashboard o al perfil de la empresa una vez guardado
  };

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-6 lg:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Información de la Empresa</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Completa los datos de tu negocio para activar tu perfil de empleador y empezar a reclutar.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 lg:space-y-8">
          
          {/* 1. Información Básica */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">1. Información Básica</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nombre de la Empresa / Marca</label>
                <input 
                  type="text" 
                  placeholder="Ej. Construcciones Pérez SAC" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Sector o Subtítulo</label>
                <input 
                  type="text" 
                  placeholder="Ej. Construcción e Infraestructura" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teléfono de Contacto</label>
                <input 
                  type="tel" 
                  placeholder="Ej. +51 987 654 321" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ubicación (Sede principal)</label>
                <input 
                  type="text" 
                  placeholder="Ej. San Juan de Lurigancho, Lima" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Cantidad de Empleados</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base">
                  <option value="">Selecciona un rango</option>
                  <option value="1-10 empleados">1-10 empleados</option>
                  <option value="11-50 empleados">11-50 empleados</option>
                  <option value="51-200 empleados">51-200 empleados</option>
                  <option value="Más de 200 empleados">Más de 200 empleados</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Sobre la Empresa */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">2. Sobre la empresa</h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4">Esta descripción la verán los postulantes. Cuéntales por qué deberían trabajar contigo.</p>
            <textarea 
              rows={6} 
              placeholder="Somos una empresa peruana especializada en..." 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          {/* 3. Información Legal */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">3. Información Legal</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Número de RUC</label>
                <input 
                  type="text" 
                  placeholder="Ej. 20123456789" 
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Razón Social Exacta</label>
                <input 
                  type="text" 
                  placeholder="Ej. CONSTRUCCIONES PEREZ S.A.C." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Fecha de Inscripción</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base" 
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción Finales */}
          <div className="pt-4 pb-8 flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row-reverse w-full sm:w-auto gap-3">
              <button 
                type="submit" 
                className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold text-base transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Guardar Información y Comenzar
              </button>
              <button 
                type="button" 
                onClick={() => navigate(-1)} 
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-base transition-colors"
              >
                Volver Atrás
              </button>
            </div>
          </div>

        </form>
      </div>
    </LayoutEmpleador>
  );
}