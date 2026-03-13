const DPL = "dpl_D9Z6jEyJbg1Giqny6duwWE568UTp";
const BASE = "https://villa-alta-guest-house.vercel.app/_next/image";

function img(path: string, w = 1200) {
  return `${BASE}?url=${encodeURIComponent(path)}&w=${w}&q=85&dpl=${DPL}`;
}

export const HOTEL = {
  name: "Villa Alta Guest House",
  tagline: "Patrimonio Arquitectónico · Siglo XVIII",
  location: "CL Callejón De Los Estribos, Centro Histórico",
  city: "Cartagena de Indias, Colombia 130001",
  phone: "+57 321 5062187",
  email: "hotelvillaaltac@gmail.com",
  instagram: "@villaalta.ctg",
  rating: 9.4,
};

export const NAV_LINKS = [
  { label: "Galería", href: "/galeria" },
  { label: "Suites", href: "/suites" },
  { label: "Reseñas", href: "/#resenas" },
  { label: "Contacto", href: "/contacto" },
];

export interface Room {
  id: number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  images: string[];
  hasBalcony: boolean;
  floors: number;
}

export const ROOMS: Room[] = [
  {
    id: 1,
    slug: "suite-duplex-balcon-1",
    number: "01",
    title: "Habitación Duplex",
    subtitle: "CON BALCÓN HABITACIONES",
    description:
      "Distribución en dos niveles con dormitorio superior y sala social con balcón al callejón histórico.",
    longDescription:
      "Nuestras habitaciones dúplex combinan la arquitectura original de la casa con una distribución en dos niveles. El dormitorio en el nivel superior cuenta con cama doble premium, televisor y minibar. El área social en el nivel inferior dispone de baño privado de lujo y balcón privado con vista al callejón histórico del Centro de Cartagena.",
    features: [
      "Dúplex 2 niveles",
      "Cama doble premium",
      "TV inteligente",
      "Minibar",
      "Baño privado lujo",
      "Balcón privado",
      "Desayuno incluido",
      "Check-out tardío",
    ],
    images: [
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/BAÑOSUITE1.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/EXPERIENCIASVILLAALTA.jpeg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/HABSUITEDUPLEX1.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBY2PISO.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHOTEL.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHUESPEDES.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOOBY.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg",
    "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITESALA.jpg",
    ],
    hasBalcony: true,
    floors: 2,
  },
  {
    id: 2,
    slug: "suite-duplex-balcon-2",
    number: "02",
    title: "Habitación Duplex",
    subtitle: "SIN VISTA CON AMPLIA SALA DE ESTAR HABITACIONES",
    description:
      "Esta habitación dúplex ofrece una distribución amplia y silenciosa, perfecta para estancias prolongadas o para quienes buscan un espacio tranquilo para trabajar y descansar. La habitación se organiza en dos niveles: en el nivel superior se encuentra el dormitorio con cama, TV y minibar, mientras que el nivel inferior cuenta con una generosa sala de estar, ideal para leer, trabajar o relajarse, además de baño privado y un área de bar completamente equipada. Aunque no cuenta con vista exterior, su amplitud, techos altos y acabados cálidos crean una atmósfera acogedora y serena. Es una excelente alternativa para quienes priorizan comodidad, silencio y espacio interior.",
    longDescription:
      "Esta habitación dúplex ofrece una distribución amplia y silenciosa, perfecta para estancias prolongadas o para quienes buscan un espacio tranquilo para trabajar y descansar. La habitación se organiza en dos niveles: en el nivel superior se encuentra el dormitorio con cama, TV y minibar, mientras que el nivel inferior cuenta con una generosa sala de estar, ideal para leer, trabajar o relajarse, además de baño privado y un área de bar completamente equipada. Aunque no cuenta con vista exterior, su amplitud, techos altos y acabados cálidos crean una atmósfera acogedora y serena. Es una excelente alternativa para quienes priorizan comodidad, silencio y espacio interior.",
    features: [
     "Interior colonial",
      "Total privacidad",
      "Dúplex 2 niveles",
      "Baño de lujo",
      "Desayuno incluido",
    ],
    images: [
      ("/FotosHotelVillaAlta/HABITACIONSUITE6/BAÑOHAB6Y7.jpg"),
       ("/FotosHotelVillaAlta/HABITACIONSUITE6/BAÑOHAB6Y78.jpg"),
        ("/FotosHotelVillaAlta/HABITACIONSUITE6/SUITEDUPLEX-6SINBALCON.jpg"),
         ("/FotosHotelVillaAlta/HABITACIONSUITE6/SUITEDUPLEXHAB-6CAMA.jpg"),
          ("/FotosHotelVillaAlta/HABITACIONSUITE6/SUITEDUPLEXHAB6INBALCON.jpg"),
    ],
    hasBalcony: true,
    floors: 2,
  },
   {
    id: 3,
    slug: "habitacion-premium",
    number: "07",
    title: "Suite  Premium",
    subtitle: "EN UN SOLO NIVEL HABITACIONES",
    description:
    "Nuestra suite está diseñada para ofrecer máximo confort en un solo nivel, sin escaleras, facilitando una experiencia cómoda y fluida. Tanto el área de descanso como el espacio social se encuentran en el mismo piso, lo que la convierte en la opción más accesible y práctica del hotel. Cuenta con una cama extra grande y una distribución amplia que privilegia la tranquilidad y el descanso. Al no tener vista exterior, la suite ofrece un ambiente más silencioso y privado. Dispone de baño privado y un área de bar completamente equipada, ideal para descansar plenamente después de un día explorando la ciudad.",
    longDescription:
    "Nuestra suite está diseñada para ofrecer máximo confort en un solo nivel, sin escaleras, facilitando una experiencia cómoda y fluida. Tanto el área de descanso como el espacio social se encuentran en el mismo piso, lo que la convierte en la opción más accesible y práctica del hotel. Cuenta con una cama extra grande y una distribución amplia que privilegia la tranquilidad y el descanso. Al no tener vista exterior, la suite ofrece un ambiente más silencioso y privado. Dispone de baño privado y un área de bar completamente equipada, ideal para descansar plenamente después de un día explorando la ciudad.",
    features: [
      "Cama queen premium",
      "Baño privado",
      "TV inteligente",
      "Desayuno incluido",
      "Check-out tardío",
    ],
    images: [
     ("/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/HABITACIONPREMIUM-SENCILLA7.jpg"),
     ("/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/HABITACIONPREMIUMSENCILLA7.jpg"),
        ("/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/HABPREMIUMSENCILLA7.jpg"),
          ("/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/BAÑO.jpg"),
            ("/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/BAÑOHAB6Y7.jpg"),
    ],
    hasBalcony: false,
    floors: 1,
  },
];

