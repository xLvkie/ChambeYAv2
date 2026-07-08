import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Plus, Edit2, Pause, XCircle, Eye, Users } from 'lucide-react';

export default function GestionVacantes() {
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
    <LayoutEmpleador>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Gestión de Vacantes</h1>
            <p className="text-lg text-muted-foreground mt-1">Administra todas tus ofertas laborales</p>
          </div>
          <button
            onClick={() => navigate('/empleador/crear-vacante')}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
          >
            <Plus size={20} />
            Nueva Vacante
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Vacantes', valor: '5' },
            { label: 'Activas', valor: '3' },
            { label: 'Pausadas', valor: '1' },
            { label: 'Cerradas', valor: '1' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-border">
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.valor}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Lista de Vacantes */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">Cargo</th>
                  <th className="text-left p-4 font-medium text-gray-700">Estado</th>
                  <th className="text-center p-4 font-medium text-gray-700">Postulantes</th>
                  <th className="text-center p-4 font-medium text-gray-700">Vistas</th>
                  <th className="text-left p-4 font-medium text-gray-700">Publicado</th>
                  <th className="text-center p-4 font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vacantes.map((vacante) => (
                  <tr key={vacante.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{vacante.cargo}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(vacante.estado)}`}>
                        {vacante.estado}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <Users size={16} className="text-muted-foreground" />
                        <span className="font-bold text-gray-900">{vacante.postulantes}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1">
                        <Eye size={16} className="text-muted-foreground" />
                        <span className="text-gray-700">{vacante.vistas}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">Hace {vacante.publicado}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/empleador/editar-vacante/${vacante.id}`)}  
                          className="p-2 hover:bg-gray-100 rounded-lg" title="Editar">
                          <Edit2 size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-yellow-100 rounded-lg" title="Pausar">
                          <Pause size={18} className="text-yellow-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg" title="Cerrar">
                          <XCircle size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}
