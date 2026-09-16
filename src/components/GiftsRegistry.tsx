import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, CreditCard, Copy, Check, ExternalLink } from 'lucide-react';
import { GiftRegistry } from '../types';

interface GiftsRegistryProps {
  giftRegistry: GiftRegistry;
}

export const GiftsRegistry: React.FC<GiftsRegistryProps> = ({ giftRegistry }) => {
  const [copiedClabe, setCopiedClabe] = useState(false);

  const handleCopyClabe = () => {
    if (!giftRegistry.bankAccount) return;
    navigator.clipboard.writeText(giftRegistry.bankAccount.clabe);
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  return (
    <section id="regalos-section" className="py-24 bg-neutral-900 border-t border-neutral-800 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-14 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            Detalles Especiales
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-5xl font-light tracking-wide text-white">
            Mesa de Regalos
          </h2>
          <div className="w-12 h-px bg-neutral-600 mx-auto mt-4" />
          <p className="font-sans-wedding text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto pt-3 font-light leading-relaxed">
            {giftRegistry.message}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Department Stores */}
          {giftRegistry.stores && giftRegistry.stores.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-neutral-950 border border-neutral-800 p-5 sm:p-8 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Gift className="w-5 h-5 text-neutral-300" />
                  <h3 className="font-serif-wedding text-xl sm:text-2xl text-white font-light">
                    Mesas Departamentales
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {giftRegistry.stores.map((store) => (
                    <div
                      key={store.name}
                      className="p-3.5 sm:p-4 bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-sans-wedding text-sm font-medium text-white">
                          {store.name}
                        </h4>
                        {store.eventNumber && (
                          <p className="font-sans-wedding text-xs text-neutral-400 font-light mt-0.5">
                            {store.eventNumber}
                          </p>
                        )}
                      </div>
                      <a
                        href={store.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white text-neutral-950 text-xs font-sans-wedding tracking-wider uppercase font-semibold hover:bg-neutral-200 transition-colors min-h-[40px]"
                      >
                        <span>Ver Mesa</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Bank Transfer */}
          {giftRegistry.bankAccount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-neutral-950 border border-neutral-800 p-5 sm:p-8 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <CreditCard className="w-5 h-5 text-neutral-300" />
                  <h3 className="font-serif-wedding text-xl sm:text-2xl text-white font-light">
                    Transferencia Bancaria
                  </h3>
                </div>

                <div className="space-y-3 font-sans-wedding text-xs sm:text-sm text-neutral-300 font-light p-4 sm:p-5 bg-neutral-900/60 border border-neutral-800">
                  <div>
                    <span className="text-neutral-500 text-[10px] tracking-wider uppercase block">Banco</span>
                    <span className="text-white font-medium">{giftRegistry.bankAccount.bankName}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] tracking-wider uppercase block">Beneficiario</span>
                    <span className="text-white font-medium">{giftRegistry.bankAccount.beneficiary}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] tracking-wider uppercase block">Cuenta CLABE</span>
                    <span className="text-white font-mono text-xs sm:text-sm tracking-wider break-all">{giftRegistry.bankAccount.clabe}</span>
                  </div>

                  <div>
                    <span className="text-neutral-500 text-[10px] tracking-wider uppercase block">Concepto</span>
                    <span className="text-neutral-300">{giftRegistry.bankAccount.concept}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 sm:pt-6">
                <button
                  id="copy-clabe-btn"
                  onClick={handleCopyClabe}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-neutral-100 text-neutral-950 text-xs font-sans-wedding tracking-[0.15em] uppercase font-semibold hover:bg-white transition-colors cursor-pointer min-h-[44px]"
                >
                  {copiedClabe ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>¡CLABE Copiada al portapapeles!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar CLABE Interbancaria</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
