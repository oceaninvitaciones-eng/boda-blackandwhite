import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Send } from 'lucide-react';

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
          className="fixed bottom-4 sm:bottom-6 left-4 right-18 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-40 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 rounded-full px-3.5 sm:px-5 py-1.5 shadow-2xl flex items-center justify-between sm:justify-center sm:gap-6"
          aria-label="Acceso rápido"
        >
          {/* 1. Lugar */}
          <button
            onClick={() => scrollTo('ubicaciones-section')}
            className="flex flex-col items-center justify-center gap-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 px-3 min-h-[44px] min-w-[56px]"
          >
            <MapPin className="w-4 h-4 text-neutral-300" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase font-medium">Lugar</span>
          </button>

          <div className="w-px h-5 bg-neutral-800" />

          {/* 2. Horario */}
          <button
            onClick={() => scrollTo('itinerario-section')}
            className="flex flex-col items-center justify-center gap-0.5 text-neutral-300 hover:text-white transition-colors cursor-pointer py-1 px-3 min-h-[44px] min-w-[56px]"
          >
            <Clock className="w-4 h-4 text-neutral-300" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase font-medium">Horario</span>
          </button>

          <div className="w-px h-5 bg-neutral-800" />

          {/* 3. Confirmar */}
          <button
            onClick={() => scrollTo('rsvp-section')}
            className="flex flex-col items-center justify-center gap-0.5 text-white hover:text-neutral-200 transition-colors cursor-pointer py-1 px-3 min-h-[44px] min-w-[56px]"
          >
            <Send className="w-4 h-4 text-white" />
            <span className="font-sans-wedding text-[9px] tracking-wider uppercase font-semibold">Confirmar</span>
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

