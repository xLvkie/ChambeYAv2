import { useParams, useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import { MapPin, Briefcase, Clock, DollarSign, CheckCircle2, ArrowLeft, Star, Bookmark } from 'lucide-react';

export default function DetalleVacantePostulante() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        {/* Botón Volver */}
        <button
          onClick={() => navigate('/postulante/busqueda')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0056B3] mb-6 font-semibold transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-fit"
        >
          <ArrowLeft size={20} />
          Volver a búsqueda
        </button>

        {/* Layout Principal: 1 columna en móvil, 3 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* ==========================================
              MAIN CONTENT (Columna Izquierda 2/3)
              ========================================== */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* Cabecera Principal */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-6">
                
                {/* Logo Empresa */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-sm">
                  🏗️
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">Técnico Electricista</h1>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="text-base sm:text-lg font-medium text-gray-700">Construcciones Pérez SAC</p>
                        <span className="flex items-center gap-1 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-semibold shrink-0">
                          <CheckCircle2 size={14} /> Empresa Verificada
                        </span>
                      </div>
                    </div>
                    
                    {/* Badge Compatibilidad */}
                    <div className="bg-green-50 border border-green-100 text-green-700 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shrink-0 w-fit">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">Compatibilidad</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black">95%</p>
                    </div>
                  </div>

                  {/* Detalles (Sueldo, Ubicación, etc.) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base font-medium">
                      <DollarSign size={18} className="text-[#0056B3] shrink-0" />
                      <span>S/. 1,800 - 2,200</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <MapPin size={18} className="text-gray-400 shrink-0" />
                      <span>San Juan de Lurigancho</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <Briefcase size={18} className="text-gray-400 shrink-0" />
                      <span>Presencial • Tiempo completo</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <Clock size={18} className="text-gray-400 shrink-0" />
                      <span>Publicado hace 2 horas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción (Apilados en móvil, en línea en PC) */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-gray-100">
                <button className="w-full sm:flex-1 bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Postular a esta vacante
                </button>
                <button className="w-full sm:w-auto px-6 py-3.5 sm:py-4 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Bookmark size={20} />
                  Guardar
                </button>
              </div>
            </div>

            {/* Descripción del Puesto */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Descripción del puesto</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
                Buscamos un Técnico Electricista con experiencia en instalaciones eléctricas industriales
                para unirse a nuestro equipo de proyectos de construcción. El candidato ideal tendrá
                conocimientos sólidos en sistemas eléctricos de media y baja tensión, será responsable
                y cumplirá con las normas de seguridad establecidas.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Responsabilidades</h3>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <li>Instalación y mantenimiento de sistemas eléctricos industriales</li>
                <li>Lectura e interpretación de planos eléctricos</li>
                <li>Diagnóstico y reparación de fallas eléctricas</li>
                <li>Cumplimiento de normas de seguridad y protocolos establecidos</li>
                <li>Coordinación con equipo de obra y supervisores</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Requisitos</h3>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <li>Experiencia mínima de 2 años en electricidad industrial</li>
                <li>Conocimientos en instalaciones de media y baja tensión</li>
                <li>Capacidad para leer planos eléctricos</li>
                <li>Certificación de electricista (deseable)</li>
                <li>Disponibilidad inmediata</li>
              </ul>
            </div>

            {/* Habilidades Requeridas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Habilidades requeridas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { nombre: 'Electricidad Industrial', match: true, nivel: 'Avanzado' },
                  { nombre: 'Lectura de Planos', match: true, nivel: 'Intermedio' },
                  { nombre: 'Instalaciones Eléctricas', match: true, nivel: 'Avanzado' },
                  { nombre: 'Seguridad Industrial', match: false, nivel: 'Básico' },
                ].map((skill) => (
                  <div key={skill.nombre} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-xl gap-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                        skill.match ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        {skill.match ? (
                          <CheckCircle2 className="text-green-600" size={20} />
                        ) : (
                          <span className="text-gray-400 font-bold">?</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{skill.nombre}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Nivel: {skill.nivel}</p>
                      </div>
                    </div>
                    {skill.match && (
                      <span className="self-start lg:self-auto text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md shrink-0">
                        ✓ Cumples
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Beneficios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '💰', titulo: 'Sueldo Competitivo', desc: 'Según experiencia' },
                  { icon: '🏥', titulo: 'Seguro de Salud', desc: 'EsSalud incluido' },
                  { icon: '📅', titulo: 'Vacaciones', desc: '30 días al año' },
                  { icon: '🎓', titulo: 'Capacitaciones', desc: 'Cursos gratuitos' },
                ].map((benefit) => (
                  <div key={benefit.titulo} className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-[#0056B3] transition-colors">
                    <div className="text-2xl sm:text-3xl shrink-0">{benefit.icon}</div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{benefit.titulo}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ==========================================
              SIDEBAR (Columna Derecha 1/3)
              ========================================== */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Información de Empresa */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sobre la empresa</h3>
              <div className="mb-5 pb-5 border-b border-gray-100">
                <p className="font-bold text-gray-900 text-lg mb-1 leading-tight">Construcciones Pérez SAC</p>
                <p className="text-sm text-[#0056B3] font-medium mb-3">Construcción e Infraestructura</p>
                <div className="flex items-center gap-1.5 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">4.8</span>
                  <span className="text-xs text-muted-foreground">(45 op.)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">Tamaño</p>
                  <p className="text-sm font-bold text-gray-900">50-200 empleados</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">RUC</p>
                  <p className="text-sm font-bold text-gray-900">20123456789</p>
                  <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 mt-1.5 w-fit">
                    <CheckCircle2 size={12} /> Verificado por SUNAT
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">Ubicación principal</p>
                  <p className="text-sm font-bold text-gray-900">Lima, Perú</p>
                </div>
              </div>

              <button className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 hover:text-[#0056B3] hover:border-gray-300 rounded-xl text-sm font-bold transition-colors">
                Ver perfil completo
              </button>
            </div>

            {/* Reseñas de Empleador */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Opiniones de trabajadores</h3>
              <div className="space-y-4">
                {[
                  { nombre: 'Juan P.', calificacion: 5, texto: 'Excelente empresa, puntual con los pagos y buen ambiente.' },
                  { nombre: 'María G.', calificacion: 5, texto: 'Muy profesionales, cumplen lo que prometen.' },
                ].map((review, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.calificacion ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-1.5 italic">"{review.texto}"</p>
                    <p className="text-xs font-bold text-gray-500 bg-gray-50 w-fit px-2 py-0.5 rounded">- {review.nombre}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas de la vacante */}
            <div className="bg-gradient-to-br from-[#0056B3] to-blue-800 rounded-xl p-5 sm:p-6 text-white shadow-sm">
              <h3 className="font-bold mb-5 text-lg">Estadísticas de la vacante</h3>
              <div className="space-y-3.5">
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Postulantes</span>
                  <span className="font-bold text-xl">23</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Vistas</span>
                  <span className="font-bold text-xl">127</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">En proceso</span>
                  <span className="font-bold text-xl text-[#FF8C00]">8</span>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-bold text-green-900 mb-2 text-lg flex items-center gap-2">
                💡 ¡Postula ahora!
              </h3>
              <p className="text-sm text-green-800 mb-5 leading-relaxed font-medium">
                Tienes <span className="font-bold">95% de compatibilidad</span> con esta vacante. No dejes pasar esta oportunidad.
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Postular a la vacante
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </LayoutPostulante>
  );
}
