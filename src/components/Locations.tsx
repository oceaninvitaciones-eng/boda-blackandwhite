import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Copy, Check, ExternalLink, Info } from 'lucide-react';
import { WeddingLocationItem } from '../types';

interface LocationsProps {
  locations: WeddingLocationItem[];
}

export const Locations: React.FC<LocationsProps> = ({ locations }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (loc: WeddingLocationItem) => {
    const fullText = `${loc.title}, ${loc.address}, ${loc.city}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopiedId(loc.id);
      }).catch(() => {
        fallbackCopy(fullText, loc.id);
      });
    } else {
      fallbackCopy(fullText, loc.id);
    }

    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const fallbackCopy = (text: string, id: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
    } catch {
      // Ignored
    }
  };

  return (
    <section id="ubicaciones-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            ¿Dónde & Cuándo?
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            Ubicaciones
          </h2>
          <div className="w-12 h-px bg-neutral-600 mx-auto mt-4" />
          <p className="font-sans-wedding text-xs sm:text-sm text-neutral-400 font-light max-w-md mx-auto mt-2">
            Presiona cualquier botón para abrir tu aplicación de mapas favorita y obtener la ruta directa
          </p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-neutral-950 border border-neutral-800 rounded-none flex flex-col justify-between overflow-hidden group hover:border-neutral-600 transition-all duration-300 relative shadow-xl"
            >
              {/* Corner decorative marks */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-neutral-500 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-neutral-500 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-neutral-500 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-neutral-500 z-20 pointer-events-none" />

              <div>
                {/* Photo Header */}
                {loc.photoUrl && (
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={loc.photoUrl}
                      alt={loc.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // In case image fails, keep clean background without broken image icon
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      className="w-full h-full object-cover filter grayscale contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                    
                    {/* Badge on Photo */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-white/25 text-[10px] sm:text-[11px] font-sans-wedding tracking-[0.2em] uppercase font-medium text-neutral-100 shadow-md">
                        {loc.tag}
                      </span>
                    </div>
                  </div>
                )}

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-5">
                  {!loc.photoUrl && (
                    <span className="inline-block bg-neutral-900 border border-neutral-700 px-3 py-1 text-[10px] sm:text-[11px] font-sans-wedding tracking-[0.2em] uppercase text-neutral-300">
                      {loc.tag}
                    </span>
                  )}

                  <div>
                    <h3 className="font-serif-wedding text-2xl sm:text-3xl text-white font-light tracking-wide mb-3">
                      {loc.title}
                    </h3>

                    {/* Time pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-sans-wedding tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="font-medium">{loc.time}</span>
                    </div>
                  </div>

                  {/* Address Box */}
                  <div className="p-4 bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                      <div className="font-sans-wedding text-xs sm:text-sm text-neutral-200">
                        <p className="font-medium text-white">{loc.address}</p>
                        <p className="text-neutral-400 text-xs mt-0.5">{loc.city}</p>
                      </div>
                    </div>

                    {loc.note && (
                      <div className="flex items-start gap-2 pt-2.5 mt-2 border-t border-neutral-800/80 text-xs text-neutral-400 font-sans-wedding">
                        <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                        <span className="italic">{loc.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons: 2 tiers (Google Maps prominent + Waze & Copiar side by side) */}
              <div className="p-6 sm:p-8 pt-0 space-y-2.5">
                {/* Primary Button: Google Maps */}
                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white text-neutral-950 text-xs font-sans-wedding tracking-[0.15em] uppercase font-semibold hover:bg-neutral-200 transition-colors border border-white min-h-[44px] shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                </a>

                {/* Secondary Row: Waze + Copiar Dirección */}
                <div className="grid grid-cols-2 gap-2.5">
                  {loc.wazeUrl ? (
                    <a
                      href={loc.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-sans-wedding tracking-[0.1em] uppercase hover:bg-neutral-800 hover:text-white transition-colors min-h-[44px]"
                    >
                      <span>Abrir Waze</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={() => handleCopyAddress(loc)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-sans-wedding tracking-[0.1em] hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer min-h-[44px]"
                    title="Copiar dirección completa"
                  >
                    {copiedId === loc.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium text-xs">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-xs">Copiar Datos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
