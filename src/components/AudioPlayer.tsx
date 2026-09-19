import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../weddingData';

interface AudioPlayerProps {
  music?: {
    title: string;
    artist: string;
    url: string;
  };
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ music = weddingData.music }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn('Reproducción de audio bloqueada o en pausa:', error);
        setIsPlaying(false);
      }
    }
  };

  const songTitle = music?.title || 'A Thousand Years';
  const songArtist = music?.artist || 'Piano Instrumental';
  const audioSrc = music?.url || '/wedding_song.mp3';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5">
      {/* Hidden audio element playing the uploaded track */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />

      {/* Floating track information banner when playing */}
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-2.5 bg-neutral-950/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800 text-xs text-neutral-300 shadow-2xl animate-fade-in">
          <Music className="w-3.5 h-3.5 animate-pulse text-white shrink-0" />
          <div className="flex flex-col pr-1">
            <span className="font-sans-wedding text-[10px] tracking-wider uppercase font-medium text-white leading-tight">
              {songTitle}
            </span>
            <span className="font-sans-wedding text-[9px] text-neutral-400 leading-tight">
              {songArtist}
            </span>
          </div>
          {/* Animated visualizer bars */}
          <span className="flex gap-0.5 ml-0.5 h-3 items-end shrink-0" aria-hidden="true">
            <span className="w-0.5 h-full bg-white animate-[bounce_0.8s_infinite]"></span>
            <span className="w-0.5 h-2/3 bg-neutral-400 animate-[bounce_1.1s_infinite]"></span>
            <span className="w-0.5 h-4/5 bg-neutral-200 animate-[bounce_0.9s_infinite]"></span>
          </span>
        </div>
      )}

      {/* Main Play/Pause Button */}
      <button
        id="wedding-music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? `Pausar música: ${songTitle}` : `Reproducir música: ${songTitle}`}
        className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border transition-all duration-300 shadow-2xl cursor-pointer ${
          isPlaying
            ? 'bg-white text-black border-white ring-4 ring-white/20'
            : 'bg-neutral-950/90 text-neutral-300 border-neutral-700 hover:text-white hover:border-neutral-500 hover:bg-neutral-900'
        }`}
        title={isPlaying ? `Pausar: ${songTitle}` : `Reproducir: ${songTitle}`}
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
