import { WeddingConfig } from './types';

// Importación de fotos generadas en blanco y negro para la portada y galería
import coverPhoto from './assets/images/wedding_couple_bw_1789334683545.jpg';
import ringsPhoto from './assets/images/wedding_rings_bw_1789334700697.jpg';
import photoshootWalk from './assets/images/photoshoot_walk_bw_1789517724176.jpg';
import photoshootPortrait from './assets/images/photoshoot_portrait_bw_1789517734930.jpg';
import photoshootStaircase from './assets/images/photoshoot_staircase_bw_1789517749121.jpg';
import photoshootEmbrace from './assets/images/photoshoot_embrace_bw_1789517761100.jpg';
import churchPhoto from './assets/images/church_ceremony_bw_1789517584503.jpg';
import receptionPhoto from './assets/images/hacienda_reception_bw_1789517596720.jpg';

/* =========================================================================
   GUÍA RÁPIDA DE PERSONALIZACIÓN:
   Edita los valores en este archivo para cambiar los datos de tu boda.
   Todo el diseño de la invitación se actualizará automáticamente:
   - Nombres de novios y monograma
   - Fecha y hora (para la cuenta regresiva y calendario)
   - Lugares de la ceremonia y recepción con links a Google Maps
   - Itinerario con horas y actividades
   - Galería de fotos
   - Dress code (código de vestimenta)
   - Mesa de regalos / cuenta bancaria
   - WhatsApp para confirmación de asistencia (RSVP)
   ========================================================================= */

