import { useEffect, useState, useRef } from 'react';
import LayoutPostulante from '../shared/LayoutPostulante';
import { Star, Award, Flag, TrendingUp, Search } from 'lucide-react';
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
  
  // Datos y Listas
  const [empresas, setEmpresas] = useState<EmpresaCalificable[]>([]);
  const [opiniones, setOpiniones] = useState<Calificacion[]>([]); // Opiniones RECIBIDAS
  const [opinionActual, setOpinionActual] = useState<Calificacion | null>(null); // Opinión HECHA por mí
  
  // Estados del Formulario
  const [busquedaEmpresa, setBusquedaEmpresa] = useState('');
  const [selectedEmpresaId, setSelectedEmpresaId] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [cargo, setCargo] = useState('');
  const [comentario, setComentario] = useState('');
  const [puntaje, setPuntaje] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Estados de UI
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  // 1. Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      if (!currentUser?.uid) return;
      try {
        const empresasData = await obtenerEmpresasCalificables(currentUser.uid);
        setEmpresas(empresasData);
        // Trae las opiniones RECIBIDAS (tipo: empresa_a_postulante) gracias al filtro en dbService
        const opinionesData = await obtenerCalificacionesPostulante(currentUser.uid);
        setOpiniones(opinionesData);
      } catch (error) {
        console.error('Error cargando empresas u opiniones:', error);
      }
    };
    cargarDatos();
  }, [currentUser?.uid]);

  // 2. Cargar opinión previa si selecciono una empresa existente
  useEffect(() => {
    const cargarOpinion = async () => {
      setMensaje('');
      setError('');

      if (!currentUser?.uid || !selectedEmpresaId) {
        setOpinionActual(null);
        if (!busquedaEmpresa) {
          setComentario('');
          setPuntaje(0);
          setCargo('');
        }
        return;
      }

      try {
        const opinion = await obtenerCalificacion(currentUser.uid, selectedEmpresaId, 'postulante_a_empresa');
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
  }, [currentUser?.uid, selectedEmpresaId]);

  // Cálculo del Promedio
  const promedio = opiniones.length
    ? Number((opiniones.reduce((acc, opinion) => acc + opinion.puntaje, 0) / opiniones.length).toFixed(1))
    : 0;

  // Filtro para el buscador predictivo
  const empresasFiltradas = empresas.filter(e => 
    e.empresaNombre.toLowerCase().includes(busquedaEmpresa.toLowerCase())
  );

  const handleSeleccionarEmpresa = (empresa: EmpresaCalificable) => {
    setSelectedEmpresaId(empresa.empresaId);
    setBusquedaEmpresa(empresa.empresaNombre);
    setCargo(empresa.cargoPostulado);
    setMostrarSugerencias(false);
  };

  const handleGuardar = async () => {
    setError('');
    setMensaje('');

    if (!busquedaEmpresa.trim()) {
      setError('El nombre de la empresa es obligatorio.');
      return;
    }
    if (!cargo.trim()) {
      setError('El cargo es obligatorio.');
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
    if (!currentUser?.uid) return;

    // Si escribió una empresa que no está en la lista, generamos un ID temporal o vacío
    const empresaOriginal = empresas.find(item => item.empresaId === selectedEmpresaId);

    const datosCalificacion: any = {
      tipo: 'postulante_a_empresa', // CLAVE para la base de datos
      empresaId: selectedEmpresaId || `ext_${Date.now()}`,
      empresaNombre: busquedaEmpresa.trim(),
      postulanteId: currentUser.uid,
      postulanteNombre: userData?.nombre || currentUser.email || 'Postulante',
      vacanteId: empresaOriginal?.vacanteId || '',
      cargo: cargo.trim(),
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

      // Volvemos a traer la opinión recién guardada para actualizar el estado
      if (selectedEmpresaId) {
        const opinionExistente = await obtenerCalificacion(currentUser.uid, selectedEmpresaId, 'postulante_a_empresa');
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
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Calificaciones y Reseñas</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Tu experiencia y opiniones ayudan a construir confianza</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* CARD: FORMULARIO PARA CALIFICAR */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Calificar Empresa</h2>

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

                {/* BUSCADOR DE EMPRESA */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Selecciona o escribe una empresa *</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={busquedaEmpresa}
                      onChange={(e) => {
                        setBusquedaEmpresa(e.target.value);
                        setSelectedEmpresaId(''); // Se reinicia el ID si empieza a escribir algo nuevo
                        setMostrarSugerencias(true);
                      }}
                      onFocus={() => setMostrarSugerencias(true)}
                      onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
                      placeholder="Ej: Construcciones Pérez SAC..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base"
                    />
                  </div>
                  
                  {/* LISTA DE SUGERENCIAS */}
                  {mostrarSugerencias && empresasFiltradas.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                      {empresasFiltradas.map((emp) => (
                        <li
                          key={emp.empresaId}
                          onClick={() => handleSeleccionarEmpresa(emp)}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm font-medium border-b border-gray-50 last:border-0"
                        >
                          {emp.empresaNombre}
                          <span className="block text-xs text-gray-500 font-normal mt-0.5">Cargo: {emp.cargoPostulado}</span>
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
                          className={star <= (hoverRating || puntaje) ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
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
                  {guardando ? 'Guardando...' : opinionActual ? 'Actualizar opinión' : 'Guardar opinión'}
                </button>
              </div>
            </div>

            {/* CARD: OPINIONES RECIBIDAS */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Opiniones Recibidas ({opiniones.length})</h2>

              {opiniones.length === 0 ? (
                <p className="text-sm text-gray-600">Aún no has recibido ninguna opinión. Cuando las empresas te califiquen, aparecerán aquí.</p>
              ) : (
                <div className="space-y-6">
                  {opiniones.map((opinion) => (
                    <div key={opinion.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                           {/* Pequeño logo simulado de la empresa */}
                           <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-lg shrink-0">
                             🏢
                           </div>
                           <div>
                             <p className="font-bold text-gray-900">{opinion.empresaNombre}</p>
                             <p className="text-sm text-muted-foreground">{opinion.cargo}</p>
                           </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="font-medium text-gray-500 text-sm">Hace {formatearFecha(opinion.fecha)}</p>
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
                        <p>"{opinion.comentario}"</p>
                      </div>
                      
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1.5 mt-4 transition-colors">
                         <Flag size={14} /> Reportar reseña
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDEBAR DERECHO (ESTADÍSTICAS) */}
          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white border border-border rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Tu Calificación</h3>
              <div className="text-center mb-6">
                <div className="text-6xl font-black text-gray-900 mb-2">{promedio.toFixed(1)}</div>
                <div className="flex justify-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className={star <= Math.round(promedio) ? "fill-[#FF8C00] text-[#FF8C00]" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-muted-foreground font-medium text-sm">De {opiniones.length} opiniones verificadas</p>
              </div>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = opiniones.filter((opinion) => opinion.puntaje === rating).length;
                  const percentage = opiniones.length ? (count / opiniones.length) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center gap-3 text-sm">
                      <span className="w-4 font-bold text-gray-700">{rating}</span>
                      <Star size={14} className="fill-[#FF8C00] text-[#FF8C00]" />
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                        <div className="rounded-full h-2.5 bg-[#FF8C00] transition-all" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="w-6 text-right font-medium text-gray-600">{count}</span>
                    </div>
                  );
                })}
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

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Tus Insignias</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: Star, nombre: 'Top Rated', color: 'text-[#FF8C00] bg-orange-50 border-orange-100' },
                  { icon: Star, nombre: '100% Completo', color: 'text-[#0056B3] bg-blue-50 border-blue-100' },
                  { icon: Star, nombre: 'Respuesta Rápida', color: 'text-amber-500 bg-amber-50 border-amber-100' },
                  { icon: Star, nombre: 'Profesional', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
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