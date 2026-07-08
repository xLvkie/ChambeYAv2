import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Filter, Star, MapPin } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { obtenerPostulacionesPorEmpleador } from '../../../services/dbService';

export default function GestionCandidatos() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Estados para datos reales
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  
  // Estado para el filtro visual
  const [estadoFilter, setEstadoFilter] = useState('Todos');

  // 1. Cargar postulaciones reales de Firebase
  useEffect(() => {
    const cargarDatos = async () => {
      if (currentUser?.uid) {
        try {
          const data = await obtenerPostulacionesPorEmpleador(currentUser.uid);
          setCandidatos(data);
        } catch (error) {
          console.error("Error al cargar los candidatos:", error);
        } finally {
          setCargando(false);
        }
      }
    };
    cargarDatos();
  }, [currentUser]);

  // 2. Filtrado en tiempo real
  const candidatosFiltrados = estadoFilter === 'Todos' 
    ? candidatos 
    : candidatos.filter((c) => c.estado === estadoFilter);

  const estados = ['Todos', 'Nuevo', 'En Revisión', 'Entrevista', 'Seleccionado', 'Rechazado'];

  const getEstadoColor = (estado: string) => {
    const colors: Record<string, string> = {
      'Nuevo': 'bg-blue-100 text-blue-700',
      'En Revisión': 'bg-yellow-100 text-yellow-700',
      'Entrevista': 'bg-purple-100 text-purple-700',
      'Seleccionado': 'bg-green-100 text-green-700',
      'Rechazado': 'bg-red-100 text-red-700',
    };
    return colors[estado] || 'bg-gray-100 text-gray-700';
  };

  // Helper para iniciales
  const obtenerIniciales = (nombre: string) => nombre ? nombre.substring(0, 2).toUpperCase() : 'CA';

  return (
    <LayoutEmpleador>
      <div className="p-4 lg:p-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Gestión de Candidatos</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Matching y filtrado de postulantes</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl p-4 lg:p-6 border border-border mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-2 sm:hidden text-gray-600 mb-2 sm:mb-0">
               <Filter size={18} />
               <span className="font-medium text-sm">Filtros:</span>
            </div>
            <Filter size={20} className="text-gray-600 hidden sm:block shrink-0" />
            <div className="flex gap-2 flex-wrap flex-1">
              {estados.map((estado) => (
                <button
                  key={estado}
                  onClick={() => setEstadoFilter(estado)}
                  className={`px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-medium text-xs lg:text-sm transition-colors shadow-sm ${
                    estadoFilter === estado
                      ? 'bg-[#FF8C00] text-white'
                      : 'border border-gray-200 hover:border-[#FF8C00] hover:text-[#FF8C00] text-gray-700'
                  }`}
                >
                  {estado}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Visual (Contadores Dinámicos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 mb-6">
          {['Nuevo', 'En Revisión', 'Entrevista', 'Seleccionado', 'Rechazado'].map((estado) => {
            // Calculamos cuántos candidatos hay en cada estado
            const cantidad = candidatos.filter((c) => (c.estado || 'Nuevo') === estado).length;
            
            return (
              <div key={estado} className="bg-white rounded-xl p-3 lg:p-4 border border-border text-center shadow-sm">
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {cargando ? '-' : cantidad}
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground truncate">{estado}</p>
              </div>
            );
          })}
        </div>

        {/* Lista de Candidatos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {cargando ? (
            <div className="col-span-1 lg:col-span-2 text-center py-12">
              <p className="text-gray-500 font-medium">Cargando candidatos...</p>
            </div>
          ) : candidatosFiltrados.length === 0 ? (
            <div className="col-span-1 lg:col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No hay candidatos en este estado por el momento.</p>
            </div>
          ) : (
            candidatosFiltrados.map((candidato) => (
              <div
                key={candidato.id}
                className="bg-white border border-border rounded-xl p-4 lg:p-6 hover:border-[#FF8C00] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                onClick={() => navigate(`/empleador/candidato/${candidato.id}`)}
              >
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="flex gap-3 lg:gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-lg lg:text-2xl text-[#0056B3] font-bold shrink-0">
                      {obtenerIniciales(candidato.nombreCandidato)}
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-bold text-gray-900 leading-tight mb-0.5">
                        {candidato.nombreCandidato || 'Candidato Confidencial'}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground">{candidato.cargoPostulado}</p>
                      <div className="flex items-center gap-1.5 mt-1 lg:mt-1.5 text-xs lg:text-sm">
                        <Star size={14} className="fill-yellow-400 text-yellow-400 shrink-0" />
                        <span className="font-medium">{candidato.calificacion || '4.5'}</span>
                        <span className="text-muted-foreground">• {candidato.experiencia || '3 años'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-xs lg:text-sm font-bold shrink-0 border border-green-100">
                    {candidato.compatibilidad || '85'}%
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-border mt-auto">
                  <div className="flex items-center gap-1.5 text-xs lg:text-sm text-gray-600">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{candidato.ubicacion || 'Lima'}</span>
                  </div>
                  <span className={`px-2 py-1 lg:px-3 lg:py-1 rounded-full text-[10px] lg:text-xs font-bold shrink-0 ${getEstadoColor(candidato.estado || 'Nuevo')}`}>
                    {candidato.estado || 'Nuevo'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutEmpleador>
  );
}