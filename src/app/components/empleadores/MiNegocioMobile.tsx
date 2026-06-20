import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Edit2, MapPin, Phone, Mail, CheckCircle2, Star, Building2 } from 'lucide-react';

export default function MiNegocioMobile() {
  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mi Negocio</h1>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium text-sm transition-colors">
            <Edit2 size={16} />
            Editar
          </button>
        </div>

        {/* Información Principal */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center text-5xl mb-3">
              🏗️
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Construcciones Pérez SAC</h2>
            <p className="text-sm text-muted-foreground mb-2">Construcción e Infraestructura</p>
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={12} />
              Empresa Verificada
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-muted-foreground flex-shrink-0" />
              <span>+51 987 654 321</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Mail size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="truncate">contacto@construccionesperez.pe</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
              <span>San Juan de Lurigancho, Lima</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Building2 size={16} className="text-muted-foreground flex-shrink-0" />
              <span>30-100 empleados</span>
            </div>
          </div>
        </div>

        {/* Calificación */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-900 shadow-sm">
          <h3 className="font-bold mb-4">Calificación de Empleador</h3>
          <div className="text-center mb-5">
            <div className="text-5xl font-bold mb-2">4.8</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">De 45 opiniones</p>
          </div>
        </div>

        {/* Descripción */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Sobre la empresa</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Somos una empresa peruana especializada en construcción e infraestructura con más de 15 años de experiencia.
            Nos dedicamos a proyectos residenciales y comerciales, manteniendo los más altos estándares de calidad y seguridad.
            Buscamos talento técnico comprometido para unirse a nuestro equipo en constante crecimiento.
          </p>
        </div>

        {/* Validación RUC */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-4">Información Legal</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-medium text-gray-900 text-sm mb-1">RUC: 20123456789</p>
                <p className="text-xs text-green-600 flex items-center gap-1.5">
                  <CheckCircle2 size={12} />
                  Verificado por SUNAT
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="text-green-600" size={20} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Razón Social</p>
                <p className="font-medium text-gray-900 text-sm leading-tight">CONSTRUCCIONES PEREZ S.A.C.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Fecha de Inscripción</p>
                <p className="font-medium text-gray-900 text-sm">15/03/2008</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estado</p>
                <p className="font-medium text-green-600 text-sm">Activo</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Condición</p>
                <p className="font-medium text-green-600 text-sm">Habido</p>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-4">Indicadores de Confianza</h3>
          <div className="space-y-3">
            {[
              { label: 'Empresa Verificada', activo: true },
              { label: 'RUC Validado', activo: true },
              { label: 'Información Completa', activo: true },
              { label: 'Respuesta Rápida', activo: false },
            ].map((ind) => (
              <div key={ind.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
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

        {/* Vista Pública */}
        <button className="w-full py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-colors">
          Ver perfil público
        </button>
      </div>
    </LayoutEmpleadorMobile>
  );
}
