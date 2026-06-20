import LayoutPostulante from '../shared/LayoutPostulante';
import { Bell, Briefcase, MessageSquare, Star, CheckCircle2, Settings } from 'lucide-react';

export default function NotificacionesPostulantes() {
  const notificaciones = [
    {
      id: 1,
      tipo: 'postulacion',
      icono: Briefcase,
      titulo: 'Nueva vacante compatible',
      mensaje: 'Encontramos una vacante de "Técnico Electricista" con 95% de compatibilidad',
      hora: 'Hace 2 horas',
      leida: false,
      color: 'blue',
    },
    {
      id: 2,
      tipo: 'mensaje',
      icono: MessageSquare,
      titulo: 'Nuevo mensaje',
      mensaje: 'Construcciones Pérez SAC te ha enviado un mensaje',
      hora: 'Hace 3 horas',
      leida: false,
      color: 'purple',
    },
    {
      id: 3,
      tipo: 'estado',
      icono: CheckCircle2,
      titulo: 'Estado de postulación actualizado',
      mensaje: 'Tu postulación a "Carpintero" ha pasado a estado "En revisión"',
      hora: 'Hace 5 horas',
      leida: false,
      color: 'green',
    },
    {
      id: 4,
      tipo: 'calificacion',
      icono: Star,
      titulo: 'Nueva calificación recibida',
      mensaje: 'Talleres Unidos SAC te ha calificado con 5 estrellas',
      hora: 'Ayer',
      leida: true,
      color: 'yellow',
    },
    {
      id: 5,
      tipo: 'postulacion',
      icono: Briefcase,
      titulo: 'Recordatorio',
      mensaje: 'Tienes una entrevista programada mañana a las 10:00 AM',
      hora: 'Ayer',
      leida: true,
      color: 'orange',
    },
    {
      id: 6,
      tipo: 'mensaje',
      icono: MessageSquare,
      titulo: 'Nuevo mensaje',
      mensaje: 'Muebles del Norte te ha enviado un mensaje',
      hora: '2 días',
      leida: true,
      color: 'purple',
    },
  ];

  const getIconoBg = (color: string) => {
    const styles = {
      blue: 'bg-blue-50 border-blue-100',
      purple: 'bg-purple-50 border-purple-100',
      green: 'bg-green-50 border-green-100',
      yellow: 'bg-yellow-50 border-yellow-100',
      orange: 'bg-orange-50 border-orange-100',
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const getIconoColor = (color: string) => {
    const styles = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      yellow: 'text-yellow-600',
      orange: 'text-orange-600',
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Header Responsivo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Notificaciones</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Tienes <span className="font-bold text-[#0056B3]">{noLeidas}</span> notificaciones sin leer
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 border border-gray-200 hover:border-[#0056B3] hover:text-[#0056B3] hover:bg-blue-50 rounded-xl font-semibold text-sm sm:text-base transition-colors shadow-sm">
              Marcar todas leídas
            </button>
            <button className="p-2.5 sm:px-4 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors shadow-sm shrink-0">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Layout Principal: 1 columna en móvil, 3 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content (Lista de Notificaciones - 2/3) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              
              {/* Filtros con Scroll Horizontal en Móviles */}
              <div className="border-b border-gray-100 overflow-hidden">
                <div className="flex gap-2 overflow-x-auto hide-scrollbar p-3 sm:p-4">
                  {[
                    { label: 'Todas', count: notificaciones.length },
                    { label: 'Sin leer', count: noLeidas },
                    { label: 'Postulaciones', count: 3 },
                    { label: 'Mensajes', count: 2 },
                  ].map((filtro) => (
                    <button
                      key={filtro.label}
                      className="px-4 py-2 rounded-lg border border-gray-200 hover:border-[#0056B3] hover:bg-blue-50 hover:text-[#0056B3] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      {filtro.label} <span className="text-muted-foreground font-normal ml-1">({filtro.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lista de Notificaciones */}
              <div className="divide-y divide-gray-100">
                {notificaciones.map((notif) => {
                  const Icono = notif.icono;
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 sm:p-5 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notif.leida ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="flex gap-3 sm:gap-4">
                        {/* Icono */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 border ${getIconoBg(notif.color)} rounded-xl flex items-center justify-center shrink-0`}>
                          <Icono className={getIconoColor(notif.color)} size={20} />
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-1 sm:gap-2">
                            <div className="flex items-center min-w-0">
                              <h3 className={`text-sm sm:text-base truncate ${!notif.leida ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                {notif.titulo}
                              </h3>
                              {!notif.leida && (
                                <span className="inline-block w-2 h-2 bg-[#0056B3] rounded-full ml-2 shrink-0"></span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground font-medium shrink-0">{notif.hora}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pr-2">
                            {notif.mensaje}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar (Columna Derecha 1/3) */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Resumen */}
            <div className="bg-gradient-to-br from-[#0056B3] to-blue-800 rounded-xl p-5 sm:p-6 text-white shadow-sm">
              <h3 className="text-lg font-bold mb-5">Resumen de Hoy</h3>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Nuevas vacantes</span>
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Mensajes</span>
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Actualizaciones</span>
                  <span className="text-xl font-bold">1</span>
                </div>
              </div>
            </div>

            {/* Configuración de Notificaciones (Toggles Responsivos) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Preferencias</h3>
              <div className="space-y-4">
                {[
                  { label: 'Nuevas vacantes compatibles', activo: true },
                  { label: 'Mensajes de empleadores', activo: true },
                  { label: 'Actualizaciones de postulaciones', activo: true },
                  { label: 'Calificaciones recibidas', activo: false },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-gray-700 leading-tight">{pref.label}</span>
                    {/* Toggle Switch animado */}
                    <button
                      role="switch"
                      aria-checked={pref.activo}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        pref.activo ? 'bg-[#0056B3]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          pref.activo ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold transition-colors shadow-sm">
                Configurar todo
              </button>
            </div>

            {/* Accesos Rápidos */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Accesos Rápidos</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-[#0056B3] rounded-xl transition-colors border border-transparent hover:border-blue-100 group">
                  <p className="font-semibold text-gray-700 group-hover:text-[#0056B3] text-sm">Ver postulaciones activas</p>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-[#0056B3] rounded-xl transition-colors border border-transparent hover:border-blue-100 group">
                  <p className="font-semibold text-gray-700 group-hover:text-[#0056B3] text-sm">Buscar nuevas vacantes</p>
                </button>
                <button className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-[#0056B3] rounded-xl transition-colors border border-transparent hover:border-blue-100 group">
                  <p className="font-semibold text-gray-700 group-hover:text-[#0056B3] text-sm">Ver mensajes</p>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </LayoutPostulante>
  );
}