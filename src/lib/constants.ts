import { Testimonial, Service, Stat, Pillar, StudentInterview, WrittenReview, CaseStudy } from "./types";

export const NAV_LINKS = [
  { label: "Mentoría", href: "#servicios" },
  { label: "Acerca de Nosotros", href: "#quien-soy" },
  { label: "Reseñas", href: "#testimonios" },
  { label: "Resultados", href: "/casos-de-estudio" },
  { label: "Iniciar Sesión", href: "#login" },
] as const;

export const STATS: Stat[] = [
  { value: 85, suffix: "%", label: "Retención Promedio" },
  { value: 3.2, suffix: "x", label: "Progreso Corporal" },
  { value: 12, suffix: "k+", label: "Clientes Asesorados" },
  { value: 98, suffix: "%", label: "Satisfacción" },
];

export const PILLARS: Pillar[] = [
  {
    icon: "strategy",
    title: "Estrategia",
    description:
      "Estrategia con claridad. Diseñamos planes de acción concretos para que sepas exactamente qué hacer y cuándo hacerlo.",
  },
  {
    icon: "marketing",
    title: "Marketing",
    description:
      "Marketing que sí vende. Campañas orientadas a resultados reales, no vanity metrics. ROAS medible desde el día uno.",
  },
  {
    icon: "scale",
    title: "Escalabilidad",
    description:
      "Escalabilidad real. Sistemas y procesos que te permiten crecer sin que tu negocio dependa 100% de ti.",
  },
  {
    icon: "mindset",
    title: "Mentalidad",
    description:
      "Mentalidad de crecimiento. El éxito empresarial empieza con la disciplina mental correcta y la resiliencia.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "CEO, E-commerce México",
    avatar: "/images/testimonials/avatar-1.jpg",
    quote:
      "La mentoría de Armando transformó mi negocio. En 3 meses pasé de $2k a $15k mensuales con estrategias claras y ejecutables.",
    rating: 5,
  },
  {
    id: 2,
    name: "María Fernández",
    role: "Fundadora, Brand Studio",
    avatar: "/images/testimonials/avatar-2.jpg",
    quote:
      "Lo que más valoro es la honestidad. Armando no te vende humo, te dice exactamente lo que necesitas escuchar para crecer.",
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto Guzmán",
    role: "Dropshipper, 6 cifras",
    avatar: "/images/testimonials/avatar-3.jpg",
    quote:
      "Después de probar 3 mentores diferentes, Armando fue el primero que me dio resultados reales. Su enfoque práctico es inigualable.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ana Sofía López",
    role: "Coach de Negocios",
    avatar: "/images/testimonials/avatar-4.jpg",
    quote:
      "La estructura del webinar fue increíble. Aprendí más en 2 horas que en cursos de miles de dólares. 100% recomendado.",
    rating: 5,
  },
  {
    id: 5,
    name: "Diego Ramírez",
    role: "Director, Agencia Digital",
    avatar: "/images/testimonials/avatar-5.jpg",
    quote:
      "Armando entiende el mercado latino como nadie. Sus estrategias de Meta Ads son las mejores que he implementado.",
    rating: 4,
  },
];

export const COMING_SOON_SERVICES: Service[] = [
  {
    title: "Diseño de Página Web",
    description:
      "Páginas web profesionales optimizadas para conversión y velocidad.",
    image: "/images/services/web-design.jpg",
  },
  {
    title: "Importación",
    description:
      "Asesoría completa para importar productos de manera eficiente.",
    image: "/images/services/import.jpg",
  },
  {
    title: "Diseño Gráfico",
    description:
      "Identidad visual y material gráfico que conecta con tu audiencia.",
    image: "/images/services/graphic-design.jpg",
  },
  {
    title: "Manejo de Pauta Publicitaria",
    description:
      "Gestión profesional de campañas en Meta, Google y TikTok Ads.",
    image: "/images/services/ads-management.jpg",
  },
  {
    title: "Marketing y Branding",
    description:
      "Estrategias de marca que posicionan tu negocio en el mercado.",
    image: "/images/services/marketing.jpg",
  },
  {
    title: "Maquila de Productos",
    description:
      "Conectamos con fabricantes confiables para tu línea de productos.",
    image: "/images/services/manufacturing.jpg",
  },
  {
    title: "Reclutación de Empleados",
    description:
      "Encuentra el talento ideal para escalar tu operación.",
    image: "/images/services/recruitment.jpg",
  },
  {
    title: "Búsqueda de Productos (Sourcing)",
    description:
      "Identificamos los mejores productos y proveedores para tu nicho.",
    image: "/images/services/sourcing.jpg",
  },
  {
    title: "Creación de Contenido",
    description:
      "Contenido estratégico que genera engagement y convierte seguidores en clientes.",
    image: "/images/services/content.jpg",
  },
];

