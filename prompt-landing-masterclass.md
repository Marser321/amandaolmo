# Prompts — Landing de Registro · Masterclass Mandy Academy

> **Cómo usar este archivo:** copia el **Prompt Maestro** (Sección 1) completo y pégalo en tu constructor web IA (v0, Lovable o Bolt). Genera la página de una sola pasada. Luego usa los **Prompts de Refinamiento** (Sección 2) para iterar secciones puntuales. Revisa las **Notas de Uso** (Sección 3) antes de publicar.
>
> El texto que se ve en pantalla está en **español** (audiencia latina en EE.UU.). Las instrucciones al builder también van en español; v0/Lovable/Bolt las entienden sin problema.

---

## 1) PROMPT MAESTRO (copy-paste)

```
Eres un diseñador y desarrollador frontend senior especializado en landing pages de alta conversión. Construye una página de registro (opt-in) de una sola pantalla para una MASTERCLASS GRATUITA EN VIVO. La página debe ser MOBILE-FIRST: el 90% del tráfico llega desde el navegador interno de Instagram y TikTok en teléfonos. Prioriza velocidad de carga, cero fricción y una sola acción: registrarse.

Tecnología sugerida: React + Tailwind CSS, una sola ruta principal "/" y una ruta secundaria "/gracias". Sin librerías pesadas. Todo el copy en ESPAÑOL.

============================
NEGOCIO Y AUDIENCIA
============================
Marca: "Mandy Academy", de Amanda Olmo, conocida como "La chica del crédito". Enseña a la comunidad latina en EE.UU. a reparar y construir crédito de forma 100% legal.
Audiencia (3 sub-perfiles que deben sentirse identificados):
1. El recién llegado sin historial ("thin file"), muchos solo con ITIN, sin SSN.
2. El endeudado/penalizado con score bajo, colecciones y acoso de cobradores.
3. El emprendedor con LLC que ahoga su crédito personal financiando el negocio.
Tono: moderno, empático, protector, aspiracional. Nada de "bro-marketing" agresivo ni de academia aburrida. Nivel de lectura 6º–8º grado. Usa el vocabulario real de la audiencia: "Buró", "Score", "Colecciones", "Disputas", "ITIN", "SSN". Recalca que todo se explica "100% en ESPAÑOL".

============================
SISTEMA DE DISEÑO ("Fintech Premium Femenino")
============================
Estética: neobanco moderno + estatus aspiracional. Limpio, mucho espacio en blanco, sensación "app".
Colores:
- Fondo principal oscuro: Azul Marino Profundo #0B192C
- Fondo claro alterno: Blanco Nieve #FAFAFA
- Acento (botones, iconos, detalles): Dorado Metálico #D4AF37
- Texto sobre oscuro: blanco/gris muy claro; texto sobre claro: #0B192C
Tipografía:
- Titulares (H1/H2): "Plus Jakarta Sans" o "Inter" (geométrica, sólida, numérica).
- Cuerpo: "Roboto" u "Open Sans" (legibilidad alta).
Componentes: border-radius 12–16px, sombras suaves difusas, tarjetas flotantes, toques sutiles de glassmorphism (paneles translúcidos con blur). Iconos de candado para seguridad.
Elemento decorativo clave: un "dial" / medidor de score de crédito que sube de ROJO (≈500) a VERDE (≈750+), flotando junto al retrato de Amanda. Usa SVG ligero. Deja un PLACEHOLDER claro para la foto real de Amanda (retrato recortado del fondo, iluminación de estudio, mirando a cámara).
Prohibido: fotos de stock de ejecutivos genéricos dándose la mano o familias irreales. Solo placeholders rotulados "FOTO REAL DE AMANDA" y "CAPTURA REAL DE ALUMNO".

============================
ESTRUCTURA DE LA PÁGINA (orden exacto, lectura en "F")
============================
HEADER (sin navegación): solo el logo "Mandy Academy". NADA de menú (Home, Contacto, etc.) para no crear fugas de tráfico.

HERO (above-the-fold, visible sin scroll en móvil):
- Eyebrow / pre-título en una píldora dorada: "MASTERCLASS GRATUITA EN VIVO"
- H1 (textual, no cambiar):
  "Cómo Dominar el Sistema de Crédito en EE.UU. y Construir Riqueza para tu Familia, Incluso si Tienes Deudas, Solo Usas ITIN o Empiezas de Cero."
- Subtítulo:
  "Únete a Amanda Olmo ('La chica del crédito') en esta clase online GRATUITA y aprende la hoja de ruta legal para borrar colecciones injustas, acceder a capital y proteger el patrimonio de tu familia. El sistema de EE.UU., explicado 100% en ESPAÑOL, paso a paso."
- Formulario INLINE dentro de una tarjeta clara sobre el fondo oscuro (ver bloque FORMULARIO).
- A un lado/detrás: placeholder de foto de Amanda + dial de score rojo→verde.

SECCIÓN "¿Esta clase es para ti?" (identificación del dolor):
Lista de dolores marcados con ❌ (rojo), p. ej.:
- "❌ Te niegan préstamos, autos o apartamentos aunque trabajas duro."
- "❌ Estás harto de las llamadas de cobranza y la vergüenza que generan."
- "❌ Solo tienes ITIN y crees que el sistema no es para ti."
- "❌ Ya te estafó una agencia de reparación y no confías en nadie."
- "❌ Usas tus tarjetas personales para tu negocio y tu score se desploma."
Cierre tranquilizador (caja destacada):
"No importa si tienes 450 de score, si solo tienes ITIN, o si te han estafado antes. Esta es la hoja de ruta definitiva."

SECCIÓN "Qué vas a descubrir" (5 bullets de curiosidad, ✅ dorado/verde, textual):
- "✅ La trampa de las Colecciones: por qué cometes un error grave si pagas una deuda antigua a una agencia de cobranza (y qué hacer en su lugar)."
- "✅ El Mito del ITIN: la estrategia paso a paso para construir un historial de +700 puntos sin necesidad de un Número de Seguro Social tradicional."
- "✅ La 'Cirugía' del Buró: cómo identificar los errores que Equifax, Experian y TransUnion reportan sobre ti, y cómo obligarlos a corregirlos."
- "✅ Crédito Empresarial 101: cómo separar tus finanzas personales y acceder a capital para tu LLC sin arriesgar los ahorros de tu familia."
- "✅ El Atajo a la Riqueza Generacional: cómo estructurar tus tarjetas para que trabajen para ti y financien tu 'Sueño Americano'."

SECCIÓN Prueba social y autoridad:
- Placeholder "FOTO REAL DE AMANDA" de alta calidad.
- Bio breve: "Amanda Olmo — Fundadora de Mandy Academy. Más de 30,000 latinos empoderados en EE.UU."
- 3 tarjetas con placeholders "CAPTURA REAL DE ALUMNO (PII DIFUMINADA)" simulando mensajes de WhatsApp/DM con subidas de score.
- Bajo las capturas, en letra pequeña: "Los resultados demostrados no son típicos. Los resultados individuales variarán según el historial y la constancia de cada persona."

SECCIÓN FAQ + Urgencia:
- Acordeón con preguntas: "¿Es realmente gratis?", "¿Me van a vender algo?", "¿Funciona si solo tengo ITIN?", "¿Necesito saber inglés?", "¿Es legal disputar mi crédito?".
- Respuestas cortas, tranquilizadoras y honestas (sin promesas mágicas).
- Countdown / cuenta regresiva (Días : Horas : Minutos : Segundos) hacia la fecha del evento. Usa una constante EVENT_DATE en el código (placeholder, fácil de editar). Mensaje de escasez moderado: "Cupos limitados para la clase en vivo."
- CTA secundario que hace scroll de vuelta al formulario.

FOOTER LEGAL (imprescindible):
- Nombre legal completo + dirección física: "Mandy Academy / AMO Management LLC — Las Vegas, Nevada, EE.UU." (esto distancia la marca de empresas inmobiliarias homónimas).
- Enlaces (placeholder #): "Términos y Condiciones", "Política de Privacidad", "Términos de SMS".
- Texto de descargo legal COMPLETO (ver bloque COMPLIANCE).

ELEMENTO STICKY (solo móvil):
Botón flotante anclado abajo que aparece al hacer scroll: "Agendar mi lugar". Al tocarlo, hace scroll suave de vuelta al formulario del hero.

============================
FORMULARIO (captura de datos)
============================
Tarjeta clara, esquinas redondeadas, dentro del hero. Campos:
- "Nombre" (texto, requerido)
- "Correo electrónico" (email, requerido, validación de formato)
- "WhatsApp" (teléfono, requerido) con selector de país que muestra bandera de EE.UU. y prefijo "+1" PRESELECCIONADO.
- Checkbox de consentimiento TCPA, DESMARCADO por defecto, con este texto y enlace:
  "Acepto recibir mensajes de texto y recordatorios de Mandy Academy. El consentimiento no es condición de compra. Puedo darme de baja respondiendo STOP. (Ver Términos de SMS)."
  El botón de envío debe quedar DESHABILITADO hasta que el checkbox esté marcado y los campos válidos.
Botón CTA principal (grande, dorado #D4AF37 con sombra, alto contraste): "RESERVAR MI ASIENTO GRATIS"
Micro-texto bajo el botón: "🔒 Tus datos están 100% seguros."
Al enviar con éxito: redirige a la ruta "/gracias".

============================
PÁGINA /gracias (Thank You)
============================
- Mensaje de éxito grande: "¡Tu lugar está reservado!"
- Placeholder de video 45s "VIDEO DE BIENVENIDA DE AMANDA".
- UN SOLO CTA imperativo, botón dorado: "Únete al Grupo de WhatsApp VIP de la Clase" (enlace placeholder https://chat.whatsapp.com/REEMPLAZAR). Texto de apoyo: "Ahí enviaré la guía de trabajo preparatoria y el enlace del evento."
- Sin menús ni otras distracciones.

============================
COMPLIANCE — TEXTO LEGAL DEL FOOTER (insertar textual)
============================
"Descargo de Responsabilidad Legal: Mandy Academy y AMO Management LLC proporcionan servicios de educación financiera y asistencia en la preparación de documentos. No garantizamos un aumento específico en su puntaje de crédito ni resultados determinados, ya que el historial de cada individuo es único y depende de múltiples variables. La ley federal prohíbe a cualquier compañía de reparación de crédito garantizar la eliminación de información que sea precisa, actual y verificable. Usted tiene el derecho legal, bajo la Ley de Informes de Crédito Justos (FCRA), de disputar información inexacta o incompleta en su informe de crédito de forma gratuita directamente con los burós. Nada de lo contenido en esta página o en la Masterclass constituye asesoría legal.

Acuerdo TCPA: Al proporcionar su número de teléfono y marcar la casilla de consentimiento, usted autoriza a Mandy Academy a enviarle mensajes de texto automatizados, recordatorios de eventos y material promocional al número proporcionado. El consentimiento no es una condición de compra. Puede darse de baja en cualquier momento respondiendo 'STOP'. Pueden aplicar tarifas de mensajes y datos de su operador."

REGLAS DE COPY (cumplir siempre): NUNCA prometer "resultados garantizados", "borramos todas tus deudas", "+100 puntos en 30 días", ni "nuevo perfil/identidad crediticia". Enmarcar todo como EDUCACIÓN y DERECHOS del consumidor bajo la FCRA.

============================
REQUISITOS TÉCNICOS
============================
- Mobile-first real: el hero (H1 + formulario + CTA) debe verse completo en un iPhone sin hacer scroll.
- Above-the-fold debe cargar en <1.5s: sin scripts pesados, sin sliders innecesarios, fuentes optimizadas.
- Accesible: contraste AA, labels en inputs, foco visible, navegación por teclado, alt en imágenes.
- Sin barra de navegación. Sin enlaces externos salvo los del footer y el CTA de WhatsApp en /gracias.
- Código limpio, comentado donde haya placeholders (EVENT_DATE, foto de Amanda, capturas, enlaces legales, link de WhatsApp).

Entrega la página completa y funcional con datos de ejemplo/placeholder donde no haya contenido real.
```

