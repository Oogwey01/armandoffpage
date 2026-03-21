# Directrices de Desarrollo - ArmandoFF Page

## 📱 Responsividad y Diseño Móvil

**PRIORIDAD MÁXIMA**: Todos los cambios, features y componentes DEBEN ser completamente responsivos.

### Requisitos Obligatorios:

1. **Diseño Mobile-First**
   - Comenzar siempre desde mobile (320px, 375px, 428px)
   - Escalar hacia dispositivos más grandes (tablet, desktop)
   - No hacer adaptar mobile desde desktop

2. **Breakpoints**
   - Mobile: 320px - 639px
   - Tablet: 640px - 1023px
   - Desktop: 1024px+
   - Usar Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

3. **Testing Obligatorio**
   - Antes de completar cualquier tarea, revisar en:
     - iPhone 12/13/14/15 (375px)
     - iPad (768px)
     - Desktop (1920px+)
   - No asumir que si se ve bien en desktop, se ve bien en mobile
   - Verificar scroll horizontal (NO debe haber)
   - Verificar texto legible sin zoom (min 16px en mobile)

4. **Elementos Críticos en Mobile**
   - Botones: mínimo 44x44px de touch area
   - Inputs: mínimo 44px de altura
   - Espaciado: suficiente padding entre elementos
   - Imágenes: optimizadas y responsive (usar `object-cover`, sizes attributes)
   - Fuentes: legibles sin zoom (no menor a 14px en labels, 16px en body)

5. **Performance Mobile**
   - Lazy load de imágenes
   - Optimizar bundle size
   - Minimizar re-renders en dispositivos móviles
   - Verificar en 3G/4G simulada

## 🛠️ Estándares de Código

- Usar TypeScript siempre
- Componentes funcionales con hooks
- Tailwind CSS para estilos
- Mantener componentes pequeños y reutilizables
- Evitar estilos hardcodeados, usar clases de Tailwind

## ✅ Checklist de Entrega

Antes de marcar como "completado", verificar:
- [ ] Mobile perfecto (sin horizontal scroll, texto legible)
- [ ] Tablet responsive
- [ ] Desktop sin problemas
- [ ] Colores y contraste accesibles
- [ ] Sin errores en consola
- [ ] Componentes probados en múltiples pantallas