export const STUDENT_INTERVIEWS: StudentInterview[] = [
  {
    id: 1,
    name: "Miguel Reyes",
    role: "Fundador, Tienda Fitness",
    avatarInitials: "MR",
    quote:
      "Antes de entrar al programa hacía $800 al mes. Hoy cierro $12k mensuales de forma consistente. El sistema de Armando es el más claro que he visto.",
    rating: 5,
    date: "Febrero 2026",
    platform: "Shopify",
  },
  {
    id: 2,
    name: "Camila Torres",
    role: "Dueña, Marca de Skincare",
    avatarInitials: "CT",
    quote:
      "En 60 días pasé de no saber nada de Meta Ads a tener un ROAS de 4.2x. La mentoría es intensiva pero los resultados hablan solos.",
    rating: 5,
    date: "Enero 2026",
    platform: "TikTok Shop",
  },
  {
    id: 3,
    name: "Fernando Díaz",
    role: "CEO, Agencia de Marketing",
    avatarInitials: "FD",
    quote:
      "Lo que más me sorprendió fue la claridad del método. Nada de teoría vacía, todo accionable desde el día uno.",
    rating: 5,
    date: "Diciembre 2025",
    platform: "Shopify",
  },
  {
    id: 4,
    name: "Lucía Vargas",
    role: "Emprendedora, Joyería Online",
    avatarInitials: "LV",
    quote:
      "Dudé en invertir, pero en el primer mes recuperé 3x lo que pagué. Nunca había tenido una mentoría tan estructurada.",
    rating: 5,
    date: "Noviembre 2025",
  },
];

export const WRITTEN_REVIEWS: WrittenReview[] = [
  {
    id: 1,
    name: "Andrés Morales",
    role: "Dropshipper, 6 Cifras",
    avatarInitials: "AM",
    review:
      "Llevaba 2 años estancado en $5k al mes. Con el Método Rush entendí exactamente por qué y lo corregí en 3 semanas. Hoy supero los $20k mensuales de manera estable.",
    rating: 5,
    date: "Marzo 2026",
    source: "Whop",
  },
  {
    id: 2,
    name: "Valentina Cruz",
    role: "Fundadora, Marca de Moda",
    avatarInitials: "VC",
    review:
      "El nivel de detalle y personalización de la mentoría es increíble. Armando y su equipo realmente se preocupan por tus resultados, no solo por cobrar.",
    rating: 5,
    date: "Febrero 2026",
    source: "Google",
  },
  {
    id: 3,
    name: "Sebastián Núñez",
    role: "Director, E-commerce Textil",
    avatarInitials: "SN",
    review:
      "Los resultados hablan solos: +180% en ventas, ROAS de 5.1x y reducción del 35% en CAC. Todo en menos de 90 días siguiendo el método.",
    rating: 5,
    date: "Enero 2026",
    source: "Whop",
  },
  {
    id: 4,
    name: "Gabriela Ríos",
    role: "CEO, Suplementos Deportivos",
    avatarInitials: "GR",
    review:
      "Pensaba que ya sabía todo de ecommerce. Me equivocaba. El programa me abrió perspectivas que no tenía y que hoy representan el 40% de mis ingresos.",
    rating: 5,
    date: "Diciembre 2025",
    source: "Google",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    brandName: "Her Juice Bar",
    avatarInitials: "CM",
    result: "$3M Por Año",
    story:
      "Carlos llegó con una marca de jugos naturales sin presencia digital. Implementamos el embudo completo del Método Rush y en 12 meses alcanzó $3M en ventas anuales.",
    metrics: [
      { label: "Crecimiento en Ventas", value: "426%" },
      { label: "ROAS Promedio", value: "6.8x" },
      { label: "Tiempo", value: "12 meses" },
    ],
    date: "2025",
    category: "Bebidas & Salud",
  },
  {
    id: 2,
    name: "Grind Basketball",
    brandName: "Grind Basketball",
    avatarInitials: "GB",
    result: "4x Agotado",
    story:
      "Rechazados en Shark Tank, llegaron al programa sin una estrategia clara de digital. Aplicamos el sistema y agotaron inventario 4 veces consecutivas.",
    metrics: [
      { label: "Incremento en CVR", value: "210%" },
      { label: "AOV", value: "+65%" },
      { label: "Inventario agotado", value: "4 veces" },
    ],
    date: "2025",
    category: "Deportes",
  },
  {
    id: 3,
    name: "Sofía Ávila",
    brandName: "Garden Alchemy",
    avatarInitials: "SA",
    result: "#1 en TikTok Shop",
    story:
      "De marca desconocida de plantas y jardín a la posición número uno en TikTok Shop en su categoría. Cero seguidores previos, todo orgánico y paid combinado.",
    metrics: [
      { label: "Posición en Categoría", value: "#1" },
      { label: "ROAS", value: "5.3x" },
      { label: "Plazo", value: "6 meses" },
    ],
    date: "2024",
    category: "Hogar & Jardín",
  },
];

export const COUNTRIES = [
  "México",
  "Estados Unidos",
  "Colombia",
  "Argentina",
  "España",
  "Chile",
  "Perú",
  "Ecuador",
  "Guatemala",
  "Costa Rica",
  "Panamá",
  "República Dominicana",
  "Venezuela",
  "Bolivia",
  "Paraguay",
  "Uruguay",
  "Honduras",
  "El Salvador",
  "Nicaragua",
  "Puerto Rico",
  "Otro",
] as const;
