import LayoutEmpleadorMobile from '../shared/LayoutEmpleadorMobile';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export default function FormalizacionLaboralMobile() {
  const pasos = [
    { num: 1, titulo: 'Datos del Trabajador', desc: 'Información personal y documentos', completado: true },
    { num: 2, titulo: 'Tipo de Contrato', desc: 'Selecciona régimen laboral', completado: true },
    { num: 3, titulo: 'Beneficios y Remuneración', desc: 'Define salario y beneficios', completado: false },
    { num: 4, titulo: 'Firma Digital', desc: 'Firma del contrato', completado: false },
  ];

  return (
    <LayoutEmpleadorMobile>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Formalización</h1>
          <p className="text-sm text-muted-foreground">Facilita la contratación formal</p>
        </div>

        {/* Guía Rápida */}
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-5 text-white">
          <h3 className="font-bold mb-3">Guía de Formalización</h3>
          <div className="space-y-2 text-sm">
            <p>✓ Genera contratos en minutos</p>
            <p>✓ Cumple con la ley peruana</p>
            <p>✓ Firma digital válida</p>
            <p>✓ Registro en planilla</p>
          </div>
          <button className="w-full mt-4 bg-white text-primary px-4 py-2.5 rounded-xl font-medium hover:bg-gray-100">
            Ver guía completa
          </button>
        </div>

        {/* Wizard */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Proceso de Contratación</h2>
          <div className="space-y-5">
            {pasos.map((paso, idx) => (
              <div key={paso.num} className="flex gap-3">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    paso.completado ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {paso.completado ? <CheckCircle2 size={18} /> : paso.num}
                  </div>
                  {idx < pasos.length - 1 && (
                    <div className={`w-0.5 h-12 ${paso.completado ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{paso.titulo}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{paso.desc}</p>
                  {!paso.completado && idx === 2 && (
                    <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium text-sm">
                      Continuar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plantillas */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h2 className="font-bold text-gray-900 mb-4">Plantillas de Contratos</h2>
          <div className="space-y-3">
            {[
              { nombre: 'Contrato a Plazo Fijo', desc: 'Para proyectos temporales' },
              { nombre: 'Contrato Indefinido', desc: 'Para personal permanente' },
              { nombre: 'Contrato Part-Time', desc: 'Para jornada parcial' },
              { nombre: 'Contrato por Obra', desc: 'Para trabajos específicos' },
            ].map((plantilla) => (
              <div key={plantilla.nombre} className="border border-border rounded-xl p-4 hover:border-accent transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-blue-600" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{plantilla.nombre}</h3>
                    <p className="text-xs text-muted-foreground">{plantilla.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recursos */}
        <div className="bg-white rounded-xl p-5 border border-border">
          <h3 className="font-bold text-gray-900 mb-4">Recursos Útiles</h3>
          <div className="space-y-2">
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
    </LayoutEmpleadorMobile>
  );
}
