import LayoutPostulante from '../shared/LayoutPostulante';
import { Briefcase, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export default function MisPostulaciones() {
  const postulaciones = [
    {
      id: 1,
      cargo: 'Técnico Electricista',
      empresa: 'Construcciones Pérez SAC',
      logo: '🏗️',
      ubicacion: 'San Juan de Lurigancho',
      fecha: 'Hace 3 días',
      estado: 'Entrevista',
      estadoColor: 'purple',
      progreso: 75,
      proximoPaso: 'Entrevista programada para mañana 10:00 AM',
    },
    {
      id: 2,
      cargo: 'Carpintero',
      empresa: 'Muebles del Norte',
      logo: '🪑',
      ubicacion: 'Los Olivos',
      fecha: 'Hace 5 días',
      estado: 'En revisión',
      estadoColor: 'yellow',
      progreso: 50,
      proximoPaso: 'Esperando respuesta del empleador',
    },
    {
      id: 3,
      cargo: 'Soldador TIG/MIG',
      empresa: 'Metales Industriales',
      logo: '⚙️',
      ubicacion: 'Villa El Salvador',
      fecha: 'Hace 2 días',
      estado: 'Postulado',
      estadoColor: 'blue',
      progreso: 25,
      proximoPaso: 'Tu postulación está en cola de revisión',
    },
    {
      id: 4,
      cargo: 'Técnico en Refrigeración',
      empresa: 'FrioTec Servicios',
      logo: '❄️',
      ubicacion: 'Ate',
      fecha: 'Hace 1 semana',
      estado: 'Rechazado',
      estadoColor: 'red',
      progreso: 100,
      proximoPaso: 'El empleador seleccionó otro candidato',
    },
  ];

  const estados = [
    { nombre: 'Todos', cantidad: 12, color: 'gray' },
    { nombre: 'Postulado', cantidad: 5, color: 'blue' },
    { nombre: 'En revisión', cantidad: 3, color: 'yellow' },
    { nombre: 'Entrevista', cantidad: 2, color: 'purple' },
    { nombre: 'Seleccionado', cantidad: 1, color: 'green' },
    { nombre: 'Rechazado', cantidad: 1, color: 'red' },
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
          
          {/* Grid adaptable: 2 cols móvil, 3 tablet, 6 PC */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {estados.map((estado) => (
              <div
                key={estado.nombre}
                className="border border-gray-100 rounded-xl p-4 hover:border-[#0056B3] hover:shadow-sm transition-all cursor-pointer bg-gray-50/50 hover:bg-white"
              >
                <div className={`w-3 h-3 rounded-full mb-3 shadow-sm ${
                  estado.color === 'blue' ? 'bg-blue-500' :
                  estado.color === 'yellow' ? 'bg-yellow-500' :
                  estado.color === 'purple' ? 'bg-purple-500' :
                  estado.color === 'green' ? 'bg-green-500' :
                  estado.color === 'red' ? 'bg-red-500' :
                  'bg-gray-400'
                }`}></div>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">{estado.cantidad}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{estado.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Postulaciones */}
        <div className="space-y-4 sm:space-y-6">
          {postulaciones.map((post) => (
            <div key={post.id} className="bg-white rounded-xl p-4 sm:p-6 border border-border hover:border-[#0056B3] hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                
                {/* Logo */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                  {post.logo}
                </div>

                {/* Content Principal */}
                <div className="flex-1 min-w-0">
                  
                  {/* Título y Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight truncate">{post.cargo}</h3>
                      <p className="text-sm sm:text-base text-gray-600 font-medium truncate">{post.empresa}</p>
                    </div>
                    <span className={`self-start px-3 py-1.5 rounded-full text-xs font-bold border ${getEstadoStyles(post.estadoColor)} whitespace-nowrap shadow-sm`}>
                      {post.estado}
                    </span>
                  </div>

                  {/* Info extra (Ubicación y Fecha) */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-5">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="truncate">{post.ubicacion}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <Clock size={16} className="text-gray-400" />
                      {post.fecha}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5 bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 font-semibold">Progreso de selección</span>
                      <span className="text-gray-900 font-bold">{post.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          post.estadoColor === 'blue' ? 'bg-blue-500' :
                          post.estadoColor === 'yellow' ? 'bg-yellow-400' :
                          post.estadoColor === 'purple' ? 'bg-purple-500' :
                          post.estadoColor === 'green' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${post.progreso}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer de la tarjeta (Próximo paso y botones) */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed bg-blue-50/50 p-2 sm:p-0 sm:bg-transparent rounded-lg">
                      <span className="font-bold text-gray-900 block sm:inline mb-1 sm:mb-0">Próximo paso: </span>
                      {post.proximoPaso}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                      <button className="w-full sm:w-auto px-5 py-2.5 border border-gray-200 hover:bg-gray-50 hover:text-[#0056B3] rounded-xl text-sm font-semibold transition-colors">
                        Ver detalles
                      </button>
                      <button className="w-full sm:w-auto px-5 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                        Mensajes
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (comentado pero adaptado) */}
        {/*
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-border text-center shadow-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <Briefcase className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Aún no tienes postulaciones</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base">Explora vacantes y comienza a postular a empleos que se ajusten a tus habilidades</p>
          <button className="w-full sm:w-auto px-6 py-3 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold transition-colors shadow-sm">
            Buscar empleos
          </button>
        </div>
        */}
      </div>
    </LayoutPostulante>
  );
}