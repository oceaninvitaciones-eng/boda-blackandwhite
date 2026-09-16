import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { WeddingCouple, WeddingDate } from '../types';

interface HeroCoverProps {
  couple: WeddingCouple;
  date: WeddingDate;
  coverImage: {
    url: string;
    alt: string;
    subtitle: string;
  };
}

export const HeroCover: React.FC<HeroCoverProps> = ({ couple, date, coverImage }) => {
  const scrollToNext = () => {
    const target = document.getElementById('historia-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative w-full min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background with B&W cover photo and artistic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={coverImage.url}
          alt={coverImage.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter grayscale contrast-110 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Editorial gradient vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* Elegant Frame Outline - tight on mobile for maximum content space */}
      <div className="absolute inset-3 sm:inset-8 md:inset-12 border border-white/15 pointer-events-none z-10" />
      <div className="absolute inset-4 sm:inset-9 md:inset-13 border border-white/5 pointer-events-none z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-center">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-4 sm:mb-8"
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/40 flex items-center justify-center p-1.5 sm:p-2 relative">
            <div className="w-full h-full rounded-full border border-dashed border-white/30 flex items-center justify-center">
              <span className="font-serif-wedding text-xl sm:text-3xl tracking-widest text-neutral-100 font-light">
                {couple.monogram}
              </span>
            </div>
            {/* Corner accents */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-t border-l border-white/60"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r border-white/60"></div>
          </div>
        </motion.div>

        {/* Subtitle / Header text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-1 sm:space-y-2 mb-4 sm:mb-6"
        >
          <p className="font-sans-wedding text-[10px] sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase text-neutral-300">
            {coverImage.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-white/40"></div>
            <span className="text-white/60 text-[10px] sm:text-xs tracking-widest">✦</span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-white/40"></div>
          </div>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="space-y-1 sm:space-y-3 mb-6 sm:mb-8"
        >
          <h1 className="font-serif-wedding text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-tight text-white font-light leading-none">
            <span className="block">{couple.brideName}</span>
            <span className="font-script-wedding text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-neutral-300 block -my-1 sm:-my-4 italic">
              &
            </span>
            <span className="block">{couple.groomName}</span>
          </h1>
        </motion.div>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-8 py-3 sm:py-4 border-y border-white/15 px-4 sm:px-8 max-w-sm sm:max-w-none"
        >
          <div className="flex items-center gap-2 text-neutral-200">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 stroke-[1.5]" />
            <span className="font-sans-wedding text-[11px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">
              {date.formattedDate}
            </span>
          </div>

          <div className="hidden sm:block text-neutral-600">•</div>

          <div className="flex items-center gap-2 text-neutral-200">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 stroke-[1.5]" />
            <span className="font-sans-wedding text-[11px] sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light">
              {date.calendarEvent.location}
            </span>
          </div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.button
          id="hero-scroll-down-btn"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 sm:mt-14 flex flex-col items-center gap-1.5 sm:gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          aria-label="Desplazarse hacia abajo"
        >
          <span className="font-sans-wedding text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase">
            Desliza para ver la invitación
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300 group-hover:text-white" />
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
};
