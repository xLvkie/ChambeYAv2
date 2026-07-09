import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Sparkles } from 'lucide-react'; // Añadimos Sparkles para el ícono de IA
import { useAuth } from '../../../context/AuthContext';
import { crearVacante } from '../../../services/dbService';
import { aiService } from '../../../services/aiService'; // Importamos nuestro nuevo servicio

import LayoutEmpleador from '../shared/LayoutEmpleador';

export default function CrearVacante() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  
  // Estados para manejar el botón de carga y errores
  const [cargando, setCargando] = useState(false);
  const [cargandoIA, setCargandoIA] = useState(false); // Estado para la carga de la IA
  const [errorUI, setErrorUI] = useState('');

  // Estados del formulario
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

  const agregarHabilidad = () => {
    if (habilidadInput.trim() && !habilidades.includes(habilidadInput.trim())) {
      setHabilidades([...habilidades, habilidadInput.trim()]);
      setHabilidadInput('');
    }
  };

  // Función mágica para la IA
  const handleMejorarConIA = async () => {
    if (!descripcion.trim()) {
      setErrorUI('Escribe al menos una idea básica en la descripción para que la IA pueda mejorarla.');
      return;
    }

    setCargandoIA(true);
    setErrorUI(''); // Limpiamos errores previos

    try {
      // Le pasamos el cargo también para que la IA tenga más contexto
      const textoBase = cargo ? `Cargo: ${cargo}. ${descripcion}` : descripcion;
      const descripcionMejorada = await aiService.mejorarVacante(textoBase);
      setDescripcion(descripcionMejorada);
    } catch (error) {
      console.error(error);
      setErrorUI('Hubo un error al conectar con la Inteligencia Artificial. Inténtalo de nuevo.');
    } finally {
      setCargandoIA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorUI('');

    if (!currentUser || !userData) {
      setErrorUI('Error de autenticación. Por favor, inicia sesión nuevamente.');
      return;
    }

    if (habilidades.length === 0) {
      setErrorUI('Debes agregar al menos una habilidad requerida.');
      return;
    }

    setCargando(true);

    try {
      // Armamos el "paquete" de datos de la vacante
      const datosVacante = {
        empleadorId: currentUser.uid,        
        nombreEmpresa: userData.nombreEmpresa || 'Empresa Confidencial',
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

      // Enviamos a Firebase
      await crearVacante(datosVacante);
      
      // Redirigimos al listado de vacantes tras el éxito
      navigate('/empleador/vacantes');
      
    } catch (error) {
      console.error("Error completo:", error);
      setErrorUI('Hubo un problema al publicar la vacante. Inténtalo de nuevo.');
      setCargando(false);
    }
  };

  return (
    <LayoutEmpleador>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Crear Nueva Vacante</h1>
          <p className="text-base lg:text-lg text-muted-foreground">Publica una oferta laboral en minutos</p>
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

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Cargo */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Cargo / Puesto *</label>
              <input
                type="text"
                required
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                placeholder="Ej: Técnico Electricista Industrial"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Descripción (AQUÍ ESTÁ LA MAGIA DE LA IA) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">Descripción del puesto *</label>
                <button
                  type="button"
                  onClick={handleMejorarConIA}
                  disabled={cargandoIA}
                  className="text-xs sm:text-sm font-medium text-[#FF8C00] hover:text-orange-700 flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors disabled:opacity-50"
                  title="Escribe una idea básica y la IA la convertirá en una descripción profesional"
                >
                  {cargandoIA ? (
                    <span className="animate-pulse flex items-center gap-1">
                      <Sparkles size={16} className="animate-spin" /> Generando...
                    </span>
                  ) : (
                    <>
                      <Sparkles size={16} /> Mejorar con IA
                    </>
                  )}
                </button>
              </div>
              <textarea
                required
                rows={6} // Aumenté un poco el tamaño para que se aprecie mejor el texto generado
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Escribe aquí de forma sencilla lo que buscas (ej: Necesito un albañil para una obra de 2 meses, que sepa tarrajear y asentar ladrillo) y presiona 'Mejorar con IA'..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base"
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
                  <p className="text-sm text-gray-500 italic">No has agregado ninguna habilidad aún.</p>
                ) : (
                  habilidades.map((hab, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                      {hab}
                      <button type="button" onClick={() => setHabilidades(habilidades.filter((_, i) => i !== idx))} className="hover:text-orange-900">
                        <X size={14} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Sueldo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Sueldo Mínimo (S/) *</label>
                <input
                  type="number"
                  required
                  value={sueldoMin}
                  onChange={(e) => setSueldoMin(e.target.value)}
                  placeholder="1800"
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
                  placeholder="2200"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Modalidad y Horario */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Modalidad *</label>
                <select 
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Tipo de Contrato *</label>
                <select 
                  value={contrato}
                  onChange={(e) => setContrato(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
                >
                  <option value="Tiempo completo">Tiempo completo</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Por proyecto">Por proyecto</option>
                </select>
              </div>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Ubicación *</label>
              <input
                type="text"
                required
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Distrito, Provincia"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Beneficios */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Beneficios (opcional)</label>
              <textarea
                rows={3}
                value={beneficios}
                onChange={(e) => setBeneficios(e.target.value)}
                placeholder="Describe los beneficios que ofreces..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00] transition-colors resize-none text-sm sm:text-base"
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                disabled={cargando}
                onClick={() => navigate('/empleador/vacantes')}
                className="w-full sm:flex-1 px-6 py-3.5 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 rounded-xl font-medium transition-colors text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={cargando || cargandoIA} // Deshabilita publicar si la IA está pensando
                className="w-full sm:flex-1 px-6 py-3.5 bg-[#FF8C00] hover:bg-orange-600 text-white rounded-xl font-bold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Publicando...
                  </>
                ) : (
                  'Publicar Vacante'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayoutEmpleador>
  );
}