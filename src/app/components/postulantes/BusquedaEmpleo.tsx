import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import { Search, MapPin, Briefcase, Clock, Filter, CheckCircle2, DollarSign } from 'lucide-react';

export default function BusquedaEmpleo() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [distrito, setDistrito] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const categorias = ['Electricidad', 'Carpintería', 'Soldadura', 'Plomería', 'Mecánica', 'Construcción'];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const vacantes = [
    {
      id: 1,
      cargo: 'Técnico Electricista',
      empresa: 'Construcciones Pérez SAC',
      logo: '🏗️',
      compatibilidad: 95,
      sueldo: 'S/. 1,800 - 2,200',
      ubicacion: 'San Juan de Lurigancho',
      modalidad: 'Presencial',
      tiempo: 'Hace 2 horas',
      verificada: true,
      tipo: 'Tiempo completo',
    },
    {
      id: 2,
      cargo: 'Carpintero con Experiencia',
      empresa: 'Muebles del Norte EIRL',
      logo: '🪑',
      compatibilidad: 88,
      sueldo: 'S/. 1,500 - 2,000',
      ubicacion: 'Los Olivos',
      modalidad: 'Presencial',
      tiempo: 'Hace 5 horas',
      verificada: true,
      tipo: 'Tiempo completo',
    },
    {
      id: 3,
      cargo: 'Técnico en Refrigeración',
      empresa: 'FrioTec Servicios',
      logo: '❄️',
      compatibilidad: 82,
      sueldo: 'S/. 2,000 - 2,500',
      ubicacion: 'Ate',
      modalidad: 'Presencial',
      tiempo: 'Hace 1 día',
      verificada: false,
      tipo: 'Tiempo completo',
    },
    {
      id: 4,
      cargo: 'Soldador TIG/MIG',
      empresa: 'Metales Industriales SA',
      logo: '⚙️',
      compatibilidad: 90,
      sueldo: 'S/. 2,200 - 2,800',
      ubicacion: 'Villa El Salvador',
      modalidad: 'Presencial',
      tiempo: 'Hace 3 horas',
      verificada: true,
      tipo: 'Tiempo completo',
    },
    {
      id: 5,
      cargo: 'Gasfitero Profesional',
      empresa: 'Servicios del Hogar',
      logo: '🔧',
      compatibilidad: 75,
      sueldo: 'S/. 1,600 - 1,900',
      ubicacion: 'Surco',
      modalidad: 'Presencial',
      tiempo: 'Hace 2 días',
      verificada: true,
      tipo: 'Part-time',
    },
    {
      id: 6,
      cargo: 'Técnico Mecánico Automotriz',
      empresa: 'Talleres Rápidos SAC',
      logo: '🚗',
      compatibilidad: 80,
      sueldo: 'S/. 1,900 - 2,300',
      ubicacion: 'San Martín de Porres',
      modalidad: 'Presencial',
      tiempo: 'Hace 4 horas',
      verificada: false,
      tipo: 'Tiempo completo',
    },
  ];

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
          
          {/* Controles de Búsqueda (Apilados en Móvil, en línea en PC) */}
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Campo Búsqueda */}
            <div className="w-full lg:w-5/12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Cargo o palabra clave"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Campo Distrito */}
            <div className="w-full lg:w-4/12">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  placeholder="Distrito"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="w-full lg:w-3/12 flex gap-3">
              <button className="flex-1 bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-sm">
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

          {/* Filtros Avanzados (Expandible) */}
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

        {/* Categorías (Con scroll horizontal en móviles) */}
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
            <span className="font-bold text-gray-900">{vacantes.length}</span> oportunidades encontradas
          </p>
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] font-medium text-gray-700">
            <option>Más relevantes</option>
            <option>Más recientes</option>
            <option>Mejor salario</option>
            <option>Mayor compatibilidad</option>
          </select>
        </div>

        {/* Lista de Vacantes (Grid responsivo) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {vacantes.map((empleo) => (
            <div
              key={empleo.id}
              className="bg-white border border-border rounded-xl p-5 sm:p-6 hover:border-[#0056B3] hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
              onClick={() => navigate(`/postulante/vacante/${empleo.id}`)}
            >
              {/* Cabecera de la Tarjeta */}
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {empleo.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{empleo.cargo}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-sm text-muted-foreground truncate">{empleo.empresa}</p>
                    {empleo.verificada && (
                      <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                    )}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full h-fit border border-green-100 shrink-0">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-bold">{empleo.compatibilidad}%</span>
                </div>
              </div>

              {/* Detalles (Sueldo, Ubicación, Modalidad) */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center gap-2.5 text-sm">
                  <DollarSign size={16} className="text-gray-400 shrink-0" />
                  <span className="font-semibold text-gray-900">{empleo.sueldo}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{empleo.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Briefcase size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{empleo.modalidad} • {empleo.tipo}</span>
                </div>
              </div>

              {/* Pie de la Tarjeta */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Clock size={14} />
                  {empleo.tiempo}
                </span>
                <button
                  className="px-5 py-2 bg-[#0056B3] hover:bg-blue-800 text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se dispare el click de la tarjeta entera
                  }}
                >
                  Postular
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </LayoutPostulante>
  );
}