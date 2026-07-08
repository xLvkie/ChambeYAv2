import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Plus, X, ArrowLeft, Save } from 'lucide-react';

export default function EditarVacante() {
  const navigate = useNavigate();
  
  // Estados pre-cargados con Mock Data (simulando que cargamos una vacante de la base de datos)
  const [estado, setEstado] = useState('Activa');
  const [cargo, setCargo] = useState('Técnico Electricista Industrial');
  const [descripcion, setDescripcion] = useState('Buscamos un Técnico Electricista con experiencia en instalaciones eléctricas industriales para unirse a nuestro equipo de proyectos de construcción. El candidato ideal tendrá conocimientos sólidos en sistemas eléctricos de media y baja tensión.');
  const [habilidades, setHabilidades] = useState<string[]>(['Electricidad Industrial', 'Lectura de Planos', 'Instalaciones Eléctricas']);
  const [habilidadInput, setHabilidadInput] = useState('');
  const [sueldoMin, setSueldoMin] = useState('1800');
  const [sueldoMax, setSueldoMax] = useState('2200');
  const [modalidad, setModalidad] = useState('Presencial');
  const [contrato, setContrato] = useState('Tiempo completo');
  const [ubicacion, setUbicacion] = useState('San Juan de Lurigancho, Lima');
  const [beneficios, setBeneficios] = useState('Planilla desde el primer día, bonos de productividad, y seguro EPS cubierto al 50%.');

  const agregarHabilidad = () => {
    if (habilidadInput && !habilidades.includes(habilidadInput)) {
      setHabilidades([...habilidades, habilidadInput]);
      setHabilidadInput('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de guardado en la base de datos
    navigate('/empleador/vacantes');
  };

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Botón Volver */}
        <button
          onClick={() => navigate('/empleador/vacantes')}
          className="flex items-center gap-2 text-gray-600 hover:text-accent mb-4 sm:mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Volver a vacantes
        </button>

        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Editar Vacante</h1>
            <p className="text-base lg:text-lg text-muted-foreground">Actualiza los detalles de tu oferta laboral</p>
          </div>
          {/* Badge visual del estado actual */}
          <div className={`px-4 py-2 rounded-lg font-bold text-sm border flex items-center gap-2 w-fit ${
            estado === 'Activa' ? 'bg-green-50 text-green-700 border-green-200' :
            estado === 'Pausada' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${estado === 'Activa' ? 'bg-green-500 animate-pulse' : estado === 'Pausada' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
            Vacante {estado}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-8 border border-border shadow-sm">
          <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
            
            {/* Estado de la vacante (Exclusivo de Edición) */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">Estado de la publicación</label>
              <select 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base font-medium"
              >
                <option value="Activa">🟢 Activa (Visible para postulantes)</option>
                <option value="Pausada">🟡 Pausada (Oculta temporalmente)</option>
                <option value="Cerrada">⚪ Cerrada (No recibe más CVs)</option>
              </select>
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cargo / Puesto *</label>
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base font-medium"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Descripción del puesto *</label>
              <textarea
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base leading-relaxed"
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
                  className="px-5 sm:px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors shrink-0"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {habilidades.map((hab, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 bg-orange-50 text-accent border border-orange-100 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {hab}
                    <button type="button" onClick={() => setHabilidades(habilidades.filter((_, i) => i !== idx))} className="hover:text-red-500 transition-colors">
                      <X size={16} />
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
                  value={sueldoMin}
                  onChange={(e) => setSueldoMin(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Máximo (S/) *</label>
                <input
                  type="number"
                  value={sueldoMax}
                  onChange={(e) => setSueldoMax(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Modalidad y Horario (1 col móvil, 2 cols PC) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Modalidad *</label>
                <select value={modalidad} onChange={(e) => setModalidad(e.target.value)} className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
                  <option>Presencial</option>
                  <option>Remoto</option>
                  <option>Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Contrato *</label>
                <select value={contrato} onChange={(e) => setContrato(e.target.value)} className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base">
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
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
              />
            </div>

            {/* Beneficios */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Beneficios (opcional)</label>
              <textarea
                rows={3}
                value={beneficios}
                onChange={(e) => setBeneficios(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm sm:text-base"
              />
            </div>

            {/* Buttons (Apilados en móvil, en fila en PC) */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/empleador/vacantes')}
                className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-colors"
              >
                Descartar cambios
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 px-8 py-3.5 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Guardar Cambios
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </LayoutEmpleador>
  );
}