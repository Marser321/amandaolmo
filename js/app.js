/**
 * ⚡ Mandy Academy — Scripts de Interactividad y Lógica de Conversión
 */

// 1. Configuración de Variables del Evento
const CONFIG = {
  // Configura aquí la fecha de la Masterclass (Año, Mes (0-11), Día, Hora, Minutos)
  // Ejemplo: 2 de Julio de 2026, 8:00 PM EST (20:00)
  eventDate: new Date(2026, 6, 2, 20, 0, 0), 
  
  // Endpoint de integración (reemplazar por tu webhook de GoHighLevel / Zapier)
  webhookUrl: "https://services.leadconnectorhq.com/hooks/.../YOUR_WEBHOOK_ID",
  
  // Habilitar simulación local de base de datos
  simulateLocalSubmit: true
};

document.addEventListener("DOMContentLoaded", () => {
  initABTesting(); // Inicializar sistema de A/B testing
  initCountdown();
  initStickyCTA();
  initFormHandler();
  initFaqAccordion();
  initScrollReveal();
  initModalHandler();
});

// 2. Cuenta Regresiva (Countdown Timer)
function initCountdown() {
  const timerDays = document.querySelectorAll(".timer-days");
  const timerHours = document.querySelectorAll(".timer-hours");
  const timerMinutes = document.querySelectorAll(".timer-minutes");
  const timerSeconds = document.querySelectorAll(".timer-seconds");

  if (!timerDays.length) return;

  function updateTimer() {
    const now = new Date().getTime();
    const difference = CONFIG.eventDate.getTime() - now;

    if (difference <= 0) {
      // El evento ya comenzó o pasó
      timerDays.forEach(el => el.textContent = "00");
      timerHours.forEach(el => el.textContent = "00");
      timerMinutes.forEach(el => el.textContent = "00");
      timerSeconds.forEach(el => el.textContent = "00");
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Formatear a dos dígitos (ej. 05 en lugar de 5)
    const format = num => String(num).padStart(2, "0");

    timerDays.forEach(el => el.textContent = format(days));
    timerHours.forEach(el => el.textContent = format(hours));
    timerMinutes.forEach(el => el.textContent = format(minutes));
    timerSeconds.forEach(el => el.textContent = format(seconds));
  }

  // Ejecutar inmediatamente y programar intervalo cada segundo
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// 3. Botón Flotante Pegajoso (Sticky CTA Móvil)
function initStickyCTA() {
  const stickyBar = document.querySelector(".sticky-bar");
  const heroSection = document.querySelector("#hero");

  if (!stickyBar || !heroSection) return;

  window.addEventListener("scroll", () => {
    // Si la pantalla es móvil y el usuario pasó la sección hero, muestra la barra flotante
    if (window.innerWidth <= 768) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.style.transform = "translateY(0)";
        stickyBar.style.opacity = "1";
        stickyBar.style.display = "flex";
      } else {
        stickyBar.style.transform = "translateY(100%)";
        stickyBar.style.opacity = "0";
      }
    } else {
      stickyBar.style.display = "none";
    }
  });
}

