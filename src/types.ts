export interface WeddingCouple {
  groomName: string;
  brideName: string;
  groomLastName?: string;
  brideLastName?: string;
  monogram: string; // e.g. "S & M"
  parentsGroom?: {
    father?: string;
    mother?: string;
  };
  parentsBride?: {
    father?: string;
    mother?: string;
  };
}

export interface WeddingDate {
  // Format: YYYY-MM-DDTHH:mm:ss for countdown calculations
  isoDate: string;
  formattedDate: string; // e.g. "Sábado, 24 de Octubre de 2026"
  ceremonyTime: string;  // e.g. "17:00 HRS"
  receptionTime: string; // e.g. "19:00 HRS"
  calendarEvent: {
    title: string;
    description: string;
    location: string;
  };
}

export interface WeddingLocationItem {
  id: string;
  tag: string; // e.g. "CEREMONIA RELIGIOSA" or "RECEPCIÓN & FIESTA"
  title: string; // e.g. "Parroquia San Juan Bautista"
  address: string;
  city: string;
  time: string;
  googleMapsUrl: string;
  wazeUrl?: string;
  photoUrl?: string;
  note?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: 'church' | 'cheers' | 'utensils' | 'music' | 'camera' | 'heart' | 'cake' | 'sparkles';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  subtitle?: string;
}

export interface DressCode {
  title: string;
  subtitle: string;
  description: string;
  paletteColors: {
    hex: string;
    name: string;
    isForbidden?: boolean;
  }[];
  menGuidelines: string[];
  womenGuidelines: string[];
  importantNotice?: string;
}

export interface GiftRegistry {
  message: string;
  stores?: {
    name: string;
    logoUrl?: string;
    link: string;
    eventNumber?: string;
  }[];
  bankAccount?: {
    bankName: string;
    beneficiary: string;
    clabe: string;
    accountNumber?: string;
    concept: string;
  };
}

export interface RSVPConfig {
  deadline: string;
  whatsappNumber: string; // Format: country code + number without plus, e.g. "5215512345678"
  whatsappDefaultMessage: string;
  customNotes?: string;
}

export interface WeddingConfig {
  couple: WeddingCouple;
  date: WeddingDate;
  loveQuote: {
    text: string;
    author: string;
  };
  welcomeLetter: {
    title: string;
    paragraphs: string[];
  };
  coverImage: {
    url: string;
    alt: string;
    subtitle: string;
  };
  locations: WeddingLocationItem[];
  itinerary: ItineraryItem[];
  gallery: GalleryPhoto[];
  dressCode: DressCode;
  giftRegistry: GiftRegistry;
  rsvp: RSVPConfig;
  music?: {
    title: string;
    artist: string;
    url: string;
  };
}
