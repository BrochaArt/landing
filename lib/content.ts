/**
 * Todo el copy y los datos de la landing viven aquí.
 * Textos tomados literalmente del Figma (BROCHA-page, node 233:10009).
 * Para agregar un artista o una tarjeta, añade un objeto — no toques el JSX.
 */

export const nav = [
  { label: "Quienes somos", href: "#que-es-brocha" },
  { label: "Artistas", href: "#artistas" },
  { label: "Qué ver", href: "#que-ver" },
  { label: "Eventos", href: "#eventos" },
  { label: "Países", href: "#paises" },
] as const;

export const hero = {
  titleTop: "Somos el arte",
  titleBottom: "de conectar.",
  leadPlain: "Vemos al artista en 360°: no solo su obra, también",
  leadStrong: " su historia, su marca y su proceso.",
  body: "Le devolvemos el poder al artista latinoamericano con estudios, tienda, eventos y certificados de autenticidad en blockchain.",
  primaryCta: "Quiero acceso anticipado",
  secondaryCta: "Descubre brocha",
} as const;

export const queEsBrocha = {
  eyebrow: "Qué es Brocha",
  title: ["Un sello artístico", "independiente"],
  body: "No somos un marketplace más. Brocha junta la obra de cada artista, su historia, sus eventos y sus productos,",
  bodyStrong: " todo en un solo lugar.",
} as const;

/** Carrusel de la sección "Qué es Brocha" — 5 tarjetas navegables. */
export const carouselCards = [
  {
    id: "estudios",
    title: "Estudios",
    body: "El espacio de cada artista para compartir su proceso, su historia y construir comunidad.",
    icon: "/icons/c-estudios.svg",
    iconWidth: 77,
    iconHeight: 40,
  },
  {
    id: "tienda",
    title: "Tienda",
    body: "Marketplace de originales, prints y productos.",
    icon: "/icons/c-tienda.svg",
    iconWidth: 53,
    iconHeight: 60,
  },
  {
    id: "brocha-viva",
    title: "Brocha Viva",
    body: "Eventos presenciales donde el artista interactúa con su comunidad.",
    icon: "/icons/c-brochaviva.svg",
    iconWidth: 55,
    iconHeight: 60,
  },
  {
    id: "tbt",
    title: "TBT",
    body: "Certificados de autenticidad en Blockchain. Con regalías postventas.",
    icon: "/icons/c-tbt.svg",
    iconWidth: 41,
    iconHeight: 60,
  },
  {
    id: "subpop",
    title: "Brocha SubPop",
    body: "Subastas en vivo, artistas presentes, arte accesible. La subasta popular que abre la puerta de entrada al coleccionismo.",
    icon: "/icons/c-subpop.svg",
    iconWidth: 70,
    iconHeight: 60,
  },
] as const;

export const comoElegimos = {
  eyebrow: "Como Elegimos",
  title: ["Vemos al artista 360°,", "no solo la obra."],
  body: [
    "No elegimos artistas solo por una obra, sino por su trayectoria y su disposición a construir comunidad.",
    "Curamos una red latinoamericana de talento conectado para crecer y dejar legado juntos.",
  ],
  pills: [
    { title: "360°", body: "Obra, historia y proceso" },
    { title: "Curada", body: "Red de artistas seleccionados" },
    { title: "Colectiva", body: "Co-promoción entre países" },
  ],
} as const;

