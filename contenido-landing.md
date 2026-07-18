# Contenido completo de la landing — Masterclass Mandy Academy

> **Respaldo maestro de todo el contenido editable del funnel.**
> Generado el 18 de julio de 2026. Si algo se rompe o hay que preparar una nueva fecha,
> todo lo que se ve en la página está documentado aquí con su ubicación exacta en el código.

---

## 1. Cómo reprogramar la clase para una nueva fecha

La fecha vive en **3 lugares** que hay que actualizar juntos:

| # | Archivo | Ubicación | Texto actual |
|---|---------|-----------|--------------|
| 1 | `js/app.js` línea 8 | `CONFIG.eventDate` | `new Date(2026, 6, 18, 11, 0, 0)` — ojo: el mes es 0-11 (6 = julio) |
| 2 | `registro.html` línea ~55 | Badge del hero (`hero-event-date`) | "Sábado 18 de Julio · 11:00 AM" |
| 3 | `registro.html` línea ~117 | Subtítulo del formulario (`form-subtitle`) | "Clase en vivo: sábado 18 de Julio · 11:00 AM. Cupos limitados, regístrate en 10 segundos." |

El countdown (`initCountdown` en `js/app.js`) se alimenta solo de `CONFIG.eventDate`; cuando la fecha pasa, muestra `00 00 00 00`.

---

## 2. Copy de `registro.html` (sección por sección)

### 2.1 Metadatos SEO

- **Title:** Masterclass de Crédito Gratuita — Mandy Academy
- **Description:** Aprende la hoja de ruta paso a paso con Amanda Olmo para borrar colecciones, subir tu score FICO y construir riqueza familiar en EE.UU., incluso con ITIN.
- **Keywords:** reparacion de credito, score fico, itin credito, buró de credito, amanda olmo, mandy academy

### 2.2 Hero (`#hero`)

- **Badge:** Masterclass Gratuita en Vivo (con punto rojo "live")
- **Fecha:** Sábado 18 de Julio · 11:00 AM
- **Label countdown:** La clase empieza en → Días / Horas / Mins / Segs
- **H1:** Aprende a Restaurar tu Crédito Tú Mismo
- **Subtítulo:** Elimina los elementos negativos de tu reporte en los burós de crédito
- **CTA móvil:** Asegurar mi lugar gratis
- **Tarjeta de formulario:** título "Asegura tu lugar gratis" · subtítulo "Clase en vivo: sábado 18 de Julio · 11:00 AM. Cupos limitados, regístrate en 10 segundos." · nota "Tus datos están 100% seguros."
- **Imagen:** `banners/amanda-header-desktop.png` (desktop) / `banners/amanda-header-mobile.png` (≤1024px)

### 2.3 Puntos de dolor (`#dolores`)

- **Tag:** ¿Para quién es esto?
- **Título (variante A, el del HTML):** ¿Te has sentido estancado o frustrado por el sistema?

| Tarjeta | Título | Texto |
|---------|--------|-------|
| ❌ 1 | El Recién Llegado "Invisible" | Llevas meses pagando todo en efectivo y el sistema dice que "no existes". Te niegan el alquiler de un apartamento o te cobran depósitos abusivos por no tener historial. |
| ❌ 2 | El Asfixiado por Deudas | Vives con vergüenza e incertidumbre por las constantes llamadas de agencias de cobranza. Crees que tu score bajo (450 - 580) no tiene solución y temes el impacto financiero en tu familia. |
| ❌ 3 | El Emprendedor Estancado | Estás utilizando tus tarjetas y ahorros personales para financiar tu LLC o negocio independiente. Esto ahoga tu historial personal y bloquea tus metas de comprar una casa. |

- **Disclaimer reconciliador:** 💡 Importante: No importa si solo tienes ITIN, si ya te estafó una supuesta agencia antes o si empiezas con score cero. Esta clase te dará la hoja de ruta correcta paso a paso.

### 2.4 El Temario (`#descubrimientos`)

