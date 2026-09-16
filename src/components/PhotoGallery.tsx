import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoGalleryProps {
  gallery: GalleryPhoto[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ gallery }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === 0 ? gallery.length - 1 : prev! - 1));
  }, [selectedIndex, gallery.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === gallery.length - 1 ? 0 : prev! + 1));
  }, [selectedIndex, gallery.length]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <section id="galeria-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-white relative">
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
            Sesión Preboda
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            Sesión de Fotos
          </h2>
          <div className="w-12 h-px bg-neutral-600 mx-auto mt-4" />
          <p className="font-sans-wedding text-xs sm:text-sm text-neutral-400 max-w-md mx-auto pt-2 font-light">
            Una mirada íntima previa a nuestro enlace matrimonial capturada en blanco y negro. Toca cualquier fotografía para verla en pantalla completa.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {gallery.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleOpen(index)}
              className="group relative cursor-pointer overflow-hidden bg-neutral-950 border border-neutral-800 aspect-[4/5]"
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-105 brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Overlay (always visible caption on mobile for ease of viewing, full overlay on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1.5 mb-1 text-neutral-300">
                  <Eye className="w-3.5 h-3.5 text-white" />
                  <span className="font-sans-wedding text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">Ampliar foto</span>
                </div>
                <h3 className="font-serif-wedding text-lg sm:text-xl text-white font-light">
                  {photo.caption}
                </h3>
                {photo.subtitle && (
                  <p className="font-sans-wedding text-[11px] sm:text-xs text-neutral-300 font-light mt-0.5 line-clamp-1">
                    {photo.subtitle}
                  </p>
                )}
              </div>

              {/* Corner framing line */}
              <div className="absolute inset-2 border border-white/10 sm:border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Mobile Touch Swipe */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 select-none touch-pan-y"
            onClick={handleClose}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-neutral-900/80 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Siguiente foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative border border-neutral-800 bg-neutral-950 p-1.5 sm:p-2 shadow-2xl max-w-full">
                <img
                  src={gallery[selectedIndex].url}
                  alt={gallery[selectedIndex].caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain filter grayscale contrast-105 mx-auto"
                />
              </div>

              <div className="mt-3 sm:mt-4 text-center px-4">
                <div className="font-serif-wedding text-xl sm:text-2xl text-white">
                  {gallery[selectedIndex].caption}
                </div>
                {gallery[selectedIndex].subtitle && (
                  <div className="font-sans-wedding text-xs text-neutral-400 tracking-wider mt-0.5">
                    {gallery[selectedIndex].subtitle}
                  </div>
                )}
                <div className="font-sans-wedding text-[10px] text-neutral-400 mt-1.5 tracking-widest uppercase">
                  {selectedIndex + 1} de {gallery.length} • Desliza para navegar
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
