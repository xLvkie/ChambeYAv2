import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { actualizarPerfilUsuario } from '../../../services/dbService';
import LayoutEmpleador from '../shared/LayoutEmpleador';

export default function EditarMiNegocio() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [cargando, setCargando] = useState(false);

  // 1. Estados conectados a Firebase (Si ya existen datos, los muestra)
  const [nombreEmpresa, setNombreEmpresa] = useState(userData?.nombreEmpresa || '');
  const [rubro, setRubro] = useState(userData?.rubro || '');
  const [telefono, setTelefono] = useState(userData?.telefono || '');
  const [direccion, setDireccion] = useState(userData?.direccion || '');
  const [cantidadEmpleados, setCantidadEmpleados] = useState(userData?.cantidadEmpleados || '');
  const [descripcion, setDescripcion] = useState(userData?.descripcionEmpresa || '');
  const [ruc, setRuc] = useState(userData?.ruc || '');
  const [razonSocial, setRazonSocial] = useState(userData?.razonSocial || '');
  const [fechaInscripcion, setFechaInscripcion] = useState(userData?.fechaInscripcion || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setCargando(true);

    try {
      // 2. Empaquetamos toda la información de las 3 secciones
      const datosNegocio = {
        nombreEmpresa,
        rubro,
        telefono,
        direccion,
        cantidadEmpleados,
        descripcionEmpresa: descripcion,
        ruc,
        razonSocial,
        fechaInscripcion
      };

      // 3. Guardamos en Firebase y cambiamos perfilCompleto a true
      await actualizarPerfilUsuario(currentUser.uid, datosNegocio);
      
      // 4. Liberamos al empleador hacia su dashboard/negocio
      window.location.href = '/empleador/negocio';

    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar los datos de tu empresa.");
      setCargando(false);
    }
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
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Nombre de la Empresa / Marca *</label>
                <input 
                  type="text" 
                  required
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
                  placeholder="Ej. Construcciones Pérez SAC" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Sector o Subtítulo *</label>
                <input 
                  type="text" 
                  required
                  value={rubro}
                  onChange={(e) => setRubro(e.target.value)}
                  placeholder="Ej. Construcción e Infraestructura" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teléfono de Contacto *</label>
                <input 
                  type="tel" 
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej. +51 987 654 321" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ubicación (Sede principal) *</label>
                <input 
                  type="text" 
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej. San Juan de Lurigancho, Lima" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Cantidad de Empleados *</label>
                <select 
                  required
                  value={cantidadEmpleados}
                  onChange={(e) => setCantidadEmpleados(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                >
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
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Somos una empresa peruana especializada en..." 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base"
            ></textarea>
          </div>

          {/* 3. Información Legal */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">3. Información Legal</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Número de RUC *</label>
                <input 
                  type="text" 
                  required
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  placeholder="Ej. 20123456789" 
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Razón Social Exacta *</label>
                <input 
                  type="text" 
                  required
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder="Ej. CONSTRUCCIONES PEREZ S.A.C." 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Fecha de Inscripción (Opcional)</label>
                <input 
                  type="date" 
                  value={fechaInscripcion}
                  onChange={(e) => setFechaInscripcion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base" 
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción Finales */}
          <div className="pt-4 pb-8 flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row-reverse w-full sm:w-auto gap-3">
              <button 
                type="submit" 
                disabled={cargando}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF8C00] hover:bg-orange-600 disabled:opacity-50 text-white rounded-xl font-bold text-base transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Guardando...
                  </>
                ) : (
                  'Guardar Información y Comenzar'
                )}
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