export const REVIEWS = [
  {
    text: "Ubicación perfecta en el Centro Histórico de Cartagena y una habitación de lujo de 2 pisos espectacular.",
    author: "Pulido",
    country: "Colombia",
    rating: 5,
  },
  {
    text: "El personal es muy atento. Desayuno exquisito servido en la habitación tipo loft. Una experiencia única.",
    author: "Beatriz",
    country: "España",
    rating: 5,
  },
  {
    text: "Precioso hotel colonial. Instalaciones modernas, muy bien ubicado y trato del personal inmejorable.",
    author: "Saúl",
    country: "España",
    rating: 5,
  },
  {
    text: "La mejor experiencia en un hotel boutique. Excelente ubicación cerca a la Plaza de Santo Domingo.",
    author: "Manuela",
    country: "Colombia",
    rating: 5,
  },
  {
    text: "El mejor hotel medieval y moderno. Ubicación 10/10, habitación espaciosa y diseño hermosísimo.",
    author: "Katherine",
    country: "Colombia",
    rating: 5,
  },
  {
    text: "Un viaje inolvidable. Diseño rústico-lujoso único, las habitaciones dúplex son una maravilla.",
    author: "Diego",
    country: "Colombia",
    rating: 5,
  },
];

export const RATING_BARS = [
  { label: "Servicio", score: 9.4, pct: 94 },
  { label: "Limpieza", score: 9.2, pct: 92 },
  { label: "Instalaciones", score: 8.8, pct: 88 },
  { label: "Confort", score: 9.3, pct: 93 },
  { label: "Ubicación", score: 9.8, pct: 98 },
  { label: "Calidad-Precio", score: 8.9, pct: 89 },
];

export const GALLERY_ITEMS = [
  {
    title: "Lobby Huéspedes",
    label: "Lobby",
    category: "lobby",
    size: "tall" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/LOBBY HUESPEDES.jpg"),
  },
  {
    title: "Fachada Colonial",
    label: "Exterior",
    category: "exterior",
    size: "wide" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/FACHADA.jpg"),
  },
  {
    title: "Suite Duplex 1",
    label: "Suite",
    category: "suite",
    size: "sq" as const,
    src: "/images/suite-1.avif",
  },
  {
    title: "Lobby Hotel",
    label: "Lobby",
    category: "lobby",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/LOBBY HOTEL.jpg"),
  },
  {
    title: "Antesala Suite",
    label: "Suite",
    category: "suite",
    size: "wide" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/SUITE DUPLEX 1 ANTESALA.jpg"),
  },
  {
    title: "Sala Colonial",
    label: "Suite",
    category: "suite",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/SUITE SALA.jpg"),
  },
  {
    title: "Vista Colonial",
    label: "Cartagena",
    category: "cartagena",
    size: "tall" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/VISTA.jpg"),
  },
  {
    title: "Suite Duplex 2",
    label: "Suite",
    category: "suite",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 2/SUITE DUPLEX 2.jpg"),
  },
  {
    title: "Centro Histórico",
    label: "Cartagena",
    category: "cartagena",
    size: "wide" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 2/UBICACION.jpg"),
  },
  {
    title: "Baño Suite 1",
    label: "Suite",
    category: "suite",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/BAÑO SUITE 1.jpg"),
  },
  {
    title: "Entrada Hotel",
    label: "Exterior",
    category: "exterior",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/ENTRADA HOTEL.jpg"),
  },
  {
    title: "Lobby 2do Piso",
    label: "Lobby",
    category: "lobby",
    size: "sq" as const,
    src: img("/FOTOS HOTEL VILLA ALTA/HABITACION SUITE BALCON 1/LOBBY 2PISO.jpg"),
  },
];
