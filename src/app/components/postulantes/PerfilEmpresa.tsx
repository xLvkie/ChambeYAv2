import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LayoutPostulante from '../shared/LayoutPostulante';
import { ArrowLeft, MapPin, Phone, Mail, CheckCircle2, Star, Building2, Flag } from 'lucide-react';
import { obtenerResumenEmpresa, obtenerCalificacionesEmpresa, Calificacion } from '../../../services/dbService';

interface LocationState {
  empresaId?: string;
  empresaNombre?: string;
}

function formatearFecha(timestamp: any) {
  if (!timestamp) return 'Reciente';
  const date = timestamp.toDate?.() ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('es-PE', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

export default function PerfilEmpresa() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const empresaId = state?.empresaId || '';
  const empresaNombre = state?.empresaNombre || 'Empresa';

  const [resumen, setResumen] = useState({ promedio: 0, cantidadOpiniones: 0, estrellas: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } });
  const [opiniones, setOpiniones] = useState<Calificacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarResumen = async () => {
      if (!empresaId) {
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        const resumenEmpresa = await obtenerResumenEmpresa(empresaId);
        const calificaciones = await obtenerCalificacionesEmpresa(empresaId);
        setResumen(resumenEmpresa);
        setOpiniones(calificaciones);
      } catch (err) {
        console.error('Error cargando perfil de empresa:', err);
        setError('No se pudo cargar la información de la empresa.');
      } finally {
        setCargando(false);
      }
    };

    cargarResumen();
  }, [empresaId]);

  const estrellasHelper: Array<1 | 2 | 3 | 4 | 5> = [5, 4, 3, 2, 1];

  return (
    <LayoutPostulante>
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#0056B3] mb-4 sm:mb-6 font-medium transition-colors w-fit"
        >
          <ArrowLeft size={20} />
          Volver atrás
        </button>

        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Perfil de la Empresa</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1">Conoce más sobre esta organización antes de postular</p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-5 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-5xl sm:text-6xl text-white shrink-0 self-center sm:self-start">
                  🏗️
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{empresaNombre}</h2>
                    <span className="flex items-center justify-center gap-1 text-xs sm:text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0 font-bold">
                      <CheckCircle2 size={14} />
                      Empresa Verificada
                    </span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium mb-4">Construcción e Infraestructura</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Phone size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">+51 987 654 321</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 min-w-0">
                      <Mail size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">contacto@empresa.pe</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <MapPin size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">San Juan de Lurigancho, Lima</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <Building2 size={16} className="text-[#0056B3] shrink-0" />
                      <span className="text-sm truncate font-medium">30-100 empleados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Sobre la empresa</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Somos una empresa con trayectoria en el mercado, enfocada en proyectos de construcción e infraestructura. Buscamos talento comprometido, detallista y responsable.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Opiniones de postulantes</h3>
              {cargando ? (
                <p className="text-sm text-gray-600">Cargando opiniones...</p>
              ) : opiniones.length === 0 ? (
                <p className="text-sm text-gray-600">Aún no hay opiniones para esta empresa.</p>
              ) : (
                <div className="space-y-5">
                  {opiniones.map((opinion) => (
                    <div key={opinion.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Postulante</p>
                          <p className="font-bold text-gray-900">{opinion.postulanteNombre}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Fecha</p>
                          <p className="font-medium text-gray-900">{formatearFecha(opinion.fecha)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= opinion.puntaje ? 'fill-[#FF8C00] text-[#FF8C00]' : 'text-gray-200'}
                          />
                        ))}
                        <span className="ml-2 font-bold text-gray-900">{opinion.puntaje}.0</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{opinion.comentario}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 text-gray-900 shadow-sm text-center">
              <h3 className="text-lg font-bold mb-4">Calificación de la empresa</h3>
              <div className="mb-2">
                <div className="text-5xl sm:text-6xl font-black mb-3 text-gray-900">{resumen.promedio.toFixed(1)}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={22} className={index < Math.round(resumen.promedio) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-medium">Basado en {resumen.cantidadOpiniones} opiniones</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estrellas</h3>
              <div className="space-y-3">
                {estrellasHelper.map((stars) => (
                  <div key={stars} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-4 font-bold">{stars}</span>
                    <Star size={14} className="fill-[#FF8C00] text-[#FF8C00]" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-[#FF8C00] h-2.5 rounded-full"
                        style={{ width: `${resumen.cantidadOpiniones ? (resumen.estrellas[stars] / resumen.cantidadOpiniones) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-gray-600">{resumen.estrellas[stars]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información legal</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1 bg-green-50 p-4 rounded-xl border border-green-200">
                  <p className="font-bold text-gray-900">RUC: 20123456789</p>
                  <p className="text-sm text-green-700 font-medium flex items-center gap-1">
                    <CheckCircle2 size={14} /> Verificado por SUNAT
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Razón Social</p>
                    <p className="text-sm font-bold text-gray-900">CONSTRUCCIONES PEREZ S.A.C.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Fecha de Inscripción</p>
                    <p className="text-sm font-bold text-gray-900">15/03/2008</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estado</p>
                    <p className="text-sm font-bold text-green-600">Activo</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Condición</p>
                    <p className="text-sm font-bold text-green-600">Habido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPostulante>
  );
}
