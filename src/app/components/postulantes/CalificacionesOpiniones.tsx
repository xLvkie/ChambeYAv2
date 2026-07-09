import { useEffect, useState } from 'react';
import LayoutPostulante from '../shared/LayoutPostulante';
import { Star, Award, Flag, TrendingUp } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import {
  Calificacion,
  EmpresaCalificable,
  obtenerCalificacion,
  obtenerCalificacionesPostulante,
  obtenerEmpresasCalificables,
  registrarCalificacion,
  actualizarCalificacion,
} from '../../../services/dbService';

function formatearFecha(timestamp: any) {
  if (!timestamp) return 'Reciente';
  const date = timestamp.toDate?.() ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function CalificacionesPostulante() {
  const { currentUser, userData } = useAuth();
  const [empresas, setEmpresas] = useState<EmpresaCalificable[]>([]);
  const [opiniones, setOpiniones] = useState<Calificacion[]>([]);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState('');
  const [cargo, setCargo] = useState('');
  const [comentario, setComentario] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [opinionActual, setOpinionActual] = useState<Calificacion | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!currentUser?.uid) return;

      try {
        const empresasData = await obtenerEmpresasCalificables(currentUser.uid);
        setEmpresas(empresasData);
        const opinionesData = await obtenerCalificacionesPostulante(currentUser.uid);
        setOpiniones(opinionesData);
      } catch (error) {
        console.error('Error cargando empresas calificables o opiniones:', error);
      }
    };

    cargarDatos();
  }, [currentUser?.uid]);

  useEffect(() => {
    const cargarOpinion = async () => {
      setMensaje('');
      setError('');

      if (!currentUser?.uid || !selectedEmpresaId) {
        setOpinionActual(null);
        setComentario('');
        setPuntaje(0);
        setCargo('');
        return;
      }

      const empresa = empresas.find((empresa) => empresa.empresaId === selectedEmpresaId);
      setCargo(empresa?.cargoPostulado || '');

      try {
        const opinion = await obtenerCalificacion(currentUser.uid, selectedEmpresaId);

        if (opinion) {
          setOpinionActual(opinion);
          setComentario(opinion.comentario);
          setPuntaje(opinion.puntaje);
        } else {
          setOpinionActual(null);
          setComentario('');
          setPuntaje(0);
        }
      } catch (error) {
        console.error('Error al obtener opinión existente:', error);
      }
    };

    cargarOpinion();
  }, [currentUser?.uid, selectedEmpresaId, empresas]);

  const promedio = opiniones.length
    ? Number((opiniones.reduce((acc, opinion) => acc + opinion.puntaje, 0) / opiniones.length).toFixed(1))
    : 0;

  const handleGuardar = async () => {
    setError('');
    setMensaje('');

    if (!selectedEmpresaId) {
      setError('La empresa es obligatoria.');
      return;
    }

    if (!puntaje || puntaje < 1) {
      setError('La calificación es obligatoria.');
      return;
    }

    if (!comentario.trim() || comentario.trim().length < 50) {
      setError('El comentario debe tener al menos 50 caracteres.');
      return;
    }

    if (!currentUser?.uid) {
      setError('No se encontró el usuario autenticado.');
      return;
    }

    const empresa = empresas.find((item) => item.empresaId === selectedEmpresaId);
    if (!empresa) {
      setError('Empresa inválida.');
      return;
    }

    const datosCalificacion = {
      empresaId: empresa.empresaId,
      empresaNombre: empresa.empresaNombre,
      postulanteId: currentUser.uid,
      postulanteNombre: userData?.nombre || currentUser.email || 'Postulante',
      vacanteId: empresa.vacanteId,
      cargo: empresa.cargoPostulado,
      puntaje,
      comentario: comentario.trim(),
    };

    try {
      setGuardando(true);

      if (opinionActual?.id) {
        await actualizarCalificacion(opinionActual.id, datosCalificacion);
        setMensaje('Opinión actualizada correctamente.');
      } else {
        await registrarCalificacion(datosCalificacion);
        setMensaje('Opinión registrada correctamente.');
      }

      const opinionesActualizadas = await obtenerCalificacionesPostulante(currentUser.uid);
      setOpiniones(opinionesActualizadas);
      const opinionExistente = await obtenerCalificacion(currentUser.uid, selectedEmpresaId);
      setOpinionActual(opinionExistente);
    } catch (error) {
      console.error('Error guardando la calificación:', error);
      setError('No se pudo guardar la calificación. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Tu experiencia y opiniones ayudan a construir confianza</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Calificar Empresa</h2>

              <div className="space-y-4 sm:space-y-5">
                {mensaje ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3">
                    {mensaje}
                  </div>
                ) : null}

                {error ? (
                  <div className="rounded-xl bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3">
                    {error}
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selecciona empresa *</label>
                  <select
                    value={selectedEmpresaId}
                    onChange={(event) => setSelectedEmpresaId(event.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base"
                  >
                    <option value="">Elige una empresa...</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.empresaId} value={empresa.empresaId}>
                        {empresa.empresaNombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Cargo desempeñado *</label>
                  <input
                    type="text"
                    value={cargo}
                    readOnly
                    placeholder="Selecciona una empresa para cargar el cargo"
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
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setPuntaje(star)}
                        className="hover:scale-110 transition-transform p-1 -m-1"
                      >
                        <Star
                          size={32}
                          className={
                            star <= (hoverRating || puntaje)
                              ? 'fill-[#FF8C00] text-[#FF8C00]'
                              : 'text-gray-200'
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Haz clic en las estrellas para calificar</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tu opinión *</label>
                  <textarea
                    rows={4}
                    value={comentario}
                    onChange={(event) => setComentario(event.target.value)}
                    placeholder="Comparte tu experiencia trabajando en esta empresa..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors resize-none text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Mínimo 50 caracteres</p>
                </div>

                <button
                  onClick={handleGuardar}
                  disabled={guardando}
                  className="w-full px-6 py-3.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {opinionActual ? 'Actualizar opinión' : 'Guardar opinión'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Tus opiniones</h2>

              {opiniones.length === 0 ? (
                <p className="text-sm text-gray-600">Aún no has dejado ninguna opinión. Califica una empresa donde hayas postulado.</p>
              ) : (
                <div className="space-y-6">
                  {opiniones.map((opinion) => (
                    <div key={opinion.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Empresa</p>
                          <p className="font-bold text-gray-900">{opinion.empresaNombre}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Fecha</p>
                          <p className="font-medium text-gray-900">{formatearFecha(opinion.fecha)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= opinion.puntaje ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                          />
                        ))}
                        <span className="ml-2 font-bold text-gray-900">{opinion.puntaje}.0</span>
                      </div>

                      <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                        <p>
                          <span className="font-semibold">Cargo:</span> {opinion.cargo}
                        </p>
                        <p className="italic">"{opinion.comentario}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white border border-border rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Tu Calificación</h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-gray-900 mb-2">{promedio.toFixed(1)}</div>
                <div className="flex justify-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className="fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                </div>
                <p className="text-muted-foreground font-medium text-sm">De {opiniones.length} opiniones verificadas</p>
              </div>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3 text-sm">
                    <span className="w-4 font-bold text-gray-700">{rating}</span>
                    <Star size={14} className="fill-[#FF8C00] text-[#FF8C00]" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div className="rounded-full h-2.5 bg-[#FF8C00] transition-all" style={{ width: `${(opiniones.filter((opinion) => opinion.puntaje === rating).length / Math.max(opiniones.length, 1)) * 100}%` }} />
                    </div>
                    <span className="w-6 text-right font-medium text-gray-600">{opiniones.filter((opinion) => opinion.puntaje === rating).length}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Promedio por Categoría</h3>
              <div className="space-y-4">
                {[
                  { categoria: 'Calidad del Trabajo', promedio: 4.9 },
                  { categoria: 'Puntualidad', promedio: 4.8 },
                  { categoria: 'Comunicación', promedio: 4.7 },
                  { categoria: 'Profesionalismo', promedio: 5.0 },
                ].map((cat) => (
                  <div key={cat.categoria}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700 font-medium">{cat.categoria}</span>
                      <span className="font-bold text-gray-900">{cat.promedio.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-[#FF8C00] to-orange-400 rounded-full h-2.5 transition-all" style={{ width: `${(cat.promedio / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Tus Estadísticas</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="text-[#0056B3]" size={22} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Proyectos Completados</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{opiniones.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="text-green-600" size={22} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Tasa de Recomendación</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{opiniones.length ? `${Math.round((opiniones.filter((opinion) => opinion.puntaje >= 4).length / opiniones.length) * 100)}%` : '0%'}</p>
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

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Tus Insignias</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: Star,
                    nombre: 'Top Rated',
                    color: 'text-[#FF8C00] bg-orange-50 border-orange-100',
                  },
                  {
                    icon: Star,
                    nombre: '100% Completo',
                    color: 'text-[#0056B3] bg-blue-50 border-blue-100',
                  },
                  {
                    icon: Star,
                    nombre: 'Respuesta Rápida',
                    color: 'text-amber-500 bg-amber-50 border-amber-100',
                  },
                  {
                    icon: Star,
                    nombre: 'Profesional',
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                  },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.nombre}
                      className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-gray-200 transition-colors shadow-sm hover:shadow-md cursor-default"
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center border ${badge.color}`}>
                        <Icon size={24} />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-gray-800">{badge.nombre}</p>
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
