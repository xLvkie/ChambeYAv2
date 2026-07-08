import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Briefcase, Users, Clock, TrendingUp, Eye, Plus, Star } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { obtenerVacantesPorEmpleador } from '../../../services/dbService';

export default function DashboardEmpleador() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [vacantes, setVacantes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (currentUser?.uid) {
        try {
          const data = await obtenerVacantesPorEmpleador(currentUser.uid);
          setVacantes(data);
        } catch (error) {
          console.error("Error al cargar vacantes para el dashboard:", error);
        } finally {
          setCargando(false);
        }
      }
    };
    cargarDatos();
  }, [currentUser]);

  // Función para formato "Hace X días"
  const formatearFecha = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Recientemente';
    const dias = Math.floor((new Date().getTime() - timestamp.toDate().getTime()) / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    return `Hace ${dias} días`;
  };

  // Cálculos dinámicos
  const activasCount = vacantes.filter(v => (v.estado || '').toLowerCase() === 'activa').length;
  const topVacantes = vacantes.slice(0, 3); // Tomamos solo las 3 más recientes

  const metricas = [
    { label: 'Vacantes Activas', valor: activasCount.toString(), icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100', cambio: 'Datos en tiempo real' },
    { label: 'Nuevas Postulaciones', valor: '0', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100', cambio: 'Esperando candidatos' },
    { label: 'En Proceso', valor: '0', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', cambio: '0 entrevistas pendientes' },
    { label: 'Tasa de Respuesta', valor: '100%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100', cambio: '¡Excelente inicio!' },
  ];

  const candidatosDestacados = [
    { nombre: 'Carlos Martínez', puesto: 'Electricista', compatibilidad: 95, calificacion: 4.8, experiencia: '5 años' },
    { nombre: 'Luis Torres', puesto: 'Carpintero', compatibilidad: 88, calificacion: 4.6, experiencia: '3 años' },
    { nombre: 'Roberto Silva', puesto: 'Soldador', compatibilidad: 92, calificacion: 4.9, experiencia: '7 años' },
  ];

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

        {/* Métricas */}
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
                {cargando ? (
                  <p className="text-gray-500 text-center py-6">Cargando tus vacantes...</p>
                ) : topVacantes.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">Aún no tienes vacantes activas.</p>
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

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-700">{vacante.postulantesUnicos?.length || 0}</p>
                          <p className="text-xs text-blue-600">Total Postulantes</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-purple-700">{vacante.nuevosPostulantes || 0}</p>
                          <p className="text-xs text-purple-600">Nuevos Hoy</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-green-700">{vacante.compatibles || 0}</p>
                          <p className="text-xs text-green-600">Alta Compatibilidad</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="w-full sm:flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors">
                          Ver postulantes
                        </button>
                        <button className="w-full sm:flex-1 px-4 py-2 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                          Gestionar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Pipeline Resumido */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pipeline de Candidatos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { estado: 'Nuevos', cantidad: 0, color: 'bg-blue-500' },
                  { estado: 'En Revisión', cantidad: 0, color: 'bg-yellow-500' },
                  { estado: 'Entrevista', cantidad: 0, color: 'bg-purple-500' },
                  { estado: 'Seleccionados', cantidad: 0, color: 'bg-green-500' },
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
              <h3 className="text-lg font-bold mb-4">Matching Rápido</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Encontramos candidatos altamente compatibles con tus vacantes activas.
              </p>
              <button
                onClick={() => navigate('/empleador/candidatos')}
                className="w-full bg-[#FF8C00] text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
              >
                Ver candidatos
              </button>
            </div>
            
            {/* Candidatos Destacados */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Candidatos Destacados</h3>
              <div className="space-y-3">
                {candidatosDestacados.map((candidato, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-border rounded-xl hover:border-[#FF8C00] transition-colors cursor-pointer"
                    onClick={() => navigate('/empleador/candidato/1')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{candidato.nombre}</p>
                        <p className="text-sm text-muted-foreground">{candidato.puesto}</p>
                      </div>
                      <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        {candidato.compatibilidad}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        {candidato.calificacion}
                      </span>
                      <span className="text-gray-600">{candidato.experiencia}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estadísticas del Mes</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Vacantes publicadas</span>
                    <span className="font-bold text-gray-900">{vacantes.length}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Total postulaciones</span>
                    <span className="font-bold text-gray-900">0</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Contrataciones</span>
                    <span className="font-bold text-gray-900">0</span>
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