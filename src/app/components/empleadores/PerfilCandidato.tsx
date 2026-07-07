import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { ArrowLeft, Star, Briefcase, Award, FileText, MessageSquare } from 'lucide-react';

export default function PerfilCandidato() {
  const navigate = useNavigate();

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/empleador/candidatos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Volver a candidatos
        </button>

        {/* Layout: 1 columna en móvil, 3 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-5 sm:p-8 border border-border">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                {/* Avatar (Centrado en móvil) */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl text-white shrink-0">
                  CM
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">Carlos Martínez Rojas</h1>
                  <p className="text-base sm:text-lg text-muted-foreground mb-4">Electricista Industrial Certificado</p>
                  
                  {/* Detalles con flex-wrap para celulares */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mb-4 text-sm sm:text-base">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 sm:ml-2 font-bold">4.8</span>
                    </div>
                    <span className="text-gray-600">• 5 años de experiencia</span>
                    <span className="text-gray-600">• San Juan de Lurigancho</span>
                  </div>
                  
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl inline-flex items-center gap-2 font-bold text-sm sm:text-base mx-auto sm:mx-0 w-fit">
                    <div className="w-3 h-3 bg-green-500 rounded-full shrink-0"></div>
                    95% Compatible con tu vacante
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Habilidades Técnicas</h2>
              <div className="space-y-4">
                {[
                  { nombre: 'Electricidad Industrial', nivel: 90 },
                  { nombre: 'Soldadura TIG/MIG', nivel: 75 },
                  { nombre: 'Carpintería', nivel: 85 },
                ].map((skill) => (
                  <div key={skill.nombre}>
                    <div className="flex justify-between mb-2 text-sm sm:text-base">
                      <span className="font-medium truncate pr-2">{skill.nombre}</span>
                      <span className="font-bold text-primary shrink-0">{skill.nivel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary rounded-full h-3" style={{ width: `${skill.nivel}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiencia */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Briefcase className="text-primary shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Experiencia Laboral</h2>
              </div>
              <div className="space-y-5 sm:space-y-4">
                {[
                  {
                    cargo: 'Electricista Senior',
                    empresa: 'Construcciones del Norte SAC',
                    periodo: 'Ene 2021 - Actualidad',
                    descripcion: 'Instalación y mantenimiento de sistemas eléctricos industriales.',
                  },
                  {
                    cargo: 'Técnico Electricista',
                    empresa: 'Servicios Técnicos Lima EIRL',
                    periodo: 'Mar 2018 - Dic 2020',
                    descripcion: 'Instalaciones eléctricas residenciales y comerciales.',
                  },
                ].map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4 py-1">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">{exp.cargo}</h3>
                    <p className="text-primary font-medium text-sm sm:text-base">{exp.empresa}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{exp.periodo}</p>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{exp.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Acciones */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border space-y-3">
              <button className="w-full px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                <MessageSquare size={18} />
                Contactar
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                Descargar CV
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors">
                Agendar Entrevista
              </button>
            </div>

            {/* Calificación */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <h3 className="font-bold text-gray-900 mb-4 text-center sm:text-left">Calificación General</h3>
              <div className="text-center mb-2">
                <div className="text-5xl font-bold mb-2 text-gray-900">4.8</div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-3 font-medium">De 15 opiniones</p>
              </div>
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-green-600 shrink-0" />
                <h3 className="font-bold text-gray-900">Certificados</h3>
              </div>
              <div className="space-y-3.5">
                {['Electricidad Industrial - SENATI', 'Seguridad Industrial - TECSUP', 'Soldadura Básica - SENATI'].map((cert, idx) => (
                  <div key={idx} className="text-sm text-gray-700 flex items-start gap-2.5">
                    <FileText size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                    <span className="leading-snug">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </LayoutEmpleador>
  );
}
