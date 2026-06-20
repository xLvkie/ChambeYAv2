import { useState } from 'react';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Star, TrendingUp, Award, Flag } from 'lucide-react';

export default function CalificacionesEmpleadorMobile() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [calificacion, setCalificacion] = useState(0);

  const opiniones = [
    { id: 1, trabajador: 'Carlos Martínez', puesto: 'Electricista', calificacion: 5, fecha: 'Hace 1 mes', comentario: 'Excelente empresa, muy profesionales y puntuales con los pagos. Ambiente de trabajo agradable.' },
    { id: 2, trabajador: 'Luis Torres', puesto: 'Carpintero', calificacion: 5, fecha: 'Hace 2 meses', comentario: 'Gran experiencia laboral. Cumplen con todos los beneficios de ley y son muy respetuosos.' },
    { id: 3, trabajador: 'Roberto Silva', puesto: 'Soldador', calificacion: 4, fecha: 'Hace 3 meses', comentario: 'Buena empresa para trabajar. Podría mejorar en la comunicación interna.' },
  ];

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Calificaciones</h1>
          <p className="text-sm text-muted-foreground">Tu reputación como empleador</p>
        </div>

        {/* Calificación General */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold mb-4">Tu Calificación</h3>
          <div className="text-center mb-5">
            <div className="text-5xl font-bold mb-2">4.8</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">De {opiniones.length} opiniones verificadas</p>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = opiniones.filter((o) => o.calificacion === stars).length;
              const percentage = (count / opiniones.length) * 100;
              return (
                <div key={stars} className="flex items-center gap-2 text-xs">
                  <span className="w-5">{stars}</span>
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#FF8C00] rounded-full h-1.5 transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="w-5 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calificar Trabajador Button */}
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="w-full px-4 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
        >
          {mostrarFormulario ? 'Cerrar Formulario' : '+ Calificar Trabajador'}
        </button>

        {/* Calificar Trabajador Form */}
        {mostrarFormulario && (
          <div className="bg-white rounded-xl p-5 border border-border">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Calificar Trabajador</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Selecciona trabajador</label>
                <select className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option>Carlos Martínez - Electricista</option>
                  <option>Luis Torres - Carpintero</option>
                  <option>Roberto Silva - Soldador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Calificación</label>
                <div className="flex gap-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setCalificacion(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star
                        size={36}
                        className={star <= calificacion ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Comentario</label>
                <textarea
                  rows={4}
                  placeholder="Comparte tu experiencia trabajando con este profesional..."
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
                />
              </div>
              <button className="w-full px-6 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium">
                Enviar Calificación
              </button>
            </div>
          </div>
        )}

        {/* Estadísticas */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-4">Estadísticas</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contrataciones</p>
                <p className="text-xl font-bold text-gray-900">28</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-green-600" size={18} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recomendación</p>
                <p className="text-xl font-bold text-gray-900">96%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="text-purple-600" size={18} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ranking</p>
                <p className="text-xl font-bold text-gray-900">Top 10%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opiniones Recibidas */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Opiniones de Trabajadores</h2>
          <div className="space-y-5">
            {opiniones.map((opinion) => (
              <div key={opinion.id} className="pb-5 border-b border-border last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{opinion.trabajador}</p>
                    <p className="text-xs text-muted-foreground">{opinion.puesto}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{opinion.fecha}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className={star <= opinion.calificacion ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="ml-1.5 font-bold text-gray-900 text-sm">{opinion.calificacion}.0</span>
                </div>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">{opinion.comentario}</p>
                <button className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
                  <Flag size={12} />
                  Reportar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
