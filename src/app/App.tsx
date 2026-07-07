import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useIsMobile } from './hooks/useIsMobile';

// Componentes Postulantes
import LoginPostulante from './components/postulantes/LoginPostulante';
import RegistroPostulante from './components/postulantes/RegistroPostulante';
import DashboardPostulante from './components/postulantes/DashboardPostulante';
import PerfilProfesional from './components/postulantes/PerfilProfesional';
import EditarPerfilPostulante from './components/postulantes/EditarPerfilPostulante';
import RegistroHabilidadesPostulante from './components/postulantes/RegistroHabilidades';
import BusquedaEmpleo from './components/postulantes/BusquedaEmpleo';
import DetalleVacantePostulante from './components/postulantes/DetalleVacante';
import MisPostulaciones from './components/postulantes/MisPostulaciones';
import ChatMensajes from './components/postulantes/ChatMensajes';
import CalificacionesPostulante from './components/postulantes/CalificacionesOpiniones';
import NotificacionesPostulantes from './components/postulantes/Notificaciones';

// Componentes Empleadores
import LoginEmpleador from './components/empleadores/LoginEmpleador';
import RegistroEmpleador from './components/empleadores/RegistroEmpleador';
import DashboardEmpleador from './components/empleadores/DashboardEmpleador';
import MiNegocio from './components/empleadores/MiNegocio';
import EditarMiNegocio from './components/empleadores/EditarMiNegocio';
import CrearVacante from './components/empleadores/CrearVacante';
import GestionVacantes from './components/empleadores/GestionVacantes';
import GestionCandidatos from './components/empleadores/GestionCandidatos';
import PerfilCandidato from './components/empleadores/PerfilCandidato';
import FormalizacionLaboral from './components/empleadores/FormalizacionLaboral';
import ChatEmpresarial from './components/empleadores/ChatEmpresarial';
import CalificacionesEmpleador from './components/empleadores/CalificacionesEmpleador';
import NotificacionesEmpleador from './components/empleadores/NotificacionesEmpleador';

// Shared
import RoleSelector from './components/shared/RoleSelector';
import StyleGuideline from './components/shared/StyleGuideline';

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
          <Route path="/postulante/registro" element={<RegistroPostulante />} />
          <Route path="/postulante/dashboard" element={<DashboardPostulante />} />
          <Route path="/postulante/perfil" element={<PerfilProfesional />} />
          <Route path="/postulante/editar-perfil" element={<EditarPerfilPostulante />} />
          <Route path="/postulante/habilidades" element={<RegistroHabilidadesPostulante />} />
          <Route path="/postulante/busqueda" element={<BusquedaEmpleo />} />
          <Route path="/postulante/vacante/:id" element={<DetalleVacantePostulante />} />
          <Route path="/postulante/postulaciones" element={<MisPostulaciones />} />
          <Route path="/postulante/chat" element={<ChatMensajes />} />
          <Route path="/postulante/calificaciones" element={<CalificacionesPostulante />} />
          <Route path="/postulante/notificaciones" element={<NotificacionesPostulantes />} />

          {/* Rutas Empleadores */}
          <Route path="/empleador/login" element={<LoginEmpleador />} />
          <Route path="/empleador/registro" element={<RegistroEmpleador />} />
          <Route path="/empleador/dashboard" element={<DashboardEmpleador />} />
          <Route path="/empleador/negocio" element={<MiNegocio />} />
          <Route path="/empleador/negocio/editar" element={<EditarMiNegocio />} />
          <Route path="/empleador/crear-vacante" element={<CrearVacante />} />
          <Route path="/empleador/vacantes" element={<GestionVacantes />} />
          <Route path="/empleador/candidatos" element={<GestionCandidatos />} />
          <Route path="/empleador/candidato/:id" element={<PerfilCandidato />} />
          <Route path="/empleador/formalizacion" element={<FormalizacionLaboral />} />
          <Route path="/empleador/chat" element={<ChatEmpresarial />} />
          <Route path="/empleador/calificaciones" element={<CalificacionesEmpleador />} />
          <Route path="/empleador/notificaciones" element={<NotificacionesEmpleador />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