- **Tag:** El Temario
- **Título:** Lo que descubrirás en la clase online gratis
- **Imagen:** `banners/amanda-discovery-desktop.png` / `banners/amanda-discovery-mobile.png` (≤768px), con dial de score flotante (SVG inline)

| ✓ | Título | Descripción |
|---|--------|-------------|
| 1 | La Trampa de las Colecciones | Por qué pagar una deuda antigua a agencias de cobranza puede dañar aún más tu score, y qué debes hacer en su lugar. |
| 2 | El Método del ITIN | El proceso exacto paso a paso para construir y reportar un historial de crédito superior a 700 puntos sin necesidad de Seguro Social (SSN). |
| 3 | La "Cirugía" del Buró de Crédito | Cómo obligar a Equifax, Experian y TransUnion a eliminar reportes erróneos y no verificables en un lapso de 30 días. |
| 4 | Crédito Empresarial y LLC | La estrategia para separar tus finanzas personales y acceder a líneas de crédito empresarial al 0% de interés. |

### 2.5 Autoridad / Bio (`#autoridad`)

- **Tag:** Tu Instructora
- **Título:** Amanda Olmo — "La chica del crédito"
- **Párrafo 1:** Fundadora de **Mandy Academy**, Amanda Olmo se ha convertido en una de las voces de referencia financiera más influyentes para la comunidad hispana en Estados Unidos. Tras entender las barreras del sistema y sus reglas de juego, diseñó una metodología educativa enfocada en empoderar a familias latinas e inmigrantes.
- **Párrafo 2:** A través de sus redes y mentorías, Amanda ha ayudado a miles de latinos a salir de la invisibilidad financiera, borrar colecciones del buró de crédito, subir sus puntuaciones FICO y acceder a capital para comprar sus hogares o financiar sus LLCs.
- **Stats:** `30K+` Latinos Empoderados · `100%` En Español
- **Imagen:** `banners/amanda-professional-desktop.png` / `banners/amanda-professional-mobile.png` (≤768px)

### 2.6 Testimonios (`#testimonios`)

- **Tag:** Casos de Éxito
- **Título:** Historias reales de nuestros alumnos
- **Bajada:** Videos reales compartidos por personas que vivieron la experiencia de Mandy Academy.

| Video | Duración | Archivo | Poster |
|-------|----------|---------|--------|
| 1 | 0:15 | `videos-testimonios/testimonio-horizontal.mp4` | `videos-testimonios/testimonio-horizontal.webp` |
| 2 | 0:25 | `videos-testimonios/testimonio-vertical-1.mp4` | `videos-testimonios/testimonio-vertical-1.webp` |
| 3 | 1:04 | `videos-testimonios/testimonio-vertical-2.mp4` | `videos-testimonios/testimonio-vertical-2.webp` |

- **Fineprint:** *Los testimonios demostrados representan experiencias personales de los alumnos de Mandy Academy. Los resultados individuales varían según la puntualidad, el historial de disputas y la constancia de cada persona.

### 2.7 FAQ + urgencia (`#faq`)

- **Tag:** Preguntas Frecuentes · **Título:** Resuelve tus dudas sobre la clase

**P: ¿Es realmente gratis?**
R: Sí, la Masterclass es 100% gratuita. Mi misión principal es cerrar la brecha de información financiera en la comunidad latina. Al final de la sesión, explicaré cómo funciona nuestra membresía educativa privada por si deseas acelerar el paso, pero asistir y aprender la hoja de ruta en vivo no tiene ningún costo.

**P: ¿Funciona si solo tengo número de ITIN?**
R: Absolutamente. El sistema de crédito en EE.UU. evalúa comportamientos financieros, no estados migratorios. En la clase te enseñaremos la estrategia exacta para registrar y estructurar un buró de crédito fuerte reportando directamente con tu ITIN.

**P: ¿Tengo el derecho de disputar deudas o colecciones?**
R: Sí, es un derecho federal protegido por la Ley de Informes de Crédito Justos (FCRA). Los burós de crédito están obligados por ley a reportar información 100% exacta, verificable y oportuna. Si un buró no puede certificar una de ellas bajo el procedimiento establecido en 30 días, la cuenta tiene que ser borrada.

