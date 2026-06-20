import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { Plus, X } from 'lucide-react';

export default function CrearVacanteMobile() {
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
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear Nueva Vacante</h1>
          <p className="text-sm text-muted-foreground">Publica una oferta laboral en minutos</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-border">
          <form className="space-y-4">
            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cargo / Puesto *</label>
              <input
                type="text"
                placeholder="Ej: Técnico Electricista Industrial"
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Descripción del puesto *</label>
              <textarea
                rows={4}
                placeholder="Describe las responsabilidades y requisitos del puesto..."
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
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
                  className="flex-1 px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarHabilidad())}
                />
                <button
                  type="button"
                  onClick={agregarHabilidad}
                  className="px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {habilidades.map((hab, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-sm">
                    {hab}
                    <button type="button" onClick={() => setHabilidades(habilidades.filter((_, i) => i !== idx))}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sueldo */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Mínimo (S/) *</label>
                <input
                  type="number"
                  placeholder="1800"
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Máximo (S/) *</label>
                <input
                  type="number"
                  placeholder="2200"
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
              </div>
            </div>

            {/* Modalidad y Horario */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Modalidad *</label>
                <select className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm">
                  <option>Presencial</option>
                  <option>Remoto</option>
                  <option>Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Contrato *</label>
                <select className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm">
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
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>

            {/* Beneficios */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Beneficios (opcional)</label>
              <textarea
                rows={3}
                placeholder="Describe los beneficios que ofreces..."
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
              >
                Publicar Vacante
              </button>
              <button
                type="button"
                onClick={() => navigate('/empleador/vacantes')}
                className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutEmpleadorMobile>
  );
}