---

## 2) PROMPTS DE REFINAMIENTO (modulares)

Úsalos uno a uno DESPUÉS de generar la página, para pulir.

### 2.1 — Animar el dial de score
```
Mejora el medidor (dial) de score del hero. Conviértelo en un arco/gauge SVG semicircular con gradiente de ROJO (#E5484D) a AMARILLO a VERDE (#30A46C). Al cargar la página, anima la aguja de 500 hasta 750+ en ~1.5s con easing suave, y un número que cuenta de 500 a 750. Mantenlo ligero (CSS/SVG, sin librerías). Respeta prefers-reduced-motion: si está activo, muestra el estado final sin animación.
```

### 2.2 — Validación del formulario y estado de error
```
Refuerza el formulario del hero. Añade: validación en vivo de email (formato) y de teléfono (10 dígitos tras el +1); mensajes de error en rojo bajo cada campo; el botón "RESERVAR MI ASIENTO GRATIS" permanece deshabilitado hasta que Nombre, Email y WhatsApp sean válidos Y el checkbox TCPA esté marcado. El checkbox debe estar SIEMPRE desmarcado por defecto al cargar. Al enviar, muestra un estado de carga en el botón y luego redirige a /gracias.
```

### 2.3 — Variantes de H1 para A/B testing
```
Prepara el H1 del hero para pruebas A/B: extrae el titular a una constante editable y deja comentadas estas 4 variantes alternativas para poder intercambiarlas fácilmente:
1) "De Invisible a Aprobado: La Masterclass Definitiva para que los Latinos en EE.UU. Dominen su Futuro Financiero."
2) "Cómo Dominar el Sistema de Crédito en EE.UU. y Subir tu Puntaje, Incluso si Tienes Deudas o Empiezas de Cero."
3) "¿Te han Negado un Préstamo, un Auto o un Apartamento? Descubre el Plan Exacto de 90 Días para Limpiar tu Buró Legalmente."
4) "Lo que los Bancos y las Agencias de Colección NO Quieren que los Latinos Sepan Sobre su Crédito en 2026."
```

