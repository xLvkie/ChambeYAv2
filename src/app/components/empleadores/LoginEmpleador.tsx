import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function LoginEmpleador() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/empleador/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent via-orange-600 to-orange-800 p-12 flex-col justify-between text-white">
      <div>
        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
            alt="Logo ChambeaYa"
            className="w-12 h-12 object-contain drop-shadow-md"
          />
      
          <a href="/selector" className="text-4xl font-bold">
            ChambeaYa
          </a>
        </div>
      
        <p className="text-xl text-white/90 mt-2">
          Talento real, chamba segura
        </p>
      </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Contrata talento<br />calificado hoy
          </h2>
          <p className="text-xl text-white/90 max-w-md">
            Encuentra trabajadores técnicos confiables para tu MYPE. Publica vacantes en minutos y conecta con profesionales verificados.
          </p>
        </div>

        <div className="flex gap-4 text-sm text-white/70">
          <a href="#" className="hover:text-white">Términos</a>
          <a href="#" className="hover:text-white">Privacidad</a>
          <a href="#" className="hover:text-white">Ayuda</a>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Bienvenido</h1>
            <p className="mt-2 text-lg text-muted-foreground">Ingresa a tu cuenta de empleador</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
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
                  className="w-full pl-12 pr-4 py-3.5 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
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
                  className="w-full pl-12 pr-4 py-3.5 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-accent hover:text-accent/80">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white py-3.5 px-6 rounded-xl font-medium transition-colors"
            >
              Iniciar sesión
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">o continúa con Google</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3.5 px-6 rounded-xl font-medium transition-colors"
            >
              <Chrome size={20} />
              Continuar con Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-accent hover:text-accent/80 font-medium">
                Registra tu empresa
              </a>
            </p>

            {/* Applicant Link */}
            <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
              ¿Buscas trabajo?{' '}
              <a href="/postulante/login" className="text-primary hover:text-primary/80 font-medium">
                Ingresa como postulante
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
