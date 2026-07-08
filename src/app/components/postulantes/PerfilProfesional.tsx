import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Camera, Mail, Phone, MapPin, Calendar, Award, Briefcase, 
        FileText, Star, Edit2 } from 'lucide-react';

import LayoutPostulante from '../shared/LayoutPostulante';

export default function PerfilProfesional() {
  const navigate = useNavigate();

  // 1. Extraemos tu usuario y los datos reales de Firebase
  const { currentUser, userData } = useAuth();

  // 2. Preparamos las listas (Si no hay nada, usamos un arreglo vacío [])
  const habilidades = userData?.habilidades || [];
  const experiencias = userData?.experiencias || [];
  const certificados = userData?.certificados || [];

  // 3. Calculamos las iniciales para la foto de perfil (Ej. Sebastián -> SE)
  const iniciales = userData?.nombre ? userData.nombre.substring(0, 2).toUpperCase() : 'US';

  // Nota: Las opiniones las dejamos visuales por ahora hasta tener la app de empleadores
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
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Mi Perfil Profesional</h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">Así te ven las empresas en la plataforma</p>
          </div>
          <button 
            onClick={() => navigate('/postulante/editar-perfil')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-medium transition-colors shadow-sm">
            <Edit2 size={20} />
            Editar perfil
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* Main Content (Columna Izquierda) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Información Personal */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-[#0056B3] to-blue-700 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl text-white font-bold shadow-md">
                    {iniciales}
                  </div>
                  <button className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 w-10 h-10 bg-[#FF8C00] hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 border-2 border-white">
                    <Camera size={18} />
                  </button>
                </div>

                <div className="flex-1 w-full">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{userData?.nombre || 'Cargando nombre...'}</h2>
                  <p className="text-base sm:text-lg text-[#0056B3] font-bold mb-4">
                    {userData?.tituloProfesional || 'Añade tu título profesional en "Editar Perfil"'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Mail size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{currentUser?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Phone size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm">{userData?.telefono || 'Sin teléfono'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <MapPin size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{userData?.ubicacion || 'Sin ubicación'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                      <Calendar size={18} className="text-muted-foreground shrink-0" />
                      <span className="text-sm">Miembro activo</span>
                    </div>
                  </div>
                </div>
              </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center border border-red-100 shrink-0">
                          <FileText className="text-red-600" size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            CV_{userData?.nombre ? userData.nombre.replace(/\s+/g, '') : 'Usuario'}_2026.pdf
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">Actualizado recientemente</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate('/postulante/editar-perfil')}
                        className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 hover:bg-gray-50 hover:text-[#0056B3] rounded-xl text-sm font-semibold transition-colors"
                      >
                        Actualizar CV
                      </button>
                    </div>
                  </div>
            </div>

            {/* 2. Habilidades Técnicas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-[#0056B3]" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Habilidades Técnicas</h3>
                </div>
                <button
                  onClick={() => navigate('/postulante/editar-perfil')} 
                  className="text-[#0056B3] hover:text-blue-800 font-medium text-sm transition-colors">
                  + Gestionar habilidades
                </button>
              </div>

              <div className="space-y-5">
                {habilidades.length === 0 ? (
                  <p className="text-gray-500 italic text-sm">No has registrado habilidades. Ve a Editar Perfil para añadirlas.</p>
                ) : (
                  habilidades.map((skill: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between items-end mb-2">
                        <p className="font-bold text-gray-900">{skill.nombre}</p>
                        <span className="text-sm font-bold text-[#0056B3] bg-blue-50 px-2 py-0.5 rounded-md">{skill.porcentaje}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-[#0056B3] to-blue-400 rounded-full h-2.5 transition-all duration-500"
                          style={{ width: `${skill.porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. Experiencia Laboral */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Experiencia Laboral</h3>
                </div>
                <button 
                  onClick={() => navigate('/postulante/editar-perfil')}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors">
                  + Gestionar experiencia
                </button>
              </div>

              <div className="space-y-6 pt-2">
                {experiencias.length === 0 ? (
                  <p className="text-gray-500 italic text-sm">No has registrado experiencia. Ve a Editar Perfil para añadirla.</p>
                ) : (
                  experiencias.map((exp: any, idx: number) => (
                    <div key={idx} className="relative pl-6 sm:pl-8 pb-6 border-l-2 border-gray-100 last:border-l-0 last:pb-0">
                      <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 bg-[#0056B3] rounded-full border-4 border-white shadow-sm"></div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 leading-tight">{exp.cargo}</h4>
                        <p className="text-[#0056B3] font-bold text-sm mt-1">{exp.empresa}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium bg-gray-50 px-2 py-1 rounded-md w-fit">
                          <Calendar size={14} />
                          {exp.periodo}
                        </p>
                        {exp.descripcion && <p className="text-sm text-gray-600 mt-3 leading-relaxed">{exp.descripcion}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 4. Certificados */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Certificados</h3>
                </div>
                <button
                  onClick={() => navigate('/postulante/editar-perfil')} 
                  className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors">
                  + Gestionar certificados
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificados.length === 0 ? (
                  <p className="text-gray-500 italic text-sm col-span-2">No has registrado certificados.</p>
                ) : (
                  certificados.map((cert: any, idx: number) => (
                    <div key={idx} className="border border-border rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                        <Award className="text-green-600" size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1.5 leading-tight">{cert.entidad}</h4>
                      <p className="text-xs font-bold text-green-600 bg-green-50 inline-block px-2 py-0.5 rounded-md mt-1">Año {cert.año}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar (Reputación - Estática por ahora) */}
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
    </LayoutPostulante>
  );
}