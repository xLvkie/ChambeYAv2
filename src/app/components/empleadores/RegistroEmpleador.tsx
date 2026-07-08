import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { registrarUsuario } from '../../../services/authService';

export default function RegistroEmpleador() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // ¡NUEVOS ESTADOS AÑADIDOS PARA MANEJAR LA UI!
  const [cargando, setCargando] = useState(false);
  const [errorUI, setErrorUI] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorUI(''); // Limpiar errores previos al intentar de nuevo
    
    if (password !== confirmPassword) {
      setErrorUI("Las contraseñas no coinciden");
      return;
    }
    if (!termsAccepted) {
      setErrorUI("Debes aceptar los términos y condiciones");
      return;
    }

    setCargando(true); // Bloquear el botón y mostrar estado de carga

    try {
      await registrarUsuario(email, password, name, 'empleador');
      navigate('/empleador/negocio/editar'); 
      
    } catch (error: any) {
      console.error("Error completo:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorUI("Este correo ya está registrado por otro usuario.");
      } else {
        setErrorUI("Hubo un error al crear tu cuenta. Inténtalo de nuevo.");
      }
      setCargando(false); // Volver a habilitar el botón si falla
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* PANEL IZQUIERDO Fijo */}
      <div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-br from-[#FF8C00] via-orange-600 to-orange-800 p-12 flex-col justify-between text-white relative overflow-y-auto">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/selector')}>
            <div className="bg-white p-2 rounded-xl">
              <img src="https://i.ibb.co/rD42gdt/logo-solo-org.png" alt="Logo ChambeaYa" className="w-10 h-10 object-contain drop-shadow-sm" />
            </div>
            <span className="text-4xl font-bold hover:text-white/90 transition-colors">ChambeaYa</span>
          </div>
          <p className="text-xl text-white/90 mt-4 font-medium">Talento real, chamba segura</p>
        </div>
        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-bold leading-tight drop-shadow-sm">Encuentra al talento<br />que necesitas</h2>
          <p className="text-xl text-white/90 max-w-md leading-relaxed">Publica tus vacantes y conecta rápidamente con profesionales técnicos calificados listos para empezar a trabajar.</p>
        </div>
        <div className="flex gap-6 text-sm text-white/70 relative z-10 font-medium">
          <Link to="#" className="hover:text-white transition-colors">Términos</Link>
          <Link to="#" className="hover:text-white transition-colors">Privacidad</Link>
          <Link to="#" className="hover:text-white transition-colors">Ayuda</Link>
        </div>
      </div>

      {/* PANEL DERECHO Scrolleable */}
      <div className="flex-1 h-full overflow-y-auto flex items-start justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 py-4">
          <div className="flex lg:hidden flex-col items-center mb-8 cursor-pointer" onClick={() => navigate('/selector')}>
            <div className="bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-3 rounded-2xl mb-4 border border-gray-100">
              <img src="https://i.ibb.co/rD42gdt/logo-solo-org.png" alt="Logo ChambeaYa" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ChambeaYa</h2>
            <p className="text-xs font-bold text-[#FF8C00] tracking-widest uppercase mt-1.5">Portal Empleador</p>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Crea tu cuenta empresarial</h1>
            <p className="mt-2 text-base sm:text-lg text-gray-500">Regístrate como empleador</p>
          </div>

          {/* ¡NUEVO!: Alerta de error visual para empleadores */}
          {errorUI && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorUI}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Nombre del Representante</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Ana Gómez" className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]" required />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Correo Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contacto@empresa.com" className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]" required />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]" required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-start pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="w-4 h-4 text-[#FF8C00] border-gray-300 rounded focus:ring-[#FF8C00]" required />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">Acepto los <Link to="#" className="text-[#FF8C00] hover:text-orange-700 font-semibold">Términos y Condiciones</Link></span>
              </label>
            </div>

            {/* ¡ACTUALIZADO!: Botón Iniciar Sesión con estado de carga */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#FF8C00] hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {cargando ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta de empresa'
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-8">¿Ya tienes cuenta? <Link to="/empleador/login" className="text-[#FF8C00] hover:text-orange-700 font-bold">Inicia sesión aquí</Link></p>
            <div className="pt-6 mt-6 border-t border-gray-100 text-center pb-8">
              <p className="text-sm text-gray-600">¿Buscas trabajo? <Link to="/postulante/registro" className="text-[#0056B3] hover:text-blue-800 font-bold">Regístrate como postulante</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}