import { useEffect, useState } from 'react';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Star, TrendingUp, Award, Flag } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Calificacion, obtenerCalificacionesEmpresa, obtenerResumenEmpresa } from '../../../services/dbService';

function formatearFecha(timestamp: any) {
  if (!timestamp) return 'Reciente';
  const date = timestamp?.toDate?.() ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function CalificacionesEmpleador() {
  const { currentUser, userData } = useAuth();
  const [opiniones, setOpiniones] = useState<Calificacion[]>([]);
  const [resumen, setResumen] = useState({ promedio: 0, cantidadOpiniones: 0, estrellas: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarCalificaciones = async () => {
      if (!currentUser?.uid) {
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        const opinionesEmpresa = await obtenerCalificacionesEmpresa(currentUser.uid);
        const resumenEmpresa = await obtenerResumenEmpresa(currentUser.uid);
        setOpiniones(opinionesEmpresa);
        setResumen(resumenEmpresa);
      } catch (err) {
        console.error('Error cargando calificaciones de empleador:', err);
        setError('No se pudo cargar las calificaciones.');
      } finally {
        setCargando(false);
      }
    };

    cargarCalificaciones();
  }, [currentUser?.uid]);

  const empresaNombre = userData?.nombreEmpresa || 'Tu empresa';

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Tu reputación como empleador</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6">Calificaciones de trabajadores</h2>
              {cargando ? (
                <p className="text-sm text-gray-600">Cargando opiniones...</p>
              ) : opiniones.length === 0 ? (
                <p className="text-sm text-gray-600">Aún no tienes calificaciones de trabajadores.</p>
              ) : (
                <div className="space-y-5 lg:space-y-6">
                  {opiniones.map((opinion) => (
                    <div key={opinion.id} className="pb-5 lg:pb-6 border-b border-gray-100 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-3 gap-1 sm:gap-4">
                        <div>
                          <p className="font-bold text-gray-900 text-base sm:text-lg">{opinion.postulanteNombre}</p>
                          <p className="text-sm font-medium text-gray-600">{opinion.cargo}</p>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded-md w-fit">{formatearFecha(opinion.fecha)}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className={star <= opinion.puntaje ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                        ))}
                        <span className="ml-2 font-bold text-gray-900 text-sm sm:text-base">{opinion.puntaje}.0</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 leading-relaxed">{opinion.comentario}</p>
                      <button className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                        <Flag size={14} />
                        Reportar reseña
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm text-center">
              <h3 className="text-lg font-bold mb-4">Calificación general</h3>
              <div className="mb-2">
                <div className="text-5xl sm:text-6xl font-black mb-3 text-gray-900">{resumen.promedio.toFixed(1)}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={22} className={index < Math.round(resumen.promedio) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-medium">De {resumen.cantidadOpiniones} opiniones verificadas</p>
              </div>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = resumen.estrellas[stars];
                  const percentage = resumen.cantidadOpiniones ? (count / resumen.cantidadOpiniones) * 100 : 0;
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

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-0.5">Opiniones recibidas</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">{resumen.cantidadOpiniones}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-0.5">Recomendación</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">{resumen.cantidadOpiniones ? `${Math.round((resumen.estrellas[4] + resumen.estrellas[5]) / resumen.cantidadOpiniones * 100)}%` : '0%'}</p>
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
