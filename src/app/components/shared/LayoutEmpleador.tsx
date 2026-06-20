import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Building2, Briefcase, Users, FileText, MessageSquare, Star, Bell, LogOut } from 'lucide-react';

interface LayoutEmpleadorProps {
  children: ReactNode;
}

export default function LayoutEmpleador({ children }: LayoutEmpleadorProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Inicio', path: '/empleador/dashboard' },
    { icon: Building2, label: 'Mi Negocio', path: '/empleador/negocio' },
    { icon: Briefcase, label: 'Mis Vacantes', path: '/empleador/vacantes' },
    { icon: Users, label: 'Candidatos', path: '/empleador/candidatos' },
    { icon: FileText, label: 'Formalización', path: '/empleador/formalizacion' },
    { icon: MessageSquare, label: 'Mensajes', path: '/empleador/chat' },
    { icon: Star, label: 'Calificaciones', path: '/empleador/calificaciones' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <a href="/selector" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <img
              src="https://i.ibb.co/rD42gdt/logo-solo-org.png"
              alt="Logo ChambeaYa"
              className="w-10 h-10 object-contain"
            />
          </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ChambeaYa</h1>
              <p className="text-xs text-muted-foreground">Empleador</p>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-accent text-white'
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
              location.pathname === '/empleador/notificaciones'
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
