import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface RutaProtegidaProps {
  rolPermitido?: 'postulante' | 'empleador';
}

export default function RutaProtegida({ rolPermitido }: RutaProtegidaProps) {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  // 1. Mientras Firebase verifica la sesión, mostramos un cargando
  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-gray-50 font-bold text-[#0056B3]">Cargando...</div>;
  }

  // 2. Si NO hay usuario, lo mandamos a que elija cómo iniciar sesión
  if (!currentUser || !userData) {
    return <Navigate to="/selector" />;
  }

  // 3. Si el usuario intenta entrar a una sección que no es de su rol (ej: postulante entrando a empleador)
  if (rolPermitido && userData.rol !== rolPermitido) {
    return <Navigate to="/selector" />;
  }

  // 4. ¡LA MAGIA DEL ONBOARDING FORZADO!
  // Si no ha completado su perfil, revisamos en qué página está.
  // Si no está en la página de editar perfil, lo obligamos a ir hacia allá.
  if (!userData.perfilCompleto) {
    const rutaEdicionPostulante = '/postulante/editar-perfil'; // Ajusta la ruta si es diferente
    const rutaEdicionEmpleador = '/empleador/negocio/editar';

    if (userData.rol === 'postulante' && location.pathname !== rutaEdicionPostulante) {
      return <Navigate to={rutaEdicionPostulante} />;
    }
    if (userData.rol === 'empleador' && location.pathname !== rutaEdicionEmpleador) {
      return <Navigate to={rutaEdicionEmpleador} />;
    }
  }

  // Si pasa todas las validaciones de seguridad, lo dejamos ver la página solicitada (<Outlet />)
  return <Outlet />;
}