# Directrices de Desarrollo - ArmandoFF Page

## Contexto del Proyecto

Landing page de **Armando FF**, consultor de e-commerce/Shopify para emprendedores hispanohablantes. El diseño comunica un brand premium, moderno y orientado a resultados. Todo el copy es en **español**.

Stack: **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS 3.4**, **Framer Motion 12**, **React Hook Form + Zod**.

---

## Sistema de Colores

Paleta definida en `tailwind.config.ts` bajo el namespace `brand`:

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-beige` | `#C89D69` | Acento principal: botones, highlights, bordes activos |
| `brand-beige-light` | `#D4B48A` | Hover de botones primary |
| `brand-beige-dark` | `#B08A55` | Variante oscura del acento |
| `brand-gray` | `#323232` | Fondo de secciones alternadas y cards |
| `brand-gray-light` | `#4A4A4A` | Variante más clara del gris |
| `brand-black` | `#000000` | Fondo principal del sitio |
| `brand-white` | `#FFFFFF` | Color de texto principal |

### Reglas de uso de color
- Fondo: alternar `brand-black` y `brand-gray` entre secciones
- Texto principal: `text-white`; texto secundario: `text-gray-300` o `text-white/60`
- Bordes sutiles: `border-white/10` a `border-white/20`
- Hover interactivos: cambiar a `text-brand-beige`
- NUNCA usar colores fuera de esta paleta sin justificación

---

## Tipografía

Fuentes cargadas en `src/app/layout.tsx` (Google Fonts):

| Fuente | Variable | Pesos | Uso principal |
|--------|----------|-------|---------------|
| **Barlow** | `font-barlow` | 300–800 | Headings, texto bold, elementos de marca |
| **Montserrat** | `font-montserrat` | 300–600 | Body text, descripciones, texto pequeño |
| **Akira Expanded** | `font-akira` | — | Estadísticas grandes, énfasis especial |

### Escala tipográfica (mobile-first)
- Hero title: `text-xl sm:text-3xl md:text-5xl lg:text-6xl`
- Section title: `text-2xl sm:text-3xl md:text-4xl`
- Card title: `text-xl sm:text-2xl`
- Body: `text-base font-light text-gray-300`
- Labels/badges: `text-xs uppercase tracking-wider font-bold`

### Reglas de tipografía
- Mínimo `text-base` (16px) en body mobile
- Mínimo `text-sm` (14px) en labels
- Headings: `font-extrabold` o `font-black`
- Body: `font-light` (300)

---

## Clases de utilidad globales

Definidas en `src/app/globals.css`:

```
.section-padding    → px-4 sm:px-6 lg:px-8 py-16 md:py-24
.container-custom   → max-w-7xl mx-auto
.heading-xl         → text-xl sm:text-3xl md:text-5xl lg:text-6xl
.heading-lg         → text-2xl sm:text-3xl md:text-4xl
.heading-md         → text-xl sm:text-2xl
.body-text          → text-base font-light text-gray-300
.btn-primary        → bg-brand-beige text-brand-black px-8 py-3.5, hover:bg-brand-beige-light hover:scale-105
.btn-outline        → border-2 border-brand-beige text-brand-beige, hover:bg-brand-beige hover:text-brand-black
```

Siempre usar estas clases en lugar de repetir los estilos inline.

---

## Animaciones

### Animaciones CSS (tailwind.config.ts)
```
animate-fade-in      → opacity 0→1, 0.6s ease-out
animate-slide-up     → y 30px→0 + opacity, 0.6s ease-out
animate-slide-down   → y -30px→0 + opacity, 0.6s ease-out
animate-scale-in     → scale 0.95→1 + opacity, 0.4s ease-out
animate-marquee-left → translateX 0→-50%, 35s linear infinite
animate-marquee-right→ translateX -50%→0, 35s linear infinite
```

### Framer Motion
- Usar `AnimatePresence` para mount/unmount transitions
- Stagger entre items de lista: `delay: index * 0.15`
- Easing estándar: `ease-out` o `easeInOut`
- Threshold para scroll animations: `0.15` (15% visible)
- Usar el hook `useScrollAnimation` existente en `src/lib/`

---

## Estructura de Componentes

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fuentes, metadata
│   ├── page.tsx            # Composición de secciones
│   └── globals.css         # Estilos globales y utilidades
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # #inicio — Banner principal
│   │   ├── HowItWorks.tsx  # #como-funciona — Tabs por plataforma
│   │   ├── Statistics.tsx  # #estadisticas — Grid de stats con count-up
│   │   ├── Services.tsx    # #servicios — Mentoría y Webinars
│   │   ├── About.tsx       # #quien-soy — Perfil del fundador
│   │   ├── Pillars.tsx     # #pilares — 4 pilares del negocio
│   │   ├── FeaturedWebinar.tsx  # #webinar — Próximo evento
│   │   ├── ComingSoonServices.tsx # #proximos-servicios
│   │   └── Testimonials.tsx     # #testimonios — Carrusel
│   └── common/
│       ├── Header.tsx      # Nav fijo, menú hamburguesa mobile
│       ├── Footer.tsx      # Footer con links y social
│       ├── Icons.tsx       # Librería de SVGs del proyecto
│       └── QualificationForm.tsx # Modal form 10 pasos
└── lib/
    ├── constants.ts        # NAV_LINKS, STATS, PILLARS, TESTIMONIALS, etc.
    ├── types.ts            # Interfaces TypeScript del proyecto
    └── schemas.ts          # Validación Zod del formulario
