import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import ModalPostulacion from '../shared/modals/ModalPostulacion';
import { Search, MapPin, Briefcase, Clock, Filter, CheckCircle2, DollarSign } from 'lucide-react';
import { obtenerTodasLasVacantesActivas } from '../../../services/dbService';

export default function BusquedaEmpleo() {
  const navigate = useNavigate();
  
  // Estados para la base de datos
  const [vacantes, setVacantes] = useState<any[]>([]);
  const [vacantesFiltradas, setVacantesFiltradas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Estados de la UI
  const [busqueda, setBusqueda] = useState('');
  const [distrito, setDistrito] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState<any>(null); // Para pasar datos al Modal

  const categorias = ['Electricidad', 'Carpintería', 'Soldadura', 'Plomería', 'Mecánica', 'Construcción'];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // 1. Cargar las vacantes al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerTodasLasVacantesActivas();
        setVacantes(data);
        setVacantesFiltradas(data); // Inicialmente mostramos todas
      } catch (error) {
        console.error("Error al cargar vacantes:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // 2. Función para procesar el buscador de texto y ubicación
  const handleBuscar = () => {
    const terminoBusqueda = busqueda.toLowerCase().trim();
    const terminoUbicacion = distrito.toLowerCase().trim();

    const filtrado = vacantes.filter((v) => {
      const matchTexto = (v.cargo || '').toLowerCase().includes(terminoBusqueda) || 
                         (v.nombreEmpresa || '').toLowerCase().includes(terminoBusqueda);
      const matchUbicacion = (v.ubicacion || '').toLowerCase().includes(terminoUbicacion);
      
      return matchTexto && matchUbicacion;
    });

    setVacantesFiltradas(filtrado);
  };

  // 3. Helpers visuales
  const obtenerIniciales = (nombre: string) => {
    return nombre ? nombre.substring(0, 2).toUpperCase() : 'EM';
  };

  const formatearFecha = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Recientemente';
    const fecha = timestamp.toDate();
    const hoy = new Date();
    const diffMs = hoy.getTime() - fecha.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Hace un momento';
    if (diffHrs < 24) return `Hace ${diffHrs} ${diffHrs === 1 ? 'hora' : 'horas'}`;
    if (diffDias === 1) return 'Hace 1 día';
    return `Hace ${diffDias} días`;
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Búsqueda de Empleo</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Encuentra la oportunidad laboral perfecta para ti</p>
        </div>

        {/* Panel del Buscador */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-border mb-6 shadow-sm">
          
          <div className="flex flex-col lg:flex-row gap-4">
            
            <div className="w-full lg:w-5/12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
                  placeholder="Cargo o nombre de empresa"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-all"
                />
              </div>
            </div>

            <div className="w-full lg:w-4/12">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
                  placeholder="Distrito o Ciudad"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-all"
                />
              </div>
            </div>

            <div className="w-full lg:w-3/12 flex gap-3">
              <button 
                onClick={handleBuscar}
                className="flex-1 bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-sm">
                Buscar
              </button>
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`px-4 sm:px-5 border border-gray-200 rounded-xl transition-colors flex items-center justify-center ${mostrarFiltros ? 'bg-blue-50 text-[#0056B3] border-blue-200' : 'bg-white hover:bg-gray-50 text-gray-600'}`}
              >
                <Filter size={20} />
              </button>
            </div>
          </div>

          {mostrarFiltros && (
            <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Modalidad</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]">
                  <option>Todas</option>
                  <option>Presencial</option>
                  <option>Remoto</option>
                  <option>Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tipo de Contrato</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]">
                  <option>Todos</option>
                  <option>Tiempo completo</option>
                  <option>Part-time</option>
                  <option>Por proyecto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Rango Salarial</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]">
                  <option>Todos</option>
                  <option>S/. 1,000 - 1,500</option>
                  <option>S/. 1,500 - 2,000</option>
                  <option>S/. 2,000 - 2,500</option>
                  <option>S/. 2,500+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Categorías */}
        <div className="mb-6 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1 -mx-1">
            <button
              onClick={() => setCategoriaSeleccionada('Todas')}
              className={`px-5 py-2.5 rounded-full font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm ${
                categoriaSeleccionada === 'Todas'
                  ? 'bg-[#0056B3] text-white border-transparent'
                  : 'bg-white border border-gray-200 hover:border-[#0056B3] text-gray-700'
              }`}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-colors whitespace-nowrap shrink-0 shadow-sm ${
                  categoriaSeleccionada === cat
                    ? 'bg-[#0056B3] text-white border-transparent'
                    : 'bg-white border border-gray-200 hover:border-[#0056B3] text-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Encabezado de Resultados */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-bold text-gray-900">{vacantesFiltradas.length}</span> oportunidades encontradas
          </p>
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-medium text-gray-700">
            <option>Más recientes</option>
            <option>Más relevantes</option>
            <option>Mejor salario</option>
          </select>
        </div>

        {/* Lista de Vacantes (Grid responsivo) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {cargando ? (
            <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-[#0056B3] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <p className="text-gray-500 font-medium">Buscando oportunidades...</p>
            </div>
          ) : vacantesFiltradas.length === 0 ? (
            <div className="col-span-1 lg:col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-medium">No se encontraron vacantes con esos criterios.</p>
              <button 
                onClick={() => { setBusqueda(''); setDistrito(''); setVacantesFiltradas(vacantes); }}
                className="mt-4 text-[#0056B3] font-bold hover:underline"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            vacantesFiltradas.map((empleo) => (
              <div
                key={empleo.id}
                className="bg-white border border-border rounded-xl p-5 sm:p-6 hover:border-[#0056B3] hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/postulante/vacante/${empleo.id}`)}
              >
                {/* Cabecera de la Tarjeta */}
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-xl text-[#0056B3] font-bold flex-shrink-0">
                    {obtenerIniciales(empleo.nombreEmpresa)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{empleo.cargo}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <p className="text-sm text-muted-foreground truncate">{empleo.nombreEmpresa}</p>
                      <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                    </div>
                  </div>
                  {/* Etiqueta de compatibilidad visual */}
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full h-fit border border-green-100 shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-bold">85%</span>
                  </div>
                </div>

                {/* Detalles */}
                <div className="space-y-2 mb-6 flex-1">
                  <div className="flex items-center gap-2.5 text-sm">
                    <DollarSign size={16} className="text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-900">
                      S/. {empleo.sueldoMin} - {empleo.sueldoMax}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400 shrink-0" />
                    <span className="truncate">{empleo.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Briefcase size={16} className="text-gray-400 shrink-0" />
                    <span className="truncate">{empleo.modalidad} • {empleo.contrato}</span>
                  </div>
                </div>

                {/* Pie de la Tarjeta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Clock size={14} />
                    {formatearFecha(empleo.fechaCreacion)}
                  </span>
                  <button
                    className="px-5 py-2 bg-[#0056B3] hover:bg-blue-800 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVacanteSeleccionada(empleo);
                      setMostrarModal(true);
                    }}
                  >
                    Postular
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
      </div>

      {/* Modal de Postulación Dinámico */}
      <ModalPostulacion 
        isOpen={mostrarModal} 
        onClose={() => {
          setMostrarModal(false);
          setVacanteSeleccionada(null);
        }}
        cargo={vacanteSeleccionada?.cargo || ''}
        empresa={vacanteSeleccionada?.nombreEmpresa || ''}
      />

    </LayoutPostulante>
  );
}