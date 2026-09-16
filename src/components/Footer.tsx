import React from 'react';
import { WeddingCouple, WeddingDate } from '../types';

interface FooterProps {
  couple: WeddingCouple;
  date: WeddingDate;
}

export const Footer: React.FC<FooterProps> = ({ couple, date }) => {
  return (
    <footer className="py-20 bg-black text-white border-t border-neutral-800/80 text-center relative overflow-hidden">
      <div className="max-w-xl mx-auto px-6 space-y-6">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border border-neutral-700 flex items-center justify-center mx-auto">
          <span className="font-serif-wedding text-lg tracking-widest text-neutral-300">
            {couple.monogram}
          </span>
        </div>

        {/* Names */}
        <div className="font-serif-wedding text-3xl sm:text-4xl text-neutral-200 font-light">
          {couple.brideName} & {couple.groomName}
        </div>

        <p className="font-sans-wedding text-xs tracking-[0.25em] text-neutral-400 uppercase">
          {date.formattedDate}
        </p>

        <div className="w-16 h-px bg-neutral-800 mx-auto" />

        <p className="font-serif-wedding text-base italic text-neutral-400">
          “Gracias por ser parte fundamental de nuestras vidas y acompañarnos en este día irrepetible.”
        </p>
      </div>
    </footer>
  );
};
