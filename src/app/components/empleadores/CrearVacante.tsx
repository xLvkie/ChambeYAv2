import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Plus, X } from 'lucide-react';

export default function CrearVacante() {
  const navigate = useNavigate();
  const [habilidades, setHabilidades] = useState<string[]>(['Electricidad Industrial']);
  const [habilidadInput, setHabilidadInput] = useState('');

  const agregarHabilidad = () => {
    if (habilidadInput && !habilidades.includes(habilidadInput)) {
      setHabilidades([...habilidades, habilidadInput]);
      setHabilidadInput('');
    }
  };

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Crear Nueva Vacante</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Publica una oferta laboral en minutos</p>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-8 border border-border">
          <form className="space-y-5 sm:space-y-6">
            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cargo / Puesto *</label>
              <input
                type="text"
                placeholder="Ej: Técnico Electricista Industrial"
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Descripción del puesto *</label>
              <textarea
                rows={4}
                placeholder="Describe las responsabilidades y requisitos del puesto..."
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              />
            </div>

            {/* Habilidades Requeridas */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Habilidades Requeridas *</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={habilidadInput}
                  onChange={(e) => setHabilidadInput(e.target.value)}
                  placeholder="Agregar habilidad..."
                  className="flex-1 px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base min-w-0"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarHabilidad())}
                />
                <button
                  type="button"
                  onClick={agregarHabilidad}
                  className="px-5 sm:px-6 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors shrink-0"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {habilidades.map((hab, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs sm:text-sm">
                    {hab}
                    <button type="button" onClick={() => setHabilidades(habilidades.filter((_, i) => i !== idx))} className="hover:text-blue-900">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sueldo (1 col móvil, 2 cols PC) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Mínimo (S/) *</label>
                <input
                  type="number"
                  placeholder="1800"
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Máximo (S/) *</label>
                <input
                  type="number"
                  placeholder="2200"
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Modalidad y Horario (1 col móvil, 2 cols PC) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Modalidad *</label>
                <select className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
                  <option>Presencial</option>
                  <option>Remoto</option>
                  <option>Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Contrato *</label>
                <select className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
                  <option>Tiempo completo</option>
                  <option>Part-time</option>
                  <option>Por proyecto</option>
                </select>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Ubicación *</label>
              <input
                type="text"
                placeholder="Distrito, Provincia"
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              />
            </div>

            {/* Beneficios */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Beneficios (opcional)</label>
              <textarea
                rows={3}
                placeholder="Describe los beneficios que ofreces..."
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              />
            </div>

            {/* Buttons (Apilados en móvil, en fila en PC) */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => navigate('/empleador/vacantes')}
                className="w-full sm:flex-1 px-6 py-3.5 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
              >
                Publicar Vacante
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutEmpleador>
  );
}