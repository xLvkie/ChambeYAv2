import { useNavigate } from 'react-router-dom';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Plus, Edit2, Pause, XCircle, Eye, Users } from 'lucide-react';

export default function GestionVacantesMobile() {
  const navigate = useNavigate();

  const vacantes = [
    { id: 1, cargo: 'Técnico Electricista', estado: 'Activa', postulantes: 15, vistas: 127, publicado: '2 días' },
    { id: 2, cargo: 'Carpintero Experimentado', estado: 'Activa', postulantes: 8, vistas: 89, publicado: '5 días' },
    { id: 3, cargo: 'Soldador TIG/MIG', estado: 'Activa', postulantes: 12, vistas: 104, publicado: '1 semana' },
    { id: 4, cargo: 'Gasfitero Profesional', estado: 'Pausada', postulantes: 5, vistas: 45, publicado: '2 semanas' },
    { id: 5, cargo: 'Técnico Mecánico', estado: 'Cerrada', postulantes: 18, vistas: 156, publicado: '1 mes' },
  ];

  const getEstadoColor = (estado: string) => {
    if (estado === 'Activa') return 'bg-green-100 text-green-700';
    if (estado === 'Pausada') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis Vacantes</h1>
            <p className="text-sm text-muted-foreground">Administra tus ofertas</p>
          </div>
          <button
            onClick={() => navigate('/empleador/crear-vacante')}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            Nueva
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total', valor: '5', color: 'blue' },
            { label: 'Activas', valor: '3', color: 'green' },
            { label: 'Pausadas', valor: '1', color: 'yellow' },
            { label: 'Cerradas', valor: '1', color: 'red' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-border rounded-xl p-4 hover:border-primary transition-colors cursor-pointer"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mb-2 ${
                  stat.color === 'blue' ? 'bg-blue-500' :
                  stat.color === 'green' ? 'bg-green-500' :
                  stat.color === 'yellow' ? 'bg-yellow-500' :
                  stat.color === 'red' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}
              ></div>
        
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.valor}
              </p>
        
              <p className="text-xs text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Lista de Vacantes */}
        <div className="space-y-3">
          {vacantes.map((vacante) => (
            <div
              key={vacante.id}
              className="bg-white rounded-xl p-4 border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-2">
                  <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{vacante.cargo}</h3>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(vacante.estado)}`}>
                    {vacante.estado}
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <Edit2 size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users size={14} className="text-muted-foreground" />
                  <span className="font-bold text-gray-900">{vacante.postulantes}</span>
                  <span className="text-xs text-muted-foreground">postulantes</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Eye size={14} className="text-muted-foreground" />
                  <span className="font-bold text-gray-900">{vacante.vistas}</span>
                  <span className="text-xs text-muted-foreground">vistas</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Publicado hace {vacante.publicado}</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-yellow-100 rounded-lg" title="Pausar">
                    <Pause size={16} className="text-yellow-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg" title="Cerrar">
                    <XCircle size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
