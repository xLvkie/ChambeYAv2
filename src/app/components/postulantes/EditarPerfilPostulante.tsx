import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function EditarPerfilPostulante() {
  const navigate = useNavigate();

  // Estados de ejemplo para mantener la UI interactiva (Mock Data)
  const [habilidades, setHabilidades] = useState([{ id: 1, nombre: 'Electricidad Industrial', porcentaje: 90 }]);
  const [experiencias, setExperiencias] = useState([
    { id: 1, cargo: 'Electricista Senior', empresa: 'Construcciones SAC', periodo: 'Ene 2021 - Actualidad' }
  ]);
  const [certificados, setCertificados] = useState([{ id: 1, entidad: 'SENATI', año: '2023' }]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/postulante/perfil'); // Redirige al perfil una vez guardado
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-6 lg:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">Editar Perfil Profesional</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Actualiza tus datos y destaca tus habilidades para las empresas.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 lg:space-y-8">
          
          {/* 1. Datos Personales */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0056B3] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-white font-bold shrink-0 shadow-sm">
                CM
              </div>
              <div className="flex-1 mt-2 sm:mt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Carlos Martínez</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">carlos.martinez@email.com</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Título Profesional o Especialidad</label>
                <input type="text" placeholder="Ej. Electricista Industrial Certificado" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teléfono de Contacto</label>
                <input type="tel" placeholder="Ej. +51 987 654 321" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ubicación (Distrito, Ciudad)</label>
                <input type="text" placeholder="Ej. San Juan de Lurigancho, Lima" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3] transition-colors text-sm sm:text-base" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Currículum Vitae (Solo PDF)</label>
                <input type="file" accept="application/pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0056B3] hover:file:bg-blue-100 transition-colors cursor-pointer border border-gray-200 rounded-xl bg-gray-50" />
              </div>
            </div>
          </div>

          {/* 2. Habilidades Técnicas */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Habilidades Técnicas</h3>
            
            {/* Lista de habilidades añadidas */}
            <div className="flex flex-wrap gap-2 mb-6">
              {habilidades.length === 0 ? (
                <p className="text-sm text-gray-500 italic w-full">Aún no has agregado habilidades.</p>
              ) : (
                habilidades.map(hab => (
                  <span key={hab.id} className="inline-flex items-center gap-2 bg-blue-50 text-[#0056B3] px-3.5 py-2 rounded-lg text-sm font-medium border border-blue-100">
                    {hab.nombre} ({hab.porcentaje}%)
                    <button type="button" className="text-blue-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </span>
                ))
              )}
            </div>

            {/* Formulario para agregar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm sm:text-base font-bold text-gray-800 mb-3">+ Agregar Nueva Habilidad</p>
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="w-full sm:flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Tipo de Trabajo</label>
                  <input type="text" placeholder="Ej. Electricidad Industrial" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <div className="w-full sm:w-32">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">% de Dominio</label>
                  <input type="number" placeholder="Ej. 90" min="1" max="100" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <button type="button" className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} /> <span className="sm:hidden">Agregar</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Experiencia Laboral */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Experiencia Laboral</h3>
            
            <div className="space-y-3 mb-6">
              {experiencias.length === 0 ? (
                <p className="text-sm text-gray-500 italic w-full">Aún no has agregado experiencia laboral.</p>
              ) : (
                experiencias.map(exp => (
                  <div key={exp.id} className="flex items-start justify-between bg-white border border-gray-200 p-4 rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-900">{exp.cargo}</h4>
                      <p className="text-sm text-[#0056B3] font-medium">{exp.empresa}</p>
                      <p className="text-xs text-gray-500 mt-1">{exp.periodo}</p>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-red-500 p-2 transition-colors"><Trash2 size={18} /></button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm sm:text-base font-bold text-gray-800 mb-3">+ Agregar Nueva Experiencia</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input type="text" placeholder="Cargo (Ej. Electricista Senior)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                <input type="text" placeholder="Lugar (Ej. Construcciones SAC)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                <input type="text" placeholder="Periodo (Ej. Ene 2021 - Actualidad)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                <input type="text" placeholder="Breve descripción de funciones" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
              </div>
              <button type="button" className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                <Plus size={18} /> Agregar Experiencia
              </button>
            </div>
          </div>

          {/* 4. Certificados y Cursos */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Certificados y Cursos</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {certificados.length === 0 ? (
                <p className="text-sm text-gray-500 italic w-full col-span-full">Aún no has subido certificados.</p>
              ) : (
                certificados.map(cert => (
                  <div key={cert.id} className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-lg flex items-center justify-center">
                        <Upload size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{cert.entidad}</h4>
                        <p className="text-xs text-gray-500">Año: {cert.año}</p>
                      </div>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-red-500 p-2 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm sm:text-base font-bold text-gray-800 mb-3">+ Subir Nuevo Certificado</p>
              <div className="flex flex-col lg:flex-row gap-3 items-end">
                <div className="w-full lg:flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Archivo (PDF)</label>
                  <input type="file" accept="application/pdf" className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0056B3] hover:file:bg-blue-100 cursor-pointer border border-gray-300 rounded-lg bg-white" />
                </div>
                <div className="w-full lg:flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Entidad Emisora</label>
                  <input type="text" placeholder="Ej. SENATI" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <div className="w-full lg:w-28">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Año</label>
                  <input type="text" placeholder="Ej. 2023" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <button type="button" className="w-full lg:w-auto px-5 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} /> <span className="lg:hidden">Agregar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Botones de Acción Finales */}
          <div className="pt-4 pb-8 flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row-reverse w-full sm:w-auto gap-3">
              <button type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-[#0056B3] hover:bg-blue-800 text-white rounded-xl font-bold text-base transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Guardar Perfil y Comenzar
              </button>
              <button type="button" onClick={() => navigate(-1)} className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-base transition-colors">
                Volver Atrás
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium text-center">
              Para guardar, asegúrate de añadir al menos 1 habilidad o experiencia.
            </p>
          </div>

        </form>
      </div>
    </LayoutPostulante>
  );
}