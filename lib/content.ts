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
  {
    id: "virtuales",
    title: "Eventos virtuales",
    body: "Sesiones de video en vivo para interactuar con los artistas y aprender de ellos.",
    icon: "/icons/c-virtuales.svg",
    iconWidth: 60,
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

/**
 * Artistas.
 *
 * `bio` es la versión corta que cabe en la tarjeta; `bioCompleta` guarda el
 * texto íntegro que mandó BROCHA, para cuando exista una vista de detalle.
 * Las cortas son condensaciones de esos mismos textos, no redacciones nuevas.
 *
 * Nacionalidades confirmadas por BROCHA: todos son de Perú salvo Sara Alarcón,
 * que es de Colombia.
 */
export type Artista = {
  name: string;
  photo: string;
  country?: string;
  flag?: string;
  bio?: string;
  bioCompleta?: string;
};

const PE = "/images/flags/pe.webp";
const CO = "/images/flags/co.webp";

const artistasItems: Artista[] = [
  {
    name: "Sara Alarcón",
    photo: "/images/artistas/sara-alarcon.webp",
    country: "Colombia",
    flag: CO,
    bio: "Artista e ilustradora de Medellín y fundadora de Brocha. Transforma la realidad a través del color, la textura y el movimiento.",
    bioCompleta:
      "Artista e ilustradora colombiana originaria de Medellín y fundadora de Brocha. Sara se ha consolidado como una voz emergente en el panorama artístico contemporáneo gracias a obras que transforman la realidad a través del color, la textura y el movimiento. Su lenguaje visual, vibrante y profundamente expresivo, desafía la percepción del espectador e invita a cuestionar la idea de una única verdad. Impulsada por el deseo de generar conexiones humanas a través del arte, creó Brocha Viva como una iniciativa que convierte la pintura en una experiencia colectiva, cercana y emocional.",
  },
  {
    name: "Ximena Collado",
    photo: "/images/artistas/ximena-collado.webp",
    country: "Perú",
    flag: PE,
    bio: "Ilustradora y artista visual. Empodera a través de figuras curvilíneas y vibrantes que desafían los estándares de belleza.",
    bioCompleta:
      "Ximena Collado, conocida como Ximeco, es una ilustradora y artista visual peruana cuyo trabajo busca empoderar a través de figuras curvilíneas y vibrantes, desafiando los estándares de belleza tradicionales. Basada en Lima, la artista consolida su marca con colaboraciones internacionales y un mural destacado en el Aeropuerto Internacional Jorge Chávez.",
  },
  {
    name: "Ilustronauta",
    photo: "/images/artistas/ilustronauta.webp",
    country: "Perú",
    flag: PE,
    bio: "Diseñador, muralista e ilustrador. Personajes coloridos que exploran identidad, conciencia ambiental y cultura pop.",
    bioCompleta:
      "Ilustronauta es un destacado diseñador gráfico, muralista e ilustrador peruano con más de una década de trayectoria, reconocido por su estilo vibrante y lleno de energía. A través de personajes coloridos y expresivos, su obra explora temas como la identidad, la conciencia ambiental y la cultura pop, logrando una conexión visual inmediata con el público y aportando una mirada contemporánea dentro del arte urbano latinoamericano.",
  },
  {
    name: "Edson Chacon Huari",
    photo: "/images/artistas/edson-chacon.webp",
    country: "Perú",
    flag: PE,
    bio: "Pintor e ilustrador cusqueño. Su obra hace crítica a la sociedad y refleja lo que observa de esta época.",
    bioCompleta:
      "Edson René Chacón Huari (Cusco, 1990) estudió dibujo y pintura en la Escuela de Bellas Artes de Cusco (2009-2013). Actualmente trabaja en Cusco como ilustrador y pintor, explorando también otros formatos como la escultura. Forma parte de “La Hora Tinta” desde 2019. “La pintura para mí es una extensión de mi ser, una necesidad, como respirar, por más tediosa que resulte algunas veces. Gran parte de mi trabajo hace crítica a la sociedad o refleja lo que observo en esta época actual.”",
  },
  {
    name: "Rafa Lanfranco",
    photo: "/images/artistas/rafael-lanfranco.webp",
    country: "Perú",
    flag: PE,
    bio: "Cruza cerámica precolombina y cosmovisión andina con anime y cultura pop. Construye universos como el Wakoverso.",
    bioCompleta:
      "Mi trabajo artístico se sitúa en un territorio híbrido donde la mitología, el diseño contemporáneo y la cultura popular convergen para crear universos narrativos propios. A través del Wakoverso y El Imaquinario de Yute y Tocuyo, no construyo solo objetos, sino sistemas simbólicos vivos. Mi obra dialoga con la cerámica precolombina y la cosmovisión andina, y las reinterpreta desde una sensibilidad contemporánea influida por el anime, el arte urbano y la cultura pop global: el arte como tecnología narrativa.",
  },
  {
    name: "Origen Peregrino",
    photo: "/images/artistas/origen-peregrino.webp",
    country: "Perú",
    flag: PE,
    bio: "Fusiona la herencia milenaria, las costumbres locales y la mitología peruana con un lenguaje lúdico y de diseño industrial.",
    bioCompleta:
      "Fusionar la herencia milenaria, las costumbres locales y la mitología peruana con un lenguaje lúdico, moderno y de diseño industrial.",
  },
  {
    name: "Roberto Peremese",
    photo: "/images/artistas/roberto-peremese.webp",
    country: "Perú",
    flag: PE,
    bio: "Bellas Artes y espacio público. La herencia andina y la psicodelia amazónica habitan su obra como memoria viva.",
    bioCompleta:
      "Su producción se articula en la intersección del rigor académico de las Bellas Artes y un oficio forjado en la libertad del espacio público. La herencia andina y la psicodelia amazónica no son referencias externas: habitan en su configuración como una memoria viva, activada a través del rito y la vivencia directa del territorio. La figura del felino emerge como un eje transversal, guardián de lo sutil entre lo instintivo y lo sagrado hecho materia.",
  },
  {
    name: "Tamiki",
    photo: "/images/artistas/tamiki.webp",
    country: "Perú",
    flag: PE,
    bio: "Artista visual y muralista de ascendencia nikkei. Fusiona la cultura urbana de Lima con la gráfica japonesa.",
    bioCompleta:
      "Tamie Tokuda, conocida artísticamente como Tamiki, es una destacada artista visual, ilustradora digital y muralista peruana de ascendencia nikkei. Su propuesta artística resalta por fusionar la cultura popular urbana de Lima con elementos tradicionales de la gráfica japonesa, la conciencia ambiental y el empoderamiento femenino.",
  },
  {
    name: "Elliot Tupac",
    photo: "/images/artistas/elliot-tupac.webp",
    country: "Perú",
    flag: PE,
    bio: "Su caligrafía, concreta y humanizada, es un puente social. Celebra la vida y la esperanza, y destierra estereotipos.",
    bioCompleta:
      "Elliot Tupac es palabra y es acción. Es el mensaje y el medio a la vez. La palabra y su caligrafía, concreta y humanizada, es el vínculo que dialoga con todas y todos a partir de la interpretación personal y las vivencias únicas del espectador. El arte de Elliot huele a tinta fresca, se expande con colores y nos emociona desde la síntesis: celebra la vida y la esperanza, y nos enseña a despegar las etiquetas y a desterrar los estereotipos.",
  },
  {
    name: "Pésimo",
    photo: "/images/artistas/pesimo.webp",
    country: "Perú",
    flag: PE,
    bio: "Pintor, muralista e ilustrador limeño. Su trayectoria consolidó el grafiti de calle como arte formal en el Perú.",
    bioCompleta:
      "Edwin Higuchi Fernández, artísticamente conocido como Pésimo, es un destacado pintor, muralista e ilustrador peruano, nacido en Lima en 1983. Su trayectoria consolidó al grafiti de calle como una manifestación artística formal e internacionalmente respetada en el Perú.",
  },
  {
    name: "Xomatok",
    photo: "/images/artistas/xomatok.webp",
    country: "Perú",
    flag: PE,
    bio: "Explora el color como fenómeno espacial: sus campos cromáticos alteran la arquitectura y la experiencia del espacio.",
    bioCompleta:
      "Jesús Camarena Lovera, “Xomatok”, es un artista visual peruano cuya práctica explora el color como un fenómeno espacial y perceptivo. A través de la pintura, la instalación y las intervenciones site-specific, investiga cómo los campos cromáticos pueden alterar la arquitectura y transformar la experiencia del espacio. En el centro de su investigación está el espectro visible entendido como un umbral físico y simbólico.",
  },
];

export const artistas = {
  eyebrow: "Artistas seleccionados",
  title: "Artistas BROCHA",
  /** Cuántos se ven antes de pulsar "Cargar más" en móvil. */
  visiblePorDefecto: 6,
  items: artistasItems,
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
    {
      title: "Brocha Viva",
      image: "/images/evento-brocha-viva.webp",
      // Del Figma solo salió esta foto. Al agregar más al arreglo, el visor
      // muestra las flechas y el contador automáticamente.
      photos: ["/images/evento-brocha-viva.webp"],
    },
    {
      title: "Brocha SubPop",
      subtitle: "Lima, Perú",
      image: "/images/evento-subpop.webp",
      photos: Array.from(
        { length: 12 },
        (_, i) => `/images/eventos/subpop/subpop-${String(i + 1).padStart(2, "0")}.webp`,
      ),
    },
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
