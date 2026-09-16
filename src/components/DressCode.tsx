import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { DressCode as DressCodeType } from '../types';

interface DressCodeProps {
  dressCode: DressCodeType;
}

export const DressCode: React.FC<DressCodeProps> = ({ dressCode }) => {
  return (
    <section id="dresscode-section" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            Código de Vestimenta
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            {dressCode.title}
          </h2>
          <p className="font-serif-wedding text-base sm:text-lg italic text-neutral-300">
            {dressCode.subtitle}
          </p>
          <div className="w-12 h-px bg-neutral-700 mx-auto mt-4" />
        </motion.div>

        {/* Color Palette Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-14"
        >
          <p className="font-sans-wedding text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6">
            Gama de Colores Sugerida
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {dressCode.paletteColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg border relative flex items-center justify-center ${
                    color.isForbidden
                      ? 'border-red-500/60'
                      : 'border-neutral-600'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {color.isForbidden && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-lg">
                      ✕
                    </div>
                  )}
                </div>
                <span className="font-sans-wedding text-[10px] sm:text-[11px] tracking-wider text-neutral-300 max-w-[90px] sm:max-w-[100px]">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 text-left mb-10 sm:mb-12">
          {/* Men */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-5 sm:p-8 bg-neutral-900 border border-neutral-800"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 text-neutral-300" />
              <h3 className="font-serif-wedding text-xl sm:text-2xl text-white font-light">Caballeros</h3>
            </div>
            <ul className="space-y-2 sm:space-y-3 font-sans-wedding text-xs sm:text-sm text-neutral-300 font-light list-disc list-inside">
              {dressCode.menGuidelines.map((g, idx) => (
                <li key={idx} className="leading-relaxed">
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Women */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-5 sm:p-8 bg-neutral-900 border border-neutral-800"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 text-neutral-300" />
              <h3 className="font-serif-wedding text-xl sm:text-2xl text-white font-light">Damas</h3>
            </div>
            <ul className="space-y-2 sm:space-y-3 font-sans-wedding text-xs sm:text-sm text-neutral-300 font-light list-disc list-inside">
              {dressCode.womenGuidelines.map((g, idx) => (
                <li key={idx} className="leading-relaxed">
                  {g}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Important Notice */}
        {dressCode.importantNotice && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900/80 border border-neutral-700 text-xs font-sans-wedding text-neutral-300"
          >
            <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>{dressCode.importantNotice}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
