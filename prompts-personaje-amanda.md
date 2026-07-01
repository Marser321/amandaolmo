# 📸 Prompts de Generación de Personaje — Amanda Olmo / Mandy Academy

Este documento contiene una guía completa de prompts y parámetros técnicos para generar imágenes de **Amanda Olmo ("La chica del crédito")** manteniendo su consistencia facial (Character Reference) e integrándola perfectamente con la paleta de colores de la landing page (Navy `#0B192C`, Cyan `#00F0FF` y Dorado `#D4AF37`).

---

## 🎯 CÓMO MANTENER LA CONSISTENCIA FACIAL (CHARACTER REFERENCE)

Para obtener resultados idénticos a Amanda, debes usar las fotos de la carpeta [`fotos-amanda-referencia/`](file:///c:/Users/morer/OneDrive/Desktop/Amo/fotos-amanda-referencia) como referencia en las diferentes herramientas de IA:

### 1. Midjourney v6 (Recomendado)
Sube las fotos recomendadas a Discord para obtener sus enlaces. Luego, añade el parámetro `--cref` al final de tu prompt:
*   **Comando:** `[Tu prompt aquí] --cref URL_DE_LA_FOTO --cw 100 --ar 16:9`
*   `--cref`: Mantiene la cara del personaje de la URL.
*   `--cw` (Character Weight):
    *   `--cw 100` (Por defecto): Copia la cara, el pelo y la ropa de la imagen de referencia. Úsalo si quieres el mismo blazer o look.
    *   `--cw 0`: **Solo copia la cara**. Te permite cambiarle la ropa, pose y peinado de forma dinámica. Muy útil para vestirla de azul oscuro, dorado, etc.
*   **Fotos recomendadas para la URL de cref:**
    *   `03_blazer_beige_presentacion.png` (Cara muy despejada, mirando al frente)
    *   `08_ceo_vestido_verde.png` (Perfil corporativo excelente)

### 2. Leonardo AI (Character Reference)
1.  Activa la pestaña **Image Guidance**.
2.  Sube la foto `03_blazer_beige_presentacion.png`.
3.  Selecciona el tipo de guía como **Character Reference**.
4.  Ajusta el **Strength** (fuerza) a `0.85` o `0.90` para que el parecido sea muy exacto.
5.  Usa los prompts que están a continuación.

### 3. Flux / Ideogram 2.0 / DALL-E 3 (Image to Image)
*   Usa la opción de **Image-to-Image** o **Image Prompt** subiendo la foto `03_blazer_beige_presentacion.png` con una fuerza de influencia del `30%` al `45%` para no distorsionar el rostro pero permitir que el prompt reemplace el fondo gris original por el fondo navy/cyan/dorado.

---

## 🎨 PALETA DE COLORES DE LA MARCA PARA LOS PROMPTS
*   **Fondo/Ropa base:** Navy / Deep Navy Blue (`#0B192C`)
*   **Iluminación:** Electric Blue (`#1F51FF`) / Neon Cyan (`#00F0FF`)
*   **Detalles/Acentos:** Metallic Gold (`#D4AF37`) / Warm Gold
*   **Estilo:** Fintech, Moderno, Premium, Limpio, Corporativo Femenino.

---

## 🖼️ BLOQUE 1: PROMPTS PARA SECCIONES ESPECÍFICAS

---

### 1.1 · HERO — Retrato Principal (Estilo Aurora Fintech)
*   **Ubicación:** Lado derecho del formulario del Hero.
*   **Objetivo:** Amanda presentándose con autoridad, confianza y amabilidad.
*   **Prompt (Copiar en inglés):**
    ```
    A high-quality professional studio portrait of the woman from the reference images, Amanda, a Latina credit expert, wearing a premium navy blue blazer with subtle gold buttons and a white blouse. She has a confident, warm smile and is looking directly at the camera. The background is a dark premium fintech gradient in deep navy (#0B192C) with soft glowing electric blue and neon cyan aurora lights and floating golden particles. Professional studio lighting, cinematic depth of field, corporate luxury aesthetic. --ar 16:9 --cref [URL] --cw 0
    ```
*   *Nota:* Si usas Midjourney, sustituye `[URL]` con el enlace de `03_blazer_beige_presentacion.png` y usa `--cw 0` para poder vestirla con el blazer navy blue de la marca.

---

### 1.2 · BIO / SOBRE MÍ — CEO de Mandy Academy
*   **Ubicación:** Sección "Conoce a Amanda Olmo".
*   **Objetivo:** Mostrarla en su espacio de trabajo como CEO, combinando cercanía y éxito corporativo.
*   **Prompt (Copiar en inglés):**
    ```
    A high-quality professional photo of the Latina woman from the reference images, Amanda, sitting in a modern, luxury executive office at a sleek dark glass desk with a premium silver laptop. She is wearing a sophisticated burgundy blazer, smiling warmly and confidently at the camera. The background is a clean, premium fintech environment with dark wood panels, soft glowing cyan and gold backlighting, and a subtle glass board showing abstract financial chart lines. Professional corporate portrait, soft bokeh, warm executive branding. --ar 16:9 --cref [URL] --cw 0
    ```

---

### 1.3 · VALOR PROPUESTO — Coach de Crédito Presentando
*   **Ubicación:** Sección "¿Qué vas a descubrir?" o en la sección de temarios.
*   **Objetivo:** Acción pedagógica. Amanda explicando conceptos, con diales de crédito detrás.
*   **Prompt (Copiar en inglés):**
    ```
    A professional studio shot of the Latina woman from the reference images, Amanda, standing and gesturing warmly as if presenting a class. She is wearing a modern cream-beige blazer and a black top. She has a bright, friendly smile, looking at the camera. In the background, a large out-of-focus digital screen displays a glowing neon cyan (#00F0FF) credit score dial showing a high score (750+) with gold (#D4AF37) particle trails. The studio setting has soft navy blue (#0B192C) ambient lighting. High-end modern credit coach branding, clean lighting, professional look. --ar 16:9 --cref [URL] --cw 0
    ```

---

### 1.4 · PRUEBA SOCIAL / CASOS — Retrato de Confianza y Calidez
*   **Ubicación:** Sección de testimonios de los alumnos de Mandy Academy.
*   **Objetivo:** Transmitir empatía y apoyo. Amanda mirando ligeramente de lado con una sonrisa muy amigable.
*   **Prompt (Copiar en inglés):**
    ```
    A close-up high-quality portrait of the Latina woman from the reference images, Amanda, looking slightly off-camera with a warm, encouraging and empathetic smile. She is wearing a simple but premium dark blue silk blouse. The background is a soft, dark navy blue (#0B192C) with subtle warm golden (#D4AF37) bokeh lights, creating a cozy and trustworthy atmosphere. Studio lighting with a gentle rim light highlighting her hair. Authentic, premium, supportive credit advisor. --ar 16:9 --cref [URL] --cw 0
    ```

---

### 1.5 · GRACIAS / CTA FINAL — Celebración y Éxito
*   **Ubicación:** Página `/gracias` (Thank you page) tras registrarse.
*   **Objetivo:** Transmitir logro y celebración por dar el primer paso hacia la libertad financiera.
*   **Prompt (Copiar en inglés):**
    ```
    A joyful professional photo of the Latina woman from the reference images, Amanda, smiling broadly and looking at the camera, her hands clasped in front of her. She is wearing a premium black blazer with gold lapel pins. The background is a dark celebration environment with a cascade of glowing golden (#D4AF37) particles and floating digital stars rising. Beautiful warm golden rim lighting. High-end financial success celebration, aspirational, premium fintech look. --ar 16:9 --cref [URL] --cw 0
    ```

---

## 📹 BLOQUE 2: PROMPTS DE VIDEO (Runway Gen-3 / Luma / Kling)

Para dar vida a los retratos anteriores y colocarlos como fondos vivos o elementos flotantes animados (tipo video-avatar en el Hero sin hablar, solo respirando y sonriendo):

### 2.1 · Animación Sutil (Look Convincente para Hero / Bio)
*   **Instrucciones:** Sube la imagen estática generada (por ejemplo, `amanda_hero_navy_cyan.png`) al generador de video y añade el siguiente prompt:
*   **Prompt:**
    ```
    Very subtle professional video of the woman. She is breathing naturally and blinking slowly with a gentle, warm smile. The soft golden and cyan particles in the dark background drift smoothly. Faint breeze gently moving a few strands of hair. Camera remains completely static, macro lens, professional corporate presentation. Ultra realistic skin details, no camera motion.
    ```
*   **Configuración:** Motion: `2` o `3` (muy bajo), Camera: `Pan: 0, Zoom: 0`.

### 2.2 · Presentación y Gesto de Bienvenida (Para Sección de Video o Masterclass Intro)
*   **Instrucciones:** Sube la imagen de Amanda presentando (`amanda_presenting_score.png`) y añade el siguiente prompt:
*   **Prompt:**
    ```
    The woman looks at the camera, nods her head with a confident smile, and makes a welcoming hand gesture. The digital credit score screen in the background has softly pulsating neon cyan lights and slowly floating gold numbers. Cinematic professional studio lighting. Smooth natural human movement, 8k resolution.
    ```
*   **Configuración:** Motion: `4` o `5`.

---

## 💡 MEJORES PRÁCTICAS PARA LA MAQUETACIÓN EN LA LANDING

1.  **Recorte de Fondo (Remove BG):** Si deseas colocar a Amanda flotando sobre las auroras CSS dinámicas de la landing, te recomiendo generar las imágenes con un fondo lo más plano posible o usar herramientas como **Photoroom** o **remove.bg** para obtener el archivo PNG con transparencia.
2.  **Sombras y Elevación (Glassmorphism):** Si la colocas recortada detrás de las tarjetas flotantes de la landing, aplica una sombra difusa en CSS para integrarla:
    ```css
    .amanda-portrait {
      filter: drop-shadow(0 20px 30px rgba(0, 240, 255, 0.15))
              drop-shadow(0 4px 10px rgba(212, 175, 55, 0.1));
    }
    ```
3.  **Animaciones CSS de entrada (Scroll Reveal):**
    ```css
    @keyframes slideUpFade {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .amanda-hero-img {
      animation: slideUpFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    ```