**P: ¿Necesito hablar inglés para hacer los trámites?**
R: No es necesario. Aunque las cartas a los burós se envían redactadas en inglés (las cuales te proporcionamos ya estructuradas para rellenar), todo el proceso de aprendizaje y las explicaciones de la masterclass son explicados 100% en español.

**Caja de urgencia:**
- Título: Reserva tu asiento antes de que cierre
- Texto: La transmisión en vivo cuenta con un límite de accesos simultáneos por la plataforma web. Reserva tu lugar gratuito hoy.
- CTA: Reservar mi asiento gratis (+ countdown)

### 2.8 Footer legal

- Enlaces: Términos y Condiciones · Política de Privacidad · Términos de SMS (los `href` están en `#` — pendiente de URLs reales)
- **Descargo de Responsabilidad de Mandy Academy:** Mandy Academy y AMO Management LLC proporcionan programas educativos y herramientas de capacitación financiera y preparación de documentos. No operamos como una organización de reparación de crédito tradicional de pago anticipado ("Credit Repair Organization") ni garantizamos un aumento de puntos en su puntaje crediticio o un resultado específico en su buró de crédito personal. El historial financiero de cada consumidor es único y las decisiones finales dependen del análisis y criterios individuales de los burós de crédito (Equifax, Experian y TransUnion) y de las entidades bancarias. La ley federal le otorga el derecho de disputar información inexacta o incompleta directamente con las agencias de informes de crédito de manera gratuita por su cuenta. Nada del material expuesto en esta página o en la Masterclass constituye asesoría o consulta profesional.
- **Acuerdo TCPA para Comunicaciones SMS:** Al proporcionar su número telefónico de WhatsApp en el formulario anterior y marcar la casilla correspondiente de consentimiento, usted acepta recibir alertas de confirmación, recordatorios automáticos de fecha y transmisiones educativas vía mensajes SMS/WhatsApp de Mandy Academy en el número proporcionado. El consentimiento no es un requisito necesario para contratar ningún servicio. Puede retirar su autorización y cancelar los recordatorios en cualquier momento enviando la palabra "STOP" como respuesta a los mensajes. Pueden aplicar cargos de transmisión y tarifas de datos de su operador de telefonía móvil.
- **Copyright:** © 2026 Mandy Academy / AMO Management LLC — Las Vegas, Nevada, EE.UU. Todos los derechos reservados.
- **Sticky bar móvil:** Reservar mi asiento gratis

---

## 3. Variantes A/B/C del copy (test de conversión)

Viven en `initABTesting()` en `js/app.js` (~línea 482). Se elige al azar por visitante
(persistida en `localStorage.mandy_ab_variant`) o forzando `?v=A|B|C` en la URL.
Solo cambian el título de dolores y las 3 tarjetas; el hero es igual en las tres.

### Variante A — título: "¿Te has sentido estancado o frustrado por el sistema?"

(las mismas 3 tarjetas del HTML, ver §2.3)

### Variante B — título: "¿Sufres algunas de estas trabas todos los días?"

| Título | Texto |
|--------|-------|
| El Rechazo por tu Score | Aunque tienes el dinero para pagar, te tratan como un ciudadano de segunda clase al rentar o comprar un vehículo porque no tienes historial crediticio. |
| El Acoso de Cobradores | El miedo a que las llamadas afecten tu paz familiar o tu estatus migratorio por deudas médicas o cobros injustos que ni sabías que tenías. |
| Tu LLC Financiada de tu Bolsillo | Arriesgas el patrimonio familiar inyectando tus ahorros o tus tarjetas personales al negocio, mientras tu score personal se desploma. |

### Variante C — título: "Las objeciones y miedos que te impiden avanzar:"

