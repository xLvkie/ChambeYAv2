import { useState } from 'react';
import LayoutPostulanteMobile from '../shared/LayoutPostulanteMobile';
import { Plus, X, CheckCircle2 } from 'lucide-react';

export default function RegistroHabilidadesMobile() {
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
    <LayoutPostulanteMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Registro de Habilidades</h1>
          <p className="text-sm text-muted-foreground">Agrega tus habilidades técnicas para mejorar tu matching</p>
        </div>

        {/* Tus Habilidades */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Tus Habilidades ({habilidades.length})</h2>
            {habilidades.length > 0 && (
              <CheckCircle2 className="text-green-600" size={20} />
            )}
          </div>

          {habilidades.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="text-gray-400" size={28} />
              </div>
              <p className="text-sm text-muted-foreground">Aún no has agregado habilidades</p>
              <p className="text-xs text-muted-foreground mt-1">Agrega al menos 3 para mejorar tu perfil</p>
            </div>
          ) : (
            <div className="space-y-2">
              {habilidades.map((hab, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border border-border rounded-xl group"
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="font-medium text-gray-900 truncate">{hab.nombre}</p>
                    <span
                      className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        hab.nivel === 'Avanzado'
                          ? 'bg-green-100 text-green-700'
                          : hab.nivel === 'Intermedio'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {hab.nivel}
                    </span>
                  </div>
                  <button
                    onClick={() => eliminarHabilidad(idx)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {habilidades.length > 0 && (
            <button className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors">
              Guardar Cambios
            </button>
          )}
        </div>

        {/* Agregar Nueva Habilidad */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Agregar Nueva Habilidad</h2>

          {/* Input Habilidad */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Habilidad Técnica
            </label>
            <input
              type="text"
              value={habilidadInput}
              onChange={(e) => setHabilidadInput(e.target.value)}
              placeholder="Ej: Electricidad Industrial"
              className="w-full px-4 py-3 border border-input rounded-xl bg-input-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              list="habilidades-sugeridas"
            />
            <datalist id="habilidades-sugeridas">
              {sugerencias.map((sug) => (
                <option key={sug} value={sug} />
              ))}
            </datalist>
            <p className="text-xs text-muted-foreground mt-2">Comienza a escribir para ver sugerencias</p>
          </div>

          {/* Selector de Nivel */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nivel de Dominio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Básico', 'Intermedio', 'Avanzado'].map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setNivelSeleccionado(nivel)}
                  className={`px-3 py-3 rounded-xl border-2 font-medium transition-all text-sm ${
                    nivelSeleccionado === nivel
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 hover:border-primary text-gray-700'
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
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-medium transition-colors"
          >
            <Plus size={20} />
            Agregar Habilidad
          </button>
        </div>

        {/* Sugerencias */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h3 className="font-bold text-gray-900 mb-3">Habilidades Sugeridas</h3>
          <div className="flex flex-wrap gap-2">
            {sugerencias.slice(0, 8).map((sug) => (
              <button
                key={sug}
                onClick={() => setHabilidadInput(sug)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm transition-colors"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-bold text-blue-900 mb-2 text-sm">💡 Tip: Mejora tu matching</h3>
          <p className="text-xs text-blue-800 leading-relaxed">
            Mientras más habilidades agregues, mejor será el matching con las vacantes disponibles.
            Te recomendamos agregar al menos 5 habilidades y mantenerlas actualizadas.
          </p>
        </div>
      </div>
    </LayoutPostulanteMobile>
  );
}
