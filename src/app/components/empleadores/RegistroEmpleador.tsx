import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function RegistroEmpleador() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de registro más adelante
    navigate('/empleador/dashboard');
  };

  return (
    // Contenedor principal: h-screen y overflow-hidden evitan el scroll global
    <div className="h-screen flex bg-white overflow-hidden">
      
      {/* ==========================================
          PANEL IZQUIERDO Fijo (Oculto en móviles, visible en Desktop)
          ========================================== */}
      <div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-br from-[#FF8C00] via-orange-600 to-orange-800 p-12 flex-col justify-between text-white relative overflow-y-auto">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/selector')}>
            <div className="bg-white p-2 rounded-xl">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-4xl font-bold hover:text-white/90 transition-colors">
              ChambeaYa
            </span>
          </div>
          <p className="text-xl text-white/90 mt-4 font-medium">
            Talento real, chamba segura
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-bold leading-tight drop-shadow-sm">
            Encuentra al talento<br />que necesitas
          </h2>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">
            Publica tus vacantes y conecta rápidamente con profesionales técnicos calificados listos para empezar a trabajar.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-white/70 relative z-10 font-medium">
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
          <div className="flex lg:hidden flex-col items-center mb-8 cursor-pointer" onClick={() => navigate('/selector')}>
            <div className="bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-3 rounded-2xl mb-4 border border-gray-100">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ChambeaYa</h2>
            <p className="text-xs font-bold text-[#FF8C00] tracking-widest uppercase mt-1.5">Portal Empleador</p>
          </div>

          {/* Encabezado del Formulario */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Crea tu cuenta empresarial</h1>
            <p className="mt-2 text-base sm:text-lg text-gray-500">Regístrate como empleador</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Input Nombres Representante */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Nombre del Representante
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Ana Gómez"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Correo Empresa */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo Corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contacto@empresa.com"
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
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
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
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
                  className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] focus:border-transparent transition-all"
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
                  className="w-4 h-4 text-[#FF8C00] border-gray-300 rounded focus:ring-[#FF8C00] cursor-pointer"
                  required
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Acepto los <Link to="#" className="text-[#FF8C00] hover:text-orange-700 font-semibold transition-colors">Términos y Condiciones</Link>
                </span>
              </label>
            </div>

            {/* Botón Registro */}
            <button
              type="submit"
              className="w-full bg-[#FF8C00] hover:bg-orange-600 text-white py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Crear cuenta de empresa
            </button>

            {/* Link Login */}
            <p className="text-center text-sm text-gray-600 mt-8">
              ¿Ya tienes cuenta?{' '}
              <Link to="/empleador/login" className="text-[#FF8C00] hover:text-orange-700 font-bold transition-colors">
                Inicia sesión aquí
              </Link>
            </p>

            {/* Enlace a Postulante */}
            <div className="pt-6 mt-6 border-t border-gray-100 text-center pb-8">
              <p className="text-sm text-gray-600">
                ¿Buscas trabajo?{' '}
                <Link to="/postulante/registro" className="text-[#0056B3] hover:text-blue-800 font-bold transition-colors">
                  Regístrate como postulante
                </Link>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}