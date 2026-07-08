import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Edit2, Pause, XCircle, Eye, Users } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { obtenerVacantesPorEmpleador, actualizarVacante } from '../../../services/dbService';

import LayoutEmpleador from '../shared/LayoutEmpleador';

export default function GestionVacantes() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // 1. Cargar las vacantes reales desde Firebase
  useEffect(() => {
    const cargarVacantes = async () => {
      if (currentUser?.uid) {
        try {
          const data = await obtenerVacantesPorEmpleador(currentUser.uid);
          setVacantes(data);
        } catch (error) {
          console.error("Error al cargar vacantes:", error);
        } finally {
          setCargando(false);
        }
      }
    };
    cargarVacantes();
  }, [currentUser]);

  const handleCambiarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await actualizarVacante(id, { estado: nuevoEstado });
      setVacantes(vacantes.map(v => v.id === id ? { ...v, estado: nuevoEstado } : v));
      
    } catch (error) {
      alert("Hubo un error al actualizar el estado de la vacante.");
    }
  };

  // 2. Colores dinámicos según el estado
  const getEstadoColor = (estado: string = '') => {
    const est = estado.toLowerCase();
    if (est === 'activa') return 'bg-green-100 text-green-700';
    if (est === 'pausada') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700'; // para 'cerrada' u otros
  };

  // 3. Función para mostrar "Hace X días" según la fecha de Firebase
  const formatearFecha = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Recientemente';
    
    const fechaCreacion = timestamp.toDate();
    const hoy = new Date();
    const diferenciaMs = hoy.getTime() - fechaCreacion.getTime();
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    return `Hace ${dias} días`;
  };

  // 4. Calcular métricas reales para las tarjetas (Stats)
  const totalVacantes = vacantes.length;
  const activas = vacantes.filter(v => (v.estado || '').toLowerCase() === 'activa').length;
  const pausadas = vacantes.filter(v => (v.estado || '').toLowerCase() === 'pausada').length;
  const cerradas = vacantes.filter(v => (v.estado || '').toLowerCase() === 'cerrada').length;

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Gestión de Vacantes</h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">Administra todas tus ofertas laborales</p>
          </div>
          <button
            onClick={() => navigate('/empleador/crear-vacante')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-sm"
          >
            <Plus size={20} />
            Nueva Vacante
          </button>
        </div>

        {/* Stats Dinámicos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {[
            { label: 'Total Vacantes', valor: totalVacantes },
            { label: 'Activas', valor: activas },
            { label: 'Pausadas', valor: pausadas },
            { label: 'Cerradas', valor: cerradas },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {cargando ? '-' : stat.valor}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Lista de Vacantes */}
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700 whitespace-nowrap">Cargo</th>
                  <th className="text-left p-4 font-medium text-gray-700">Estado</th>
                  <th className="text-center p-4 font-medium text-gray-700">Postulantes</th>
                  <th className="text-center p-4 font-medium text-gray-700">Vistas</th>
                  <th className="text-left p-4 font-medium text-gray-700">Publicado</th>
                  <th className="text-center p-4 font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cargando ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Cargando vacantes...
                    </td>
                  </tr>
                ) : vacantes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No has publicado ninguna vacante todavía.
                    </td>
                  </tr>
                ) : (
                  vacantes.map((vacante) => (
                    <tr key={vacante.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{vacante.cargo}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${getEstadoColor(vacante.estado)}`}>
                          {vacante.estado || 'Activa'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                          <Users size={16} className="text-gray-500" />
                          <span className="font-bold text-gray-900">{vacante.postulantesUnicos?.length || 0}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-1.5 text-gray-500">
                          <Eye size={16} />
                          <span className="font-medium text-gray-700">{vacante.vistasUnicas?.length || 0}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                          {formatearFecha(vacante.fechaCreacion)}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* Botón Editar */}
                          <button
                            onClick={() => navigate(`/empleador/editar-vacante/${vacante.id}`)}  
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Editar">
                            <Edit2 size={18} className="text-gray-700" />
                          </button>
                          {/* Botón Pausar/Activar */}
                          {(vacante.estado || 'activa').toLowerCase() === 'activa' ? (
                            <button 
                              onClick={() => handleCambiarEstado(vacante.id, 'pausada')}
                              className="p-2 hover:bg-yellow-100 rounded-lg transition-colors" title="Pausar">
                              <Pause size={18} className="text-yellow-600" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleCambiarEstado(vacante.id, 'activa')}
                              disabled={(vacante.estado || '').toLowerCase() === 'cerrada'}
                              className="p-2 hover:bg-green-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors" title="Reactivar">
                              <Play size={18} className="text-green-600" />
                            </button>
                          )}
                          {/* Botón Cerrar */}
                          <button 
                            onClick={() => handleCambiarEstado(vacante.id, 'cerrada')}
                            disabled={(vacante.estado || '').toLowerCase() === 'cerrada'}
                            className="p-2 hover:bg-red-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-lg transition-colors" title="Cerrar Vacante">
                            <XCircle size={18} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}