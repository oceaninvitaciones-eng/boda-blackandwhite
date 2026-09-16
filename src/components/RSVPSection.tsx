import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Calendar } from 'lucide-react';
import { RSVPConfig, WeddingCouple } from '../types';

interface RSVPSectionProps {
  rsvp: RSVPConfig;
  couple: WeddingCouple;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ rsvp, couple }) => {
  const [name, setName] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState('1');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [hasSent, setHasSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let message = `*Confirmación de Asistencia - Boda de ${couple.brideName} & ${couple.groomName}*\n\n`;
    message += `👤 *Nombre:* ${name.trim()}\n`;
    message += `💌 *Asistencia:* ${willAttend === 'yes' ? '¡Sí asistiré con alegría! 🎉' : 'Lamentablemente no podré asistir 🤍'}\n`;

    if (willAttend === 'yes') {
      message += `👥 *Pases / Personas:* ${guestsCount}\n`;
      if (dietaryNotes.trim()) {
        message += `🍽️ *Restricciones o Mensaje:* ${dietaryNotes.trim()}\n`;
      }
    } else if (dietaryNotes.trim()) {
      message += `💬 *Mensaje para los novios:* ${dietaryNotes.trim()}\n`;
    }

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${rsvp.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setHasSent(true);
  };

  return (
    <section id="rsvp-section" className="py-24 bg-neutral-950 text-white relative border-t border-neutral-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            Confirmación de Asistencia
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            R. S. V. P.
          </h2>
          <div className="w-12 h-px bg-neutral-600 mx-auto mt-4" />

          <div className="flex items-center justify-center gap-2 text-xs font-sans-wedding text-neutral-300 pt-3">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Por favor confirma antes del {rsvp.deadline}</span>
          </div>

          {rsvp.customNotes && (
            <p className="font-sans-wedding text-xs text-neutral-400 max-w-md mx-auto italic">
              {rsvp.customNotes}
            </p>
          )}
        </motion.div>

        {/* RSVP Card / Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-900 border border-neutral-800 p-5 sm:p-12 relative overflow-hidden"
        >
          {/* Subtle decorative corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40"></div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Guest Name */}
            <div>
              <label htmlFor="rsvp-name" className="block font-sans-wedding text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">
                Nombre y Apellido <span className="text-neutral-400">*</span>
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carlos Valenzuela"
                className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block font-sans-wedding text-xs tracking-[0.15em] uppercase text-neutral-300 mb-3">
                ¿Podrás acompañarnos?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setWillAttend('yes')}
                  className={`p-3.5 text-xs font-sans-wedding tracking-wider text-left flex items-center justify-between border transition-all cursor-pointer min-h-[48px] ${
                    willAttend === 'yes'
                      ? 'bg-neutral-800 border-white text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span>¡Sí, asistiré con gusto!</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      willAttend === 'yes' ? 'border-white bg-white' : 'border-neutral-600'
                    }`}
                  >
                    {willAttend === 'yes' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setWillAttend('no')}
                  className={`p-3.5 text-xs font-sans-wedding tracking-wider text-left flex items-center justify-between border transition-all cursor-pointer min-h-[48px] ${
                    willAttend === 'no'
                      ? 'bg-neutral-800 border-white text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span>Lo siento, no podré asistir</span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      willAttend === 'no' ? 'border-white bg-white' : 'border-neutral-600'
                    }`}
                  >
                    {willAttend === 'no' && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                </button>
              </div>
            </div>

            {/* Guest Count (if attending) */}
            {willAttend === 'yes' && (
              <div>
                <label htmlFor="rsvp-count" className="block font-sans-wedding text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">
                  Número de pases / Personas
                </label>
                <select
                  id="rsvp-count"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="1">1 Persona (Solo yo)</option>
                  <option value="2">2 Personas (Con acompañante)</option>
                  <option value="3">3 Personas</option>
                  <option value="4">4 Personas</option>
                </select>
              </div>
            )}

            {/* Dietary notes or well wishes */}
            <div>
              <label htmlFor="rsvp-notes" className="block font-sans-wedding text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">
                {willAttend === 'yes'
                  ? 'Alergias, restricciones alimenticias o mensaje'
                  : 'Dedica unas palabras a los novios'}
              </label>
              <textarea
                id="rsvp-notes"
                rows={3}
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder={
                  willAttend === 'yes'
                    ? 'Ej. Vegetariano, alergia a frutos secos...'
                    : '¡Les deseamos lo mejor en esta nueva etapa!'
                }
                className="w-full bg-neutral-950 border border-neutral-700 px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="rsvp-submit-btn"
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-white text-neutral-950 font-sans-wedding text-xs tracking-[0.2em] font-semibold uppercase hover:bg-neutral-200 transition-colors border border-white cursor-pointer shadow-lg min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar por WhatsApp</span>
            </button>

            {hasSent && (
              <div className="flex items-center justify-center gap-2 p-3 bg-neutral-950 border border-emerald-500/40 text-emerald-400 text-xs font-sans-wedding">
                <CheckCircle2 className="w-4 h-4" />
                <span>Se abrió WhatsApp para enviar tu confirmación. ¡Muchas gracias!</span>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