// 4. Validación de Formulario y Envío
function initFormHandler() {
  const forms = document.querySelectorAll(".registration-form");

  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      
      // Obtener campos
      const nameInput = form.querySelector("[name='name']");
      const emailInput = form.querySelector("[name='email']");
      const phoneInput = form.querySelector("[name='phone']");
      const tcpaCheckbox = form.querySelector("[name='tcpa_consent']");

      // Validaciones básicas
      if (!nameInput.value.trim()) {
        alert("Por favor, introduce tu nombre.");
        nameInput.focus();
        return;
      }

      if (!validateEmail(emailInput.value.trim())) {
        alert("Por favor, introduce un correo electrónico válido.");
        emailInput.focus();
        return;
      }

      // Quitar caracteres no numéricos para validación de teléfono (mínimo 10 dígitos)
      const cleanedPhone = phoneInput.value.replace(/\D/g, "");
      if (cleanedPhone.length < 10) {
        alert("Por favor, introduce un número de teléfono de 10 dígitos válido.");
        phoneInput.focus();
        return;
      }

      if (!tcpaCheckbox.checked) {
        alert("Debes marcar la casilla para autorizar los recordatorios de la Masterclass vía SMS/WhatsApp.");
        tcpaCheckbox.focus();
        return;
      }

      // Cambiar estado a "Enviando"
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" style="width: 20px; height: 20px; color: black;" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Registrando lugar...
      `;

      // Payload de datos
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: "+1" + cleanedPhone, // Prefijo de EE.UU. preseleccionado
        tcpa_consent: tcpaCheckbox.checked,
        registeredAt: new Date().toISOString(),
        source: "Landing Page Masterclass",
        ab_variant: localStorage.getItem("mandy_ab_variant") || "A"
      };

      try {
        if (CONFIG.simulateLocalSubmit) {
          // Simulación de envío con retraso para UX limpia
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log("Submit Simulado Exitoso:", payload);
          
          // Guardar en localStorage para usar el nombre en la página de agradecimiento
          localStorage.setItem("mandy_lead_name", payload.name);
          
          // Redirigir a gracias.html
          window.location.href = "gracias.html";
        } else {
          // Envío real a Webhook / API
          const response = await fetch(CONFIG.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            localStorage.setItem("mandy_lead_name", payload.name);
            window.location.href = "gracias.html";
          } else {
            throw new Error("Error en respuesta del servidor");
          }
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Hubo un inconveniente al procesar tu registro. Por favor, vuelve a intentarlo en unos instantes.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 5. FAQ Accordion
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains("active");

      // Cerrar otros abiertos para efecto limpio
      document.querySelectorAll(".accordion-item").forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

      // Alternar el actual
      if (isActive) {
        item.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// 6. Animación Scroll Reveal (Intersection Observer)
function initScrollReveal() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  
  if (!("IntersectionObserver" in window)) {
    // Fallback si no está soportado
    revealElements.forEach(el => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Dejar de observar una vez revelado
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// 7. Manejo del Modal de Registro (Popup)
function initModalHandler() {
  const modal = document.getElementById("register-modal");
  const closeBtn = document.getElementById("close-modal");
  const triggerBtns = document.querySelectorAll(".trigger-modal-btn");

  if (!modal || !closeBtn) return;

  // Abrir Modal
  triggerBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Desactivar scroll del fondo
      
      // Enfocar el input de nombre
      const nameInput = document.getElementById("modal-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    });
  });

  // Cerrar Modal
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restaurar scroll del fondo
  };

  closeBtn.addEventListener("click", closeModal);

  // Cerrar haciendo clic fuera del modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// 8. Sistema de A/B Testing para Copywriting y Optimización de Conversión (CRO)
function initABTesting() {
  const variants = {
    A: {
      heroTitle: "Cómo Dominar el Crédito en EE.UU. y Construir Riqueza para tu Familia, Incluso si Tienes Deudas, Solo Usas ITIN o Empiezas de Cero",
      heroSubtitle: "Aprende la hoja de ruta con Amanda Olmo para subir tu score FICO, borrar deudas y acceder a capital, incluso con ITIN. Clase en vivo y 100% en español.",
      painTitle: "¿Te has sentido estancado o frustrado por el sistema?",
      pains: [
        {
          title: "El Recién Llegado \"Invisible\"",
          text: "Llevas meses pagando todo en efectivo y el sistema dice que \"no existes\". Te niegan el alquiler de un apartamento o te cobran depósitos abusivos por no tener historial."
        },
        {
          title: "El Asfixiado por Deudas",
          text: "Vives con vergüenza e incertidumbre por las constantes llamadas de agencias de cobranza. Crees que tu score bajo (450 - 580) no tiene solución y temes el impacto financiero en tu familia."
        },
        {
          title: "El Emprendedor Estancado",
          text: "Estás utilizando tus tarjetas y ahorros personales para financiar tu LLC o negocio independiente. Esto ahoga tu historial personal y bloquea tus metas de comprar una casa."
        }
      ]
    },
    B: {
      heroTitle: "La Hoja de Ruta para Dominar tu Crédito en EE.UU., Limpiar tu Buró y Subir tu Score FICO, Sin Caer en Estafas",
      heroSubtitle: "Descubre el plan de 90 días para detener el acoso de cobradores y forzar a los burós a limpiar tu historial. Clase online gratis.",
      painTitle: "¿Sufres algunas de estas trabas todos los días?",
      pains: [
        {
          title: "El Rechazo por tu Score",
          text: "Aunque tienes el dinero para pagar, te tratan como un ciudadano de segunda clase al rentar o comprar un vehículo porque no tienes historial crediticio."
        },
        {
          title: "El Acoso de Cobradores",
          text: "El miedo a que las llamadas afecten tu paz familiar o tu estatus migratorio por deudas médicas o cobros injustos que ni sabías que tenías."
        },
        {
          title: "Tu LLC Financiada de tu Bolsillo",
          text: "Arriesgas el patrimonio familiar inyectando tus ahorros o tus tarjetas personales al negocio, mientras tu score personal se desploma."
        }
      ]
    },
    C: {
      heroTitle: "Cómo Dominar tu Crédito en EE.UU. para Hackear el Algoritmo Bancario y Acceder a Capital para tu Familia o LLC",
      heroSubtitle: "El sistema de EE.UU. tiene reglas de juego ocultas. Conoce el método de Amanda Olmo para disputar errores y acceder a capital.",
      painTitle: "Las objeciones y miedos que te impiden avanzar:",
      pains: [
        {
          title: "Inmigrante con solo ITIN",
          text: "Crees que sin un SSN tradicional estás excluido del sistema financiero de EE.UU. Aprende cómo el ITIN es tu mejor llave de acceso a capital."
        },
        {
          title: "Estafado por Reparadoras",
          text: "Ya le pagaste cientos de dólares a agencias fantasma de reparación de crédito que te prometieron magia y te dejaron igual. Es hora del método correcto."
        },
        {
          title: "Bloqueado para Comprar Casa",
          text: "El score bajo te tiene pagando intereses abusivos del 20-30%, impidiendo que tu familia logre el verdadero 'Sueño Americano'."
        }
      ]
    }
  };

  // 1. Detectar parámetro de URL para pruebas manuales (?v=A, ?v=B, ?v=C)
  const urlParams = new URLSearchParams(window.location.search);
  let selectedVariant = urlParams.get("v");

  // 2. Si no es válido o no existe, verificar localStorage o elegir aleatoriamente
  if (!["A", "B", "C"].includes(selectedVariant)) {
    selectedVariant = localStorage.getItem("mandy_ab_variant");
    if (!selectedVariant) {
      const keys = ["A", "B", "C"];
      selectedVariant = keys[Math.floor(Math.random() * keys.length)];
      localStorage.setItem("mandy_ab_variant", selectedVariant);
    }
  } else {
    // Si viene de URL, forzar almacenamiento
    localStorage.setItem("mandy_ab_variant", selectedVariant);
  }

  // 3. Aplicar textos de la variante seleccionada
  const variant = variants[selectedVariant];
  
  const heroTitleEl = document.querySelector(".hero-title");
  const heroSubtitleEl = document.querySelector(".hero-subtitle");
  const painTitleEl = document.querySelector(".pain-section .section-title");
  const painCards = document.querySelectorAll(".pain-card");

  if (heroTitleEl) heroTitleEl.textContent = variant.heroTitle;
  if (heroSubtitleEl) heroSubtitleEl.textContent = variant.heroSubtitle;
  if (painTitleEl) painTitleEl.textContent = variant.painTitle;

  if (painCards.length === 3) {
    painCards.forEach((card, idx) => {
      const titleEl = card.querySelector(".pain-card-title");
      const textEl = card.querySelector(".pain-card-text");
      if (titleEl) titleEl.textContent = variant.pains[idx].title;
      if (textEl) textEl.textContent = variant.pains[idx].text;
    });
  }

  console.log(`[A/B Testing] Variante activa: ${selectedVariant}`);
}