export const weddingData: WeddingConfig = {
  // 1. INFORMACIÓN DE LOS NOVIOS
  couple: {
    groomName: 'Santiago',
    brideName: 'Valentina',
    groomLastName: 'Mendoza',
    brideLastName: 'Castillo',
    monogram: 'S & V',
    parentsGroom: {
      father: 'Sr. Roberto Mendoza',
      mother: 'Sra. Carmen Morales',
    },
    parentsBride: {
      father: 'Sr. Alejandro Castillo',
      mother: 'Sra. Beatriz Navarro',
    },
  },

  // 2. FECHA Y HORA DEL EVENTO
  date: {
    // Formato YYYY-MM-DDTHH:mm:ss para la cuenta regresiva precisa
    isoDate: '2026-10-24T17:00:00',
    formattedDate: 'Sábado, 24 de Octubre de 2026',
    ceremonyTime: '17:00 HRS',
    receptionTime: '19:00 HRS',
    calendarEvent: {
      title: 'Boda de Santiago & Valentina',
      description: 'Acompáñanos a celebrar nuestra unión matrimonial.',
      location: 'Hacienda San José, Ciudad de México',
    },
  },

  // 3. FOTO DE PORTADA (Blanco y Negro Formal)
  coverImage: {
    url: coverPhoto, // Puedes cambiar esta variable o colocar una URL directa 'https://...'
    alt: 'Santiago & Valentina - Portada Formal',
    subtitle: 'NUESTRA BODA',
  },

  // 4. FRASE O CITA DE AMOR
  loveQuote: {
    text: '“El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.”',
    author: 'Antoine de Saint-Exupéry',
  },

  // 5. CARTA DE BIENVENIDA
  welcomeLetter: {
    title: 'Nuestra Historia',
    paragraphs: [
      'Hay momentos en la vida que son inolvidables, y compartirlos con quienes más amamos los hace eternos.',
      'Después de caminar juntos este camino de complicidad, risas y amor, hemos decidido dar el paso más importante de nuestras vidas y unir nuestros destinos para siempre.',
      'Tu presencia es el mejor regalo que podemos recibir en este día tan especial. ¡Queremos celebrar contigo!',
    ],
  },

  // 6. UBICACIONES (Ceremonia y Recepción con links directos a Google Maps y Waze)
  locations: [
    {
      id: 'ceremonia',
      tag: 'CEREMONIA RELIGIOSA',
      title: 'Parroquia San Juan Bautista',
      address: 'Plaza Hidalgo 1, Coyoacán',
      city: 'Ciudad de México, CDMX',
      time: '17:00 HRS',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parroquia+San+Juan+Bautista+Coyoacan+CDMX',
      wazeUrl: 'https://waze.com/ul?q=Parroquia+San+Juan+Bautista+Coyoacan',
      photoUrl: churchPhoto,
      note: 'Por favor llegar 15 minutos antes para el inicio puntual.',
    },
    {
      id: 'recepcion',
      tag: 'RECEPCIÓN & FIESTA',
      title: 'Hacienda San José',
      address: 'Camino Real a San Jerónimo 450',
      city: 'Ciudad de México, CDMX',
      time: '19:00 HRS',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hacienda+San+Jose+San+Jeronimo+CDMX',
      wazeUrl: 'https://waze.com/ul?q=Hacienda+San+Jose+Mexico',
      photoUrl: receptionPhoto,
      note: 'Servicio de Valet Parking disponible en la entrada.',
    },
  ],

  // 7. ITINERARIO DEL DÍA
  itinerary: [
    {
      id: '1',
      time: '17:00 HRS',
      title: 'Ceremonia Religiosa',
      description: 'Recepción de bendiciones e intercambio de votos solemnes.',
      iconName: 'church',
    },
    {
      id: '2',
      time: '18:30 HRS',
      title: 'Cóctel de Bienvenida',
      description: 'Música en vivo, champán y canapés en los jardines.',
      iconName: 'cheers',
    },
    {
      id: '3',
      time: '19:45 HRS',
      title: 'Cena de Gala',
      description: 'Banquete de cuatro tiempos y maridaje de autor.',
      iconName: 'utensils',
    },
    {
      id: '4',
      time: '21:30 HRS',
      title: 'Primer Baile de Novios',
      description: 'Apertura de pista y brindis de honor con los invitados.',
      iconName: 'heart',
    },
    {
      id: '5',
      time: '22:00 HRS',
      title: 'Fiesta & Barra Libre',
      description: 'DJ, sorpresas, tornafiesta y celebración hasta el amanecer.',
      iconName: 'music',
    },
  ],

  // 8. GALERÍA DE FOTOS (Sesión de fotos preboda / compromiso de los novios)
  gallery: [
    {
      id: 'g1',
      url: coverPhoto,
      caption: 'Retrato de Compromiso',
      subtitle: 'La promesa de una vida juntos',
    },
    {
      id: 'g2',
      url: photoshootWalk,
      caption: 'Paseo Entre Arcos',
      subtitle: 'Caminando de la mano hacia nuestro futuro',
    },
    {
      id: 'g3',
      url: photoshootPortrait,
      caption: 'Miradas & Promesas',
      subtitle: 'La complicidad y ternura en blanco y negro',
    },
    {
      id: 'g4',
      url: ringsPhoto,
      caption: 'Alianzas & Manos Entrelazadas',
      subtitle: 'El símbolo eterno de nuestro pacto',
    },
    {
      id: 'g5',
      url: photoshootStaircase,
      caption: 'Arquitectura & Amor',
      subtitle: 'Elegancia clásica en nuestra sesión preboda',
    },
    {
      id: 'g6',
      url: photoshootEmbrace,
      caption: 'Risas & Abrazos Cómplices',
      subtitle: 'La felicidad pura que compartimos día a día',
    },
  ],

  // 9. CÓDIGO DE VESTIMENTA (DRESS CODE)
  dressCode: {
    title: 'Formal / Black Tie Optional',
    subtitle: 'Rigurosa Etiqueta en Blanco y Negro',
    description: 'Agradecemos a todos nuestros invitados acompañarnos vestidos con la mayor elegancia en este día tan especial.',
    paletteColors: [
      { hex: '#000000', name: 'Negro Formal' },
      { hex: '#1C1917', name: 'Gris Carbón' },
      { hex: '#333333', name: 'Gris Oscuro' },
      { hex: '#FFFFFF', name: 'Blanco (Exclusivo Novia)', isForbidden: true },
    ],
    menGuidelines: [
      'Esmoquin (Tuxedo) negro o traje oscuro formal',
      'Camisa de vestir blanca y corbata o corbatín negro',
      'Zapatos formales de piel negros',
    ],
    womenGuidelines: [
      'Vestido largo de noche elegante',
      'Tonos sugeridos: Negro, tonos oscuros o neutros sofisticados',
      'Por favor reservar el color blanco y beige exclusivamente para la novia',
    ],
    importantNotice: 'Evento exclusivo para adultos (No niños). Agradecemos tu comprensión.',
  },

  // 10. MESA DE REGALOS & TRANSFERENCIAS
  giftRegistry: {
    message: 'El mejor regalo es tu compañía, pero si deseas hacernos un presente, ponemos a tu disposición nuestras opciones:',
    stores: [
      {
        name: 'Liverpool',
        link: 'https://mesaderegalos.liverpool.com.mx/',
        eventNumber: 'No. Evento: 50928192',
      },
      {
        name: 'Amazon Bodas',
        link: 'https://www.amazon.com/wedding',
        eventNumber: 'Santiago & Valentina 2026',
      },
      {
        name: 'El Palacio de Hierro',
        link: 'https://www.elpalaciodehierro.com/celebraciones',
        eventNumber: 'ID: PH-882910',
      },
    ],
    bankAccount: {
      bankName: 'BBVA Bancomer',
      beneficiary: 'Santiago Mendoza & Valentina Castillo',
      clabe: '012180004567890123',
      accountNumber: '0456789012',
      concept: 'Boda Santiago y Valentina',
    },
  },

  // 11. CONFIRMACIÓN DE ASISTENCIA (RSVP)
  rsvp: {
    deadline: '10 de Septiembre de 2026',
    // Cambia este número por tu WhatsApp con código de país (sin signo + ni espacios)
    // Ejemplo para México: 5215512345678, España: 34612345678, etc.
    whatsappNumber: '525512345678',
    whatsappDefaultMessage: '¡Hola! Confirmo mi asistencia a la boda de Santiago y Valentina.',
    customNotes: 'Agradecemos confirmar antes de la fecha límite para asegurar tu lugar en la recepción.',
  },
};
