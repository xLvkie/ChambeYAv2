import { useNavigate } from 'react-router-dom';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { ArrowLeft, Star, Briefcase, Award, FileText, 
         MessageSquare, Download, Calendar, MapPin } from 'lucide-react';

export default function PerfilCandidatoMobile() {
  const navigate = useNavigate();

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate('/empleador/candidatos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium -ml-2 p-2"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-4xl text-white mb-3">
              CM
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Carlos Martínez Rojas</h1>
            <p className="text-sm text-muted-foreground mb-3">Electricista Industrial Certificado</p>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1 font-bold text-sm">4.8</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center justify-center gap-2">
              <Briefcase size={14} />
              <span>5 años de experiencia</span>
            </div>
            <div className="flex items-center justify-center gap-2">
            <MapPin size={14} />
            <span>San Juan de Lurigancho</span>
          </div>
          </div>

          <div className="bg-green-50 text-green-700 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            95% Compatible con tu vacante
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button className="px-3 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium flex flex-col items-center justify-center gap-1 text-xs">
            <MessageSquare size={18} />
            Contactar
          </button>
          <button className="px-3 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium flex flex-col items-center justify-center gap-1 text-xs">
            <Download size={18} />
            CV
          </button>
          <button className="px-3 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium flex flex-col items-center justify-center gap-1 text-xs">
            <Calendar size={18} />
            Entrevista
          </button>
        </div>

        {/* Calificación General */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Calificación General</h3>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">4.8</div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">De 15 opiniones verificadas</p>
          </div>
        </div>

        {/* Habilidades Técnicas */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Habilidades Técnicas</h2>
          <div className="space-y-4">
            {[
              { nombre: 'Electricidad Industrial', nivel: 90 },
              { nombre: 'Soldadura TIG/MIG', nivel: 75 },
              { nombre: 'Carpintería', nivel: 85 },
            ].map((skill) => (
              <div key={skill.nombre}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm">{skill.nombre}</span>
                  <span className="font-bold text-primary text-sm">{skill.nivel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: `${skill.nivel}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experiencia Laboral */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-primary" size={18} />
            <h2 className="text-lg font-bold text-gray-900">Experiencia Laboral</h2>
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
              <div key={idx} className="border-l-2 border-primary pl-3">
                <h3 className="font-bold text-gray-900 text-sm">{exp.cargo}</h3>
                <p className="text-primary text-sm">{exp.empresa}</p>
                <p className="text-xs text-muted-foreground mb-1">{exp.periodo}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{exp.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificados */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-green-600" size={18} />
            <h3 className="font-bold text-gray-900">Certificados</h3>
          </div>
          <div className="space-y-3">
            {['Electricidad Industrial - SENATI', 'Seguridad Industrial - TECSUP', 'Soldadura Básica - SENATI'].map((cert, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <FileText size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
