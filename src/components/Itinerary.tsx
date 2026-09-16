import React from 'react';
import { motion } from 'motion/react';
import { Church, Wine, UtensilsCrossed, Heart, Music, Camera, Sparkles, Cake } from 'lucide-react';
import { ItineraryItem } from '../types';

interface ItineraryProps {
  itinerary: ItineraryItem[];
}

export const Itinerary: React.FC<ItineraryProps> = ({ itinerary }) => {
  const getIcon = (iconName: ItineraryItem['iconName']) => {
    const props = { className: 'w-5 h-5 text-neutral-100' };
    switch (iconName) {
      case 'church':
        return <Church {...props} />;
      case 'cheers':
        return <Wine {...props} />;
      case 'utensils':
        return <UtensilsCrossed {...props} />;
      case 'heart':
        return <Heart {...props} />;
      case 'music':
        return <Music {...props} />;
      case 'camera':
        return <Camera {...props} />;
      case 'cake':
        return <Cake {...props} />;
      case 'sparkles':
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <section id="itinerario-section" className="py-24 bg-neutral-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-20 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            Cronograma del Gran Día
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            Itinerario
          </h2>
          <div className="w-12 h-px bg-neutral-600 mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12 relative">
            {itinerary.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-4 sm:gap-6 md:gap-12 pl-12 md:pl-0`}
                >
                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <div className="bg-neutral-900/70 border border-neutral-800 p-5 sm:p-6 hover:border-neutral-700 transition-colors">
                      <div className="inline-block px-2.5 py-0.5 bg-white text-neutral-950 font-sans-wedding text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold uppercase mb-2 sm:mb-3">
                        {item.time}
                      </div>

                      <h3 className="font-serif-wedding text-xl sm:text-2xl text-white font-light mb-1 sm:mb-1.5">
                        {item.title}
                      </h3>

                      <p className="font-sans-wedding text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node Icon */}
                  <div className="absolute left-5 md:left-1/2 top-5 -translate-x-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950 border border-neutral-700 shadow-md">
                    {getIcon(item.iconName)}
                  </div>

                  {/* Empty Spacer for alternating desktop layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