```

---

## Patrones de Diseño

### Cards
- **Service/Section cards**: `bg-brand-gray rounded-xl`, hover `scale-[1.02]`
- **Testimonial cards**: `bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-white/10`
- **Coming Soon cards**: `bg-brand-gray rounded-xl` con badge overlay

### Secciones
- Fondo alterna: `brand-black` → `brand-gray` → `brand-black`
- Siempre usar `section-padding` + `container-custom`
- Separadores sutiles con `border-white/10`
- Dot pattern background: radial-gradient opacity `0.03–0.07`

### Glassmorphism
- Semi-transparent cards: `bg-brand-black/50` o `bg-white/5`
- `backdrop-blur-sm` o `backdrop-blur-md`
- Bordes: `border border-white/10` o `border-brand-beige/20`

---

## Formulario de Calificación

Modal de 10 pasos en `QualificationForm.tsx`:
1. Nombre
2. Email
3. WhatsApp
4. URL del negocio (opcional)
5. Canales de marketing (multi-select con logos de plataformas)
6. Inversión en ads (radio, auto-advance)
7. Ingreso mensual (radio, auto-advance)
8. Meta a 90 días (textarea)
9. Cuándo empezar (radio, auto-advance)
10. Principal obstáculo (textarea, mínimo 20 chars)

- Persistencia: `localStorage` key `"armandoff-form-data-v2"`
- Submit: `POST /api/submit-form`
- State management: hook `useFormModal`
- Validación: Zod schemas en `src/lib/schemas.ts`

---

## Íconos disponibles (Icons.tsx)

`StrategyIcon`, `MarketingIcon`, `ScaleIcon`, `MindsetIcon`, `CalendarIcon`, `ClockIcon`, `GlobeIcon`, `CloseIcon`, `MenuIcon`, `StarIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `InstagramIcon`

Usar siempre los íconos del proyecto antes de instalar librerías externas.

---

## Constantes (constants.ts)

- `NAV_LINKS` — Items del menú de navegación
- `STATS` — 4 estadísticas (Retención, Progreso, Clientes, Satisfacción)
- `PILLARS` — 4 pilares (Estrategia, Marketing, Escalabilidad, Mentalidad)
- `TESTIMONIALS` — 5 testimonios con id, name, role, avatar, quote, rating
- `COMING_SOON_SERVICES` — 9 servicios futuros
- `COUNTRIES` — 21 países para el formulario

Agregar nuevos datos aquí en lugar de hardcodear en componentes.

---

## 📱 Responsividad

**PRIORIDAD MÁXIMA**: Todo debe ser 100% responsive.

### Mobile-First obligatorio
- Empezar desde `320px`, escalar con `sm:` (640), `md:` (768), `lg:` (1024), `xl:` (1280)
- NUNCA adaptar mobile desde desktop

### Elementos críticos mobile
- Botones y touch targets: mínimo **44x44px**
- Inputs: mínimo **48px** de altura
- Texto body: mínimo **16px**
- Sin scroll horizontal en ningún breakpoint
- Imágenes: `fill` + `object-cover` + atributo `sizes` en Next.js `<Image>`

### Testing antes de completar
- iPhone (375px) — iOS Safari
- iPad (768px)
- Desktop (1920px+)

---

## 🛠️ Estándares de Código

- **TypeScript siempre** — sin `any` salvo casos excepcionales justificados
- Componentes funcionales con hooks
- Tailwind para todo — sin estilos inline hardcodeados
- Componentes pequeños y reutilizables
- Datos en `constants.ts`, tipos en `types.ts`
- No instalar dependencias nuevas si existe algo en el proyecto que lo resuelva

---

## ✅ Checklist de Entrega

- [ ] Mobile perfecto (375px, sin scroll horizontal, texto legible)
- [ ] Tablet responsive (768px)
- [ ] Desktop sin problemas (1440px+)
- [ ] Usa paleta de colores `brand-*`
- [ ] Usa fuentes `font-barlow` / `font-montserrat`
- [ ] Usa clases utilitarias globales donde aplique
- [ ] Datos en `constants.ts` si corresponde
- [ ] Sin errores de TypeScript ni consola
- [ ] Touch targets ≥ 44px en mobile
