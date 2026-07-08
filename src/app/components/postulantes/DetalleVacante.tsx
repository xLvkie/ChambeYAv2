import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, Clock, DollarSign, CheckCircle2, ArrowLeft, Star, Bookmark } from 'lucide-react';
import { obtenerVacantePorId, registrarVistaVacante, registrarPostulacion, obtenerPerfilUsuario, registrarPostulacionReal } from '../../../services/dbService';

import LayoutPostulante from '../shared/LayoutPostulante';
import ModalPostulacion from '../shared/modals/ModalPostulacion';

export default function DetalleVacantePostulante() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vacante, setVacante] = useState<any>(null);
  const [empleador, setEmpleador] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  // 1. Cargar datos de la vacante y registrar la vista
  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;
      try {
        const data: any = await obtenerVacantePorId(id);
        setVacante(data);
        
        // Disparamos la vista única usando el UID del postulante actual
        if (currentUser?.uid) {
          registrarVistaVacante(id, currentUser.uid);
        }

        // Si la vacante tiene el ID del creador, traemos su RUC y tamaño
        if (data.empleadorId) {
          const empData = await obtenerPerfilUsuario(data.empleadorId);
          setEmpleador(empData);
        }

      } catch (error) {
        console.error("Error al cargar la vacante:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  // 2. Función para procesar la postulación
  const handlePostular = async () => {
    if (yaPostulo || estaCerrada) return;
    if (id && currentUser?.uid) {
      const datosPostulacion = {
        vacanteId: id,
        postulanteId: currentUser.uid,
        empleadorId: vacante.empleadorId, // Traído desde los datos de la vacante
        nombreCandidato: userData?.nombre || 'Postulante', // Nombre de tu contexto Auth
        cargoPostulado: vacante.cargo,
        ubicacion: vacante.ubicacion,
        compatibilidad: 95, // Aquí podrías poner tu lógica de cálculo
        estado: 'Nuevo'
      };

      await registrarPostulacionReal(datosPostulacion);
      setVacante((prev: any) => ({
        ...prev,
        postulantesUnicos: [...(prev.postulantesUnicos || []), currentUser.uid]
      }));
      setMostrarModal(true);
    }
  };

  const obtenerIniciales = (nombre: string) => nombre ? nombre.substring(0, 2).toUpperCase() : 'EM';
  
  const formatearFecha = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Recientemente';
    const dias = Math.floor((new Date().getTime() - timestamp.toDate().getTime()) / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Hace 1 día';
    return `Hace ${dias} días`;
  };

  if (cargando) {
    return (
      <LayoutPostulante>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <svg className="animate-spin h-10 w-10 text-[#0056B3] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <p className="text-gray-500 font-medium">Cargando detalles de la vacante...</p>
        </div>
      </LayoutPostulante>
    );
  }

  if (!vacante) return null;

  // Lógica de botones
  const yaPostulo = vacante.postulantesUnicos?.includes(currentUser?.uid);
  const estaCerrada = (vacante.estado || '').toLowerCase() === 'cerrada';
  
  let textoBoton = 'Postular a la vacante';
  if (estaCerrada) textoBoton = 'Vacante Cerrada';
  else if (yaPostulo) textoBoton = 'Ya postulaste a esta vacante';

  // Contadores calculados a partir de los arrays únicos
  const totalPostulantes = vacante.postulantesUnicos?.length || 0;
  // Sumamos 1 a la vista visualmente para contar la sesión actual del usuario si no estaba antes
  const totalVistas = vacante.vistasUnicas?.includes(currentUser?.uid) 
    ? vacante.vistasUnicas.length 
    : (vacante.vistasUnicas?.length || 0) + 1;

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        
        <button
          onClick={() => navigate('/postulante/busqueda')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0056B3] mb-6 font-semibold transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm w-fit"
        >
          <ArrowLeft size={20} />
          Volver a búsqueda
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            
            {/* Cabecera Principal */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-6">
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 border border-blue-100 text-[#0056B3] rounded-2xl flex items-center justify-center text-4xl font-bold shrink-0 shadow-sm">
                  {obtenerIniciales(vacante.nombreEmpresa)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                    <div className="min-w-0">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">{vacante.cargo}</h1>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="text-base sm:text-lg font-medium text-gray-700">{vacante.nombreEmpresa}</p>
                        <span className="flex items-center gap-1 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-semibold shrink-0">
                          <CheckCircle2 size={14} /> Empresa Verificada
                        </span>
                      </div>
                    </div>
                    
                    {/* Badge Compatibilidad (Estático por ahora) */}
                    <div className="bg-green-50 border border-green-100 text-green-700 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shrink-0 w-fit">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wide">Compatibilidad</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black">95%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base font-medium">
                      <DollarSign size={18} className="text-[#0056B3] shrink-0" />
                      <span>S/. {vacante.sueldoMin} - {vacante.sueldoMax}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <MapPin size={18} className="text-gray-400 shrink-0" />
                      <span className="truncate">{vacante.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <Briefcase size={18} className="text-gray-400 shrink-0" />
                      <span className="truncate">{vacante.modalidad} • {vacante.contrato}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700 text-sm sm:text-base">
                      <Clock size={18} className="text-gray-400 shrink-0" />
                      <span>Publicado {formatearFecha(vacante.fechaCreacion)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-gray-100">
                <button 
                  onClick={handlePostular}
                  disabled={estaCerrada || yaPostulo}
                  className={`w-full sm:flex-1 py-3.5 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-sm flex justify-center items-center ${
                    estaCerrada || yaPostulo 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200' 
                    : 'bg-[#0056B3] hover:bg-blue-800 text-white hover:shadow-md hover:-translate-y-0.5'
                  }`}>
                  {textoBoton}
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
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {vacante.descripcion}
              </p>
            </div>

            {/* Habilidades Requeridas */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Habilidades requeridas</h2>
              <div className="flex flex-wrap gap-3">
                {vacante.habilidades && vacante.habilidades.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50">
                    <CheckCircle2 className="text-[#0056B3]" size={18} />
                    <span className="font-bold text-gray-900 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beneficios (Estático) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Beneficios</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {vacante.beneficios || 'Beneficios de ley aplicables a la posición.'}
              </p>
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

          <div className="space-y-6 lg:space-y-8">
            
            {/* Información de Empresa (Datos Estáticos) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sobre la empresa</h3>
              <div className="mb-5 pb-5 border-b border-gray-100">
                <p className="font-bold text-gray-900 text-lg mb-1 leading-tight">{vacante.nombreEmpresa}</p>
                <div className="flex items-center gap-1.5 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-200 mt-2">
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
                  <p className="text-sm font-bold text-gray-900">{empleador?.cantidadEmpleados || 'No especificado'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">RUC</p>
                  <p className="text-sm font-bold text-gray-900">{empleador?.ruc || 'No registrado'}</p>
                  {empleador?.ruc && (
                    <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 mt-1.5 w-fit">
                      <CheckCircle2 size={12} /> Verificado por SUNAT
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5 font-medium uppercase tracking-wider">Ubicación principal</p>
                  <p className="text-sm font-bold text-gray-900">{vacante.ubicacion || 'Perú'}</p>
                </div>
              </div>
                   
              <button
                onClick={() => navigate('/postulante/perfil-empresa')} 
                className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 hover:text-[#0056B3] hover:border-gray-300 rounded-xl text-sm font-bold transition-colors">
                Ver perfil completo
              </button>
            </div>

            {/* Reseñas de Empleador (Estático) */}
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
                        <Star key={star} size={12} className={star <= review.calificacion ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'} />
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
                  <span className="font-bold text-xl">{totalPostulantes}</span>
                </div>
                <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                  <span className="text-white/90 font-medium text-sm">Vistas</span>
                  <span className="font-bold text-xl">{totalVistas}</span>
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
              <button
                onClick={handlePostular} 
                disabled={(vacante.estado || '').toLowerCase() === 'cerrada'}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                {(vacante.estado || '').toLowerCase() === 'cerrada' ? 'Vacante Cerrada' : 'Postular a la vacante'}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <ModalPostulacion 
        isOpen={mostrarModal} 
        onClose={() => setMostrarModal(false)}
        cargo={vacante.cargo}
        empresa={vacante.nombreEmpresa}
      />
      
    </LayoutPostulante>
  );
}
