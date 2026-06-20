import LayoutEmpleador from '../shared/LayoutEmpleador';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function FormalizacionLaboral() {
  const pasos = [
    { num: 1, titulo: 'Datos del Trabajador', desc: 'Información personal y documentos', completado: true },
    { num: 2, titulo: 'Tipo de Contrato', desc: 'Selecciona régimen laboral', completado: true },
    { num: 3, titulo: 'Beneficios y Remuneración', desc: 'Define salario y beneficios', completado: false },
    { num: 4, titulo: 'Firma Digital', desc: 'Firma del contrato', completado: false },
  ];

  return (
    <LayoutEmpleador>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Formalización Laboral</h1>
          <p className="text-lg text-muted-foreground">Facilita la contratación formal de tu personal</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Wizard */}
            <div className="bg-white rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Proceso de Contratación</h2>
              <div className="space-y-6">
                {pasos.map((paso, idx) => (
                  <div key={paso.num} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        paso.completado ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {paso.completado ? <CheckCircle2 size={24} /> : paso.num}
                      </div>
                      {idx < pasos.length - 1 && (
                        <div className={`w-0.5 h-16 ${paso.completado ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-16">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{paso.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{paso.desc}</p>
                      {!paso.completado && idx === 2 && (
                        <button className="mt-4 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium">
                          Continuar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plantillas */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Plantillas de Contratos</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { nombre: 'Contrato a Plazo Fijo', desc: 'Para proyectos temporales' },
                  { nombre: 'Contrato Indefinido', desc: 'Para personal permanente' },
                  { nombre: 'Contrato Part-Time', desc: 'Para jornada parcial' },
                  { nombre: 'Contrato por Obra', desc: 'Para trabajos específicos' },
                ].map((plantilla) => (
                  <div key={plantilla.nombre} className="border border-border rounded-xl p-4 hover:border-accent transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{plantilla.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{plantilla.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guía Rápida */}
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-4">Guía de Formalización</h3>
              <div className="space-y-3 text-sm">
                <p>✓ Genera contratos en minutos</p>
                <p>✓ Cumple con la ley peruana</p>
                <p>✓ Firma digital válida</p>
                <p>✓ Registro en planilla</p>
              </div>
              <button className="w-full mt-4 bg-white text-primary px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100">
                Ver guía completa
              </button>
            </div>

            {/* Recursos */}
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold text-gray-900 mb-4">Recursos Útiles</h3>
              <div className="space-y-3">
                {[
                  'Guía SUNAT - Planilla Electrónica',
                  'Regímenes Laborales en Perú',
                  'Calculadora de Beneficios',
                ].map((recurso) => (
                  <button key={recurso} className="w-full text-left px-4 py-3 border border-border rounded-lg hover:border-primary transition-colors flex items-center justify-between group">
                    <span className="text-sm text-gray-700">{recurso}</span>
                    <Download size={16} className="text-gray-400 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutEmpleador>
  );
}
