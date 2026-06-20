import { useState } from 'react';
import LayoutPostulante from '../shared/LayoutPostulante';
import { Plus, X, CheckCircle2 } from 'lucide-react';

export default function RegistroHabilidadesPostulante() {
  const [habilidadInput, setHabilidadInput] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('');
  const [habilidades, setHabilidades] = useState([
    { nombre: 'Electricidad Industrial', nivel: 'Avanzado' },
    { nombre: 'Soldadura TIG/MIG', nivel: 'Intermedio' },
    { nombre: 'Carpintería', nivel: 'Avanzado' },
  ]);

  const sugerencias = [
    'Plomería',
    'Gasfitería',
    'Refrigeración',
    'Aire Acondicionado',
    'Electricidad Residencial',
    'Mecánica Automotriz',
    'Cerrajería',
    'Pintura',
    'Albañilería',
    'Instalaciones Sanitarias',
  ];

  const agregarHabilidad = () => {
    if (habilidadInput && nivelSeleccionado) {
      setHabilidades([...habilidades, { nombre: habilidadInput, nivel: nivelSeleccionado }]);
      setHabilidadInput('');
      setNivelSeleccionado('');
    }
  };

  const eliminarHabilidad = (index: number) => {
    setHabilidades(habilidades.filter((_, i) => i !== index));
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Header Responsivo */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Registro de Habilidades</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Agrega y gestiona tus habilidades técnicas para mejorar tu matching con empleadores</p>
        </div>

        {/* Layout Principal: 1 columna en móvil, 2 en PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* ==========================================
              COLUMNA IZQUIERDA: FORMULARIO
              ========================================== */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Agregar Nueva Habilidad</h2>

              {/* Input Habilidad */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Habilidad Técnica
                </label>
                <input
                  type="text"
                  value={habilidadInput}
                  onChange={(e) => setHabilidadInput(e.target.value)}
                  placeholder="Ej: Electricidad Industrial"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent transition-all"
                  list="habilidades-sugeridas"
                />
                <datalist id="habilidades-sugeridas">
                  {sugerencias.map((sug) => (
                    <option key={sug} value={sug} />
                  ))}
                </datalist>
                <p className="text-xs text-muted-foreground mt-2 font-medium">Comienza a escribir para ver sugerencias</p>
              </div>

              {/* Selector de Nivel (1 col móvil, 3 cols tablet/PC) */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Nivel de Dominio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Básico', 'Intermedio', 'Avanzado'].map((nivel) => (
                    <button
                      key={nivel}
                      onClick={() => setNivelSeleccionado(nivel)}
                      className={`px-4 py-3 rounded-xl border-2 font-bold transition-all shadow-sm ${
                        nivelSeleccionado === nivel
                          ? 'border-[#0056B3] bg-[#0056B3] text-white scale-[1.02]'
                          : 'border-gray-200 hover:border-[#0056B3] hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      {nivel}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={agregarHabilidad}
                disabled={!habilidadInput || !nivelSeleccionado}
                className="w-full flex items-center justify-center gap-2 bg-[#0056B3] hover:bg-blue-800 disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-sm disabled:shadow-none"
              >
                <Plus size={20} />
                Agregar Habilidad
              </button>
            </div>

            {/* Sugerencias */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Habilidades Sugeridas</h3>
              <div className="flex flex-wrap gap-2.5">
                {sugerencias.slice(0, 8).map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setHabilidadInput(sug)}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 hover:border-[#0056B3] hover:bg-blue-50 hover:text-[#0056B3] rounded-full text-sm font-medium transition-colors text-gray-700"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
            
          </div>

          {/* ==========================================
              COLUMNA DERECHA: LISTA DE HABILIDADES
              ========================================== */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-border shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tus Habilidades ({habilidades.length})</h2>
              {habilidades.length > 0 && (
                <CheckCircle2 className="text-green-600" size={24} />
              )}
            </div>

            {habilidades.length === 0 ? (
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-400" size={32} />
                </div>
                <p className="font-semibold text-gray-900">Aún no has agregado habilidades</p>
                <p className="text-sm text-muted-foreground mt-1">Agrega al menos 3 para mejorar tu perfil</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {habilidades.map((hab, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#0056B3] hover:shadow-sm transition-all group bg-gray-50/50 hover:bg-white"
                  >
                    <div className="min-w-0 pr-4">
                      <p className="font-bold text-gray-900 truncate">{hab.nombre}</p>
                      <span
                        className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                          hab.nivel === 'Avanzado'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : hab.nivel === 'Intermedio'
                            ? 'bg-blue-50 text-[#0056B3] border-blue-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {hab.nivel}
                      </span>
                    </div>
                    {/* Botón Eliminar: Siempre visible en móvil (opacity-100), aparece al hacer hover en PC */}
                    <button
                      onClick={() => eliminarHabilidad(idx)}
                      className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-red-50 sm:bg-transparent sm:hover:bg-red-50 text-red-500 sm:text-gray-400 hover:text-red-600 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label="Eliminar habilidad"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {habilidades.length > 0 && (
              <button className="w-full mt-6 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Guardar Cambios
              </button>
            )}
          </div>
        </div>

        {/* Info Panel Inferior */}
        <div className="mt-6 sm:mt-8 bg-blue-50/80 border border-blue-200 rounded-xl p-5 sm:p-6 shadow-sm">
          <h3 className="font-bold text-[#0056B3] mb-2 text-lg flex items-center gap-2">
            💡 Tip: Mejora tu matching
          </h3>
          <p className="text-sm sm:text-base text-blue-900/80 font-medium leading-relaxed">
            Mientras más habilidades agregues, mejor será el matching con las vacantes disponibles.
            Te recomendamos agregar al menos 5 habilidades y mantenerlas actualizadas.
          </p>
        </div>
        
      </div>
    </LayoutPostulante>
  );
}