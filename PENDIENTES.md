# Pendientes — ArmandoFF Page

> Lista de tareas pendientes para llegar al 100% funcional.
> Última revisión: 14 de abril de 2026.

---

## Rellenar antes de publicar (páginas legales)

Las páginas legales ya existen en `/privacidad`, `/terminos`, `/cookies` y `/aviso-legal`, pero tienen **placeholders entre corchetes** que debes reemplazar con los datos reales:

- [ ] Nombre legal / razón social
- [ ] RFC / identificación fiscal
- [ ] Domicilio fiscal completo
- [ ] Correo de contacto (sugerido: `contacto@armandoff.com`)
- [ ] Ciudad / estado para la jurisdicción (cláusulas 9 en `/terminos` y 8 en `/aviso-legal`)
- [ ] Confirmar proveedores de cookies reales en `/cookies` sección 3 (Google Analytics, Meta Pixel, Calendly, etc.)

**Archivos a editar:**
- `src/app/privacidad/page.tsx`
- `src/app/terminos/page.tsx`
- `src/app/cookies/page.tsx`
- `src/app/aviso-legal/page.tsx`

> **Importante:** Se recomienda que un abogado revise estos textos antes de publicar. Son una plantilla base conforme a la LFPDPPP mexicana, no un documento legal definitivo.

---

## 1. Confirmación por email del formulario

**Estado:** Pendiente.
**Archivo:** `src/app/api/submit-form/route.ts`

Actualmente el formulario guarda el lead en Shopify pero **no envía ningún correo**:
- Al usuario que se registró (para darle certeza de que se recibió).
- A Armando / el equipo (para notificar una nueva solicitud).

### Plan sugerido

1. Instalar **Resend** (recomendado, buen free tier para México):
   ```
   npm install resend
   ```
2. Agregar variables en `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   NOTIFY_EMAIL=tu-email@armandoff.com
   FROM_EMAIL="Armando FF <noreply@armandoff.com>"
   ```
3. Crear `src/lib/email.ts` con dos funciones:
   - `sendConfirmationEmail(data)` → al usuario, "Recibimos tu solicitud".
   - `sendInternalNotification(data)` → a Armando, con todos los datos del formulario.
4. Llamarlas desde `route.ts` después del `createShopifyCustomer`, envueltas en try/catch para que un fallo de email NO rompa el flujo.
5. Validar el dominio del remitente en Resend (DNS SPF/DKIM) para que no llegue a spam.

### Alternativas
- **Postmark** si se prefiere algo más enterprise.
- **Nodemailer + SMTP** si se usa un servidor propio / Google Workspace.

---

## 2. Número de WhatsApp real

**Estado:** Placeholder (`526621000000`) en dos lugares.

### Archivos a actualizar

| Archivo | Línea | Contexto |
|---------|-------|----------|
| `src/components/ui/FloatingActions.tsx` | 15 | Botón flotante en toda la página |
| `src/components/layout/FooterContent.tsx` | 266 | Link "WhatsApp directo" en el footer |

### Pasos

1. Obtener el número real en formato internacional sin símbolos (ej: `5216621234567` → +52 1 662 123 4567).
2. Reemplazar el valor por defecto en `FloatingActions.tsx` línea 15.
3. Actualizar el `href` del footer en `FooterContent.tsx` línea 266.
4. **Mejor aún:** centralizar en una constante:
   - Agregar a `src/lib/constants.ts`:
     ```ts
     export const WHATSAPP_NUMBER = "521XXXXXXXXXX";
     export const WHATSAPP_MESSAGE = "Hola, quiero saber más sobre los paquetes de contenido";
     ```
   - Importarla desde ambos componentes. Así se cambia en un solo lugar.

---

## 3. Respaldo del formulario (FORM_WEBHOOK_URL)

**Estado:** Variable existe pero está vacía en `.env.local`.
**Archivo:** `src/app/api/submit-form/route.ts` líneas 39-49.

El código ya está preparado: si la variable tiene URL, hace POST con todos los datos. Solo falta **configurar un destino de respaldo** para que si Shopify se cae, no se pierdan leads.

### Opciones recomendadas (de más fácil a más robusto)

1. **Google Sheets vía Zapier / Make (más simple)**
   - Crear un Zap: Webhook → "New Row in Google Sheets".
   - Copiar la URL del webhook a `FORM_WEBHOOK_URL`.
   - Ventaja: sin código, Armando puede ver los leads en un Sheet.

2. **Airtable webhook**
   - Crear una base "Leads", habilitar webhook automation.
   - Ventaja: UI mejor que Sheets, filtros por categoría, kanban.

3. **Notion Database vía Make**
   - Si ya se usa Notion, unificar ahí.

4. **Propio endpoint + base de datos (más trabajo)**
   - Supabase / PlanetScale / Vercel Postgres.
   - Solo vale la pena si se va a construir un CRM interno.

### Pasos concretos (opción 1 — Sheets con Zapier)

1. Crear Google Sheet "ArmandoFF Leads" con columnas: `timestamp, nombre, email, whatsapp, businessUrl, marketingChannels, adsInvestment, monthlyRevenue, goal90Days, startWhen, mainObstacle`.
2. En Zapier: "Webhooks by Zapier" → "Catch Hook" → copiar URL.
3. Segundo paso del Zap: "Google Sheets" → "Create Spreadsheet Row" → mapear campos.
4. En `.env.local`:
   ```
   FORM_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/xxxxx/yyyyy
   ```
5. Deploy a Vercel y actualizar la variable en el dashboard de Vercel también.

---

## 4. Custom Conversion en Meta — "Lead Form Premium"

**Estado:** Pendiente. Se hace 100% en Events Manager, **sin código**.
**Cuándo hacerlo:** después de acumular ≥1 semana de tráfico real con eventos `Lead`.

Hoy disparamos `Lead` en dos lugares con el mismo nombre:
- Submit del formulario → `content_name: "Qualification Form"`, `content_category: "Lead"` (con email/phone hasheados, EMQ alto)
- Click en CTA de plan en `/contenido` → `content_name: "<nombre del plan>"`, `content_category: "Plan de contenido"` (sin PII, EMQ bajo)

Crear una **Custom Conversion** que filtre solo el primero permite optimizar campañas hacia el Lead de alta calidad sin perder la señal global del `Lead` consolidado.

### Pasos
1. Events Manager → **Conversiones personalizadas** → **Crear**.
2. Origen: el Pixel `1228430842689768`.
3. Regla: evento `Lead` **donde** `content_category` igual a `Lead` (o `content_name` igual a `Qualification Form`).
4. Nombre: `Lead Form Premium`.
5. Categoría: `Lead`.
6. Una vez creada, usarla como objetivo de optimización en campañas que solo deban perseguir form completado, no clicks en planes.

---

## Notas finales

- Todos estos cambios son **independientes** y pueden hacerse en cualquier orden.
- El orden recomendado por impacto en conversión: (1) WhatsApp real → (2) Email confirmación → (3) Respaldo webhook → (4) Rellenar datos legales.
- Después de estos, las siguientes prioridades son: imágenes de testimonials/services faltantes, analytics (Meta Pixel / GA4) y metadata SEO por página.
