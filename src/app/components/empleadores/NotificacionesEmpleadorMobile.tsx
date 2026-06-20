import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Briefcase, Users, MessageSquare, Star, Settings } from 'lucide-react';

export default function NotificacionesEmpleadorMobile() {
  const notificaciones = [
    { id: 1, tipo: 'candidato', icono: Users, titulo: 'Nuevo postulante', mensaje: 'Carlos Martínez se postuló a "Técnico Electricista"', hora: 'Hace 1 hora', leida: false, color: 'blue' },
    { id: 2, tipo: 'mensaje', icono: MessageSquare, titulo: 'Nuevo mensaje', mensaje: 'Luis Torres te ha enviado un mensaje', hora: 'Hace 2 horas', leida: false, color: 'purple' },
    { id: 3, tipo: 'vacante', icono: Briefcase, titulo: 'Vacante por expirar', mensaje: 'Tu vacante de "Carpintero" expira en 3 días', hora: 'Hace 3 horas', leida: false, color: 'orange' },
    { id: 4, tipo: 'calificacion', icono: Star, titulo: 'Nueva calificación', mensaje: 'Roberto Silva calificó tu empresa con 5 estrellas', hora: 'Ayer', leida: true, color: 'yellow' },
    { id: 5, tipo: 'candidato', icono: Users, titulo: 'Candidato destacado', mensaje: 'Tienes 3 candidatos con alta compatibilidad', hora: 'Ayer', leida: true, color: 'green' },
  ];

  const getIconoBg = (color: string) => {
    const styles: Record<string, string> = {
      blue: 'bg-blue-100', purple: 'bg-purple-100', green: 'bg-green-100', yellow: 'bg-yellow-100', orange: 'bg-orange-100',
    };
    return styles[color] || styles.blue;
  };

  const getIconoColor = (color: string) => {
    const styles: Record<string, string> = {
      blue: 'text-blue-600', purple: 'text-purple-600', green: 'text-green-600', yellow: 'text-yellow-600', orange: 'text-orange-600',
    };
    return styles[color] || styles.blue;
  };

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-accent">{noLeidas}</span> sin leer
            </p>
          </div>
          <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors">
            <Settings size={20} />
          </button>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold mb-3">Resumen de Hoy</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Postulantes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Mensajes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Updates</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {['Todas', 'Sin leer', 'Postulantes', 'Mensajes'].map((filtro, idx) => (
              <button
                key={filtro}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent/5 font-medium text-sm transition-colors whitespace-nowrap"
              >
                {filtro} ({idx === 0 ? notificaciones.length : idx === 1 ? noLeidas : Math.floor(Math.random() * 5)})
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Notificaciones */}
        <div className="space-y-3">
          {notificaciones.map((notif) => {
            const Icono = notif.icono;
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-xl p-4 border border-border ${
                  !notif.leida ? 'border-l-4 border-l-accent' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 ${getIconoBg(notif.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icono className={getIconoColor(notif.color)} size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        {notif.titulo}
                        {!notif.leida && (
                          <span className="w-2 h-2 bg-accent rounded-full"></span>
                        )}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{notif.hora}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{notif.mensaje}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preferencias */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Preferencias</h3>
          <div className="space-y-3">
            {['Nuevos postulantes', 'Mensajes de candidatos', 'Vacantes próximas a vencer', 'Calificaciones recibidas'].map((pref, idx) => (
              <div key={pref} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{pref}</span>
                <div className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${idx < 3 ? 'bg-accent' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full mt-1 transition-transform ${idx < 3 ? 'ml-6' : 'ml-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marcar todas como leídas */}
        <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-colors">
          Marcar todas como leídas
        </button>
      </div>
    </LayoutEmpleadorMobile>
  );
}
