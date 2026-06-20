import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

// Esta hook ya no es de utilidad, ya que se eliminaran los componentes responsivos y se adaptaran 
// los componentes para que sean responsivos por si mismos, eliminando la necesidad de esta diferenciación.
// De todas formas se mantendra este hook hasta terminar con la sección de empleadores, para evitar errores en el proceso de edición.
