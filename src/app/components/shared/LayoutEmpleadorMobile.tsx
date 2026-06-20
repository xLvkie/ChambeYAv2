import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Building2, Briefcase, Users, MessageSquare, Star, Bell, Menu, FileText } from 'lucide-react';
import { useState } from 'react';

interface LayoutEmpleadorMobileProps {
  children: ReactNode;
}

// ESTA ARCHIVO SERA BORRADO PROXIMAMENTE CUANDO SE HAGA LA TRANSICION COMPLETA A COMPONENTES RESPONSIVOS, 
// YA QUE ESTE COMPONENTE SOLO RENDERIZA UNA VERSION MOVIL DE LOS COMPONENTES DE EMPLEADOR, LO CUAL NO ES NECESARIO 
// SI LOS COMPONENTES SON RESPONSIVOS POR SI MISMOS. DE TODAS FORMAS SE MANTENDRA HASTA TERMINAR CON LA SECCION DE EMPLEADORES 
// PARA EVITAR ERRORES EN EL PROCESO DE EDICION.

export default function LayoutEmpleadorMobile({ children }: LayoutEmpleadorMobileProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const mainNavItems = [
    { icon: Home, label: 'Inicio', path: '/empleador/dashboard' },
    { icon: Briefcase, label: 'Vacantes', path: '/empleador/vacantes' },
    { icon: Users, label: 'Candidatos', path: '/empleador/candidatos' },
    { icon: Building2, label: 'Negocio', path: '/empleador/negocio' },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Header */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
            alt="Logo ChambeaYa"
            className="w-8 h-8 object-contain"
          />
          <div>
            <h1 className="text-base font-bold text-gray-900">ChambeaYa</h1>
            <p className="text-xs text-muted-foreground">Empleador</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/empleador/notificaciones')}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">5</span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Slide-out Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 shadow-xl p-4 space-y-2">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="font-bold text-gray-900">Menú</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <button
              onClick={() => {
                navigate('/empleador/formalizacion');
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === '/empleador/formalizacion'
                  ? 'bg-accent text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText size={20} />
              <span className="font-medium">Formalización</span>
            </button>
            <button
              onClick={() => {
                navigate('/empleador/chat');
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === '/empleador/chat'
                  ? 'bg-accent text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} />
              <span className="font-medium">Mensajes</span>
            </button>
            <button
              onClick={() => {
                navigate('/empleador/calificaciones');
                setMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                location.pathname === '/empleador/calificaciones'
                  ? 'bg-accent text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Star size={20} />
              <span className="font-medium">Calificaciones</span>
            </button>
            <div className="pt-4 mt-4 border-t border-border">
              <button
                onClick={() => {
                  navigate('/selector');
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              >
                <span className="font-medium">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-2 flex items-center justify-around z-40">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-colors min-w-[64px] ${
                isActive
                  ? 'text-accent'
                  : 'text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