### 2.4 — Countdown y sticky CTA en móvil
```
Sincroniza la cuenta regresiva con una constante EVENT_DATE (formato ISO, fácil de editar) y muéstrala en Días:Horas:Minutos:Segundos; cuando llegue a cero, reemplázala por el texto "¡La clase está por comenzar!". Asegura que el botón sticky inferior "Agendar mi lugar" solo aparezca en móvil tras pasar el hero, y que al tocarlo haga scroll suave al formulario y enfoque el primer campo.
```

### 2.5 — Página de gracias (si no se generó bien)
```
Crea/ajusta la ruta "/gracias": fondo azul marino #0B192C, mensaje grande "¡Tu lugar está reservado!", un placeholder de video de 45s "VIDEO DE BIENVENIDA DE AMANDA", y UN SOLO botón dorado "Únete al Grupo de WhatsApp VIP de la Clase" (href placeholder https://chat.whatsapp.com/REEMPLAZAR) con el texto "Ahí enviaré la guía de trabajo preparatoria y el enlace del evento." Sin menú ni otros enlaces.
```

### 2.6 — Corregir superposición de logos de confianza en el Header (Móvil)
```
Ajusta la fila de logos de confianza (Equifax, Experian, TransUnion, FICO) que está debajo del H1. En dispositivos móviles (viewport de 500px o menos), los logos se enciman y se desalinean. Asegura que el contenedor de estos logos use clases flexbox fluidas y adaptativas: `flex flex-wrap items-center justify-center gap-4 md:gap-8` (o una cuadrícula responsiva `grid grid-cols-2 md:flex md:items-center md:justify-center md:gap-8`). Cada logo/svg debe tener dimensiones máximas claras y proporcionales (ej. `h-6 w-auto` o `max-w-[90px]`) y contar con margen adecuado para que nunca se solapen en pantallas pequeñas.
```

