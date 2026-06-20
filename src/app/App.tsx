import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';

// Componentes Postulantes
import LoginPostulante from './components/postulantes/LoginPostulante';
import DashboardPostulante from './components/postulantes/DashboardPostulante';
import PerfilProfesional from './components/postulantes/PerfilProfesional';
import RegistroHabilidadesPostulante from './components/postulantes/RegistroHabilidades';
import BusquedaEmpleo from './components/postulantes/BusquedaEmpleo';
import DetalleVacantePostulante from './components/postulantes/DetalleVacante';
import MisPostulaciones from './components/postulantes/MisPostulaciones';
import ChatMensajes from './components/postulantes/ChatMensajes';
import CalificacionesPostulante from './components/postulantes/CalificacionesOpiniones';
import NotificacionesPostulantes from './components/postulantes/Notificaciones';

// Componentes Empleadores
import LoginEmpleador from './components/empleadores/LoginEmpleador';
import DashboardEmpleador from './components/empleadores/DashboardEmpleador';
import MiNegocio from './components/empleadores/MiNegocio';
import CrearVacante from './components/empleadores/CrearVacante';
import GestionVacantes from './components/empleadores/GestionVacantes';
import GestionCandidatos from './components/empleadores/GestionCandidatos';
import PerfilCandidato from './components/empleadores/PerfilCandidato';
import PerfilCandidatoMobile from './components/empleadores/PerfilCandidatoMobile';
import FormalizacionLaboral from './components/empleadores/FormalizacionLaboral';
import ChatEmpresarial from './components/empleadores/ChatEmpresarial';
import CalificacionesEmpleador from './components/empleadores/CalificacionesEmpleador';
import NotificacionesEmpleador from './components/empleadores/NotificacionesEmpleador';

// Eliminar conforme se editen los componentes para que sean responsivos, ya que no se necesita esta diferenciación
import LoginEmpleadorMobile from './components/empleadores/LoginEmpleadorMobile';
import DashboardEmpleadorMobile from './components/empleadores/DashboardEmpleadorMobile';
import CrearVacanteMobile from './components/empleadores/CrearVacanteMobile';
import GestionCandidatosMobile from './components/empleadores/GestionCandidatosMobile';
import GestionVacantesMobile from './components/empleadores/GestionVacantesMobile';
import MiNegocioMobile from './components/empleadores/MiNegocioMobile';
import FormalizacionLaboralMobile from './components/empleadores/FormalizacionLaboralMobile';
import CalificacionesEmpleadorMobile from './components/empleadores/CalificacionesEmpleadorMobile';
import NotificacionesEmpleadorMobile from './components/empleadores/NotificacionesEmpleadorMobile';
import ChatEmpresarialMobile from './components/empleadores/ChatEmpresarialMobile';

// Shared
import RoleSelector from './components/shared/RoleSelector';
import StyleGuideline from './components/shared/StyleGuideline';

// Todas estas funciones seran eliminadas ya que no cumplen con el principio DRY, renderizan componentes diferentes
function ResponsiveLoginEmpleador() {
  const isMobile = useIsMobile();
  return isMobile ? <LoginEmpleadorMobile /> : <LoginEmpleador />;
}

function ResponsiveDashboardEmpleador() {
  const isMobile = useIsMobile();
  return isMobile ? <DashboardEmpleadorMobile /> : <DashboardEmpleador />;
}

function ResponsiveCrearVacante() {
  const isMobile = useIsMobile();
  return isMobile ? <CrearVacanteMobile /> : <CrearVacante />;
}

function ResponsiveGestionCandidatos() {
  const isMobile = useIsMobile();
  return isMobile ? <GestionCandidatosMobile /> : <GestionCandidatos />;
}

function ResponsivePerfilCandidato() {
  const isMobile = useIsMobile();
  return isMobile ? <PerfilCandidatoMobile /> : <PerfilCandidato />;
}

function ResponsiveChatEmpleador() {
  const isMobile = useIsMobile();
  return isMobile ? <ChatEmpresarialMobile /> : <ChatEmpresarial />;
}

function ResponsiveGestionVacantes() {
  const isMobile = useIsMobile();
  return isMobile ? <GestionVacantesMobile /> : <GestionVacantes />;
}

function ResponsiveMiNegocio() {
  const isMobile = useIsMobile();
  return isMobile ? <MiNegocioMobile /> : <MiNegocio />;
}

function ResponsiveFormalizacionLaboral() {
  const isMobile = useIsMobile();
  return isMobile ? <FormalizacionLaboralMobile /> : <FormalizacionLaboral />;
}

function ResponsiveCalificacionesEmpleador() {
  const isMobile = useIsMobile();
  return isMobile ? <CalificacionesEmpleadorMobile /> : <CalificacionesEmpleador />;
}

function ResponsiveNotificacionesEmpleador() {
  const isMobile = useIsMobile();
  return isMobile ? <NotificacionesEmpleadorMobile /> : <NotificacionesEmpleador />;
}

/* 
Este bloque de codigo se encarga de definir las rutas de la aplicación utilizando React Router. 
Se incluyen rutas para los postulantes y empleadores, así como una ruta para el selector de rol y la guía de estilo. 
Para las rutas de empleadores, se utilizan componentes responsivos que renderizan diferentes versiones según el tamaño de pantalla del dispositivo. 
*/
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          {/* Redirect raíz */}
          <Route path="/" element={<Navigate to="/selector" replace />} />

          {/* Selector de rol */}
          <Route path="/selector" element={<RoleSelector />} />

          {/* Style Guideline */}
          <Route path="/style-guideline" element={<StyleGuideline />} />

          {/* Rutas Postulantes */}
          <Route path="/postulante/login" element={<LoginPostulante />} />
          <Route path="/postulante/dashboard" element={<DashboardPostulante />} />
          <Route path="/postulante/perfil" element={<PerfilProfesional />} />
          <Route path="/postulante/habilidades" element={<RegistroHabilidadesPostulante />} />
          <Route path="/postulante/busqueda" element={<BusquedaEmpleo />} />
          <Route path="/postulante/vacante/:id" element={<DetalleVacantePostulante />} />
          <Route path="/postulante/postulaciones" element={<MisPostulaciones />} />
          <Route path="/postulante/chat" element={<ChatMensajes />} />
          <Route path="/postulante/calificaciones" element={<CalificacionesPostulante />} />
          <Route path="/postulante/notificaciones" element={<NotificacionesPostulantes />} />

          {/* Rutas Empleadores */}
          <Route path="/empleador/login" element={<ResponsiveLoginEmpleador />} />
          <Route path="/empleador/dashboard" element={<ResponsiveDashboardEmpleador />} />
          <Route path="/empleador/negocio" element={<ResponsiveMiNegocio />} />
          <Route path="/empleador/crear-vacante" element={<ResponsiveCrearVacante />} />
          <Route path="/empleador/vacantes" element={<ResponsiveGestionVacantes />} />
          <Route path="/empleador/candidatos" element={<ResponsiveGestionCandidatos />} />
          <Route path="/empleador/candidato/:id" element={<ResponsivePerfilCandidato />} />
          <Route path="/empleador/formalizacion" element={<ResponsiveFormalizacionLaboral />} />
          <Route path="/empleador/chat" element={<ResponsiveChatEmpleador />} />
          <Route path="/empleador/calificaciones" element={<ResponsiveCalificacionesEmpleador />} />
          <Route path="/empleador/notificaciones" element={<ResponsiveNotificacionesEmpleador />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
