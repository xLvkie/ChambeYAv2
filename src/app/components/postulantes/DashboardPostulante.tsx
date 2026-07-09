import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Briefcase, MapPin, Clock, TrendingUp, Award, Building2, CheckCircle2, Loader2 } from 'lucide-react';

import LayoutPostulante from '../shared/LayoutPostulante';
import ModalPostulacion from '../shared/modals/ModalPostulacion';

// Importamos nuestros servicios
import { 
  obtenerPostulacionesPorPostulante,
  obtenerEmpleosRecomendados,
  obtenerEmpresasDestacadas,
  calcularTasaRespuestaPostulante,
  obtenerCalificacionesPostulante
} from '../../../services/dbService';

export default function DashboardPostulante() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState<any>(null);

  // Estados para nuestros datos dinámicos
  const [empleosRecomendados, setEmpleosRecomendados] = useState<any[]>([]);
  const [empresasDestacadas, setEmpresasDestacadas] = useState<any[]>([]);
  
  // Estados para métricas
  const [metricas, setMetricas] = useState({
    postulacionesActivas: 0,
    empresasInteresadas: 0,
    tasaRespuesta: 0,
    postulacionesExitosas: 0,
    totalPostulaciones: 0,
    calificacionPromedio: 0,
    totalOpiniones: 0,
    vistasPerfil: userData?.vistasPerfil?.length || 0 // Si no existe en BD, será 0
  });

  // Estado para el Pipeline
  const [pipeline, setPipeline] = useState({
    postulado: 0,
    enRevision: 0,
    entrevista: 0,
    seleccionado: 0
  });

  const primerNombre = userData?.nombre ? userData.nombre.split(' ')[0] : 'Postulante';

  // 1. Calcular Porcentaje del Perfil Completado
  const calcularPerfilCompletado = () => {
    let completados = 0;
    const camposTotales = 6; 
    if (userData?.nombre) completados++;
    if (userData?.telefono) completados++;
    if (userData?.ubicacion) completados++;
    if (userData?.tituloProfesional) completados++;
    if (userData?.habilidades && userData.habilidades.length > 0) completados++;
    if (userData?.experiencias && userData.experiencias.length > 0) completados++;
    
    return Math.round((completados / camposTotales) * 100);
  };

  const perfilCompletadoPorcentaje = calcularPerfilCompletado();

  // 2. Extraer Top 3 Habilidades (Compatibilidad Técnica)
  const topHabilidades = userData?.habilidades 
    ? [...userData.habilidades].sort((a, b) => b.porcentaje - a.porcentaje).slice(0, 3)
    : [];

  useEffect(() => {
    const cargarDatosDashboard = async () => {
      if (!currentUser) return;
      setCargando(true);

      try {
        // Ejecutamos las peticiones en paralelo para que sea súper rápido
        const [
          postulaciones, 
          recomendados, 
          empresas, 
          tasa, 
          calificaciones
        ] = await Promise.all([
          obtenerPostulacionesPorPostulante(currentUser.uid),
          obtenerEmpleosRecomendados(),
          obtenerEmpresasDestacadas(),
          calcularTasaRespuestaPostulante(currentUser.uid),
          obtenerCalificacionesPostulante(currentUser.uid)
        ]);

        setEmpleosRecomendados(recomendados);
        setEmpresasDestacadas(empresas);

        // Procesar Postulaciones (Pipeline y Métricas)
        let activas = 0;
        let interesadas = 0;
        let exitosas = 0;
        const pipe = { postulado: 0, enRevision: 0, entrevista: 0, seleccionado: 0 };

        postulaciones.forEach(post => {
          const estadoStr = post.estado?.toLowerCase() || 'nuevo';
          
          if (estadoStr !== 'rechazado') activas++;
          
          if (estadoStr.includes('revis') || estadoStr === 'entrevista' || estadoStr === 'seleccionado') {
            interesadas++;
          }

          if (estadoStr === 'nuevo' || estadoStr === 'postulado') pipe.postulado++;
          else if (estadoStr.includes('revis')) pipe.enRevision++;
          else if (estadoStr === 'entrevista') pipe.entrevista++;
          else if (estadoStr === 'seleccionado') {
            pipe.seleccionado++;
            exitosas++;
          }
        });

        // Procesar Calificaciones
        let sumaPuntajes = 0;
        calificaciones.forEach(cal => {
          sumaPuntajes += Number(cal.puntaje) || 0;
        });
        const prom = calificaciones.length > 0 ? (sumaPuntajes / calificaciones.length).toFixed(1) : '0.0';

        setPipeline(pipe);
        setMetricas({
          postulacionesActivas: activas,
          empresasInteresadas: interesadas,
          tasaRespuesta: tasa,
          postulacionesExitosas: exitosas,
          totalPostulaciones: postulaciones.length,
          calificacionPromedio: Number(prom),
          totalOpiniones: calificaciones.length,
          vistasPerfil: userData?.vistasPerfil?.length || 0
        });

      } catch (error) {
        console.error("Error al cargar el dashboard:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatosDashboard();
  }, [currentUser, userData]);

  // Función auxiliar para fechas
  const formatearFecha = (fechaFirebase: any) => {
    if (!fechaFirebase) return 'Reciente';
    const fecha = fechaFirebase.toDate ? fechaFirebase.toDate() : new Date(fechaFirebase);
    return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
  };

  const estadisticasSuperiores = [
    { label: 'Postulaciones Activas', valor: metricas.postulacionesActivas, icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Empresas Interesadas', valor: metricas.empresasInteresadas, icon: Building2, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Perfil Completado', valor: `${perfilCompletadoPorcentaje}%`, icon: Award, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Tasa de Respuesta', valor: `${metricas.tasaRespuesta}%`, icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  if (cargando) {
    return (
      <LayoutPostulante>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#0056B3]">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="font-medium text-lg">Cargando tu panel de control...</p>
        </div>
      </LayoutPostulante>
    );
  }

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">¡Hola, {primerNombre}!</h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-1">Aquí están tus oportunidades laborales para hoy</p>
            </div>
            {perfilCompletadoPorcentaje < 100 && (
              <button
                onClick={() => navigate('/postulante/perfil')}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF8C00] hover:bg-[#ea580c] text-white rounded-xl font-medium transition-colors"
              >
                Completar Perfil
              </button>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {estadisticasSuperiores.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.valor}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Grid Principal */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* Main Content (Columna Izquierda 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Empleos Recomendados */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Empleos recomendados</h2>
                  <p className="text-sm text-muted-foreground mt-1">Basados en las publicaciones más recientes</p>
                </div>
                <button
                  onClick={() => navigate('/postulante/busqueda')}
                  className="text-[#0056B3] hover:text-blue-800 font-medium hidden sm:block"
                >
                  Ver todos →
                </button>
              </div>

              <div className="space-y-4">
                {empleosRecomendados.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">No hay vacantes nuevas por el momento.</p>
                ) : (
                  empleosRecomendados.map((empleo) => (
                    <div
                      key={empleo.id}
                      className="border border-border rounded-xl p-4 sm:p-5 hover:border-[#0056B3] hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigate(`/postulante/vacante/${empleo.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-3xl font-bold text-[#0056B3] flex-shrink-0">
                          {empleo.nombreEmpresa?.charAt(0).toUpperCase() || 'E'}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{empleo.cargo}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{empleo.nombreEmpresa}</p>
                            </div>
                            <div className="sm:text-right">
                              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
                                <span className="text-xs sm:text-sm font-bold">¡Nueva vacante!</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600 mb-4 mt-3">
                            <span className="flex items-center gap-1.5 font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                              💰 S/. {empleo.sueldoMin} - {empleo.sueldoMax}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-gray-400" />
                              {empleo.ubicacion}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Briefcase size={14} className="text-gray-400" />
                              {empleo.modalidad}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-50">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} />
                              Publicado el {formatearFecha(empleo.fechaCreacion)}
                            </span>
                            <button
                              className="w-full sm:w-auto px-5 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setVacanteSeleccionada(empleo);
                                setMostrarModal(true);
                              }}
                            >
                              Postular ahora
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Estado de Postulaciones (Pipeline) */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tus postulaciones</h2>
                <button
                  onClick={() => navigate('/postulante/postulaciones')}
                  className="text-[#0056B3] hover:text-blue-800 font-medium"
                >
                  Ver todas →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { estado: 'Postulado', cantidad: pipeline.postulado, color: 'bg-blue-500' },
                  { estado: 'En Revisión', cantidad: pipeline.enRevision, color: 'bg-yellow-500' },
                  { estado: 'Entrevista', cantidad: pipeline.entrevista, color: 'bg-purple-500' },
                  { estado: 'Seleccionado', cantidad: pipeline.seleccionado, color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.estado} className="border border-border rounded-xl p-3 sm:p-4 hover:border-gray-300 transition-colors">
                    <div className={`w-3 h-3 ${item.color} rounded-full mb-3 shadow-sm`}></div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{item.cantidad}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.estado}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Columna Derecha 1/3) */}
          <div className="space-y-6">
            
            {/* Compatibilidad Técnica Dinámica */}
            <div className="bg-gradient-to-br from-[#0056B3] to-blue-800 rounded-xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-5">Tu Perfil Técnico</h3>
              <div className="space-y-4">
                {topHabilidades.length === 0 ? (
                  <p className="text-white/80 text-sm">Aún no has agregado habilidades a tu perfil.</p>
                ) : (
                  topHabilidades.map((skill: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-white/90">{skill.nombre}</span>
                        <span className="font-bold">{skill.porcentaje}%</span>
                      </div>
                      <div className="w-full bg-black/20 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${skill.porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => navigate('/postulante/perfil')}
                className="w-full mt-6 bg-white text-[#0056B3] px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Actualizar habilidades
              </button>
            </div>

            {/* Empresas Destacadas */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Empresas Destacadas</h3>
              <div className="space-y-3">
                {empresasDestacadas.length === 0 ? (
                  <p className="text-sm text-gray-500">No hay empresas destacadas aún.</p>
                ) : (
                  empresasDestacadas.map((empresa, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-xl hover:border-[#FF8C00] transition-colors cursor-pointer group">
                      <div className="w-10 h-10 bg-orange-50 text-[#FF8C00] font-bold rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                        {empresa.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{empresa.nombre}</p>
                        <p className="text-xs text-muted-foreground">{empresa.sector}</p>
                      </div>
                      <span className="text-xs font-bold text-[#FF8C00] bg-orange-50 px-2 py-1 rounded-md whitespace-nowrap">
                        {empresa.vacantes} ofertas
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Estadísticas Personales */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tus Estadísticas</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Vistas de perfil</span>
                    <span className="font-bold text-gray-900">{metricas.vistasPerfil}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Postulaciones exitosas</span>
                    <span className="font-bold text-gray-900">{metricas.postulacionesExitosas}/{metricas.totalPostulaciones}</span>
                  </div>
                  {metricas.totalPostulaciones > 0 && (
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-md mt-1">
                      ✓ {Math.round((metricas.postulacionesExitosas / metricas.totalPostulaciones) * 100)}% de éxito
                    </div>
                  )}
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Calificación promedio</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      ⭐ {metricas.calificacionPromedio}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">De {metricas.totalOpiniones} opiniones</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal de Postulación */}
      {vacanteSeleccionada && (
        <ModalPostulacion 
          isOpen={mostrarModal} 
          onClose={() => {
            setMostrarModal(false);
            setVacanteSeleccionada(null);
          }}
          cargo={vacanteSeleccionada.cargo}
          empresa={vacanteSeleccionada.nombreEmpresa || 'Empresa Confidencial'}
        />
      )}
      
    </LayoutPostulante>
  );
}