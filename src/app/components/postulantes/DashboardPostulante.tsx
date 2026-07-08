import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Briefcase, MapPin, Clock, TrendingUp, Award, Building2, CheckCircle2 } from 'lucide-react';

import LayoutPostulante from '../shared/LayoutPostulante';
import ModalPostulacion from '../shared/modals/ModalPostulacion';

export default function DashboardPostulante() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);

  // Firebase Auth Context
  const { userData } = useAuth();
  const primerNombre = userData?.nombre ? userData.nombre.split(' ')[0] : 'Postulante';
  
  const recomendados = [
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
    },
  ];

  const estadisticas = [
    { label: 'Postulaciones Activas', valor: '12', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Empresas Interesadas', valor: '5', icon: Building2, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Perfil Completado', valor: '85%', icon: Award, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Tasa de Respuesta', valor: '42%', icon: TrendingUp, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  const empresasDestacadas = [
    { nombre: 'Construcciones Andinas', sector: 'Construcción', vacantes: 8, logo: '🏗️' },
    { nombre: 'Talleres Unidos SAC', sector: 'Manufactura', vacantes: 5, logo: '⚙️' },
    { nombre: 'Servicios Técnicos Lima', sector: 'Servicios', vacantes: 12, logo: '🔧' },
  ];

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Responsivo */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">¡Hola, {primerNombre}!</h1>
              <p className="text-base sm:text-lg text-muted-foreground mt-1">Aquí están tus oportunidades laborales para hoy</p>
            </div>
            <button
              onClick={() => navigate('/postulante/perfil')}
              className="w-full sm:w-auto px-6 py-3 bg-[#FF8C00] hover:bg-[#ea580c] text-white rounded-xl font-medium transition-colors"
            >
              Completar Perfil
            </button>
          </div>
        </div>

        {/* Estadísticas (1 col en móvil, 2 en tablet, 4 en PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {estadisticas.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.valor}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Grid Principal (Apilado en móvil, dividido en PC) */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* Main Content (Columna Izquierda 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Empleos Recomendados */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Empleos recomendados</h2>
                  <p className="text-sm text-muted-foreground mt-1">Basados en tus habilidades y experiencia</p>
                </div>
                <button
                  onClick={() => navigate('/postulante/busqueda')}
                  className="text-[#0056B3] hover:text-blue-800 font-medium hidden sm:block"
                >
                  Ver todos →
                </button>
              </div>

              <div className="space-y-4">
                {recomendados.map((empleo) => (
                  <div
                    key={empleo.id}
                    className="border border-border rounded-xl p-4 sm:p-5 hover:border-[#0056B3] hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/postulante/vacante/${empleo.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Logo */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {empleo.logo}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{empleo.cargo}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <p className="text-sm text-muted-foreground">{empleo.empresa}</p>
                              {empleo.verificada && (
                                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 size={12} />
                                  Verificada
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="sm:text-right">
                            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs sm:text-sm font-bold">{empleo.compatibilidad}% compatible</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600 mb-4 mt-3">
                          <span className="flex items-center gap-1.5 font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                            💰 {empleo.sueldo}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-gray-400" />
                            {empleo.ubicacion}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-gray-400" />
                            {empleo.modalidad}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-50">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            {empleo.tiempo}
                          </span>
                          <button
                            className="w-full sm:w-auto px-5 py-2.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMostrarModal(true);
                            }}
                          >
                            Postular ahora
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Botón Ver todos para móvil */}
              <button
                onClick={() => navigate('/postulante/busqueda')}
                className="w-full mt-4 py-3 text-[#0056B3] bg-blue-50 hover:bg-blue-100 rounded-xl font-medium sm:hidden transition-colors"
              >
                Ver todos los empleos
              </button>
            </div>

            {/* Estado de Postulaciones */}
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tus postulaciones</h2>
                <button
                  onClick={() => navigate('/postulante/postulaciones')}
                  className="text-[#0056B3] hover:text-blue-800 font-medium"
                >
                  Ver todas →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { estado: 'Postulado', cantidad: 8, color: 'bg-blue-500' },
                  { estado: 'En Revisión', cantidad: 3, color: 'bg-yellow-500' },
                  { estado: 'Entrevista', cantidad: 1, color: 'bg-purple-500' },
                  { estado: 'Seleccionado', cantidad: 0, color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.estado} className="border border-border rounded-xl p-3 sm:p-4 hover:border-gray-300 transition-colors">
                    <div className={`w-3 h-3 ${item.color} rounded-full mb-3 shadow-sm`}></div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{item.cantidad}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.estado}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Columna Derecha 1/3) */}
          <div className="space-y-6">
            
            {/* Compatibilidad Técnica */}
            <div className="bg-gradient-to-br from-[#0056B3] to-blue-800 rounded-xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-5">Tu Compatibilidad Técnica</h3>
              <div className="space-y-4">
                {[
                  { habilidad: 'Electricidad', nivel: 90 },
                  { habilidad: 'Soldadura', nivel: 75 },
                  { habilidad: 'Carpintería', nivel: 85 },
                ].map((skill) => (
                  <div key={skill.habilidad}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-white/90">{skill.habilidad}</span>
                      <span className="font-bold">{skill.nivel}%</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-500"
                        style={{ width: `${skill.nivel}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/postulante/habilidades')}
                className="w-full mt-6 bg-white text-[#0056B3] px-4 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Agregar habilidades
              </button>
            </div>

            {/* Empresas Destacadas */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Empresas Destacadas</h3>
              <div className="space-y-3">
                {empresasDestacadas.map((empresa) => (
                  <div key={empresa.nombre} className="flex items-center gap-3 p-3 border border-border rounded-xl hover:border-[#FF8C00] transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      {empresa.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{empresa.nombre}</p>
                      <p className="text-xs text-muted-foreground">{empresa.sector}</p>
                    </div>
                    <span className="text-xs font-bold text-[#FF8C00] bg-orange-50 px-2 py-1 rounded-md whitespace-nowrap">
                      {empresa.vacantes} vacantes
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas Personales */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tus Estadísticas</h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Vistas de perfil</span>
                    <span className="font-bold text-gray-900">127</span>
                  </div>
                  <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-md">
                    ↑ 23% esta semana
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Postulaciones exitosas</span>
                    <span className="font-bold text-gray-900">8/12</span>
                  </div>
                  <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-md">
                    ✓ 67% de éxito
                  </div>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground font-medium">Calificación promedio</span>
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      ⭐ 4.8
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">De 15 opiniones</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal de Postulación */}
      <ModalPostulacion 
        isOpen={mostrarModal} 
        onClose={() => setMostrarModal(false)}
        cargo="Técnico Electricista"
        empresa="Construcciones Pérez SAC"
      />
      
    </LayoutPostulante>
  );
}