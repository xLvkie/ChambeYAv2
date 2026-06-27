import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Building2, Briefcase, Users, FileText, MessageSquare, Star, Bell, LogOut, Menu, X } from 'lucide-react';

interface LayoutEmpleadorProps {
  children: ReactNode;
}

export default function LayoutEmpleador({ children }: LayoutEmpleadorProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Inicio', path: '/empleador/dashboard' },
    { icon: Building2, label: 'Mi Negocio', path: '/empleador/negocio' },
    { icon: Briefcase, label: 'Mis Vacantes', path: '/empleador/vacantes' },
    { icon: Users, label: 'Candidatos', path: '/empleador/candidatos' },
    { icon: FileText, label: 'Formalización', path: '/empleador/formalizacion' },
    { icon: MessageSquare, label: 'Mensajes', path: '/empleador/chat' },
    { icon: Star, label: 'Calificaciones', path: '/empleador/calificaciones' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Función para navegar y cerrar el menú móvil automáticamente
  const handleMobileNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-background">
      
      {/* ==========================================
          VERSIÓN DESKTOP (PC) - PANEL LATERAL
          ========================================== */}
      <aside className="hidden lg:flex w-64 fixed h-full bg-white border-r border-border flex-col z-30">
        {/* Logo */}
        <div className="p-6 border-b border-border cursor-pointer" onClick={() => navigate('/selector')}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-100 shadow-sm">
              <img
                src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
                alt="Logo ChambeaYa"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ChambeaYa</h1>
              <p className="text-xs text-muted-foreground">Empleador</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-accent text-white shadow-md shadow-orange-500/20'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => navigate('/empleador/notificaciones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive('/empleador/notificaciones')
                ? 'bg-accent text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell size={20} />
            <span className="font-medium">Notificaciones</span>
            <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">5</span>
          </button>

          <button
            onClick={() => navigate('/selector')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ==========================================
          VERSIÓN MOBILE - HEADER SUPERIOR
          ========================================== */}
      <header className="lg:hidden fixed top-0 w-full bg-white border-b border-gray-100 z-40 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/selector')}>
          <img src="https://i.ibb.co/rD42gdt/logo-solo-org.png" alt="Logo" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">ChambeaYa</h1>
            <p className="text-xs text-muted-foreground">Empleador</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/empleador/notificaciones')} 
            className="relative text-gray-600 hover:text-accent transition-colors"
          >
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
              5
            </span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-gray-900">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ==========================================
          VERSIÓN MOBILE - MENÚ HAMBURGUESA (DRAWER)
          ========================================== */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div className={`fixed right-0 top-0 h-full w-[280px] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl flex flex-col`}>
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h2 className="text-xl font-bold text-gray-900">Menú</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-900">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto">
          {/* Opciones extra que no caben en el Bottom Nav */}
          <button onClick={() => handleMobileNavigation('/empleador/formalizacion')} className={`flex items-center gap-4 px-6 py-4 font-medium ${isActive('/empleador/formalizacion') ? 'text-accent bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}>
            <FileText size={22} className={isActive('/empleador/formalizacion') ? 'text-accent' : 'text-gray-500'} /> Formalización
          </button>
          <button onClick={() => handleMobileNavigation('/empleador/chat')} className={`flex items-center gap-4 px-6 py-4 font-medium ${isActive('/empleador/chat') ? 'text-accent bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}>
            <MessageSquare size={22} className={isActive('/empleador/chat') ? 'text-accent' : 'text-gray-500'} /> Mensajes
          </button>
          <button onClick={() => handleMobileNavigation('/empleador/calificaciones')} className={`flex items-center gap-4 px-6 py-4 font-medium ${isActive('/empleador/calificaciones') ? 'text-accent bg-orange-50' : 'text-gray-700 hover:bg-gray-50'}`}>
            <Star size={22} className={isActive('/empleador/calificaciones') ? 'text-accent' : 'text-gray-500'} /> Calificaciones
          </button>
          
          <hr className="my-2 border-border" />
          
          <button onClick={() => handleMobileNavigation('/selector')} className="flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-red-50 font-medium text-left">
            <LogOut size={22} /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* ==========================================
          VERSIÓN MOBILE - BOTTOM NAVIGATION
          ========================================== */}
      <nav className="lg:hidden fixed bottom-0 w-full bg-white border-t border-border z-40 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Extraemos los 4 elementos principales para el Bottom Nav: Inicio, Vacantes, Candidatos, Mi Negocio */}
          {[menuItems[0], menuItems[2], menuItems[3], menuItems[1]].map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 ${
                  active ? 'text-accent' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon size={22} className={active ? 'fill-orange-500/20' : ''} />
                <span className="text-[10px] font-medium text-center leading-tight">
                  {/* Acortamos el texto para móvil */}
                  {item.label === 'Mis Vacantes' ? 'Vacantes' : item.label === 'Mi Negocio' ? 'Negocio' : item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==========================================
          ÁREA PRINCIPAL DE CONTENIDO
          ========================================== */}
      <main className="flex-1 lg:ml-64 pt-[68px] pb-[64px] lg:pt-0 lg:pb-0 overflow-y-auto hide-scrollbar">
        {children}
      </main>

    </div>
  );
}