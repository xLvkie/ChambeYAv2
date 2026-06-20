import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Filter, Star, MapPin } from 'lucide-react';

export default function GestionCandidatos() {
  const navigate = useNavigate();
  const [estadoFilter, setEstadoFilter] = useState('Todos');

  const candidatos = [
    { id: 1, nombre: 'Carlos Martínez', cargo: 'Electricista', compatibilidad: 95, calificacion: 4.8, experiencia: '5 años', ubicacion: 'SJL', estado: 'Nuevo' },
    { id: 2, nombre: 'Luis Torres', cargo: 'Carpintero', compatibilidad: 88, calificacion: 4.6, experiencia: '3 años', ubicacion: 'Los Olivos', estado: 'En Revisión' },
    { id: 3, nombre: 'Roberto Silva', cargo: 'Soldador', compatibilidad: 92, calificacion: 4.9, experiencia: '7 años', ubicacion: 'VES', estado: 'Entrevista' },
    { id: 4, nombre: 'Miguel Ángeles', cargo: 'Electricista', compatibilidad: 85, calificacion: 4.5, experiencia: '4 años', ubicacion: 'Ate', estado: 'Nuevo' },
    { id: 5, nombre: 'José Ramírez', cargo: 'Gasfitero', compatibilidad: 78, calificacion: 4.7, experiencia: '6 años', ubicacion: 'Surco', estado: 'Seleccionado' },
  ];

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

  return (
    <LayoutEmpleador>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestión de Candidatos</h1>
          <p className="text-lg text-muted-foreground">Matching y filtrado de postulantes</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl p-6 border border-border mb-6">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-600" />
            <div className="flex gap-2 flex-wrap flex-1">
              {estados.map((estado) => (
                <button
                  key={estado}
                  onClick={() => setEstadoFilter(estado)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    estadoFilter === estado
                      ? 'bg-accent text-white'
                      : 'border border-gray-200 hover:border-accent text-gray-700'
                  }`}
                >
                  {estado}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Visual */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {['Nuevo', 'En Revisión', 'Entrevista', 'Seleccionado', 'Rechazado'].map((estado) => (
            <div key={estado} className="bg-white rounded-xl p-4 border border-border text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {candidatos.filter((c) => c.estado === estado).length}
              </p>
              <p className="text-sm text-muted-foreground">{estado}</p>
            </div>
          ))}
        </div>

        {/* Lista de Candidatos */}
        <div className="grid grid-cols-2 gap-6">
          {candidatos.map((candidato) => (
            <div
              key={candidato.id}
              className="bg-white border border-border rounded-xl p-6 hover:border-accent hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate(`/empleador/candidato/${candidato.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center text-2xl text-white">
                    {candidato.nombre.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{candidato.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{candidato.cargo}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{candidato.calificacion}</span>
                      <span className="text-muted-foreground">• {candidato.experiencia}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold">
                  {candidato.compatibilidad}%
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{candidato.ubicacion}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(candidato.estado)}`}>
                  {candidato.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutEmpleador>
  );
}
