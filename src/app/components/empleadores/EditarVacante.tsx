import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LayoutEmpleador from '../shared/LayoutEmpleador';
import { Plus, X, ArrowLeft, Save } from 'lucide-react';
import { obtenerVacantePorId, actualizarVacante } from '../../../services/dbService';

export default function EditarVacante() {
  const navigate = useNavigate();
  const { id } = useParams(); // Atrapamos el ID de la URL

  // Estados de carga y error
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorUI, setErrorUI] = useState('');
  
  // Estados del formulario (Inician vacíos, se llenan con Firebase)
  const [estado, setEstado] = useState('activa');
  const [cargo, setCargo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [habilidadInput, setHabilidadInput] = useState('');
  const [sueldoMin, setSueldoMin] = useState('');
  const [sueldoMax, setSueldoMax] = useState('');
  const [modalidad, setModalidad] = useState('Presencial');
  const [contrato, setContrato] = useState('Tiempo completo');
  const [ubicacion, setUbicacion] = useState('');
  const [beneficios, setBeneficios] = useState('');

  // Cargar datos al entrar a la página
  useEffect(() => {
    const cargarDatos = async () => {
      if (!id) return;
      try {
        const data: any = await obtenerVacantePorId(id);
        
        // Rellenamos el formulario
        setEstado(data.estado || 'activa');
        setCargo(data.cargo || '');
        setDescripcion(data.descripcion || '');
        setHabilidades(data.habilidades || []);
        setSueldoMin(data.sueldoMin?.toString() || '');
        setSueldoMax(data.sueldoMax?.toString() || '');
        setModalidad(data.modalidad || 'Presencial');
        setContrato(data.contrato || 'Tiempo completo');
        setUbicacion(data.ubicacion || '');
        setBeneficios(data.beneficios || '');
        
      } catch (error) {
        console.error(error);
        setErrorUI('No se pudo cargar la información de esta vacante.');
      } finally {
        setCargandoInicial(false);
      }
    };
    cargarDatos();
  }, [id]);

  const agregarHabilidad = () => {
    if (habilidadInput.trim() && !habilidades.includes(habilidadInput.trim())) {
      setHabilidades([...habilidades, habilidadInput.trim()]);
      setHabilidadInput('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    if (habilidades.length === 0) {
      setErrorUI('Debes agregar al menos una habilidad requerida.');
      return;
    }

    setGuardando(true);
    setErrorUI('');

    try {
      const datosActualizados = {
        estado,
        cargo,
        descripcion,
        habilidades,
        sueldoMin: Number(sueldoMin),
        sueldoMax: Number(sueldoMax),
        modalidad,
        contrato,
        ubicacion,
        beneficios
      };

      await actualizarVacante(id, datosActualizados);
      navigate('/empleador/vacantes');
      
    } catch (error) {
      setErrorUI('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
      setGuardando(false);
    }
  };

  // Helper para normalizar el texto del estado (ej: 'activa' -> 'Activa')
  const estadoFormateado = estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase();

  if (cargandoInicial) {
    return (
      <LayoutEmpleador>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <svg className="animate-spin h-10 w-10 text-[#FF8C00] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <p className="text-gray-500 font-medium">Cargando información de la vacante...</p>
        </div>
      </LayoutEmpleador>
    );
  }

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        <button
          onClick={() => navigate('/empleador/vacantes')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#FF8C00] mb-4 sm:mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Volver a vacantes
        </button>

        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Editar Vacante</h1>
            <p className="text-base lg:text-lg text-muted-foreground">Actualiza los detalles de tu oferta laboral</p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold text-sm border flex items-center gap-2 w-fit ${
            estadoFormateado === 'Activa' ? 'bg-green-50 text-green-700 border-green-200' :
            estadoFormateado === 'Pausada' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
            'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${estadoFormateado === 'Activa' ? 'bg-green-500 animate-pulse' : estadoFormateado === 'Pausada' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
            Vacante {estadoFormateado}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-8 border border-border shadow-sm">
          {errorUI && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorUI}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5 sm:space-y-6">
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-2">
              <label className="block text-sm font-bold text-gray-900 mb-2">Estado de la publicación</label>
              <select 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full sm:w-1/3 px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] text-sm sm:text-base font-medium transition-colors"
              >
                <option value="activa">🟢 Activa (Visible para postulantes)</option>
                <option value="pausada">🟡 Pausada (Oculta temporalmente)</option>
                <option value="cerrada">⚪ Cerrada (No recibe más CVs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cargo / Puesto *</label>
              <input
                type="text"
                required
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Descripción del puesto *</label>
              <textarea
                required
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Habilidades Requeridas *</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={habilidadInput}
                  onChange={(e) => setHabilidadInput(e.target.value)}
                  placeholder="Agregar habilidad..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base min-w-0"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarHabilidad())}
                />
                <button
                  type="button"
                  onClick={agregarHabilidad}
                  className="px-5 sm:px-6 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shrink-0 flex items-center justify-center"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {habilidades.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay habilidades registradas.</p>
                ) : (
                  habilidades.map((hab, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 border border-orange-100 px-3 py-1.5 rounded-lg text-sm font-medium">
                      {hab}
                      <button type="button" onClick={() => setHabilidades(habilidades.filter((_, i) => i !== idx))} className="hover:text-red-500 transition-colors">
                        <X size={16} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Mínimo (S/) *</label>
                <input
                  type="number"
                  required
                  value={sueldoMin}
                  onChange={(e) => setSueldoMin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Máximo (S/) *</label>
                <input
                  type="number"
                  required
                  value={sueldoMax}
                  onChange={(e) => setSueldoMax(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Modalidad *</label>
                <select value={modalidad} onChange={(e) => setModalidad(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base">
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Contrato *</label>
                <select value={contrato} onChange={(e) => setContrato(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base">
                  <option value="Tiempo completo">Tiempo completo</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Por proyecto">Por proyecto</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Ubicación *</label>
              <input
                type="text"
                required
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Beneficios (opcional)</label>
              <textarea
                rows={3}
                value={beneficios}
                onChange={(e) => setBeneficios(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
              <button
                type="button"
                disabled={guardando}
                onClick={() => navigate('/empleador/vacantes')}
                className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 hover:bg-gray-50 text-gray-700 disabled:opacity-50 rounded-xl font-bold transition-colors"
              >
                Descartar cambios
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="w-full sm:flex-1 px-8 py-3.5 bg-[#FF8C00] hover:bg-orange-600 text-white disabled:opacity-70 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {guardando ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </LayoutEmpleador>
  );
}