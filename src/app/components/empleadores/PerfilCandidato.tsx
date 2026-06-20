import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { ArrowLeft, Star, Briefcase, Award, FileText, MessageSquare } from 'lucide-react';

export default function PerfilCandidato() {
  const navigate = useNavigate();

  return (
    <LayoutEmpleador>
      <div className="p-8">
        <button
          onClick={() => navigate('/empleador/candidatos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Volver a candidatos
        </button>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-5xl text-white">
                  CM
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Carlos Martínez Rojas</h1>
                  <p className="text-lg text-muted-foreground mb-4">Electricista Industrial Certificado</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 font-bold">4.8</span>
                    </div>
                    <span className="text-gray-600">• 5 años de experiencia</span>
                    <span className="text-gray-600">• San Juan de Lurigancho</span>
                  </div>
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl inline-flex items-center gap-2 font-bold">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    95% Compatible con tu vacante
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Habilidades Técnicas</h2>
              <div className="space-y-4">
                {[
                  { nombre: 'Electricidad Industrial', nivel: 90 },
                  { nombre: 'Soldadura TIG/MIG', nivel: 75 },
                  { nombre: 'Carpintería', nivel: 85 },
                ].map((skill) => (
                  <div key={skill.nombre}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.nombre}</span>
                      <span className="font-bold text-primary">{skill.nivel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary rounded-full h-3" style={{ width: `${skill.nivel}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiencia */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Experiencia Laboral</h2>
              </div>
              <div className="space-y-4">
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
                  <div key={idx} className="border-l-2 border-primary pl-4">
                    <h3 className="font-bold text-gray-900">{exp.cargo}</h3>
                    <p className="text-primary">{exp.empresa}</p>
                    <p className="text-sm text-muted-foreground">{exp.periodo}</p>
                    <p className="text-sm text-gray-700 mt-2">{exp.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Acciones */}
            <div className="bg-white rounded-xl p-6 border border-border space-y-3">
              <button className="w-full px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Contactar
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium">
                Descargar CV
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium">
                Agendar Entrevista
              </button>
            </div>

            {/* Calificación */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Calificación General</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold mb-2">4.8</div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-2">De 15 opiniones</p>
              </div>
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-green-600" />
                <h3 className="font-bold text-gray-900">Certificados</h3>
              </div>
              <div className="space-y-3">
                {['Electricidad Industrial - SENATI', 'Seguridad Industrial - TECSUP', 'Soldadura Básica - SENATI'].map((cert, idx) => (
                  <div key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <FileText size={16} className="text-muted-foreground mt-0.5" />
                    <span>{cert}</span>
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
