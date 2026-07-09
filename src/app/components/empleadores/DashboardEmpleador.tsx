import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Briefcase, Users, Clock, TrendingUp, Eye, Plus, Star, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

import { 
  obtenerVacantesPorEmpleador,
  obtenerPostulacionesPorEmpleador,
  calcularTasaRespuestaEmpleador,
  obtenerCandidatosDestacados
} from '../../../services/dbService';

export default function DashboardEmpleador() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [cargando, setCargando] = useState(true);
  
  // Datos Dinámicos
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [candidatosDestacados, setCandidatosDestacados] = useState<any[]>([]);
  
  const [metricasPrincipales, setMetricasPrincipales] = useState({
    nuevasPostulaciones: 0,
    enProceso: 0,
    tasaRespuesta: 100
  });

  const [pipeline, setPipeline] = useState({
    nuevos: 0,
    enRevision: 0,
    entrevista: 0,
    seleccionados: 0
  });

  const [estadisticasMes, setEstadisticasMes] = useState({
    vacantesPublicadas: 0,
    totalPostulaciones: 0,
    contrataciones: 0
  });

  useEffect(() => {
    const cargarTodo = async () => {
      if (!currentUser?.uid) return;
      setCargando(true);

      try {
        const [
          datosVacantes, 
          datosPostulaciones, 
          tasa, 
          topCandidatos
        ] = await Promise.all([
          obtenerVacantesPorEmpleador(currentUser.uid),
          obtenerPostulacionesPorEmpleador(currentUser.uid),
          calcularTasaRespuestaEmpleador(currentUser.uid),
          obtenerCandidatosDestacados(currentUser.uid)
        ]);

        setVacantes(datosVacantes);
        setCandidatosDestacados(topCandidatos);

        // --- Procesamiento de Datos ---

        let nuevas = 0;
        let proceso = 0;
        const pipe = { nuevos: 0, enRevision: 0, entrevista: 0, seleccionados: 0 };
        
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth();
        const añoActual = fechaActual.getFullYear();

        let postulacionesDelMes = 0;
        let contratacionesDelMes = 0;
        let vacantesDelMes = 0;

        // 1. Filtrar Postulaciones (Pipeline y Métricas)
        datosPostulaciones.forEach(post => {
          const estadoStr = post.estado?.toLowerCase() || 'nuevo';
          
          if (estadoStr === 'nuevo' || estadoStr === 'postulado') {
            nuevas++;
            pipe.nuevos++;
          } else if (estadoStr.includes('revis')) {
            proceso++;
            pipe.enRevision++;
          } else if (estadoStr === 'entrevista') {
            proceso++;
            pipe.entrevista++;
          } else if (estadoStr === 'seleccionado') {
            pipe.seleccionados++;
          }

          // Verificar si es de este mes
          const fechaPost = post.fecha?.toDate ? post.fecha.toDate() : new Date(post.fecha || 0);
          if (fechaPost.getMonth() === mesActual && fechaPost.getFullYear() === añoActual) {
            postulacionesDelMes++;
            if (estadoStr === 'seleccionado') contratacionesDelMes++;
          }
        });

        // 2. Filtrar Vacantes del mes
        datosVacantes.forEach(vac => {
          const fechaVac = vac.fechaCreacion?.toDate ? vac.fechaCreacion.toDate() : new Date(vac.fechaCreacion || 0);
          if (fechaVac.getMonth() === mesActual && fechaVac.getFullYear() === añoActual) {
            vacantesDelMes++;
          }
        });

        // --- Actualización de Estados ---
        setMetricasPrincipales({
          nuevasPostulaciones: nuevas,
          enProceso: proceso,
          tasaRespuesta: tasa
        });
        
        setPipeline(pipe);

        setEstadisticasMes({
          vacantesPublicadas: vacantesDelMes,
          totalPostulaciones: postulacionesDelMes,
          contrataciones: contratacionesDelMes
        });

      } catch (error) {
        console.error("Error al cargar dashboard del empleador:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarTodo();
  }, [currentUser]);

  // Función para formato "Hace X días"
  const formatearFecha = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Recientemente';
    const dias = Math.floor((new Date().getTime() - timestamp.toDate().getTime()) / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    return `Hace ${dias} días`;
  };

  const activasCount = vacantes.filter(v => (v.estado || '').toLowerCase() === 'activa').length;
  const topVacantes = vacantes.slice(0, 3); 

  const metricas = [
    { label: 'Vacantes Activas', valor: activasCount.toString(), icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100', cambio: 'Datos en tiempo real' },
    { label: 'Nuevas Postulaciones', valor: metricasPrincipales.nuevasPostulaciones.toString(), icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100', cambio: 'Pendientes de revisar' },
    { label: 'En Proceso', valor: metricasPrincipales.enProceso.toString(), icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', cambio: 'Entrevistas/Revisión' },
    { label: 'Tasa de Respuesta', valor: `${metricasPrincipales.tasaRespuesta}%`, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100', cambio: 'Mantén un buen índice' },
  ];

  if (cargando) {
    return (
      <LayoutEmpleador>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#FF8C00]">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="font-medium text-lg">Cargando panel de reclutamiento...</p>
        </div>
      </LayoutEmpleador>
    );
  }

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Dashboard Empresarial</h1>
            <p className="text-lg text-muted-foreground mt-1">Panel de control de reclutamiento</p>
          </div>
          <button
            onClick={() => navigate('/empleador/crear-vacante')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-sm"
          >
            <Plus size={20} />
            Publicar Vacante
          </button>
        </div>

        {/* Métricas Superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {metricas.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-xl p-6 border border-border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={metric.color} size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.valor}</p>
                <p className="text-sm text-gray-700 mb-2">{metric.label}</p>
                <p className="text-xs text-green-600">{metric.cambio}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Vacantes Activas */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tus Vacantes Recientes</h2>
                  <p className="text-sm text-muted-foreground mt-1">Gestiona y haz seguimiento de tus publicaciones</p>
                </div>
                <button
                  onClick={() => navigate('/empleador/vacantes')}
                  className="text-[#FF8C00] hover:text-orange-700 font-medium self-start sm:self-auto transition-colors"
                >
                  Ver todas →
                </button>
              </div>

              <div className="space-y-4">
                {topVacantes.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">Aún no tienes vacantes publicadas.</p>
                    <button 
                      onClick={() => navigate('/empleador/crear-vacante')}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Crear mi primera vacante
                    </button>
                  </div>
                ) : (
                  topVacantes.map((vacante) => (
                    <div
                      key={vacante.id}
                      className="border border-border rounded-xl p-5 hover:border-[#FF8C00] hover:shadow-md transition-all cursor-pointer bg-white"
                      onClick={() => navigate('/empleador/candidatos')}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{vacante.cargo}</h3>
                          <p className="text-sm text-muted-foreground">Publicado {formatearFecha(vacante.fechaCreacion)}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full w-fit">
                          <Eye size={16} />
                          <span className="text-sm font-bold capitalize">{vacante.estado || 'Activa'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-700">{vacante.postulantesUnicos?.length || 0}</p>
                          <p className="text-xs text-blue-600">Total Postulantes</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                          <p className="text-2xl font-bold text-gray-700">{vacante.vistasUnicas?.length || 0}</p>
                          <p className="text-xs text-gray-500">Vistas Únicas</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="w-full sm:flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                          Ver postulantes
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pipeline Resumido */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pipeline General de Candidatos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { estado: 'Nuevos', cantidad: pipeline.nuevos, color: 'bg-blue-500' },
                  { estado: 'En Revisión', cantidad: pipeline.enRevision, color: 'bg-yellow-500' },
                  { estado: 'Entrevista', cantidad: pipeline.entrevista, color: 'bg-purple-500' },
                  { estado: 'Seleccionados', cantidad: pipeline.seleccionados, color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.estado} className="border border-border rounded-xl p-4 bg-gray-50/50">
                    <div className={`w-3 h-3 ${item.color} rounded-full mb-3`}></div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{item.cantidad}</p>
                    <p className="text-sm text-muted-foreground">{item.estado}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Matching Rápido */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-900 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Base de Candidatos</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Revisa y gestiona a todos los postulantes que han aplicado a tus vacantes activas.
              </p>
              <button
                onClick={() => navigate('/empleador/candidatos')}
                className="w-full bg-[#FF8C00] text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
              >
                Ver todos los candidatos
              </button>
            </div>
            
            {/* Candidatos Destacados */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Mejores Perfiles</h3>
              <div className="space-y-3">
                {candidatosDestacados.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay candidatos con calificaciones altas aún.</p>
                ) : (
                  candidatosDestacados.map((candidato, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-border rounded-xl hover:border-[#FF8C00] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{candidato.nombre}</p>
                          <p className="text-sm text-[#FF8C00]">{candidato.puesto}</p>
                        </div>
                        <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          {candidato.compatibilidad}% Match
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-50 mt-2">
                        <span className="flex items-center gap-1 font-bold text-gray-700">
                          <Star size={14} className={candidato.calificacion > 0 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                          {candidato.calificacion > 0 ? candidato.calificacion : 'Nuevo'}
                        </span>
                        <span className="text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                          {candidato.experiencia}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Estadísticas del Mes */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estadísticas de {new Date().toLocaleString('es-ES', { month: 'long' })}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Vacantes publicadas</span>
                    <span className="font-bold text-gray-900">{estadisticasMes.vacantesPublicadas}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total postulaciones</span>
                    <span className="font-bold text-gray-900">{estadisticasMes.totalPostulaciones}</span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Contrataciones exitosas</span>
                    <span className="font-bold text-green-600">{estadisticasMes.contrataciones}</span>
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