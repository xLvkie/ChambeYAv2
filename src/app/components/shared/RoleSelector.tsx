import { Link } from 'react-router-dom';

export default function RoleSelector() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 font-sans"
      style={{ background: 'linear-gradient(135deg, #0056B3 0%, #3b82f6 40%, #f9a479 70%, #FF8C00 100%)' }}
    >
      {/* HEADER */}
      <header className="text-center mb-12 flex flex-col items-center">
        <div className="bg-white w-[80px] h-[80px] rounded-[20px] flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.1)] mb-6">
          <img 
            src="https://i.ibb.co/rD42gdt/logo-solo-org.png" 
            alt="Logo ChambeaYa" 
            className="w-[55px] h-[55px] object-contain"
          />
        </div>
        <h1 className="text-white text-[2.2rem] md:text-5xl font-bold mb-2 tracking-tight">
          ChambeaYa
        </h1>
        <p className="text-white/90 text-[1.1rem] font-normal">
          Conectando talento con oportunidades
        </p>
      </header>

      {/* CARDS CONTAINER */}
      <section className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-[400px] md:max-w-[900px]">
        
        {/* TARJETA POSTULANTE */}
        <Link 
          to="/postulante/login" 
          className="group bg-white rounded-[20px] p-6 text-left flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] w-full"
        >
          <div className="flex items-start gap-5 mb-8">
            <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-white shrink-0 bg-[#2563eb]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2Z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1.4rem] font-bold text-[#111827] mb-1">Busco Empleo</h2>
              <p className="text-[0.95rem] text-[#6b7280] leading-snug">Encuentra tu próximo trabajo ideal</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-[#9ca3af] text-[0.9rem] font-medium pt-4 border-t border-[#f3f4f6] transition-colors group-hover:text-[#4b5563]">
            <span>Para trabajadores</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </Link>

        {/* TARJETA EMPLEADOR */}
        <Link 
          to="/empleador/login" 
          className="group bg-white rounded-[20px] p-6 text-left flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)] w-full"
        >
          <div className="flex items-start gap-5 mb-8">
            <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-white shrink-0 bg-[#f97316]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1.4rem] font-bold text-[#111827] mb-1">Busco Talento</h2>
              <p className="text-[0.95rem] text-[#6b7280] leading-snug">Encuentra trabajadores calificados</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-[#9ca3af] text-[0.9rem] font-medium pt-4 border-t border-[#f3f4f6] transition-colors group-hover:text-[#4b5563]">
            <span>Para empleadores</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="mt-14 text-center">
        <p className="text-white/80 text-[0.95rem] mb-2">
          ¿Primera vez en ChambeaYa?
        </p>
        <a href="#" className="text-white font-semibold underline underline-offset-4 text-[1rem] hover:text-[#f3f4f6]">
          Conoce más sobre nosotros
        </a>
      </footer>

    </div>
  );
}