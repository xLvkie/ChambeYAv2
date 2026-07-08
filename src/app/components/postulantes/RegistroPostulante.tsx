import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Chrome, Eye, EyeOff } from 'lucide-react';

import { registrarUsuario } from '../../../services/authService';

export default function RegistroPostulante() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }
  if (!termsAccepted) {
    alert("Debes aceptar los términos y condiciones");
    return;
  }

  try {
    // 2. Llamamos a Firebase para crear la cuenta
    await registrarUsuario(email, password, name, 'postulante');
    
    // 3. Lo redirigimos a la página de editar perfil (el Guardián igual lo obligaría a ir ahí)
    navigate('/postulante/editar-perfil'); 
    
  } catch (error: any) {
    console.error("Error completo:", error);
    if (error.code === 'auth/email-already-in-use') {
      alert("Este correo ya está registrado.");
    } else {
      alert("Hubo un error al registrarte. Inténtalo de nuevo.");
    }
  }
};

  return (
    // Contenedor principal: h-screen y overflow-hidden evitan el scroll global
    <div className="h-screen flex bg-white overflow-hidden">
      
      {/* ==========================================
          PANEL IZQUIERDO Fijo (Oculto en móviles, visible en Desktop)
          ========================================== */}
      <div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-br from-[#0056B3] via-blue-600 to-[#003d82] p-12 flex-col justify-between text-white overflow-y-auto">
        <div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-xl">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
            </div>
            <Link to="/selector" className="text-4xl font-bold hover:text-white/90 transition-colors">
              ChambeaYa
            </Link>
          </div>
          <p className="text-xl text-white/90 mt-4 font-medium">
            Talento real, chamba segura
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Comienza a buscar<br />chamba hoy
          </h2>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Miles de empresas peruanas buscan profesionales técnicos como tú. Crea tu perfil y destaca tus habilidades.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-white/70 font-medium">
          <Link to="#" className="hover:text-white transition-colors">Términos</Link>
          <Link to="#" className="hover:text-white transition-colors">Privacidad</Link>
          <Link to="#" className="hover:text-white transition-colors">Ayuda</Link>
        </div>
      </div>

      {/* ==========================================
          PANEL DERECHO Scrolleable (Formulario de Registro)
          ========================================== */}
      {/* overflow-y-auto hace que solo este lado se mueva si el contenido es muy largo */}
      <div className="flex-1 h-full overflow-y-auto flex items-start justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 py-4">
          
          {/* Logo EXCLUSIVO para versión Mobile */}
          <div className="flex lg:hidden flex-col items-center mb-8">
            <div className="bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-3 rounded-2xl mb-4 border border-gray-100">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ChambeaYa</h2>
          </div>

          {/* Encabezado del Formulario */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900">Crea tu cuenta</h1>
            <p className="mt-2 text-lg text-gray-500">Regístrate como postulante</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Input Nombres */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Nombres y Apellidos
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Input Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="flex items-center justify-start pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-[#0056B3] border-gray-300 rounded focus:ring-[#0056B3] cursor-pointer"
                  required
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Acepto los <Link to="#" className="text-[#0056B3] hover:text-blue-800 font-semibold transition-colors">Términos y Condiciones</Link>
                </span>
              </label>
            </div>

            {/* Botón Registro */}
            <button
              type="submit"
              className="w-full bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              Crear Cuenta
            </button>

            {/* Separador */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium">
                <span className="px-4 bg-white text-gray-500">o regístrate con</span>
              </div>
            </div>

            {/* Botón Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 py-3.5 px-6 rounded-xl font-semibold text-gray-700 transition-all"
            >
              <Chrome size={20} className="text-gray-600" />
              Google
            </button>

            {/* Link Login */}
            <p className="text-center text-sm text-gray-600 mt-8">
              ¿Ya tienes cuenta?{' '}
              <Link to="/postulante/login" className="text-[#0056B3] hover:text-blue-800 font-bold transition-colors">
                Inicia sesión aquí
              </Link>
            </p>

            {/* Enlace de Empleador */}
            <div className="pt-6 mt-6 border-t border-gray-100 text-center pb-8">
              <p className="text-sm text-gray-600">
                ¿Eres empleador?{' '}
                <Link to="/empleador/registro" className="text-[#FF8C00] hover:text-orange-600 font-bold transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}