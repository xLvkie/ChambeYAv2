import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Upload, Save, Sparkles } from 'lucide-react'; // Añadido Sparkles
import { useAuth } from '../../../context/AuthContext';
import { actualizarPerfilUsuario } from '../../../services/dbService';
import { aiService } from '../../../services/aiService'; // Importamos la IA

import LayoutPostulante from '../shared/LayoutPostulante';

export default function EditarPerfilPostulante() {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [cargando, setCargando] = useState(false);
  const [cargandoIA, setCargandoIA] = useState(false); // Estado para la IA

  // 1. Estados de Datos Personales (Precargados con lo que haya en Firebase)
  const [titulo, setTitulo] = useState(userData?.tituloProfesional || '');
  const [telefono, setTelefono] = useState(userData?.telefono || '');
  const [ubicacion, setUbicacion] = useState(userData?.ubicacion || '');

  // 2. Estados de las Listas (Precargados con Firebase o vacíos por defecto)
  const [habilidades, setHabilidades] = useState<any[]>(userData?.habilidades || []);
  const [experiencias, setExperiencias] = useState<any[]>(userData?.experiencias || []);
  const [certificados, setCertificados] = useState<any[]>(userData?.certificados || []);

  // 3. Estados Temporales para los formularios de "+ Agregar"
  const [nuevaHabNombre, setNuevaHabNombre] = useState('');
  const [nuevaHabPorcentaje, setNuevaHabPorcentaje] = useState('');
  
  const [nuevaExpCargo, setNuevaExpCargo] = useState('');
  const [nuevaExpEmpresa, setNuevaExpEmpresa] = useState('');
  const [nuevaExpPeriodo, setNuevaExpPeriodo] = useState('');
  const [nuevaExpDesc, setNuevaExpDesc] = useState('');

  const [nuevoCertEntidad, setNuevoCertEntidad] = useState('');
  const [nuevoCertAno, setNuevoCertAno] = useState('');

  const iniciales = userData?.nombre ? userData.nombre.substring(0, 2).toUpperCase() : 'US';

  // --- FUNCIONES PARA AGREGAR Y ELIMINAR DE LAS LISTAS ---

  const agregarHabilidad = () => {
    if (nuevaHabNombre && nuevaHabPorcentaje) {
      setHabilidades([...habilidades, { 
        id: Date.now(), 
        nombre: nuevaHabNombre, 
        porcentaje: Number(nuevaHabPorcentaje) 
      }]);
      setNuevaHabNombre('');
      setNuevaHabPorcentaje('');
    }
  };

  const agregarExperiencia = () => {
    if (nuevaExpCargo && nuevaExpEmpresa && nuevaExpPeriodo) {
      setExperiencias([...experiencias, { 
        id: Date.now(), 
        cargo: nuevaExpCargo, 
        empresa: nuevaExpEmpresa, 
        periodo: nuevaExpPeriodo,
        descripcion: nuevaExpDesc 
      }]);
      setNuevaExpCargo(''); setNuevaExpEmpresa(''); setNuevaExpPeriodo(''); setNuevaExpDesc('');
    }
  };

  const agregarCertificado = () => {
    if (nuevoCertEntidad && nuevoCertAno) {
      setCertificados([...certificados, { 
        id: Date.now(), 
        entidad: nuevoCertEntidad, 
        año: nuevoCertAno 
      }]);
      setNuevoCertEntidad(''); setNuevoCertAno('');
    }
  };

  const eliminarElemento = (id: number, tipo: 'habilidad' | 'experiencia' | 'certificado') => {
    if (tipo === 'habilidad') setHabilidades(habilidades.filter(h => h.id !== id));
    if (tipo === 'experiencia') setExperiencias(experiencias.filter(e => e.id !== id));
    if (tipo === 'certificado') setCertificados(certificados.filter(c => c.id !== id));
  };

  // --- FUNCIÓN DE LA IA PARA EXPERIENCIA ---
  const handleMejorarExperienciaIA = async () => {
    if (!nuevaExpDesc.trim()) {
      alert('Escribe una idea básica de lo que hacías antes de usar la IA.');
      return;
    }
    setCargandoIA(true);
    try {
      // Le damos contexto a la IA uniendo el cargo y la empresa
      const contextoBase = `Trabajé como ${nuevaExpCargo} en ${nuevaExpEmpresa}. Mis tareas fueron: ${nuevaExpDesc}`;
      const descripcionOptimizada = await aiService.optimizarPerfil(contextoBase);
      setNuevaExpDesc(descripcionOptimizada);
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al conectar con la Inteligencia Artificial.');
    } finally {
      setCargandoIA(false);
    }
  };

  // --- FUNCIÓN FINAL DE GUARDADO EN FIREBASE ---

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setCargando(true);

    try {
      const datosPerfil = {
        tituloProfesional: titulo,
        telefono: telefono,
        ubicacion: ubicacion,
        habilidades: habilidades,
        experiencias: experiencias,
        certificados: certificados
      };

      await actualizarPerfilUsuario(currentUser.uid, datosPerfil);
      window.location.href = '/postulante/perfil';

    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar tu perfil.");
      setCargando(false);
    }
  };

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Editar Perfil Profesional</h1>
          <p className="text-muted-foreground">Actualiza tus datos y destaca tus habilidades para las empresas.</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 lg:space-y-8">
          
          {/* 1. Datos Personales */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0056B3] rounded-2xl flex items-center justify-center text-3xl sm:text-4xl text-white font-bold shrink-0">
                {iniciales}
              </div>
              <div className="flex-1 mt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{userData?.nombre || 'Cargando...'}</h2>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Título Profesional *</label>
                <input required type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej. Electricista Industrial" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Teléfono *</label>
                <input required type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej. +51 987 654 321" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Ubicación *</label>
                <input required type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder="Ej. Lima" className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056B3]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">CV (PDF)</label>
                <input type="file" accept="application/pdf" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-blue-50 file:text-[#0056B3] border border-gray-200 rounded-xl bg-gray-50" />
              </div>
            </div>
          </div>

          {/* 2. Habilidades Técnicas */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Habilidades Técnicas</h3>
            
            {/* Lista actual */}
            <div className="flex flex-wrap gap-2 mb-6">
              {habilidades.length === 0 ? <p className="text-sm text-gray-500 italic w-full">Aún no has agregado habilidades.</p> : 
                habilidades.map(hab => (
                  <span key={hab.id} className="inline-flex items-center gap-2 bg-blue-50 text-[#0056B3] px-3.5 py-2 rounded-lg text-sm font-medium border border-blue-100">
                    {hab.nombre} ({hab.porcentaje}%)
                    <button type="button" onClick={() => eliminarElemento(hab.id, 'habilidad')} className="text-blue-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </span>
                ))
              }
            </div>

            {/* Formulario de Agregar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm font-bold text-gray-800 mb-3">+ Agregar Nueva Habilidad</p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre</label>
                  <input type="text" value={nuevaHabNombre} onChange={(e)=>setNuevaHabNombre(e.target.value)} placeholder="Ej. Instalaciones" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">% Dominio</label>
                  <input type="number" value={nuevaHabPorcentaje} onChange={(e)=>setNuevaHabPorcentaje(e.target.value)} placeholder="90" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm" />
                </div>
                <button type="button" onClick={agregarHabilidad} className="px-6 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg font-bold text-sm flex gap-2">
                  <Plus size={18} /> Agregar
                </button>
              </div>
            </div>
          </div>

          {/* 3. Experiencia Laboral */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Experiencia Laboral</h3>
            
            {/* Lista actual */}
            <div className="space-y-3 mb-6">
              {experiencias.length === 0 ? <p className="text-sm text-gray-500 italic w-full">Aún no has agregado experiencia.</p> : 
                experiencias.map(exp => (
                  <div key={exp.id} className="flex items-start justify-between bg-white border border-gray-200 p-4 rounded-xl">
                    <div>
                      <h4 className="font-bold text-gray-900">{exp.cargo}</h4>
                      <p className="text-[#0056B3] text-sm font-medium">{exp.empresa}</p>
                      <p className="text-xs text-gray-500 mt-1">{exp.periodo}</p>
                      {exp.descripcion && <p className="text-sm text-gray-700 mt-2">{exp.descripcion}</p>}
                    </div>
                    <button type="button" onClick={() => eliminarElemento(exp.id, 'experiencia')} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                  </div>
                ))
              }
            </div>

            {/* Formulario de Agregar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm font-bold text-gray-800 mb-3">+ Agregar Nueva Experiencia</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input type="text" value={nuevaExpCargo} onChange={(e)=>setNuevaExpCargo(e.target.value)} placeholder="Cargo (Ej. Pintor)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm" />
                <input type="text" value={nuevaExpEmpresa} onChange={(e)=>setNuevaExpEmpresa(e.target.value)} placeholder="Empresa o Cliente" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm" />
                <input type="text" value={nuevaExpPeriodo} onChange={(e)=>setNuevaExpPeriodo(e.target.value)} placeholder="Periodo (Ej. 2021 - 2023)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm sm:col-span-2" />
                
                {/* Nuevo contenedor extendido para la descripción y la IA */}
                <div className="col-span-1 sm:col-span-2 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-gray-600">Descripción de tareas</label>
                    <button
                      type="button"
                      onClick={handleMejorarExperienciaIA}
                      disabled={cargandoIA}
                      className="text-xs font-bold text-[#0056B3] hover:text-blue-800 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
                    >
                      {cargandoIA ? (
                        <span className="animate-pulse flex items-center gap-1"><Sparkles size={14} className="animate-spin" /> Optimizando...</span>
                      ) : (
                        <><Sparkles size={14} /> Mejorar texto con IA</>
                      )}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    value={nuevaExpDesc} 
                    onChange={(e)=>setNuevaExpDesc(e.target.value)} 
                    placeholder="Describe qué hacías (ej: Pintado de fachadas en edificios de 5 pisos usando andamios)..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056B3] text-sm resize-none" 
                  />
                </div>
              </div>
              
              <button type="button" onClick={agregarExperiencia} className="w-full px-4 py-3 mt-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                <Plus size={18} /> Agregar Experiencia a la Lista
              </button>
            </div>
          </div>

          {/* 4. Certificados */}
          <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Certificados</h3>
            
            {/* Lista actual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {certificados.length === 0 ? <p className="text-sm text-gray-500 italic col-span-full">Aún no has subido certificados.</p> : 
                certificados.map(cert => (
                  <div key={cert.id} className="flex justify-between bg-white border border-gray-200 p-3 rounded-xl">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-lg flex items-center justify-center"><Upload size={18} /></div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{cert.entidad}</h4>
                        <p className="text-xs text-gray-500">Año: {cert.año}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => eliminarElemento(cert.id, 'certificado')} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))
              }
            </div>

            {/* Formulario de Agregar */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-sm font-bold text-gray-800 mb-3">+ Subir Certificado</p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Entidad</label>
                  <input type="text" value={nuevoCertEntidad} onChange={(e)=>setNuevoCertEntidad(e.target.value)} placeholder="Ej. SENATI" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div className="w-24">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Año</label>
                  <input type="text" value={nuevoCertAno} onChange={(e)=>setNuevoCertAno(e.target.value)} placeholder="2023" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <button type="button" onClick={agregarCertificado} className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg font-bold text-sm flex gap-2">
                  <Plus size={18} /> Agregar
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={cargando} className="w-full bg-[#0056B3] hover:bg-blue-800 disabled:opacity-50 text-white py-4 rounded-xl font-bold flex justify-center gap-2 shadow-sm transition-colors">
            <Save size={20} /> {cargando ? 'Guardando...' : 'Guardar Perfil y Comenzar'}
          </button>
        </form>
      </div>
    </LayoutPostulante>
  );
}