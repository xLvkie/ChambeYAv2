import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import { ArrowLeft, MapPin, Phone, Mail, CheckCircle2, Star, Building2 } from 'lucide-react';

export default function PerfilEmpresa() {
  const navigate = useNavigate();

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        
        {/* Botón para regresar a la vacante o buscador */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0056B3] mb-4 sm:mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Volver atrás
        </button>

        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Perfil de la Empresa</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1">Conoce más sobre esta organización antes de postular</p>
        </div>

        {/* Layout Principal: 1 col móvil, 3 cols PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Información Principal */}
            <div className="bg-white rounded-xl p-5 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                {/* Logo - Centrado en móvil, a la izquierda en PC */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl text-white shrink-0 self-center sm:self-start">
                  🏗️
                </div>
                <div className="flex-1 text-center sm:text-left">
                  {/* Título y Badge verificada (apilados en móvil, línea en PC) */}
                  <div className="flex flex-col md:flex-row md:items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Construcciones Pérez SAC</h2>
                    <span className="flex items-center justify-center gap-1 text-xs sm:text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0 font-bold">
                      <CheckCircle2 size={14} />
                      Empresa Verificada
                    </span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium mb-4">Construcción e Infraestructura</p>
                  
                  {/* Grid de contacto: 1 col móvil, 2 cols PC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Phone size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">+51 987 654 321</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 min-w-0">
                      <Mail size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">contacto@construccionesperez.pe</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <MapPin size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">San Juan de Lurigancho, Lima</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Building2 size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">30-100 empleados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Sobre la empresa</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Somos una empresa peruana especializada en construcción e infraestructura con más de 15 años de experiencia.
                Nos dedicamos a proyectos residenciales y comerciales, manteniendo los más altos estándares de calidad y seguridad.
                Buscamos talento técnico comprometido para unirse a nuestro equipo en constante crecimiento.
              </p>
            </div>

            {/* Información Legal (Transparencia para el postulante) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Información Legal</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div>
                    <p className="font-bold text-gray-900">RUC: 20123456789</p>
                    <p className="text-sm text-green-700 font-medium flex items-center gap-1.5 mt-1">
                      <CheckCircle2 size={14} />
                      Verificado por SUNAT
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full border border-green-200 flex items-center justify-center shrink-0 self-start sm:self-auto shadow-sm">
                    <CheckCircle2 className="text-green-600" size={24} />
                  </div>
                </div>
                
                {/* Detalles Legales: 1 col móvil, 2 cols PC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Razón Social</p>
                    <p className="text-sm font-bold text-gray-900">CONSTRUCCIONES PEREZ S.A.C.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fecha de Inscripción</p>
                    <p className="text-sm font-bold text-gray-900">15/03/2008</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estado</p>
                    <p className="text-sm font-bold text-green-600">Activo</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Condición</p>
                    <p className="text-sm font-bold text-green-600">Habido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Calificación como Empleador */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm text-center">
              <h3 className="text-lg font-bold mb-4">Calificación de Trabajadores</h3>
              <div className="mb-2">
                <div className="text-5xl sm:text-6xl font-black mb-3 text-gray-900">4.8</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-medium mt-3">Basado en 45 opiniones verificadas</p>
              </div>
            </div>

            {/* Indicadores de Confianza */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Indicadores de Confianza</h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Identidad Verificada', activo: true },
                  { label: 'RUC Activo y Habido', activo: true },
                  { label: 'Perfil 100% Completo', activo: true },
                  { label: 'Responde Rápido', activo: false },
                ].map((ind) => (
                  <div key={ind.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      ind.activo ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CheckCircle2 size={16} className={ind.activo ? 'text-green-600' : 'text-gray-400'} />
                    </div>
                    <span className={`text-sm font-medium ${ind.activo ? 'text-gray-900' : 'text-gray-500'}`}>
                      {ind.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </LayoutPostulante>
  );
}