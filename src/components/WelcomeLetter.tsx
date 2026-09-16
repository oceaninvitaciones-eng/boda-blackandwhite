import React from 'react';
import { motion } from 'motion/react';
import { WeddingCouple, WeddingConfig } from '../types';

interface WelcomeLetterProps {
  couple: WeddingCouple;
  loveQuote: WeddingConfig['loveQuote'];
  welcomeLetter: WeddingConfig['welcomeLetter'];
}

export const WelcomeLetter: React.FC<WelcomeLetterProps> = ({
  couple,
  loveQuote,
  welcomeLetter,
}) => {
  return (
    <section id="historia-section" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20 px-4"
        >
          <span className="text-3xl sm:text-4xl text-neutral-500 font-serif-wedding block mb-2">“</span>
          <p className="font-serif-wedding text-xl sm:text-2xl md:text-3xl italic text-neutral-200 leading-relaxed font-light max-w-2xl mx-auto">
            {loveQuote.text.replace(/“|”/g, '')}
          </p>
          <div className="mt-4 font-sans-wedding text-xs tracking-[0.25em] uppercase text-neutral-400">
            — {loveQuote.author}
          </div>
        </motion.div>

        {/* Formal blessing of parents */}
        {(couple.parentsBride || couple.parentsGroom) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 pb-16 border-b border-neutral-800 text-center"
          >
            <p className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400 mb-8">
              Con la bendición de Dios y en compañía de nuestros queridos padres
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-2xl mx-auto">
              {couple.parentsBride && (
                <div className="space-y-1.5 p-6 border border-neutral-900 bg-neutral-900/30">
                  <span className="font-sans-wedding text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                    Padres de la Novia
                  </span>
                  <div className="font-serif-wedding text-lg sm:text-xl text-neutral-200">
                    {couple.parentsBride.father}
                  </div>
                  <div className="font-serif-wedding text-lg sm:text-xl text-neutral-200">
                    {couple.parentsBride.mother}
                  </div>
                </div>
              )}

              {couple.parentsGroom && (
                <div className="space-y-1.5 p-6 border border-neutral-900 bg-neutral-900/30">
                  <span className="font-sans-wedding text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">
                    Padres del Novio
                  </span>
                  <div className="font-serif-wedding text-lg sm:text-xl text-neutral-200">
                    {couple.parentsGroom.father}
                  </div>
                  <div className="font-serif-wedding text-lg sm:text-xl text-neutral-200">
                    {couple.parentsGroom.mother}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Letter from the couple */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative max-w-2xl mx-auto text-center space-y-6"
        >
          <div className="inline-block p-1 border-b border-neutral-700 mb-2">
            <h2 className="font-serif-wedding text-3xl sm:text-4xl text-white font-light tracking-wide">
              {welcomeLetter.title}
            </h2>
          </div>

          <div className="space-y-4 text-neutral-300 font-sans-wedding text-sm sm:text-base leading-relaxed font-light">
            {welcomeLetter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Couple signoff */}
          <div className="pt-8">
            <p className="font-script-wedding text-4xl sm:text-5xl text-neutral-200">
              {couple.brideName} & {couple.groomName}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
