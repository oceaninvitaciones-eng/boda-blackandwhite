import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Download, Check } from 'lucide-react';
import { WeddingDate } from '../types';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface CountdownProps {
  date: WeddingDate;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(date.isoDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [date.isoDate]);

  const handleDownloadIcs = () => {
    downloadIcsFile(
      date.calendarEvent.title,
      date.calendarEvent.description,
      date.calendarEvent.location,
      date.isoDate
    );
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const googleCalendarUrl = getGoogleCalendarUrl(
    date.calendarEvent.title,
    date.calendarEvent.description,
    date.calendarEvent.location,
    date.isoDate
  );

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-20 bg-neutral-900 border-b border-neutral-800 text-white overflow-hidden">
      {/* Subtle background luxury texture */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-2"
        >
          <span className="font-sans-wedding text-xs tracking-[0.3em] uppercase text-neutral-400">
            Falta muy poco
          </span>
          <h2 className="font-serif-wedding text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-neutral-100">
            Cuenta Regresiva
          </h2>
          <div className="w-12 h-px bg-neutral-500 mx-auto mt-4" />
        </motion.div>

        {/* Counter grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="group relative bg-neutral-950/80 border border-neutral-800 rounded-none p-4 sm:p-8 flex flex-col items-center justify-center transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-950 min-h-[90px] sm:min-h-[140px]"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-600"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-600"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-600"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-600"></div>

              <div className="font-serif-wedding text-3xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-1 sm:mb-2 tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="font-sans-wedding text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-neutral-400 uppercase">
                {unit.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Calendar integration buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto"
        >
          <a
            id="countdown-google-cal-btn"
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-neutral-950 text-xs tracking-[0.15em] sm:tracking-[0.2em] font-sans-wedding uppercase font-semibold hover:bg-neutral-200 transition-colors border border-white min-h-[44px]"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Agregar a Google Calendar</span>
          </a>

          <button
            id="countdown-download-ics-btn"
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-white text-xs tracking-[0.15em] sm:tracking-[0.2em] font-sans-wedding uppercase font-medium hover:bg-neutral-800 transition-colors border border-neutral-700 cursor-pointer min-h-[44px]"
          >
            {copiedNotification ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Descargado!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Descargar Apple / Outlook (.ics)</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