| Título | Texto |
|--------|-------|
| Inmigrante con solo ITIN | Crees que sin un SSN tradicional estás excluido del sistema financiero de EE.UU. Aprende cómo el ITIN es tu mejor llave de acceso a capital. |
| Estafado por Reparadoras | Ya le pagaste cientos de dólares a agencias fantasma de reparación de crédito que te prometieron magia y te dejaron igual. Es hora del método correcto. |
| Bloqueado para Comprar Casa | El score bajo te tiene pagando intereses abusivos del 20-30%, impidiendo que tu familia logre el verdadero 'Sueño Americano'. |

---

## 4. Copy de `gracias.html`

- **Title:** ¡Registro Confirmado! — Mandy Academy (noindex, nofollow)
- **Badge:** 🎉 Registro confirmado
- **H1:** ¡Felicidades[nombre], tu lugar está reservado! (el nombre se inyecta desde `localStorage.mandy_lead_name` si existe)
- **Subtítulo:** Tu asiento en la Masterclass Gratuita en Vivo ya está confirmado. Únete a la comunidad VIP para recibir la guía, recordatorios y el enlace directo de acceso.
- **CTA WhatsApp:** "Unirme a la comunidad VIP" → `https://chat.whatsapp.com/Ep40snJhRnoDCIhpTPoArS?mode=gi_t`
- **Video felicitaciones:** autoplay silencioso `videos/amanda-felicidades-auto.mp4` (poster `videos/amanda-felicidades-poster.jpg`); al tocar "Ver con sonido" cambia a la versión 720p `videos/amanda-felicidades.mp4`
- **Footer:** © 2026 Mandy Academy / AMO Management LLC — Creado por AD Media Solution (`https://admediasolution.com`)

---

## 5. Inventario de medios (rutas en el repo)

### Banners / fotos
`banners/amanda-header-desktop.png` · `banners/amanda-header-mobile.png` (hero)
`banners/amanda-discovery-desktop.png` · `banners/amanda-discovery-mobile.png` (temario)
`banners/amanda-professional-desktop.png` · `banners/amanda-professional-mobile.png` (bio)
`banners/amanda-hero-desktop.png` · `banners/amanda-hero-mobile.png` · `banners/hero-mobile.png` (variantes no usadas actualmente)
`banners/campana-masterclass-2026/` (ads, carruseles y recordatorios de la campaña + `copy-campana.md`)

### Fondos animados
`fondos-landing/bg_pain_points.jpg` · `bg_discovery.jpg` · `bg_social_proof.jpg` · `bg_faq_countdown.jpg` · `bg_footer_legal.jpg` · `bg_thankyou_page.jpg`

### Videos
`videos-testimonios/testimonio-horizontal.mp4` + `.webp` (0:15)
`videos-testimonios/testimonio-vertical-1.mp4` + `.webp` (0:25)
`videos-testimonios/testimonio-vertical-2.mp4` + `.webp` (1:04)
`videos/amanda-felicidades-auto.mp4` (ligero, autoplay) · `videos/amanda-felicidades.mp4` (720p) · `videos/amanda-felicidades-poster.jpg`
`videos/vsl-masterclass.mp4` · `videos/timeline-1.mp4` + poster · `videos/timeline-2.mp4` + poster (material de reserva)

### Identidad
`logo.png` · `favicon-16/32/192/512.png` · `apple-touch-icon.png`
Tipografías: Plus Jakarta Sans + Outfit (Google Fonts)

---

## 6. El formulario de registro

### 6.1 Estado actual: iframe de GoHighLevel

```html
<div class="ghl-form-embed">
  <iframe
    src="https://app.amomanagements.com/widget/form/ZlQ8nM4O3DvqCrJLFOpR"
    style="width:100%;min-height:420px;border:none;border-radius:4px"
    id="inline-ZlQ8nM4O3DvqCrJLFOpR"
    data-form-name="Registro Master"
    data-form-id="ZlQ8nM4O3DvqCrJLFOpR"
    title="Registro Master">
  </iframe>
</div>
<script src="https://app.amomanagements.com/js/form_embed.js"></script>
```

> ⚠️ **Este embed solo renderiza cuando la página se sirve desde el dominio conectado a GHL**
> (`site.amomanagements.com`). En otros dominios (p. ej. `amandaolmo.vercel.app`) el iframe
> queda como un recuadro vacío. No es un bug del código: es el control de dominios de GHL.

