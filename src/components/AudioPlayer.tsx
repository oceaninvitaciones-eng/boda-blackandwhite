import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isCancelledRef = useRef<boolean>(false);
  const timeoutIdsRef = useRef<number[]>([]);

  // Romantic gentle wedding piano progression in A major:
  // Chords: A - C#m - D - E (peaceful, romantic, soothing)
  const notesSequence: { freq: number; duration: number; timeOffset: number }[] = [
    // A Major chord arpeggios
    { freq: 220.0, duration: 1.8, timeOffset: 0.0 },   // A3
    { freq: 277.18, duration: 1.6, timeOffset: 0.3 },  // C#4
    { freq: 329.63, duration: 1.6, timeOffset: 0.6 },  // E4
    { freq: 440.0, duration: 2.2, timeOffset: 0.9 },   // A4
    { freq: 554.37, duration: 2.5, timeOffset: 1.4 },  // C#5

    // F# minor / D major romantic lift
    { freq: 293.66, duration: 1.8, timeOffset: 2.4 },  // D4
    { freq: 369.99, duration: 1.6, timeOffset: 2.7 },  // F#4
    { freq: 440.0, duration: 1.8, timeOffset: 3.0 },   // A4
    { freq: 587.33, duration: 2.2, timeOffset: 3.4 },  // D5
    { freq: 554.37, duration: 2.0, timeOffset: 4.2 },  // C#5

    // E Major warmth
    { freq: 164.81, duration: 2.0, timeOffset: 5.0 },  // E3
    { freq: 246.94, duration: 1.6, timeOffset: 5.3 },  // B3
    { freq: 329.63, duration: 1.8, timeOffset: 5.6 },  // E4
    { freq: 415.30, duration: 2.0, timeOffset: 6.0 },  // G#4
    { freq: 493.88, duration: 2.4, timeOffset: 6.4 },  // B4

    // Resolution back to A
    { freq: 220.0, duration: 3.0, timeOffset: 7.2 },   // A3
    { freq: 277.18, duration: 2.8, timeOffset: 7.5 },  // C#4
    { freq: 329.63, duration: 3.0, timeOffset: 7.8 },  // E4
    { freq: 440.0, duration: 3.5, timeOffset: 8.2 },   // A4
  ];

  const playTone = (ctx: AudioContext, freq: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft triangle + sine wave combination for warm acoustic piano tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle piano envelope (fast attack, natural exponential decay)
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be suspended or closed
    }
  };

  const startLoop = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isCancelledRef.current = false;

    const loopDuration = 10500; // ~10.5 seconds loop

    const scheduleSequence = () => {
      if (isCancelledRef.current) return;

      notesSequence.forEach((note) => {
        const tid = window.setTimeout(() => {
          if (!isCancelledRef.current && audioContextRef.current) {
            playTone(audioContextRef.current, note.freq, note.duration);
          }
        }, note.timeOffset * 1000);
        timeoutIdsRef.current.push(tid);
      });

      const nextLoopTid = window.setTimeout(() => {
        if (!isCancelledRef.current) {
          scheduleSequence();
        }
      }, loopDuration);
      timeoutIdsRef.current.push(nextLoopTid);
    };

    scheduleSequence();
  };

  const stopAudio = () => {
    isCancelledRef.current = true;
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-xs text-neutral-300">
          <Music className="w-3.5 h-3.5 animate-pulse text-neutral-100" />
          <span className="font-sans-wedding text-[11px] tracking-wider uppercase">Música de fondo</span>
          <span className="flex gap-0.5 ml-1 h-3 items-end">
            <span className="w-0.5 h-full bg-neutral-200 animate-[bounce_1s_infinite]"></span>
            <span className="w-0.5 h-2/3 bg-neutral-400 animate-[bounce_1.2s_infinite]"></span>
            <span className="w-0.5 h-4/5 bg-neutral-300 animate-[bounce_0.8s_infinite]"></span>
          </span>
        </div>
      )}

      <button
        id="wedding-music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        className={`group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? 'bg-neutral-100 text-neutral-950 border-white ring-2 ring-white/20'
            : 'bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-500'
        }`}
        title={isPlaying ? 'Pausar música ambiente' : 'Reproducir música ambiente'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