export const artistas = {
  eyebrow: "Artistas seleccionados",
  title: "Artistas BROCHA",
  items: [
    {
      name: "Laura M.",
      country: "Colombia",
      flag: "/images/flags/co.webp",
      photo: "/images/artistas/laura-m.jpg",
      bio: "Diseñador, muralista e ilustrador peruano de estilo vibrante y urbano.",
    },
    {
      name: "Edson Chacon Huari",
      country: "Colombia",
      flag: "/images/flags/co.webp",
      photo: "/images/artistas/edson-chacon.png",
      bio: "Diseñador, muralista e ilustrador peruano de estilo vibrante y urbano.",
    },
    {
      name: "Elliot Tupac",
      country: "Perú",
      flag: "/images/flags/pe.webp",
      photo: "/images/artistas/elliot-tupac.jpg",
      bio: "Diseñador, muralista e ilustrador peruano de estilo vibrante y urbano.",
    },
    {
      name: "Origen Peregrino",
      country: "Perú",
      flag: "/images/flags/pe.webp",
      photo: "/images/artistas/origen-peregrino.png",
      bio: "Diseñador, muralista e ilustrador peruano de estilo vibrante y urbano.",
    },
  ],
} as const;

export const queVer = {
  eyebrow: "Qué ver en Brocha",
  title: "Tres formas de entrar a Brocha.",
  items: [
    {
      id: "estudios",
      title: "Estudios",
      body: "El detrás de cámaras de cada artista: su proceso, su taller y su historia contada en primera persona.",
      image: "/images/ver-estudios.webp",
      badge: "/icons/badge-estudios.svg",
      badgeComposed: false,
    },
    {
      id: "tienda",
      title: "Tienda",
      body: "Originales, prints y productos de cada artista, listos para llevar a casa o coleccionar.",
      image: "/images/ver-tienda.webp",
      badge: "/icons/badge-tienda.svg",
      badgeComposed: true,
    },
    {
      id: "eventos",
      title: "Eventos",
      body: "Activaciones en vivo, subastas y encuentros donde el arte sale de la galería y se vive en comunidad.",
      image: "/images/ver-eventos.webp",
      badge: "/icons/badge-eventos.svg",
      badgeComposed: false,
    },
  ],
} as const;

export const perfiles = {
  eyebrow: "Perfiles en BROCHA",
  title: ["3 formas de vivir", "la comunidad"],
  items: [
    {
      title: "Aprendices",
      body: "Quienes descubren su camino en el arte, encuentran referentes, procesos y comunidad.",
      icon: "/icons/p-aprendices.svg",
      iconWidth: 83,
      iconHeight: 100,
    },
    {
      title: "Artistas",
      body: "Quienes crean su perfil para conectar, aprender y conocerse con los Artistas Brocha.",
      icon: "/icons/p-artistas.svg",
      iconWidth: 127,
      iconHeight: 100,
    },
    {
      title: "Coleccionistas",
      body: "Quienes descubren y respaldan artistas Brocha, con la certeza de una obra auténtica.",
      icon: "/icons/p-coleccionistas.svg",
      iconWidth: 85,
      iconHeight: 100,
    },
  ],
} as const;

export const eventos = {
  eyebrow: "Eventos que hemos realizado",
  title: ["El arte fuera de", "la galeria"],
  items: [
    { title: "Brocha Viva", image: "/images/evento-brocha-viva.webp" },
    { title: "Brocha SubPop", image: "/images/evento-subpop.webp" },
  ],
} as const;

export const latam = {
  eyebrow: "LANZAMIENTO: PRÓXIMAMENTE",
  titleTop: "Seguimos con la expansión",
  titleBottomPlain: "por ",
  titleBottomAccent: "LATAM",
  items: [
    { country: "Colombia", label: "Cuna de Brocha", flag: "/images/flags/co.webp" },
    { country: "Perú", label: "Segundo hogar", flag: "/images/flags/pe.webp" },
  ],
} as const;

export const ctaFinal = {
  titleLine1: "Sé de los primeros",
  titleLine2Plain: "en entrar a ",
  titleLine2Accent: "Brocha.",
  subtitle:
    "Suscríbete y consigue acceso anticipado a la plataforma e invitaciones exclusivas a nuestros eventos en vivo.",
  placeholder: "Ingresa tu correo electrónico",
  cta: "Quiero acceso anticipado",
} as const;

export const footer = {
  tagline: "Somos el arte de conectar.",
} as const;
