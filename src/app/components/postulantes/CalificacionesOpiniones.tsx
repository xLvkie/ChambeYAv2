import LayoutPostulante from '../shared/LayoutPostulante';
import { Star, TrendingUp, Award, Target, Zap, Trophy, Flag } from 'lucide-react';

export default function CalificacionesPostulante() {
  const opiniones = [
    {
      id: 1,
      empresa: 'Construcciones Pérez SAC',
      logo: '🏗️',
      calificacion: 5,
      fecha: 'Hace 1 mes',
      comentario: 'Excelente profesional, muy responsable y puntual. Sus trabajos son de alta calidad y siempre cumple con los plazos establecidos. Lo recomendamos ampliamente.',
      proyecto: 'Instalación eléctrica residencial',
    },
    {
      id: 2,
      empresa: 'Talleres Unidos SAC',
      logo: '⚙️',
      calificacion: 5,
      fecha: 'Hace 2 meses',
      comentario: 'Gran conocimiento técnico y muy buena actitud. Resolvió un problema complejo que otros técnicos no pudieron. Definitivamente lo volveríamos a contratar.',
      proyecto: 'Mantenimiento de maquinaria industrial',
    },
    {
      id: 3,
      empresa: 'Servicios Generales Lima',
      logo: '🔧',
      calificacion: 4,
      fecha: 'Hace 3 meses',
      comentario: 'Buen trabajo, cumplió con los plazos establecidos. Muy profesional en su trato.',
      proyecto: 'Instalación eléctrica comercial',
    },
    {
      id: 4,
      empresa: 'Construcciones del Norte',
      logo: '🏗️',
      calificacion: 5,
      fecha: 'Hace 4 meses',
      comentario: 'Trabajador confiable y muy capacitado. Excelente persona y gran profesional.',
      proyecto: 'Proyecto de construcción',
    },
    {
      id: 5,
      empresa: 'Muebles del Norte',
      logo: '🪑',
      calificacion: 4,
      fecha: 'Hace 5 meses',
      comentario: 'Muy buen profesional, atento y responsable.',
      proyecto: 'Instalaciones eléctricas para taller',
    },
  ];

  const promedioPorCategoria = [
    { categoria: 'Calidad del Trabajo', promedio: 4.9 },
    { categoria: 'Puntualidad', promedio: 4.8 },
    { categoria: 'Comunicación', promedio: 4.7 },
    { categoria: 'Profesionalismo', promedio: 5.0 },
  ];

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Tu experiencia y opiniones ayudan a construir confianza</p>
        </div>

        {/* Layout Principal: 1 columna en móvil, 3 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content (Columna Izquierda 2/3) */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* Calificar Empresa */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Calificar Empresa</h2>
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selecciona empresa *</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base">
                    <option value="">Elige una empresa...</option>
                    <option>Construcciones Pérez SAC</option>
                    <option>Talleres Unidos SAC</option>
                    <option>Servicios Generales Lima</option>
                    <option>Construcciones del Norte</option>
                    <option>Muebles del Norte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Cargo desempeñado *</label>
                  <input
                    type="text"
                    placeholder="Ej: Técnico Electricista"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Calificación *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="hover:scale-110 transition-transform p-1 -m-1"
                      >
                        <Star size={32} className="text-gray-200 hover:text-[#FF8C00] hover:fill-[#FF8C00] transition-colors" />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Haz clic en las estrellas para calificar</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tu opinión *</label>
                  <textarea
                    rows={4}
                    placeholder="Comparte tu experiencia trabajando en esta empresa..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors resize-none text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Mínimo 50 caracteres</p>
                </div>

                <button className="w-full px-6 py-3.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-sm">
                  Enviar Reseña
                </button>
              </div>
            </div>

            {/* Opiniones Recibidas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Opiniones Recibidas ({opiniones.length})</h2>

              <div className="space-y-6">
                {opiniones.map((opinion) => (
                  <div key={opinion.id} className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row gap-4 mb-3 sm:mb-4">
                      
                      {/* Logo (Responsivo) */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {opinion.logo}
                      </div>
                      
                      {/* Contenido Opinión */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-1 sm:gap-4">
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{opinion.empresa}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{opinion.proyecto}</p>
                          </div>
                          <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md w-fit">{opinion.fecha}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= opinion.calificacion ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                            />
                          ))}
                          <span className="ml-2 font-bold text-gray-900 text-sm">{opinion.calificacion}.0</span>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-gray-50/50 p-3 sm:p-0 sm:bg-transparent rounded-lg italic sm:not-italic">
                          "{opinion.comentario}"
                        </p>
                        
                        <button className="mt-3 sm:mt-4 text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                          <Flag size={14} />
                          Reportar reseña
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Columna Derecha 1/3) */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Calificación General */}
            <div className="bg-white border border-border rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Tu Calificación</h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-gray-900 mb-2">4.8</div>
                <div className="flex justify-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className="fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                </div>
                <p className="text-muted-foreground font-medium text-sm">De 5 opiniones verificadas</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { stars: 5, count: 12 },
                  { stars: 4, count: 2 },
                  { stars: 3, count: 1 },
                  { stars: 2, count: 0 },
                  { stars: 1, count: 0 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-4 font-bold text-gray-700">{rating.stars}</span>
                    <Star
                      size={14}
                      className="fill-[#FF8C00] text-[#FF8C00]"
                    />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div
                        className="rounded-full h-2.5 bg-[#FF8C00] transition-all"
                        style={{ width: `${(rating.count / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-6 text-right font-medium text-gray-600">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promedio por Categoría */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Promedio por Categoría</h3>
              <div className="space-y-4">
                {promedioPorCategoria.map((cat) => (
                  <div key={cat.categoria}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">{cat.categoria}</span>
                      <span className="font-bold text-gray-900">{cat.promedio.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-[#FF8C00] to-orange-400 rounded-full h-2.5 transition-all"
                        style={{ width: `${(cat.promedio / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Tus Estadísticas</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="text-[#0056B3]" size={22} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Proyectos Completados</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">28</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-green-600" size={22} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Tasa de Recomendación</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">96%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="text-purple-600" size={22} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Ranking</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Top 5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insignias (Grid Responsivo Inteligente) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">
                Tus Insignias
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: Star,
                    nombre: "Top Rated",
                    color: "text-[#FF8C00] bg-orange-50 border-orange-100",
                  },
                  {
                    icon: Target,
                    nombre: "100% Completo",
                    color: "text-[#0056B3] bg-blue-50 border-blue-100",
                  },
                  {
                    icon: Zap,
                    nombre: "Respuesta Rápida",
                    color: "text-amber-500 bg-amber-50 border-amber-100",
                  },
                  {
                    icon: Trophy,
                    nombre: "Profesional",
                    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  },
                ].map((badge) => {
                  const Icon = badge.icon;

                  return (
                    <div
                      key={badge.nombre}
                      className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-gray-200 transition-colors shadow-sm hover:shadow-md cursor-default"
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center border ${badge.color}`}
                      >
                        <Icon size={24} />
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-gray-800">
                        {badge.nombre}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </LayoutPostulante>
  );
}