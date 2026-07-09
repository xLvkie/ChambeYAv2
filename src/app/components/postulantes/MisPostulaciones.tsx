import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import ModalDetallePostulacion from '../shared/modals/ModalDetallePostulacion';
import { MapPin, Clock, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { obtenerPostulacionesPorPostulante } from '../../../services/dbService';

export default function MisPostulaciones() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [postulaciones, setPostulaciones] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [postulacionActiva, setPostulacionActiva] = useState<any>(null);

  const [stats, setStats] = useState({
    Todos: 0, Postulado: 0, 'En revisión': 0, Entrevista: 0, Seleccionado: 0, Rechazado: 0
  });

  // Función para traducir el estado de la BD a diseño visual
  const interpretarEstado = (estadoDB: string) => {
    const estadoStr = estadoDB?.toLowerCase() || 'nuevo';
    switch (estadoStr) {
      case 'nuevo':
      case 'postulado':
        return { texto: 'Postulado', color: 'blue', progreso: 25, paso: 'Tu postulación está en cola de revisión' };
      case 'en revisión':
      case 'revision':
        return { texto: 'En revisión', color: 'yellow', progreso: 50, paso: 'Esperando respuesta del empleador' };
      case 'entrevista':
        return { texto: 'Entrevista', color: 'purple', progreso: 75, paso: 'Revisa tus mensajes para coordinar' };
      case 'seleccionado':
        return { texto: 'Seleccionado', color: 'green', progreso: 100, paso: '¡Felicidades! Has sido seleccionado' };
      case 'rechazado':
        return { texto: 'Rechazado', color: 'red', progreso: 100, paso: 'El empleador seleccionó otro candidato' };
      default:
        return { texto: 'Postulado', color: 'blue', progreso: 25, paso: 'Procesando tu postulación...' };
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      if (!currentUser) return;
      
      try {
        const datosBD = await obtenerPostulacionesPorPostulante(currentUser.uid);
        setPostulaciones(datosBD);

        // Calcular estadísticas
        const conteo = { Todos: datosBD.length, Postulado: 0, 'En revisión': 0, Entrevista: 0, Seleccionado: 0, Rechazado: 0 };
        datosBD.forEach(post => {
          const infoVisual = interpretarEstado(post.estado);
          if (conteo[infoVisual.texto as keyof typeof conteo] !== undefined) {
            conteo[infoVisual.texto as keyof typeof conteo]++;
          }
        });
        setStats(conteo);
      } catch (error) {
        console.error("Error cargando postulaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [currentUser]);

  const estadosVisuales = [
    { nombre: 'Todos', cantidad: stats.Todos, color: 'gray' },
    { nombre: 'Postulado', cantidad: stats.Postulado, color: 'blue' },
    { nombre: 'En revisión', cantidad: stats['En revisión'], color: 'yellow' },
    { nombre: 'Entrevista', cantidad: stats.Entrevista, color: 'purple' },
    { nombre: 'Seleccionado', cantidad: stats.Seleccionado, color: 'green' },
    { nombre: 'Rechazado', cantidad: stats.Rechazado, color: 'red' },
  ];

  const getEstadoStyles = (color: string) => {
    const styles = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      red: 'bg-red-50 text-red-700 border-red-200',
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  // Función para formatear fechas de Firebase
  const formatearFecha = (fechaFirebase: any) => {
    if (!fechaFirebase) return 'Reciente';
    const fecha = fechaFirebase.toDate ? fechaFirebase.toDate() : new Date(fechaFirebase);
    return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Mis Postulaciones</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Haz seguimiento en tiempo real de tus aplicaciones</p>
        </div>

        {/* Pipeline Visual (Responsivo) */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-border mb-6 sm:mb-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Estado de tus postulaciones</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {estadosVisuales.map((estado) => (
              <div key={estado.nombre} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                <div className={`w-3 h-3 rounded-full mb-3 shadow-sm ${
                  estado.color === 'blue' ? 'bg-blue-500' :
                  estado.color === 'yellow' ? 'bg-yellow-500' :
                  estado.color === 'purple' ? 'bg-purple-500' :
                  estado.color === 'green' ? 'bg-green-500' :
                  estado.color === 'red' ? 'bg-red-500' : 'bg-gray-400'
                }`}></div>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">{estado.cantidad}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{estado.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Postulaciones Dinámica */}
        <div className="space-y-4 sm:space-y-6">
          {cargando ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Loader2 className="animate-spin w-8 h-8 mb-4 text-[#0056B3]" />
              <p>Cargando tus postulaciones...</p>
            </div>
          ) : postulaciones.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
              <p className="text-gray-500 mb-4">Aún no has postulado a ninguna vacante.</p>
              <button onClick={() => navigate('/postulante/vacantes')} className="text-[#0056B3] font-bold hover:underline">
                Explorar vacantes disponibles
              </button>
            </div>
          ) : (
            postulaciones.map((post) => {
              const infoVisual = interpretarEstado(post.estado);
              const nombreEmpresa = post.vacante?.nombreEmpresa || post.nombreEmpresa || 'Empresa Confidencial';
              const cargo = post.vacante?.cargo || post.cargoPostulado || 'Cargo no especificado';
              
              return (
                <div key={post.id} className="bg-white rounded-xl p-4 sm:p-6 border border-border hover:border-[#0056B3] hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    
                    {/* Logo (Extrae inicial de empresa) */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-2xl font-bold text-[#0056B3] flex-shrink-0 shadow-sm">
                      {nombreEmpresa.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight truncate">{cargo}</h3>
                          <p className="text-sm sm:text-base text-gray-600 font-medium truncate">{nombreEmpresa}</p>
                        </div>
                        <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold border ${getEstadoStyles(infoVisual.color)} whitespace-nowrap shadow-sm`}>
                          {infoVisual.texto}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-5">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="truncate">{post.vacante?.ubicacion || 'Remoto'}</span>
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <Clock size={16} className="text-gray-400" />
                          {formatearFecha(post.fecha)}
                        </span>
                      </div>

                      <div className="mb-5 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 font-semibold">Progreso de selección</span>
                          <span className="text-gray-900 font-bold">{infoVisual.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${
                              infoVisual.color === 'blue' ? 'bg-blue-500' :
                              infoVisual.color === 'yellow' ? 'bg-yellow-400' :
                              infoVisual.color === 'purple' ? 'bg-purple-500' :
                              infoVisual.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${infoVisual.progreso}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-2 sm:p-0 sm:bg-transparent rounded-lg">
                          <span className="font-bold text-gray-900 block sm:inline mb-1 sm:mb-0">Próximo paso: </span>
                          {infoVisual.paso}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                          <button
                            onClick={() => {
                              setPostulacionActiva({
                                cargo: cargo,
                                empresa: nombreEmpresa,
                                estadoActual: infoVisual.texto,
                                fechaPostulacion: formatearFecha(post.fecha)
                              });
                              setModalAbierto(true);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 border border-gray-200 hover:bg-gray-50 hover:text-[#0056B3] rounded-xl text-sm font-semibold transition-colors">
                            Ver detalles
                          </button>
                          <button 
                            onClick={() => navigate('/postulante/chat')}
                            className="w-full sm:w-auto px-5 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                            Mensajes
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {postulacionActiva && (
        <ModalDetallePostulacion 
          isOpen={modalAbierto} 
          onClose={() => setModalAbierto(false)}
          empresa={postulacionActiva.empresa}
          cargo={postulacionActiva.cargo}
          estadoActual={postulacionActiva.estadoActual}
          fechaPostulacion={postulacionActiva.fechaPostulacion}
        />
      )}
    </LayoutPostulante>
  );
}