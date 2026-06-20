import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Bell, Briefcase, Users, MessageSquare, Star, CheckCircle2, Settings } from 'lucide-react';

export default function NotificacionesEmpleador() {
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
    <LayoutEmpleador>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notificaciones</h1>
            <p className="text-lg text-muted-foreground mt-1">Tienes <span className="font-bold text-accent">{noLeidas}</span> notificaciones sin leer</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium">
              Marcar todas como leídas
            </button>
            <button className="p-2.5 border border-gray-300 hover:bg-gray-50 rounded-xl">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex gap-2">
                {['Todas', 'Sin leer', 'Postulantes', 'Mensajes'].map((filtro, idx) => (
                  <button key={filtro} className="px-4 py-2 rounded-lg border border-gray-200 hover:border-accent hover:bg-accent/5 font-medium text-sm">
                    {filtro} ({idx === 0 ? notificaciones.length : idx === 1 ? noLeidas : Math.floor(Math.random() * 5)})
                  </button>
                ))}
              </div>

              <div className="divide-y divide-border">
                {notificaciones.map((notif) => {
                  const Icono = notif.icono;
                  return (
                    <div key={notif.id} className={`p-5 hover:bg-gray-50 cursor-pointer ${!notif.leida ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 ${getIconoBg(notif.color)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icono className={getIconoColor(notif.color)} size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-gray-900">{notif.titulo}</h3>
                            <span className="text-sm text-muted-foreground">{notif.hora}</span>
                          </div>
                          <p className="text-gray-700">{notif.mensaje}</p>
                        </div>
                        {!notif.leida && <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Resumen de Hoy</h3>
              <div className="space-y-3">
                {[
                  { label: 'Nuevos postulantes', valor: '5' },
                  { label: 'Mensajes', valor: '3' },
                  { label: 'Actualizaciones', valor: '2' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-2xl font-bold">{item.valor}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preferencias</h3>
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
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}
