import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Star, TrendingUp, Award, Flag } from 'lucide-react';

export default function CalificacionesEmpleador() {
  const opiniones = [
    { id: 1, trabajador: 'Carlos Martínez', puesto: 'Electricista', calificacion: 5, fecha: 'Hace 1 mes', comentario: 'Excelente empresa, muy profesionales y puntuales con los pagos. Ambiente de trabajo agradable.' },
    { id: 2, trabajador: 'Luis Torres', puesto: 'Carpintero', calificacion: 5, fecha: 'Hace 2 meses', comentario: 'Gran experiencia laboral. Cumplen con todos los beneficios de ley y son muy respetuosos.' },
    { id: 3, trabajador: 'Roberto Silva', puesto: 'Soldador', calificacion: 4, fecha: 'Hace 3 meses', comentario: 'Buena empresa para trabajar. Podría mejorar en la comunicación interna.' },
  ];

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Tu reputación como empleador</p>
        </div>

        {/* Layout Principal: 1 col en móvil, 3 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Calificar Trabajador */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6">Calificar Trabajador</h2>
              <div className="space-y-4 lg:space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selecciona trabajador</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition-colors text-sm sm:text-base">
                    <option>Carlos Martínez - Electricista</option>
                    <option>Luis Torres - Carpintero</option>
                    <option>Roberto Silva - Soldador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Calificación</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="hover:scale-110 transition-transform p-1 -m-1">
                        <Star size={32} className="text-gray-300 hover:text-yellow-400 hover:fill-yellow-400 sm:w-10 sm:h-10 lg:w-8 lg:h-8" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Comentario</label>
                  <textarea
                    rows={4}
                    placeholder="Comparte tu experiencia trabajando con este profesional..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-colors text-sm sm:text-base"
                  />
                </div>
                <button className="w-full px-6 py-3.5 sm:py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Enviar Calificación
                </button>
              </div>
            </div>

            {/* Opiniones Recibidas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6">Opiniones Recibidas de Trabajadores</h2>
              <div className="space-y-5 lg:space-y-6">
                {opiniones.map((opinion) => (
                  <div key={opinion.id} className="pb-5 lg:pb-6 border-b border-gray-100 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 gap-1 sm:gap-4">
                      <div>
                        <p className="font-bold text-gray-900 text-base sm:text-lg">{opinion.trabajador}</p>
                        <p className="text-sm font-medium text-gray-600">{opinion.puesto}</p>
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded-md w-fit">{opinion.fecha}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className={`sm:w-5 sm:h-5 ${star <= opinion.calificacion ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                      <span className="ml-2 font-bold text-gray-900 text-sm sm:text-base">{opinion.calificacion}.0</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">{opinion.comentario}</p>
                    <button className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                      <Flag size={14} />
                      Reportar reseña
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calificación General */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center sm:text-left">Tu Calificación</h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black mb-3 text-gray-900">4.8</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-medium">De {opiniones.length} opiniones verificadas</p>
              </div>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = opiniones.filter((o) => o.calificacion === stars).length;
                  const percentage = (count / opiniones.length) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      <span className="w-5 text-right">{stars}</span>
                      <Star size={14} className="fill-yellow-400 text-yellow-400 shrink-0" />
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-[#FF8C00] h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span className="w-5 text-gray-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-0.5">Contrataciones</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">28</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-0.5">Recomendación</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">96%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-0.5">Ranking</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">Top 10%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </LayoutEmpleador>
  );
}