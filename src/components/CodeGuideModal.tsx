import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileCode, X, Check, Code, Sparkles, BookOpen } from 'lucide-react';

export const CodeGuideModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  const copyPath = () => {
    navigator.clipboard.writeText('src/weddingData.ts');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40">
        <button
          id="toggle-guide-modal-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-full border border-neutral-700 backdrop-blur-md shadow-lg transition-all text-xs font-sans-wedding tracking-wider cursor-pointer"
          title="Ver cómo personalizar el código fácilmente"
        >
          <Code className="w-3.5 h-3.5 text-neutral-300" />
          <span className="hidden sm:inline">Cómo Editar Datos</span>
          <span className="sm:hidden text-[10px] tracking-wider uppercase">Editar</span>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-950 border border-neutral-800 text-white max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Close button */}
              <button
                id="close-guide-modal-btn"
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Cerrar guía"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                <div className="p-2 bg-neutral-900 border border-neutral-700">
                  <FileCode className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif-wedding text-2xl text-white">
                    Guía de Edición Fácil
                  </h3>
                  <p className="font-sans-wedding text-xs text-neutral-400">
                    Todos los datos de la boda están centralizados en un único archivo
                  </p>
                </div>
              </div>

              {/* Main file box */}
              <div className="mb-6 p-4 bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-sans-wedding tracking-widest text-neutral-400 block">
                    Archivo a editar:
                  </span>
                  <code className="text-sm font-mono text-white font-semibold">
                    src/weddingData.ts
                  </code>
                </div>
                <button
                  id="copy-file-path-btn"
                  onClick={copyPath}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans-wedding tracking-wide rounded transition-colors cursor-pointer"
                >
                  {copiedPath ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <span>Copiar ruta</span>
                  )}
                </button>
              </div>

              {/* Sections list */}
              <div className="space-y-4 font-sans-wedding text-xs text-neutral-300">
                <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-medium text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>1. Nombres y Monograma</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Edita el bloque <code className="text-neutral-200">couple</code> con los nombres de los novios, apellidos y el monograma (ej: <code>S & V</code>).
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-medium text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>2. Fecha y Cuenta Regresiva</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Edita <code className="text-neutral-200">date.isoDate</code> (formato <code>YYYY-MM-DDTHH:mm:ss</code>) para que la cuenta regresiva calcule los días exactos en tiempo real.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-medium text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>3. Portada y Galería de Fotos</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    En <code className="text-neutral-200">coverImage</code> puedes colocar la foto de los novios, y en <code className="text-neutral-200">gallery</code> puedes agregar o cambiar fotos con sus títulos.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-medium text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>4. Ubicaciones & Google Maps</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    En <code className="text-neutral-200">locations</code> coloca las direcciones y enlaces a Google Maps o Waze de la ceremonia y la fiesta.
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/40 border border-neutral-800/80">
                  <div className="flex items-center gap-2 font-medium text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                    <span>5. WhatsApp para Confirmaciones (RSVP)</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Configura tu número en <code className="text-neutral-200">rsvp.whatsappNumber</code> con código de país (ej. <code>5255...</code>) para recibir las confirmaciones directamente en tu teléfono.
                  </p>
                </div>
              </div>

              {/* Close footer button */}
              <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 bg-white text-neutral-950 text-xs font-sans-wedding font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Entendido, cerrar guía
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
