import { useNavigate } from 'react-router-dom';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Briefcase, Users, Clock, TrendingUp, Eye, Plus, Star } from 'lucide-react';

export default function DashboardEmpleadorMobile() {
  const navigate = useNavigate();

  const metricas = [
    { label: 'Vacantes Activas', valor: '8', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100', cambio: '+2' },
    { label: 'Nuevas Postulaciones', valor: '23', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100', cambio: '+12' },
    { label: 'En Proceso', valor: '15', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100', cambio: '8 entrevistas' },
    { label: 'Tasa de Respuesta', valor: '87%', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100', cambio: '+5%' },
  ];

  const vacantesActivas = [
    { id: 1, cargo: 'Técnico Electricista', postulantes: 15, nuevos: 5, compatibles: 8, publicado: 'Hace 2 días' },
    { id: 2, cargo: 'Carpintero Experimentado', postulantes: 8, nuevos: 2, compatibles: 3, publicado: 'Hace 5 días' },
    { id: 3, cargo: 'Soldador TIG/MIG', postulantes: 12, nuevos: 4, compatibles: 6, publicado: 'Hace 1 semana' },
  ];

  const candidatosDestacados = [
    { nombre: 'Carlos Martínez', puesto: 'Electricista', compatibilidad: 95, calificacion: 4.8, experiencia: '5 años' },
    { nombre: 'Luis Torres', puesto: 'Carpintero', compatibilidad: 88, calificacion: 4.6, experiencia: '3 años' },
    { nombre: 'Roberto Silva', puesto: 'Soldador', compatibilidad: 92, calificacion: 4.9, experiencia: '7 años' },
  ];

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Panel de reclutamiento</p>
          </div>
          <button
            onClick={() => navigate('/empleador/crear-vacante')}
            className="flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            Vacante
          </button>
        </div>

        {/* Métricas Grid */}
        <div className="grid grid-cols-2 gap-3">
          {metricas.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="bg-white rounded-xl p-4 border border-border">
                <div className={`w-10 h-10 ${metric.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={metric.color} size={20} />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.valor}</p>
                <p className="text-xs text-gray-700 mb-1 leading-tight">{metric.label}</p>
                <p className="text-xs text-green-600">{metric.cambio}</p>
              </div>
            );
          })}
        </div>

        {/* Pipeline Resumido */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Estado de Candidatos</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { estado: 'Nuevos', cantidad: 12, color: 'bg-blue-500' },
              { estado: 'En Revisión', cantidad: 8, color: 'bg-yellow-500' },
              { estado: 'Entrevista', cantidad: 5, color: 'bg-purple-500' },
              { estado: 'Seleccionados', cantidad: 2, color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.estado} className="border border-border rounded-xl p-3">
                <div className={`w-2.5 h-2.5 ${item.color} rounded-full mb-2`}></div>
                <p className="text-xl font-bold text-gray-900 mb-0.5">{item.cantidad}</p>
                <p className="text-xs text-muted-foreground leading-tight">{item.estado}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Matching Rápido */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-gray-900 shadow-sm">
          <h3 className="font-bold mb-2">Matching Rápido</h3>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Encontramos {candidatosDestacados.length} candidatos altamente compatibles con tus vacantes activas
          </p>
          <button
            onClick={() => navigate('/empleador/candidatos')}
            className="w-full bg-[#FF8C00] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#e67e00] transition-colors"
          >
            Ver candidatos
          </button>
        </div>

        {/* Vacantes Activas */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Tus Vacantes Activas</h2>
            <button
              onClick={() => navigate('/empleador/vacantes')}
              className="text-accent text-sm font-medium"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-3">
            {vacantesActivas.map((vacante) => (
              <div
                key={vacante.id}
                className="border border-border rounded-xl p-4 hover:border-accent transition-all"
                onClick={() => navigate('/empleador/candidatos')}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-2">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{vacante.cargo}</h3>
                    <p className="text-xs text-muted-foreground">Publicado {vacante.publicado}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full flex-shrink-0">
                    <Eye size={12} />
                    <span className="text-xs font-bold">Activa</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-blue-700">{vacante.postulantes}</p>
                    <p className="text-xs text-blue-600 leading-tight">Total</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-purple-700">{vacante.nuevos}</p>
                    <p className="text-xs text-purple-600 leading-tight">Nuevos</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-green-700">{vacante.compatibles}</p>
                    <p className="text-xs text-green-600 leading-tight">Alta</p>
                  </div>
                </div>

                <button className="w-full px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm font-medium transition-colors">
                  Ver postulantes
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Candidatos Destacados */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Candidatos Destacados</h3>
          <div className="space-y-3">
            {candidatosDestacados.map((candidato, idx) => (
              <div
                key={idx}
                className="p-3 border border-border rounded-xl hover:border-accent transition-colors"
                onClick={() => navigate('/empleador/candidato/1')}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-bold text-gray-900 text-sm truncate">{candidato.nombre}</p>
                    <p className="text-xs text-muted-foreground">{candidato.puesto}</p>
                  </div>
                  <div className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    {candidato.compatibilidad}%
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {candidato.calificacion}
                  </span>
                  <span className="text-gray-600">{candidato.experiencia}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas del Mes */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Estadísticas del Mes</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vacantes publicadas</span>
              <span className="font-bold text-gray-900">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total postulaciones</span>
              <span className="font-bold text-gray-900">87</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contrataciones</span>
              <span className="font-bold text-gray-900">5</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Tiempo promedio</span>
                <span className="font-bold text-gray-900">8 días</span>
              </div>
              <div className="text-xs text-green-600">-2 días vs mes pasado</div>
            </div>
          </div>
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
