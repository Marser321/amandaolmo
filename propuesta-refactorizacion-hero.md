# 📐 Propuesta de Refactorización del Hero — Mandy Academy

Basado en tu audio y en la auditoría visual de la versión móvil actual de [`mandy-academy-master.vibepreview.com`](https://mandy-academy-master.vibepreview.com/), he estructurado la refactorización para maximizar el impacto visual de Amanda (60% del espacio), minificar los textos y ordenar los elementos para lograr la mejor tasa de conversión en dispositivos móviles (tráfico de Instagram/TikTok).

---

## 📲 COMPARATIVA DE ESTRUCTURA MÓVIL

A continuación se muestra el cambio en el orden de apilamiento vertical para la vista móvil:

| Estructura Actual en Móvil ❌ | Estructura Propuesta ✅ |
| :--- | :--- |
| 1. Banner superior (Estático/Wrap largo) | **1. Banner animado (Estilo ticker/marquesina)** |
| 2. Badge "MASTERCLASS GRATUITA" | **2. Logo centrado** |
| 3. H1 de texto largo (3 líneas completas) | **3. H1 Condensado (Punchy, 1-2 líneas máximo)** |
| 4. Logos de burós (Equifax, Experian, etc.) | **4. Foto de Amanda (60% peso visual + Dial Score)** |
| 5. Subtítulo largo (4 líneas) | **5. Botón de Agendamiento (CTA Principal)** |
| 6. Tarjeta biografía pequeña de Amanda | *6. Formulario de registro (Inline o modal)* |
| 7. Formulario de registro completo | *(Nota: Logos de burós eliminados del hero)* |

---

## 📝 PROPUESTA DE TEXTOS CONDENSADOS (COPY MINIFICADO)

Para que el usuario pueda absorber el mensaje en menos de 2 segundos en el celular, condensamos la propuesta de valor:

### H1 (Título Principal)
*   **Original:** *"Cómo Dominar el Sistema de Crédito en EE.UU. y Construir Riqueza para tu Familia, Incluso si Tienes Deudas, Solo Usas ITIN o Empiezas de Cero."* (27 palabras)
*   **Opción A (Recomendada - Enfocada en Resultados):**
    > **"Domina tu Crédito en EE.UU. y Construye Riqueza Familiar"** (10 palabras)
*   **Opción B (Enfocada en Fricción / ITIN):**
    > **"Sube tu Score de Crédito en EE.UU. (Incluso con ITIN o Deudas)"** (12 palabras)

### Subtítulo (Eyebrow / Sub-headline)
*   **Original:** *"Únete a Amanda Olmo ('La chica del crédito') en esta clase online GRATUITA y aprende la hoja de ruta legal para borrar colecciones injustas, acceder a capital y proteger el patrimonio de tu familia. El sistema de EE.UU., explicado 100% en ESPAÑOL, paso a paso."* (44 palabras)
*   **Propuesta Minificada:**
    > *"Aprende la hoja de ruta legal con Amanda Olmo para borrar deudas, subir tu score FICO y acceder a capital. **Clase en vivo · 100% en Español**."* (25 palabras)

---

## 📋 PROMPT MAESTRO DE REFACTORIZACIÓN (Listo para v0 / Lovable / Bolt / Cursor)

Copia y pega este prompt directamente en tu constructor de código IA para refactorizar únicamente el Header/Hero de la aplicación:

```text
Refactor only the Header and Hero section of this landing page to optimize for mobile conversion (mobile-first layout). Apply the following changes:

1. TOP BANNER (ANIMATED TICKER):
- Style the top alert banner as a smooth, infinite horizontal scrolling marquee (marquee ticker) instead of wrapping text.
- Text content: "🚨 CUPOS LIMITADOS: La Masterclass en Vivo comienza pronto — REGÍSTRATE GRATIS" followed by a dynamic ticking countdown clock (Days : Hours : Min : Sec). It should scroll seamlessly on mobile.
- Use a dark crimson red or premium deep gradient background.

2. LOGO:
- Center the Mandy Academy logo cleanly. Remove any secondary menu or navigation links to eliminate exit points.

3. H1 & SUBTITLE (CONDENSED COPY):
- Replace the current title and subtitle with the following minimal and punchy text:
  * H1: "Domina tu Crédito en EE.UU. y Construye Riqueza Familiar" (Style: bold, prominent, Plus Jakarta Sans, maximum 2 lines on mobile).
  * Subtitle: "Aprende la hoja de ruta legal con Amanda Olmo para borrar deudas, subir tu score FICO y acceder a capital. Clase en vivo · 100% en Español." (Style: readable gray/white on dark background, smaller text).

4. HERO CONTENT REORGANIZATION (MOBILE ORDER):
- Completely REMOVE the credit bureau trust badges (Equifax, Experian, TransUnion, FICO) from the Hero section.
- On mobile (viewport width < 768px), stack the elements vertically in this exact order:
  1. Top Animated Ticker
  2. Logo
  3. Condensed H1
  4. Presenter Photo Layer (Amanda Olmo) taking up ~60% of the screen height. Use the image path "/fotos-amanda-generadas/amanda_hero_navy_cyan.png". Apply a clean drop-shadow: `filter: drop-shadow(0 20px 30px rgba(0, 240, 255, 0.15))`. Place the credit score dial graphic (rising from red 500 to green 750) floating next to her shoulder.
  5. CTA Button ("RESERVAR MI ASIENTO GRATIS"). When clicked on mobile, this button must scroll smoothly to the inline registration form located right below it, or trigger a clean registration modal.
- On desktop, keep a clean 2-column layout:
  * Left column: Condensed H1, Subtitle, Amanda Olmo photo and floating dial.
  * Right column: The registration card container containing the input fields (Name, Email, WhatsApp + TCPA SMS Consent Checkbox) and the gold CTA button.

5. AESTHETICS & BRANDING:
- Base Background: Deep Navy Blue (#0B192C) with subtle cyan neon (#00F0FF) glows and gold (#D4AF37) accent highlights.
- Use glassmorphism overlays (backdrop-filter: blur) on card containers.
```

---

## 🛠️ CÓDIGO DE REFERENCIA PARA LA INTEGRACIÓN

### 1. Animación CSS del Banner Marquesina (Marquee)

Para evitar que el countdown y el texto del banner se apilen feo en móvil, esta animación hace que se deslice horizontalmente de forma infinita:

```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
}
```

### 2. Estilo de Imagen de Amanda (60% Alto en Móvil)

Para asegurar que Amanda sea la protagonista indiscutible en móviles, aplicamos flexbox y alturas relativas al viewport:

```html
<!-- Contenedor móvil con la foto de Amanda -->
<div class="relative w-full h-[55vh] md:h-auto flex items-center justify-center overflow-hidden">
  <!-- Retrato de Amanda recortado -->
  <img 
    src="/fotos-amanda-generadas/amanda_hero_navy_cyan.png" 
    alt="Amanda Olmo - La chica del crédito" 
    class="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,240,255,0.18)]"
  />
  
  <!-- Dial de Score de Crédito flotante (SVG) -->
  <div class="absolute bottom-10 right-4 w-28 md:w-36 animate-float">
    <svg viewBox="0 0 100 60" class="w-full h-auto">
      <!-- Dial de Rojo a Verde -->
      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#dialGradient)" stroke-width="8" stroke-linecap="round"/>
      <!-- Aguja apuntando a 750 (Verde) -->
      <line x1="50" y1="50" x2="78" y2="28" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
      <circle cx="50" cy="50" r="4" fill="#D4AF37" />
      <!-- Texto 750+ -->
      <text x="50" y="46" font-family="Plus Jakarta Sans" font-size="10" font-weight="bold" fill="#FAFAFA" text-anchor="middle">750+</text>
      <!-- Gradiente -->
      <defs>
        <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#EF4444" />
          <stop offset="50%" stop-color="#EAB308" />
          <stop offset="100%" stop-color="#22C55E" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</div>
```
