import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Edit2, MapPin, Phone, Mail, CheckCircle2, Star, Building2 } from 'lucide-react';

export default function MiNegocio() {
  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header - Adaptado para móviles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Mi Negocio</h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">Gestiona la información de tu empresa</p>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors">
            <Edit2 size={20} />
            Editar información
          </button>
        </div>

        {/* Layout Principal: 1 col móvil, 3 cols PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Información Principal */}
            <div className="bg-white rounded-xl p-5 sm:p-8 border border-border">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                {/* Logo - Centrado en móvil, a la izquierda en PC */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl text-white shrink-0 self-center sm:self-start">
                  🏗️
                </div>
                <div className="flex-1 text-center sm:text-left">
                  {/* Título y Badge verificada (apilados en móvil, línea en PC) */}
                  <div className="flex flex-col md:flex-row md:items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">Construcciones Pérez SAC</h2>
                    <span className="flex items-center justify-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
                      <CheckCircle2 size={14} />
                      Empresa Verificada
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">Construcción e Infraestructura</p>
                  
                  {/* Grid de contacto: 1 col móvil, 2 cols PC */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">+51 987 654 321</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 min-w-0">
                      <Mail size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">contacto@construccionesperez.pe</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">San Juan de Lurigancho, Lima</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Building2 size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">30-100 empleados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre la empresa</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Somos una empresa peruana especializada en construcción e infraestructura con más de 15 años de experiencia.
                Nos dedicamos a proyectos residenciales y comerciales, manteniendo los más altos estándares de calidad y seguridad.
                Buscamos talento técnico comprometido para unirse a nuestro equipo en constante crecimiento.
              </p>
            </div>

            {/* Validación RUC */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información Legal</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">RUC: 20123456789</p>
                    <p className="text-sm text-green-600 flex items-center gap-2 mt-1">
                      <CheckCircle2 size={14} />
                      Verificado por SUNAT
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0 self-start sm:self-auto">
                    <CheckCircle2 className="text-green-600" size={24} />
                  </div>
                </div>
                {/* 1 col móvil, 2 cols PC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Razón Social</p>
                    <p className="font-medium text-gray-900">CONSTRUCCIONES PEREZ S.A.C.</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha de Inscripción</p>
                    <p className="font-medium text-gray-900">15/03/2008</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estado</p>
                    <p className="font-medium text-green-600">Activo</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Condición</p>
                    <p className="font-medium text-green-600">Habido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calificación */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Calificación de Empleador</h3>
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl font-bold mb-2">4.8</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">De 45 opiniones</p>
              </div>
            </div>
            
            {/* Vista Pública */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Perfil Público</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Así ven los postulantes tu perfil empresarial
              </p>
              <button className="w-full py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                Ver perfil público
              </button>
            </div>

            {/* Indicadores */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Indicadores de Confianza</h3>
              <div className="space-y-3">
                {[
                  { label: 'Empresa Verificada', activo: true },
                  { label: 'RUC Validado', activo: true },
                  { label: 'Información Completa', activo: true },
                  { label: 'Respuesta Rápida', activo: false },
                ].map((ind) => (
                  <div key={ind.label} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      ind.activo ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {ind.activo && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm ${ind.activo ? 'text-gray-900' : 'text-gray-400'}`}>
                      {ind.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}