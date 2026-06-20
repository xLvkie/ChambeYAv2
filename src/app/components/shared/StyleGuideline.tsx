import { ChevronLeft, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StyleGuideline() {
  const navigate = useNavigate();

  const colors = [
    { name: 'Primary', hex: '#0056B3', var: '--primary', uso: 'Botones principales, enlaces, elementos de marca' },
    { name: 'Accent', hex: '#FF8C00', var: '--accent', uso: 'CTAs importantes, destacados, acciones principales' },
    { name: 'Success', hex: '#10B981', var: '--chart-3', uso: 'Estados exitosos, confirmaciones, métricas positivas' },
    { name: 'Warning', hex: '#F59E0B', var: '--chart-5', uso: 'Advertencias, estados pendientes, alertas moderadas' },
    { name: 'Destructive', hex: '#EF4444', var: '--destructive', uso: 'Errores, eliminaciones, acciones irreversibles' },
    { name: 'Muted', hex: '#6B7280', var: '--muted-foreground', uso: 'Texto secundario, descripciones, metadatos' },
  ];

  const typography = [
    { name: 'H1 - Título Principal', element: 'h1', size: 'text-2xl', weight: 'font-medium', sample: 'Dashboard Principal' },
    { name: 'H2 - Subtítulos', element: 'h2', size: 'text-xl', weight: 'font-medium', sample: 'Sección Importante' },
    { name: 'H3 - Títulos de Card', element: 'h3', size: 'text-lg', weight: 'font-bold', sample: 'Título de Tarjeta' },
    { name: 'Body - Texto Normal', element: 'p', size: 'text-base', weight: 'font-normal', sample: 'Este es el texto normal del cuerpo.' },
    { name: 'Small - Texto Pequeño', element: 'p', size: 'text-sm', weight: 'font-normal', sample: 'Información adicional o secundaria' },
    { name: 'Caption - Metadatos', element: 'p', size: 'text-xs', weight: 'font-normal', sample: 'Hace 2 días' },
  ];

  const buttons = [
    { name: 'Primary', classes: 'bg-primary hover:bg-primary/90 text-white', label: 'Botón Principal' },
    { name: 'Accent', classes: 'bg-accent hover:bg-accent/90 text-white', label: 'Acción Destacada' },
    { name: 'Secondary', classes: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground', label: 'Secundario' },
    { name: 'Destructive', classes: 'bg-destructive hover:bg-destructive/90 text-white', label: 'Eliminar' },
    { name: 'Outline', classes: 'border-2 border-border hover:bg-muted text-foreground', label: 'Outline' },
  ];

  const spacing = [
    { name: 'xs', value: '0.25rem (4px)', class: 'gap-1' },
    { name: 'sm', value: '0.5rem (8px)', class: 'gap-2' },
    { name: 'md', value: '0.75rem (12px)', class: 'gap-3' },
    { name: 'lg', value: '1rem (16px)', class: 'gap-4' },
    { name: 'xl', value: '1.5rem (24px)', class: 'gap-6' },
    { name: '2xl', value: '2rem (32px)', class: 'gap-8' },
  ];

  const borderRadius = [
    { name: 'Small', value: 'rounded-lg (0.5rem)', visual: 'rounded-lg' },
    { name: 'Medium', value: 'rounded-xl (0.75rem)', visual: 'rounded-xl' },
    { name: 'Large', value: 'rounded-2xl (1rem)', visual: 'rounded-2xl' },
    { name: 'Full', value: 'rounded-full (9999px)', visual: 'rounded-full' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2"
          >
            <ChevronLeft size={20} />
            Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Style Guideline</h1>
          <p className="text-sm text-muted-foreground">Guía de estilo visual de ChambeaYa</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Colores */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Paleta de Colores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="border border-border rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-xl border border-border flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{color.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{color.hex}</p>
                    <p className="text-xs text-muted-foreground mb-2">var({color.var})</p>
                    <p className="text-sm text-gray-700">{color.uso}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tipografía */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tipografía</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-2">Fuente Principal</p>
              <p className="text-2xl font-bold text-gray-900">Montserrat</p>
            </div>
            {typography.map((typo) => (
              <div key={typo.name} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{typo.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {typo.size} · {typo.weight}
                    </p>
                  </div>
                </div>
                {typo.element === 'h1' && <h1>{typo.sample}</h1>}
                {typo.element === 'h2' && <h2>{typo.sample}</h2>}
                {typo.element === 'h3' && <h3>{typo.sample}</h3>}
                {typo.element === 'p' && typo.size === 'text-base' && <p>{typo.sample}</p>}
                {typo.element === 'p' && typo.size === 'text-sm' && <p className="text-sm">{typo.sample}</p>}
                {typo.element === 'p' && typo.size === 'text-xs' && <p className="text-xs">{typo.sample}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Botones */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Botones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buttons.map((btn) => (
              <div key={btn.name} className="border border-border rounded-xl p-4">
                <p className="text-sm font-bold text-gray-900 mb-3">{btn.name}</p>
                <button className={`w-full px-4 py-2.5 rounded-xl font-medium transition-colors ${btn.classes}`}>
                  {btn.label}
                </button>
                <p className="text-xs text-muted-foreground mt-3 font-mono">{btn.classes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Espaciado */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Espaciado</h2>
          <div className="space-y-3">
            {spacing.map((space) => (
              <div key={space.name} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{space.name}</h3>
                    <p className="text-xs text-muted-foreground">{space.value}</p>
                  </div>
                </div>
                <div className="flex gap-0 items-center">
                  <div
                    className="bg-accent h-8"
                    style={{ width: space.value.split('(')[1].split(')')[0] }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {borderRadius.map((radius) => (
              <div key={radius.name} className="border border-border rounded-xl p-4 text-center">
                <div className={`w-16 h-16 bg-primary mx-auto mb-3 ${radius.visual}`}></div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{radius.name}</h3>
                <p className="text-xs text-muted-foreground">{radius.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Iconos */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Iconos</h2>
          <p className="text-sm text-muted-foreground mb-4">Librería: lucide-react</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Success', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
              { name: 'Warning', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
              { name: 'Info', icon: Info, color: 'text-blue-600', bg: 'bg-blue-100' },
              { name: 'Error', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="border border-border rounded-xl p-4 text-center">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={item.color} size={24} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Uso por Color */}
        <section className="bg-white rounded-xl p-6 border border-border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Uso por Color</h2>
          <div className="space-y-3">
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <h3 className="font-bold text-gray-900">Verde - Success / Positivo</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Estados activos, confirmaciones exitosas, métricas positivas, vacantes activas
              </p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <h3 className="font-bold text-gray-900">Azul - Información / Postulantes</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Información general, total de postulantes, datos estadísticos, estados informativos
              </p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <h3 className="font-bold text-gray-900">Púrpura - Nuevos / Destacados</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Nuevos postulantes, elementos destacados, notificaciones recientes
              </p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <h3 className="font-bold text-gray-900">Amarillo - En Proceso / Advertencia</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Estados en revisión, procesos pendientes, advertencias moderadas
              </p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <h3 className="font-bold text-gray-900">Rojo - Errores / Crítico</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Estados de error, acciones destructivas, alertas críticas, eliminaciones
              </p>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-[#FF8C00] rounded"></div>
                <h3 className="font-bold text-gray-900">Naranja - Acción Principal / CTA</h3>
              </div>
              <p className="text-sm text-gray-700 pl-7">
                Botones de acción principal, CTAs importantes, elementos que requieren atención
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
