import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPostulante() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/postulante/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* PANEL IZQUIERDO - Ilustración (Oculto en móviles, visible en Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0056B3] via-blue-600 to-[#003d82] p-12 flex-col justify-between text-white">
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
            Encuentra chamba<br />más rápido
          </h2>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Miles de empresas peruanas buscan profesionales técnicos como tú. Destaca tus habilidades y encuentra trabajo rápidamente.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-white/70 font-medium">
          <Link to="#" className="hover:text-white transition-colors">Términos</Link>
          <Link to="#" className="hover:text-white transition-colors">Privacidad</Link>
          <Link to="#" className="hover:text-white transition-colors">Ayuda</Link>
        </div>
      </div>

      {/* PANEL DERECHO - Formulario de Login (100% de ancho en móvil, 50% en Desktop) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
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

          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>
            <p className="mt-2 text-lg text-gray-500">Ingresa a tu cuenta de postulante</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input: Correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo electrónico
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

            {/* Input: Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Recordarme & Olvidaste Contraseña */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#0056B3] border-gray-300 rounded focus:ring-[#0056B3] cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Recordarme</span>
              </label>
              <Link to="#" className="text-sm font-semibold text-[#0056B3] hover:text-blue-800 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              className="w-full bg-[#0056B3] hover:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
            >
              Iniciar sesión
            </button>

            {/* Divisor */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium">
                <span className="px-4 bg-white text-gray-500">o continúa con</span>
              </div>
            </div>

            {/* Login con Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 py-3.5 px-6 rounded-xl font-semibold text-gray-700 transition-all"
            >
              <Chrome size={20} className="text-gray-600" />
              Continuar con Google
            </button>

            {/* Enlace de Registro */}
            <p className="text-center text-sm text-gray-600 mt-8">
              ¿No tienes cuenta?{' '}
              <Link to="#" className="text-[#0056B3] hover:text-blue-800 font-bold transition-colors">
                Regístrate gratis
              </Link>
            </p>

            {/* Enlace de Empleador */}
            <div className="pt-6 mt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                ¿Eres empleador?{' '}
                <Link to="/empleador/login" className="text-[#FF8C00] hover:text-orange-600 font-bold transition-colors">
                  Ingresa aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}