### 2.7 — Corregir superposición de la foto de Amanda y el dial/reloj de FICO score
```
Corrige la superposición en la sección de biografía/hero donde la foto de Amanda Olmo coincide con el indicador de FICO score / gráfico circular de reloj. Actualmente, el indicador se superpone encima de la foto tapando áreas importantes de la cara o el cuerpo de Amanda. Modifica el diseño de la siguiente manera:
- En móvil, haz que la foto y el gráfico circular se apilen verticalmente sin tocarse (`flex flex-col items-center gap-6`).
- En escritorio (pantallas más grandes), colócalos uno al lado del otro (`flex flex-row items-center gap-8`) o utiliza posicionamiento absoluto controlado con suficiente z-index y márgenes para que el dial flote libremente a un lado de Amanda sin superponerse ni ocultar su rostro o sus hombros.
```

### 2.8 — Rediseñar a paleta "Electric/Neon Aurora" con degradados animados
```
Reemplaza el fondo azul marino plano (#0B192C) por un fondo de "Electric/Neon Aurora" dinámico y de aspecto premium. El diseño debe combinar:
- Un fondo base azul oscuro (donde la parte más oscura ocupe aproximadamente el 20% del fondo, como un `#080F1A`) que se difumine mediante degradados radiales y lineales hacia tonos azul eléctrico (#1F51FF) y cian neón (#00F0FF).
- Añade efectos de brillo de neón (p. ej., `shadow-[0_0_25px_rgba(0,240,255,0.2)]` o `drop-shadow`) alrededor de las tarjetas translúcidas de testimonios, el formulario y los elementos de diales para lograr una interfaz futurista y atractiva.
- Asegura que los textos secundarios, que antes eran de un color slate grisáceo apagado, se cambien a un cian muy claro y vibrante (ej. `#E0F7FA` o `text-cyan-200`) que mantenga un alto contraste de lectura sobre los fondos de aurora.
- Integra una micro-animación fluida en CSS (mediante keyframes que modifiquen el `background-position` o trasladen sutilmente los círculos de degradado radiales con blur) para que el fondo de la aurora parezca tener un movimiento lento y orgánico.
```

---

## 3) NOTAS DE USO

**Diferencias entre herramientas**
- **v0 (Vercel):** pega el Prompt Maestro tal cual; genera React + Tailwind. Ideal para luego exportar a Next.js.
- **Lovable:** funciona igual; te dará app full-stack. Si pide backend para el formulario, indícale "por ahora simula el envío y redirige a /gracias".
- **Bolt:** pega el prompt; si la página queda muy pesada, añade "mantenlo en un solo componente, sin dependencias externas".

**Reemplazar SIEMPRE antes de publicar (placeholders):**
- `EVENT_DATE` → fecha y hora reales de la masterclass (con zona horaria).
- Foto real de Amanda (retrato recortado, mirando a cámara, estilo de sus videos virales).
- 3 capturas reales de alumnos **con todos los datos personales (PII) difuminados**.
- Enlace real del Grupo de WhatsApp VIP en `/gracias`.
- Enlaces reales de "Términos y Condiciones", "Política de Privacidad" y "Términos de SMS".
- Logo de Mandy Academy.

**Recordatorio legal (importante):**
Los textos de descargo (CROA/FTC/FCRA y TCPA) y el flujo de consentimiento SMS están redactados según el dossier, pero **deben ser revisados por un asesor legal** antes de salir a producción. El consentimiento TCPA por escrito es obligatorio para enviar mensajes al WhatsApp/teléfono capturado; el checkbox va **desmarcado por defecto** y el opt-out ("STOP") debe respetarse.

**Conversión (no perder de vista):**
1. Fricción cero en la primera pantalla (formulario visible sin scroll en móvil).
2. El puente de comunidad es la página `/gracias` → WhatsApp VIP (sube la asistencia en vivo).
3. La transparencia legal vende: deja visible "Aquí no hacemos magia ni promesas ilegales; enseñamos la ley (FCRA) que te protege."
