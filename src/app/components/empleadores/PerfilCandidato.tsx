import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Briefcase, Award, FileText, MessageSquare } from 'lucide-react';
import { obtenerPostulacion, actualizarEstadoPostulacion, obtenerPerfilUsuario,
        obtenerChatEspecifico, activarChatEmpleador
        } from '../../../services/dbService';

import LayoutEmpleador from '../shared/LayoutEmpleador';
import ModalEntrevista from '../shared/modals/ModalEntrevista';

export default function PerfilCandidato() {
  const { id } = useParams(); // Este ID viene de la URL, ej: /empleador/candidato/ID_POSTULACION
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [mostrarModalEntrevista, setMostrarModalEntrevista] = useState(false);
  const [postulacion, setPostulacion] = useState<any>(null);  
  // Recoge los datos del candidato desde la postulación para mostrarlos en el perfil
  const [datosCandidato, setDatosCandidato] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;
      try {
        // 1. Traemos el documento de la postulación
        const data: any = await obtenerPostulacion(id);
        setPostulacion(data);
        
        // 2. Traemos el perfil real del usuario usando el postulanteId del documento
        if (data?.postulanteId) {
          const perfil = await obtenerPerfilUsuario(data.postulanteId);
          setDatosCandidato(perfil);
        }
      } catch (error) {
        console.error("Error al cargar perfil del candidato:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  const cambiarEstado = async (nuevoEstado: string) => {
    if (id) {
      await actualizarEstadoPostulacion(id, nuevoEstado);
      setPostulacion((prev: any) => ({ ...prev, estado: nuevoEstado }));
    }
  };

  const handleContactar = async () => {
    // Validamos que tengamos todos los IDs necesarios
    if (!currentUser?.uid || !postulacion?.postulanteId || !postulacion?.vacanteId) return;

    try {
      // 1. Cambiamos el estado de la postulación visualmente y en BD
      await cambiarEstado('En revision');

      // 2. Buscamos la sala de chat que se creó automáticamente cuando el candidato postuló
      const chatExistente: any = await obtenerChatEspecifico(
        currentUser.uid,
        postulacion.postulanteId,
        postulacion.vacanteId
      );

      if (chatExistente) {
        // 3. Si el chat estaba bloqueado, lo activamos (esto envía el mensaje automático)
        if (chatExistente.estado === 'pendiente') {
          await activarChatEmpleador(chatExistente.id, currentUser.uid);
        }
        
        // 4. Redirigimos al empleador a la pantalla general de chat, abriendo esta sala
        navigate(`/empleador/chat/${chatExistente.id}`);
      } else {
        // Fallback preventivo
        console.error("No se encontró el chat previo de esta postulación.");
      }
    } catch (error) {
      console.error("Error al iniciar el contacto:", error);
    }
  };

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
            <div className="bg-white rounded-xl p-5 sm:p-8 border border-border shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left">
                {/* Avatar (Centrado en móvil) */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl text-white shrink-0 shadow-sm">
                  {postulacion?.nombreCandidato ? postulacion.nombreCandidato.substring(0, 2).toUpperCase() : '??'}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Nombre Real */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {postulacion?.nombreCandidato || 'Candidato'}
                  </h1>
                  {/* Nueva línea de Título Profesional */}
                  <p className="text-primary font-bold text-sm sm:text-base mb-1">
                    Trabajo Actual: {datosCandidato?.tituloProfesional || 'Profesional'}
                  </p>
                  {/* Cargo al que postuló (para tener contexto) */}
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Postulando a: {postulacion?.cargoPostulado || 'Vacante'}
                  </p>

                  {/* Detalles con flex-wrap (estatico) */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mb-4 text-sm sm:text-base">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-1 sm:ml-2 font-bold">4.8</span>
                    </div>
                    <span className="text-gray-600">• 5 años de experiencia</span>
                    {/* Ubicación Real */}
                    <span className="text-gray-600">• {postulacion?.ubicacion || 'Ubicación no especificada'}</span>
                  </div>
                  
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl inline-flex items-center gap-2 font-bold text-sm sm:text-base mx-auto sm:mx-0 w-fit">
                    <div className="w-3 h-3 bg-green-500 rounded-full shrink-0"></div>
                    95% Compatible con tu vacante
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Habilidades Técnicas</h2>
              <div className="space-y-4">
                {datosCandidato?.habilidades && datosCandidato.habilidades.length > 0 ? (
                  datosCandidato.habilidades.map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2 text-sm sm:text-base">
                        {/* Si tu estructura tiene nombre y nivel, úsalos */}
                        <span className="font-medium truncate pr-2">{skill.nombre || skill}</span>
                        <span className="font-bold text-primary shrink-0">{skill.porcentaje || 80}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-primary rounded-full h-3 transition-all duration-500" 
                          style={{ width: `${skill.porcentaje || 80}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">Este candidato no ha registrado habilidades técnicas.</p>
                )}
              </div>
            </div>

            {/* Experiencia */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <Briefcase className="text-primary shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Experiencia Laboral</h2>
              </div>
              <div className="space-y-5 sm:space-y-4">
                {datosCandidato?.experiencias && datosCandidato.experiencias.length > 0 ? (
                  datosCandidato.experiencias.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 border-primary pl-4 py-1">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">
                        {exp.cargo}
                      </h3>
                      <p className="text-primary font-medium text-sm sm:text-base">
                        {exp.empresa}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {exp.periodo}
                      </p>
                      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                        {exp.descripcion}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No se ha registrado experiencia laboral.</p>
                )}
              </div>
            </div>

          </div>
          {/* Sidebar */}         
          <div className="space-y-6">
            
            {/* Acciones */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border space-y-3 shadow-sm">
              <button 
                onClick={handleContactar}
                className="w-full px-4 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={18} />
                Contactar
              </button>
              
              <button 
                onClick={() => cambiarEstado('En revision')}
                className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Descargar CV
              </button>
              
              <button
                onClick={() => { 
                  setMostrarModalEntrevista(true); 
                  cambiarEstado('Entrevista'); 
                }} 
                className="w-full px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Agendar Entrevista
              </button>
            </div>

            {/* NUEVA CARD: Estado del Candidato */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-center sm:text-left">Estado del Candidato</h3>
              <div className="flex flex-col gap-2">
                {['En revision', 'Seleccionado', 'Rechazado'].map((est) => (
                  <button
                    key={est}
                    onClick={() => cambiarEstado(est)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                      postulacion?.estado === est 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Marcar como {est}
                  </button>
                ))}
              </div>
              {/* Pequeño indicador del estado actual general */}
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-500">Estado actual: </span>
                <span className="font-bold text-primary">{postulacion?.estado || 'No definido'}</span>
              </div>
            </div>

            {/* Calificación */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
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

            {/* Certificados (Corregido con cert.nombre) */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-green-600 shrink-0" />
                <h3 className="font-bold text-gray-900">Certificados</h3>
              </div>
              <div className="space-y-3.5">
                {datosCandidato?.certificados && datosCandidato.certificados.length > 0 ? (
                  datosCandidato.certificados.map((cert: any) => (
                    <div key={cert.id} className="text-sm text-gray-700 flex items-start gap-2.5">
                      <FileText size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                      <span className="leading-snug">
                        <span className="font-bold text-gray-900">{cert.nombre}</span> 
                        {" - "} 
                        <span className="text-primary font-medium">{cert.entidad}</span>
                        <span className="text-gray-400 ml-1">({cert.año})</span>
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No tiene certificados registrados.</p>
                )}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
      {/* Modal de Entrevista */}
      <ModalEntrevista
          isOpen={mostrarModalEntrevista} 
          onClose={() => setMostrarModalEntrevista(false)}
          candidatoNombre={postulacion?.nombreCandidato || "Candidato"}
          vacanteCargo={postulacion?.cargoPostulado || "Vacante"}
        />
    </LayoutEmpleador>
  );
}
