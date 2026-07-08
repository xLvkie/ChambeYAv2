import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import ModalCertificado from '../shared/modals/ModalCertificados';
import ModalExperiencia from '../shared/modals/ModalExperiencia';
import { Camera, Mail, Phone, MapPin, Calendar, Award, Briefcase, FileText, Star, Edit2 } from 'lucide-react';

export default function PerfilProfesional() {
  const [mostrarModalExp, setMostrarModalExp] = useState(false);
  const [mostrarModalCert, setMostrarModalCert] = useState(false);
  const navigate = useNavigate();
  const habilidades = [
    { nombre: 'Electricidad Industrial', nivel: 'Avanzado', progreso: 90 },
    { nombre: 'Soldadura TIG/MIG', nivel: 'Intermedio', progreso: 75 },
    { nombre: 'Carpintería', nivel: 'Avanzado', progreso: 85 },
    { nombre: 'Plomería', nivel: 'Básico', progreso: 50 },
  ];

  const experiencias = [
    {
      cargo: 'Electricista Senior',
      empresa: 'Construcciones del Norte SAC',
      periodo: 'Ene 2021 - Actualidad',
      descripcion: 'Instalación y mantenimiento de sistemas eléctricos industriales. Supervisión de equipo de 3 técnicos.',
    },
    {
      cargo: 'Técnico Electricista',
      empresa: 'Servicios Técnicos Lima EIRL',
      periodo: 'Mar 2018 - Dic 2020',
      descripcion: 'Instalaciones eléctricas residenciales y comerciales. Atención de emergencias 24/7.',
    },
  ];

  const certificados = [
    { nombre: 'Curso de Electricidad Industrial', institucion: 'SENATI', año: '2020' },
    { nombre: 'Seguridad en Instalaciones Eléctricas', institucion: 'TECSUP', año: '2019' },
    { nombre: 'Soldadura Básica', institucion: 'SENATI', año: '2018' },
  ];

  const opiniones = [
    {
      empresa: 'Construcciones del Norte SAC',
      calificacion: 5,
      comentario: 'Excelente profesional, muy responsable y puntual. Sus trabajos son de alta calidad.',
      fecha: 'Hace 2 meses',
    },
    {
      empresa: 'Talleres Unidos SAC',
      calificacion: 5,
      comentario: 'Gran conocimiento técnico y muy buena actitud. Lo recomiendo totalmente.',
      fecha: 'Hace 4 meses',
    },
    {
      empresa: 'Servicios Generales Lima',
      calificacion: 4,
      comentario: 'Buen trabajo, cumplió con los plazos establecidos.',
      fecha: 'Hace 6 meses',
    },
  ];

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Header Responsivo */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Mi Perfil Profesional</h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">Gestiona tu información y destaca tus habilidades</p>
          </div>
          <button 
            onClick={() => navigate('/postulante/editar-perfil')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-medium transition-colors shadow-sm">
            <Edit2 size={20} />
            Editar perfil
          </button>
        </div>

        {/* Grid Principal (Apilado en móvil, dividido en PC) */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* Main Content (Columna Izquierda 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Información Personal */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                {/* Profile Photo */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0056B3] to-blue-700 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl text-white font-bold shadow-md">
                    CM
                  </div>
                  <button className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 w-10 h-10 bg-[#FF8C00] hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 border-2 border-white">
                    <Camera size={18} />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Carlos Martínez Rojas</h2>
                  <p className="text-base sm:text-lg text-primary font-medium mb-4">Electricista Industrial Certificado</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Mail size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">carlos.martinez@email.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Phone size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm">+51 987 654 321</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <MapPin size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">San Juan de Lurigancho, Lima</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Calendar size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm">Miembro desde Enero 2023</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-100 shrink-0">
                      <FileText className="text-red-600" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">CV_CarlosMartinez_2024.pdf</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Actualizado hace 3 semanas</p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 hover:bg-gray-50 hover:text-[#0056B3] rounded-xl text-sm font-semibold transition-colors">
                    Actualizar CV
                  </button>
                </div>
              </div>
            </div>

            {/* Habilidades Técnicas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-[#0056B3]" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Habilidades Técnicas</h3>
                </div>
                <button
                  onClick={() => setMostrarModalExp(true)} 
                  className="w-full sm:w-auto text-[#0056B3] bg-blue-50 sm:bg-transparent py-2 rounded-lg sm:py-0 hover:text-blue-800 font-medium text-sm transition-colors">
                  + Agregar habilidad
                </button>
              </div>

              <div className="space-y-5">
                {habilidades.map((skill) => (
                  <div key={skill.nombre}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{skill.nombre}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Nivel: {skill.nivel}</p>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-[#0056B3] bg-blue-50 px-2 py-0.5 rounded-md">{skill.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-[#0056B3] to-blue-400 rounded-full h-2.5 transition-all duration-500"
                        style={{ width: `${skill.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiencia Laboral */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Experiencia Laboral</h3>
                </div>
                <button 
                  onClick={() => setMostrarModalExp(true)}
                  className="w-full sm:w-auto text-purple-600 bg-purple-50 sm:bg-transparent py-2 rounded-lg sm:py-0 hover:text-purple-800 font-medium text-sm transition-colors">
                  + Agregar experiencia
                </button>
              </div>

              <div className="space-y-6 pt-2">
                {experiencias.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 sm:pl-8 pb-6 border-l-2 border-gray-100 last:border-l-0 last:pb-0">
                    <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 bg-[#0056B3] rounded-full border-4 border-white shadow-sm"></div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 leading-tight">{exp.cargo}</h4>
                      <p className="text-[#0056B3] font-bold text-sm mt-1">{exp.empresa}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium bg-gray-50 px-2 py-1 rounded-md">
                        <Calendar size={14} />
                        {exp.periodo}
                      </p>
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{exp.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificados */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Certificados</h3>
                </div>
                <button
                  onClick={() => setMostrarModalCert(true)} 
                  className="w-full sm:w-auto text-green-600 bg-green-50 sm:bg-transparent py-2 rounded-lg sm:py-0 hover:text-green-800 font-medium text-sm transition-colors">
                  + Agregar certificado
                </button>
              </div>

              {/* Grid a 1 columna en móvil, 2 en PC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificados.map((cert, idx) => (
                  <div key={idx} className="border border-border rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Award className="text-green-600" size={20} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1.5 leading-tight">{cert.nombre}</h4>
                    <p className="text-sm text-muted-foreground">{cert.institucion}</p>
                    <p className="text-xs font-bold text-green-600 mt-2 bg-green-50 inline-block px-2 py-0.5 rounded-md">Año {cert.año}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Columna Derecha 1/3) */}
          <div className="space-y-6">
            
            {/* Reputación */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tu Reputación</h3>
              <div className="text-center mb-6">
                <div className="text-5xl sm:text-6xl font-black text-gray-900 mb-2">4.8</div>
                <div className="flex justify-center gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={22} className="fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm font-medium">De 15 opiniones</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { stars: 5, count: 12 },
                  { stars: 4, count: 2 },
                  { stars: 3, count: 1 },
                  { stars: 2, count: 0 },
                  { stars: 1, count: 0 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-4 font-bold text-gray-700">{rating.stars}</span>
                    <Star
                      size={14}
                      className="fill-[#FF8C00] text-[#FF8C00]"
                    />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div
                        className="rounded-full h-2.5 bg-[#FF8C00] transition-all"
                        style={{ width: `${(rating.count / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="w-6 text-right font-medium text-gray-600">{rating.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opiniones Recientes */}
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Opiniones Recientes</h3>
              <div className="space-y-5">
                {opiniones.map((opinion, idx) => (
                  <div key={idx} className="pb-5 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-1 mb-2.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= opinion.calificacion ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed mb-3">"{opinion.comentario}"</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <p className="text-xs font-bold text-[#0056B3]">{opinion.empresa}</p>
                      <p className="text-xs text-muted-foreground bg-gray-50 self-start sm:self-auto px-2 py-0.5 rounded-md">{opinion.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2.5 bg-blue-50 text-[#0056B3] hover:bg-blue-100 rounded-xl font-semibold text-sm transition-colors">
                Ver todas las opiniones
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalExperiencia isOpen={mostrarModalExp} onClose={() => setMostrarModalExp(false)} />
      <ModalCertificado isOpen={mostrarModalCert} onClose={() => setMostrarModalCert(false)} />
    </LayoutPostulante>
  );
}