### 6.2 Formulario propio original (recuperado del historial de git)

Recuperado de `git show "06140c7^:registro.html"`. Su lógica sigue viva en `js/app.js`
(`initFormHandler` → `POST /api/register`, validación, selector de país con `COUNTRY_CODES`)
y el backend en `server.js` + `api/register.js` (upsert de contacto en GHL, tags, consentimiento
TCPA, workflow de masterclass). Para reactivarlo: pegar este bloque en lugar del
`.ghl-form-embed` del hero y cargar en Vercel las variables
`GHL_PRIVATE_INTEGRATION_TOKEN`, `GHL_LOCATION_ID` y `BOOKING_SESSION_SECRET`
(opcionales: `GHL_FORM_ID`, `GHL_MASTERCLASS_WORKFLOW_ID`).

```html
<form class="registration-form" id="hero-register-form">
  <div class="form-group">
    <label class="form-label" for="hero-name">Nombre completo</label>
    <input class="form-input" type="text" id="hero-name" name="name" placeholder="Ej. Juan Pérez…" autocomplete="name" required>
    <span class="error-msg" id="hero-name-error" style="color: var(--color-red-danger); font-size: 0.75rem; display: none; margin-top: 0.25rem;"></span>
  </div>

  <div class="form-group">
    <label class="form-label" for="hero-email">Correo electrónico</label>
    <input class="form-input" type="email" id="hero-email" name="email" placeholder="juan@correo.com…" autocomplete="email" spellcheck="false" required>
    <span class="error-msg" id="hero-email-error" style="color: var(--color-red-danger); font-size: 0.75rem; display: none; margin-top: 0.25rem;"></span>
  </div>

  <div class="form-group">
    <label class="form-label" for="hero-phone">WhatsApp / Teléfono móvil</label>
    <div class="phone-wrapper">
      <select class="country-select" aria-label="Código de país">
        <option value="+1" data-iso="US">🇺🇸 +1</option>
      </select>
      <input class="form-input" type="tel" id="hero-phone" name="phone" placeholder="Tu número móvil…" autocomplete="tel" required>
    </div>
    <span class="error-msg" id="hero-phone-error" style="color: var(--color-red-danger); font-size: 0.75rem; display: none; margin-top: 0.25rem;"></span>
  </div>

  <div class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" id="hero-tcpa" name="tcpa_consent" required>
    <label class="checkbox-label" for="hero-tcpa">
      Autorizo a Mandy Academy a enviarme recordatorios del evento e información educativa vía SMS/WhatsApp al número proporcionado. Entiendo que puedo darme de baja en cualquier momento respondiendo "STOP". Más en <a href="#" target="_blank">Términos de SMS</a>.
    </label>
  </div>

  <button class="btn-primary" type="submit" id="hero-submit-btn" style="margin-top: 1.5rem;" disabled>
    <span>Reservar mi asiento gratis</span>
    <span class="btn-icon-wrapper">
      <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </span>
  </button>
</form>
```

(En esa misma versión histórica existía un segundo formulario idéntico en un modal,
`#register-modal` / `#modal-register-form`, en la línea ~557 de `06140c7^:registro.html`.)

---

## 7. Arquitectura del funnel (referencia rápida)

- **URLs limpias** (`vercel.json` + paridad en `server.js`): `/` redirige a `/registro`; `/registro` → `registro.html`; `/gracias` → `gracias.html`.
- **Hosting:** Vercel (repo `github.com/Marser321/amandaolmo`, rama `main`, autodeploy). Deploy sano en `amandaolmo.vercel.app`.
- **Dominio público:** `site.amomanagements.com` — al 18/07/2026 apunta a un funnel de GHL, no a Vercel (pendiente de reconexión).
- **Backend:** `server.js` (local, puerto 8080 con `node server.js`) + `api/register.js` (serverless Vercel). Tests: `node --test tests/server.test.js`.
- **Servidor local:** `.claude/launch.json` → configuración `landing-registro`.
