import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Camera, Send } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past ~350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden fixed bottom-4 left-4 right-18 z-40 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-full px-3 py-2 shadow-2xl flex items-center justify-around"
          aria-label="Acceso rápido móvil"
        >
          <button
            onClick={() => scrollTo('ubicaciones-section')}
            className="flex flex-col items-center gap-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 px-2"
          >
            <MapPin className="w-3.5 h-3.5 text-neutral-300" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase">Lugar</span>
          </button>

          <div className="w-px h-4 bg-neutral-800" />

          <button
            onClick={() => scrollTo('itinerario-section')}
            className="flex flex-col items-center gap-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 px-2"
          >
            <Clock className="w-3.5 h-3.5 text-neutral-300" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase">Horario</span>
          </button>

          <div className="w-px h-4 bg-neutral-800" />

          <button
            onClick={() => scrollTo('galeria-section')}
            className="flex flex-col items-center gap-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 px-2"
          >
            <Camera className="w-3.5 h-3.5 text-neutral-300" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase">Fotos</span>
          </button>

          <div className="w-px h-4 bg-neutral-800" />

          <button
            onClick={() => scrollTo('rsvp-section')}
            className="flex flex-col items-center gap-0.5 text-white hover:text-white transition-colors cursor-pointer py-1 px-2 font-medium"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase font-semibold">RSVP</span>
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
