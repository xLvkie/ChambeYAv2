import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { iniciarSesion } from '../../../services/authService';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function LoginEmpleador() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setCargando(true);

    try {
      await iniciarSesion(email, password);
      navigate('/empleador/dashboard');
      
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('Ocurrió un error al intentar iniciar sesión.');
      }
      setCargando(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex bg-white">
      
      {/* ==========================================
          PANEL IZQUIERDO: ILUSTRACIÓN Y MARCA (Solo PC)
          ========================================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FF8C00] via-orange-600 to-orange-800 p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Patrón de fondo opcional para darle textura */}
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/selector')}>
            <img
              src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
              alt="Logo ChambeaYa"
              className="w-12 h-12 object-contain drop-shadow-md bg-white rounded-xl p-1"
            />
            <span className="text-4xl font-bold tracking-tight">
              ChambeaYa
            </span>
          </div>
          <p className="text-xl text-white/90 mt-3 font-medium">
            Talento real, chamba segura
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-black leading-tight drop-shadow-sm">
            Contrata talento<br />calificado hoy
          </h2>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Encuentra trabajadores técnicos confiables para tu MYPE. Publica vacantes en minutos y conecta con profesionales verificados.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-white/70 relative z-10 font-medium">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Ayuda</a>
        </div>
      </div>

      {/* ==========================================
          PANEL DERECHO: FORMULARIO DE LOGIN
          ========================================== */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          
          {/* Cabecera Móvil (Solo visible en pantallas pequeñas) */}
          <div className="lg:hidden flex flex-col items-center justify-center mb-6 cursor-pointer" onClick={() => navigate('/selector')}>
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">ChambeaYa</h1>
            <p className="text-xs font-bold text-[#FF8C00] tracking-widest uppercase mt-1.5">Portal Empleador</p>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Bienvenido</h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">Ingresa a tu cuenta de empleador</p>
          </div>

          {/* ¡NUEVO!: Alerta de error visual */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            {/* Email Input */}
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
                  placeholder="empresa@email.com"
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 text-[#FF8C00] border-gray-300 rounded focus:ring-[#FF8C00] transition-colors cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Recordarme</span>
              </label>
              <a href="#" className="text-sm font-bold text-[#FF8C00] hover:text-orange-700 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#FF8C00] hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">o continúa con Google</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 sm:py-4 px-6 rounded-xl font-bold transition-all"
            >
              <Chrome size={20} className="text-gray-600" />
              Continuar con Google
            </button>

            {/* Register Link /empleador/registro*/}
            <p className="text-center text-sm text-gray-600 mt-6">
              ¿No tienes cuenta?{' '}
              <Link to="/empleador/registro" className="text-[#FF8C00] hover:text-orange-700 font-bold transition-colors">
                Registra tu empresa
              </Link>
            </p>

            {/* Applicant Link */}
            <p className="text-center text-sm text-gray-600 pt-6 mt-6 border-t border-gray-100">
              ¿Buscas trabajo?{' '}
              <Link to="/postulante/login" className="text-[#0056B3] hover:text-blue-800 font-bold transition-colors">
                Ingresa como postulante
              </Link>
            </p>
          </form>
        </div>
      </div>
      
    </div>
  );
}