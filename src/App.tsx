import React from 'react';
import { weddingData } from './weddingData';
import { HeroCover } from './components/HeroCover';
import { Countdown } from './components/Countdown';
import { WelcomeLetter } from './components/WelcomeLetter';
import { Locations } from './components/Locations';
import { Itinerary } from './components/Itinerary';
import { PhotoGallery } from './components/PhotoGallery';
import { DressCode } from './components/DressCode';
import { GiftsRegistry } from './components/GiftsRegistry';
import { RSVPSection } from './components/RSVPSection';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { MobileQuickBar } from './components/MobileQuickBar';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans-wedding selection:bg-neutral-800 selection:text-white overflow-x-hidden w-full relative">
      {/* Floating Ambient Music Player */}
      <AudioPlayer music={weddingData.music} />

      {/* Floating Mobile Quick Access Bar */}
      <MobileQuickBar />

      {/* 1. Portada Formal en Tonos Blancos y Negros */}
      <HeroCover
        couple={weddingData.couple}
        date={weddingData.date}
        coverImage={weddingData.coverImage}
      />

      <main>
        {/* 2. Cuenta Regresiva & Botón Calendario */}
        <Countdown date={weddingData.date} />

        {/* 3. Carta de Bienvenida & Cita de Amor */}
        <WelcomeLetter
          couple={weddingData.couple}
          loveQuote={weddingData.loveQuote}
          welcomeLetter={weddingData.welcomeLetter}
        />

        {/* 4. Ubicaciones (Ceremonia y Fiesta con Google Maps) */}
        <Locations locations={weddingData.locations} />

        {/* 5. Itinerario del Día */}
        <Itinerary itinerary={weddingData.itinerary} />

        {/* 6. Galería de Fotos (con Lightbox y Zoom) */}
        <PhotoGallery gallery={weddingData.gallery} />

        {/* 7. Código de Vestimenta (Dress Code) */}
        <DressCode dressCode={weddingData.dressCode} />

        {/* 8. Mesa de Regalos & Cuenta Bancaria */}
        <GiftsRegistry giftRegistry={weddingData.giftRegistry} />

        {/* 9. Confirmación de Asistencia (RSVP por WhatsApp) */}
        <RSVPSection rsvp={weddingData.rsvp} couple={weddingData.couple} />
      </main>

      {/* 10. Pie de Página */}
      <Footer couple={weddingData.couple} date={weddingData.date} />
    </div>
  );
}
