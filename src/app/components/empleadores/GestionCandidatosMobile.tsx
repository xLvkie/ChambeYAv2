import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Filter, Star, MapPin } from 'lucide-react';

export default function GestionCandidatosMobile() {
  const navigate = useNavigate();
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

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
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidatos</h1>
            <p className="text-sm text-muted-foreground">Matching y filtrado</p>
          </div>
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`px-3 py-2 border rounded-xl transition-colors ${
              mostrarFiltros ? 'bg-accent text-white border-accent' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Filtros */}
        {mostrarFiltros && (
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="text-sm font-medium text-gray-900 mb-2">Filtrar por estado</p>
            <div className="flex gap-2 flex-wrap">
              {estados.map((estado) => (
                <button
                  key={estado}
                  onClick={() => setEstadoFilter(estado)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
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
        )}

        {/* Pipeline Visual */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { nombre: 'Nuevo', color: 'blue' },
            { nombre: 'En Revisión', color: 'yellow' },
            { nombre: 'Entrevista', color: 'purple' },
          ].map((estado) => (
            <div
              key={estado.nombre}
              className="border border-border rounded-xl p-3 hover:border-primary transition-colors cursor-pointer text-center"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mb-2 mx-auto ${
                  estado.color === 'blue' ? 'bg-blue-500' :
                  estado.color === 'yellow' ? 'bg-yellow-500' :
                  estado.color === 'purple' ? 'bg-purple-500' :
                  estado.color === 'green' ? 'bg-green-500' :
                  estado.color === 'red' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}
              ></div>
        
              <p className="text-xl font-bold text-gray-900 mb-0.5">
                {candidatos.filter((c) => c.estado === estado.nombre).length}
              </p>
        
              <p className="text-xs text-muted-foreground leading-tight">
                {estado.nombre}
              </p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {[
            { nombre: 'Seleccionado', color: 'green' },
            { nombre: 'Rechazado', color: 'red' },
          ].map((estado) => (
            <div
              key={estado.nombre}
              className="border border-border rounded-xl p-3 hover:border-primary transition-colors cursor-pointer text-center"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mb-2 mx-auto ${
                  estado.color === 'blue' ? 'bg-blue-500' :
                  estado.color === 'yellow' ? 'bg-yellow-500' :
                  estado.color === 'purple' ? 'bg-purple-500' :
                  estado.color === 'green' ? 'bg-green-500' :
                  estado.color === 'red' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}
              ></div>
        
              <p className="text-xl font-bold text-gray-900 mb-0.5">
                {candidatos.filter((c) => c.estado === estado.nombre).length}
              </p>
        
              <p className="text-xs text-muted-foreground leading-tight">
                {estado.nombre}
              </p>
            </div>
          ))}
        </div>

        {/* Lista de Candidatos */}
        <div className="space-y-3">
          {candidatos
            .filter((c) => estadoFilter === 'Todos' || c.estado === estadoFilter)
            .map((candidato) => (
            <div
              key={candidato.id}
              className="bg-white border border-border rounded-xl p-4 hover:border-accent transition-all"
              onClick={() => navigate(`/empleador/candidato/${candidato.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center text-base text-white flex-shrink-0">
                    {candidato.nombre.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{candidato.nombre}</h3>
                    <p className="text-xs text-muted-foreground">{candidato.cargo}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{candidato.calificacion}</span>
                      <span className="text-muted-foreground">• {candidato.experiencia}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2">
                  {candidato.compatibilidad}%
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <MapPin size={12} />
                  <span>{candidato.ubicacion}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEstadoColor(candidato.estado)}`}>
                  {candidato.estado}
                </span>
              </div>
            </div>
          ))}
        </div>

        {candidatos.filter((c) => estadoFilter === 'Todos' || c.estado === estadoFilter).length === 0 && (
          <div className="bg-white rounded-xl p-8 border border-border text-center">
            <p className="text-muted-foreground">No hay candidatos en este estado</p>
          </div>
        )}
      </div>
    </LayoutEmpleadorMobile>
  );
}
