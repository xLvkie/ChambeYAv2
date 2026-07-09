import { useEffect, useState } from 'react';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Star, TrendingUp, Award, Flag, Search } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { 
  Calificacion, 
  obtenerCalificacionesEmpresa, 
  obtenerResumenEmpresa,
  TrabajadorCalificable,
  obtenerPostulantesCalificables,
  obtenerCalificacion,
  registrarCalificacion,
  actualizarCalificacion
} from '../../../services/dbService';

function formatearFecha(timestamp: any) {
  if (!timestamp) return 'Reciente';
  const date = timestamp?.toDate?.() ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function CalificacionesEmpleador() {
  const { currentUser, userData } = useAuth();
  
  // Datos y Listas
  const [trabajadores, setTrabajadores] = useState<TrabajadorCalificable[]>([]);
  const [opiniones, setOpiniones] = useState<Calificacion[]>([]);
  const [resumen, setResumen] = useState({ promedio: 0, cantidadOpiniones: 0, estrellas: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
  const [opinionActual, setOpinionActual] = useState<Calificacion | null>(null);

  // Estados del Formulario
  const [busquedaTrabajador, setBusquedaTrabajador] = useState('');
  const [selectedTrabajadorId, setSelectedTrabajadorId] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [cargo, setCargo] = useState('');
  const [comentario, setComentario] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Estados de UI
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      if (!currentUser?.uid) {
        setCargando(false);
        return;
      }
      try {
        setCargando(true);
        // Traemos los candidatos que el empleador puede calificar
        const trabajadoresData = await obtenerPostulantesCalificables(currentUser.uid);
        setTrabajadores(trabajadoresData);

        // Traemos las opiniones RECIBIDAS y el resumen estadístico
        const opinionesEmpresa = await obtenerCalificacionesEmpresa(currentUser.uid);
        const resumenEmpresa = await obtenerResumenEmpresa(currentUser.uid);
        setOpiniones(opinionesEmpresa);
        setResumen(resumenEmpresa);
      } catch (err) {
        console.error('Error cargando calificaciones de empleador:', err);
        setError('No se pudo cargar la información inicial.');
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [currentUser?.uid]);

  // Cargar opinión previa si selecciona a un trabajador que ya calificó
  useEffect(() => {
    const cargarOpinion = async () => {
      setMensaje('');
      setError('');

      if (!currentUser?.uid || !selectedTrabajadorId) {
        setOpinionActual(null);
        if (!busquedaTrabajador) {
          setComentario('');
          setPuntaje(0);
          setCargo('');
        }
        return;
      }

      try {
        // Ojo: la función espera (postulanteId, empresaId) en ese orden
        const opinion = await obtenerCalificacion(selectedTrabajadorId, currentUser.uid, 'empresa_a_postulante');
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
  }, [currentUser?.uid, selectedTrabajadorId]);

  const trabajadoresFiltrados = trabajadores.filter(t => 
    t.postulanteNombre.toLowerCase().includes(busquedaTrabajador.toLowerCase())
  );

  const handleSeleccionarTrabajador = (trabajador: TrabajadorCalificable) => {
    setSelectedTrabajadorId(trabajador.postulanteId);
    setBusquedaTrabajador(trabajador.postulanteNombre);
    setCargo(trabajador.cargo);
    setMostrarSugerencias(false);
  };

  const handleGuardar = async () => {
    setError('');
    setMensaje('');

    if (!busquedaTrabajador.trim()) return setError('El nombre del trabajador es obligatorio.');
    if (!cargo.trim()) return setError('El cargo es obligatorio.');
    if (!puntaje || puntaje < 1) return setError('La calificación es obligatoria.');
    if (!comentario.trim() || comentario.trim().length < 50) return setError('El comentario debe tener al menos 50 caracteres.');
    if (!currentUser?.uid) return;

    const trabajadorOriginal = trabajadores.find(item => item.postulanteId === selectedTrabajadorId);

    const datosCalificacion: any = {
      tipo: 'empresa_a_postulante', // CLAVE
      empresaId: currentUser.uid,
      empresaNombre: userData?.nombreEmpresa || userData?.nombre || 'Tu empresa',
      postulanteId: selectedTrabajadorId || `ext_${Date.now()}`,
      postulanteNombre: busquedaTrabajador.trim(),
      vacanteId: trabajadorOriginal?.vacanteId || '',
      cargo: cargo.trim(),
      puntaje,
      comentario: comentario.trim(),
    };

    try {
      setGuardando(true);
      if (opinionActual?.id) {
        await actualizarCalificacion(opinionActual.id, datosCalificacion);
        setMensaje('Calificación actualizada correctamente.');
      } else {
        await registrarCalificacion(datosCalificacion);
        setMensaje('Calificación registrada correctamente.');
      }
      
      if (selectedTrabajadorId) {
        const opinionExistente = await obtenerCalificacion(selectedTrabajadorId, currentUser.uid, 'empresa_a_postulante');
        setOpinionActual(opinionExistente);
      }
    } catch (error) {
      console.error('Error guardando la calificación:', error);
      setError('No se pudo guardar la calificación. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Tu reputación como empleador</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* NUEVA CARD: FORMULARIO PARA CALIFICAR TRABAJADOR */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6">Calificar Trabajador</h2>
              
              <div className="space-y-4 sm:space-y-5">
                {mensaje && (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 font-medium">
                    {mensaje}
                  </div>
                )}
                {error && (
                  <div className="rounded-xl bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 font-medium">
                    {error}
                  </div>
                )}

                {/* BUSCADOR DE TRABAJADOR */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selecciona o escribe un trabajador *</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={busquedaTrabajador}
                      onChange={(e) => {
                        setBusquedaTrabajador(e.target.value);
                        setSelectedTrabajadorId('');
                        setMostrarSugerencias(true);
                      }}
                      onFocus={() => setMostrarSugerencias(true)}
                      onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
                      placeholder="Ej: Carlos Martínez..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                    />
                  </div>
                  
                  {/* LISTA DE SUGERENCIAS */}
                  {mostrarSugerencias && trabajadoresFiltrados.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                      {trabajadoresFiltrados.map((trabajador) => (
                        <li
                          key={trabajador.postulanteId}
                          onClick={() => handleSeleccionarTrabajador(trabajador)}
                          className="px-4 py-3 hover:bg-orange-50 cursor-pointer text-sm font-medium border-b border-gray-50 last:border-0"
                        >
                          {trabajador.postulanteNombre}
                          <span className="block text-xs text-gray-500 font-normal mt-0.5">Postuló a: {trabajador.cargo}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Cargo desempeñado *</label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Ej: Técnico Electricista"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
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
                          className={star <= (hoverRating || puntaje) ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Comentario *</label>
                  <textarea
                    rows={4}
                    value={comentario}
                    onChange={(event) => setComentario(event.target.value)}
                    placeholder="Comparte tu experiencia trabajando con este profesional..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Mínimo 50 caracteres</p>
                </div>

                <button
                  onClick={handleGuardar}
                  disabled={guardando}
                  className="w-full px-6 py-3.5 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-bold transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {guardando ? 'Guardando...' : opinionActual ? 'Actualizar Calificación' : 'Enviar Calificación'}
                </button>
              </div>
            </div>

            {/* CARD: OPINIONES RECIBIDAS */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 lg:mb-6">Opiniones Recibidas de Trabajadores</h2>
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
                        <span className="text-xs sm:text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded-md w-fit">Hace {formatearFecha(opinion.fecha)}</span>
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

          {/* SIDEBAR DERECHO: ESTADÍSTICAS (Sin cambios) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm text-center">
              <h3 className="text-lg font-bold mb-4 text-left">Tu Calificación</h3>
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
                  const count = resumen.estrellas[stars as 1|2|3|4|5];
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
                    <p className="text-2xl font-black text-gray-900 leading-none">{resumen.cantidadOpiniones ? `${Math.round(((resumen.estrellas[4] + resumen.estrellas[5]) / resumen.cantidadOpiniones) * 100)}%` : '96%'}</p>
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