# ArmandoFF Page — Directrices

## Contexto
Landing de **Armando FF**, consultor de e-commerce/Shopify para emprendedores hispanohablantes. Brand premium, moderno, orientado a resultados. **Todo el copy en español.**

Stack: Next.js 14 (App Router), React 18, TypeScript, Tailwind 3.4, Framer Motion 12, React Hook Form + Zod. **No agregar dependencias** si el proyecto ya resuelve la necesidad.

---

## Paleta (`tailwind.config.ts` → `brand`)

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-beige` | `#C89D69` | Acento principal, CTAs |
| `brand-beige-light` | `#D4B48A` | Hover primary |
| `brand-beige-dark` | `#B08A55` | Variante oscura |
| `brand-gray` | `#323232` | Fondo alterno, cards |
| `brand-gray-light` | `#4A4A4A` | Gris claro |
| `brand-black` | `#000000` | Fondo principal |
| `brand-white` | `#FFFFFF` | Texto principal |

- Alternar `brand-black` ↔ `brand-gray` entre secciones
- Texto secundario: `text-gray-300` o `text-white/60`
- Bordes sutiles: `border-white/10` a `border-white/20`
- Hover: transición a `text-brand-beige`
- **Nunca** introducir colores fuera de la paleta sin justificación

---

## Tipografía (cargadas en `layout.tsx`)

| Fuente | Variable | Uso |
|--------|----------|-----|
| Barlow | `font-barlow` | Headings, bold, marca (300–800) |
| Montserrat | `font-montserrat` | Body, descripciones (300–600) |
| Akira Expanded | `font-akira` | Stats grandes, énfasis |

Mínimos mobile: body 16px, labels 14px. Headings `font-extrabold`/`font-black`. Body `font-light`.

---

## Utilidades globales (`globals.css`)

```
.section-padding    → px-4 sm:px-6 lg:px-8 py-16 md:py-24
.container-custom   → max-w-7xl mx-auto
.heading-xl         → text-xl sm:text-3xl md:text-5xl lg:text-6xl
.heading-lg         → text-2xl sm:text-3xl md:text-4xl
.heading-md         → text-xl sm:text-2xl
.body-text          → text-base font-light text-gray-300
.btn-primary        → bg-brand-beige text-brand-black, hover:bg-brand-beige-light + scale-105
.btn-outline        → border-2 border-brand-beige text-brand-beige, hover invert
```

**Usar estas clases** antes de repetir estilos.

---

## Animaciones

**CSS (tailwind):** `animate-fade-in`, `animate-slide-up`, `animate-slide-down`, `animate-scale-in`, `animate-marquee-left`, `animate-marquee-right`.

**Framer Motion:**
- `AnimatePresence` para mount/unmount
- Stagger: `delay: index * 0.15`
- Easing: `ease-out` / `easeInOut`
- Scroll threshold: `0.15`
- Hook compartido: `src/lib/hooks/useScrollAnimation.ts`
- Variants compartidas: `src/lib/animations/variants.ts`

---

## Estructura relevante

```
src/
├── app/
│   ├── page.tsx, layout.tsx, globals.css
│   ├── contenido/           → tiers de contenido + ROI calculator
│   ├── casos-de-estudio/    → entrevistas, reseñas, case studies
│   ├── metodo/              → metodología
│   ├── webinars/            → eventos
│   └── api/                 → form-checkpoint, submit-form, shopify/{auth,callback}
├── components/
│   ├── sections/            → Hero, Services, Pillars, Testimonials, BrandLogos,
│   │                          CaseStudies, HeroContent, PricingComparison, StatsSection…
│   ├── common/              → Header, Footer, Icons, ScrollProgress
│   ├── ui/                  → FloatingActions, ROICalculator, Skeletons, content/*
│   ├── form/                → QualificationForm (modal)
│   ├── layout/              → FooterContent
│   ├── contenido/           → TierCard
│   └── casos-de-estudio/    → CaseStudyCard, InterviewCard, TabNavigation, WrittenReviewCard
└── lib/
    ├── constants.ts   → NAV_LINKS, STATS, PILLARS, TESTIMONIALS, COMING_SOON_SERVICES, COUNTRIES
    ├── tiers.ts       → TIERS (Presencia/Autoridad/Dominación) para /contenido
    ├── shopify.ts     → helpers Shopify
    ├── schemas.ts     → Zod del formulario
    ├── types.ts       → interfaces globales
    ├── animations/    → variants Framer
    ├── hooks/         → useScrollAnimation
    └── utils/         → animations utils
```

**Agregar datos** a `constants.ts` / `tiers.ts`, tipos a `types.ts`. **No hardcodear** en componentes.

---

## Patrones

- **Cards estándar:** `bg-brand-gray rounded-xl`, hover `scale-[1.02]`
- **Glass cards:** `bg-brand-black/50 backdrop-blur-sm rounded-2xl border border-white/10`
- **Secciones:** siempre `section-padding` + `container-custom`, fondo alternado
- **Dot pattern:** radial-gradient opacity `0.03–0.07`
- **Íconos:** usar `src/components/common/Icons.tsx` antes de instalar librerías

---

## Formulario de calificación

Modal multi-paso en `src/components/form/QualificationForm.tsx`.
- Persistencia: `localStorage` key `armandoff-form-data-v2`
- Checkpoint intermedio: `POST /api/form-checkpoint`
- Submit final: `POST /api/submit-form`
- Validación: Zod en `src/lib/schemas.ts`
- State: hook `useFormModal`

---

## Responsividad (PRIORIDAD MÁXIMA)

Mobile-first obligatorio. Breakpoints: 320 → sm (640) → md (768) → lg (1024) → xl (1280).

- Touch targets ≥ **44×44px**
- Inputs ≥ **48px** altura
- Body text ≥ **16px**
- **Sin scroll horizontal** en ningún breakpoint
- `<Image>` con `fill` + `object-cover` + `sizes`
- Validar en 375px, 768px y 1440px+ antes de entregar

---

## Código

- TypeScript estricto, **sin `any`** salvo justificado
- Componentes funcionales con hooks, pequeños y reutilizables
- Tailwind para todo, **sin inline hardcodeado**
- Sin errores de TS ni consola antes de entregar
