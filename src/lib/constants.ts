import { Testimonial, Service, Stat, Pillar } from "./types";

export const NAV_LINKS = [
  { label: "Mentoría", href: "#servicios" },
  { label: "Acerca de Nosotros", href: "#quien-soy" },
  { label: "Reseñas", href: "#testimonios" },
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
