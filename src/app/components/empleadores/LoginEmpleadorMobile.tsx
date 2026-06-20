import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginEmpleadorMobile() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-orange-700 flex flex-col">
      {/* Top Section with Logo and Title */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-white">
        <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg">
          <img
            src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
            alt="Logo ChambeaYa"
            className="w-16 h-16 object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">¡Bienvenido!</h1>
        <p className="text-orange-100 text-center text-base">Encuentra al talento perfecto</p>
      </div>

      {/* Bottom Card with Form */}
      <div className="bg-white rounded-t-3xl px-6 py-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Iniciar Sesión</h2>

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@empresa.com"
                className="w-full pl-11 pr-4 py-3.5 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3.5 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm text-gray-700">Recordarme</span>
            </label>
            <button className="text-sm text-accent font-medium">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={() => navigate('/empleador/dashboard')}
            className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-xl font-medium transition-colors shadow-sm"
          >
            Iniciar Sesión
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">o continúa con</span>
            </div>
          </div>

          {/* Google SSO */}
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 py-3.5 rounded-xl transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8055 10.2292C19.8055 9.55141 19.7501 8.86719 19.6323 8.19653H10.2002V12.0492H15.6014C15.3771 13.2911 14.6567 14.3898 13.6026 15.0876V17.5866H16.8257C18.713 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
              <path d="M10.2002 20.0006C12.9527 20.0006 15.2736 19.1151 16.8257 17.5865L13.6026 15.0875C12.7031 15.6979 11.5469 16.0433 10.2002 16.0433C7.54067 16.0433 5.28654 14.2832 4.49906 11.9168H1.16748V14.4924C2.76906 17.6852 6.30974 20.0006 10.2002 20.0006Z" fill="#34A853"/>
              <path d="M4.49906 11.9168C4.0519 10.6749 4.0519 9.32631 4.49906 8.08443V5.50879H1.16748C-0.388933 8.61278 -0.388933 12.3884 1.16748 15.4924L4.49906 11.9168Z" fill="#FBBC04"/>
              <path d="M10.2002 3.95773C11.6246 3.93572 13.0004 4.47287 14.036 5.45814L16.8873 2.60681C15.1849 0.990317 12.9342 0.0786057 10.2002 0.100617C6.30974 0.100617 2.76906 2.41606 1.16748 5.60881L4.49906 8.18445C5.28654 5.81802 7.54067 3.95773 10.2002 3.95773Z" fill="#EA4335"/>
            </svg>
            <span className="font-medium text-gray-700">Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{' '}
            <button className="text-accent font-medium">
              Regístrate aquí
            </button>
          </p>

          {/* Back to Selector */}
          <button
            onClick={() => navigate('/selector')}
            className="w-full text-sm text-gray-600 mt-4"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
