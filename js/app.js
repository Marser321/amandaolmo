/**
 * ⚡ Mandy Academy — Scripts de Interactividad y Lógica de Conversión
 */

// 1. Configuración de Variables del Evento
const CONFIG = {
  // Configura aquí la fecha de la Masterclass (Año, Mes (0-11), Día, Hora, Minutos)
  eventDate: new Date(2026, 6, 18, 11, 0, 0)
};

document.addEventListener("DOMContentLoaded", () => {
  initABTesting(); // Inicializar sistema de A/B testing
  initCountdown();
  initStickyCTA();
  initFormHandler();
  initFaqAccordion();
  initScrollReveal();
  initModalHandler();
  initScrollToForm();
  initVideoTestimonials();
  initHeroBannerMotion();
});

// Respeta prefers-reduced-motion en el banner de video del hero
function initHeroBannerMotion() {
  const video = document.querySelector(".hero-banner-video");
  if (!video) return;

  if (window.matchMedia("(max-width: 1024px)").matches) {
    video.poster = "videos/timeline-2-poster.jpg";
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const apply = () => {
    if (reduceMotion.matches) {
      video.removeAttribute("autoplay");
      video.pause();
    } else if (video.paused) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {}); // autoplay bloqueado (p. ej. iOS Low Power): se muestra el poster
      }
    }
  };

  apply();
  reduceMotion.addEventListener("change", apply);
}

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
      
      const countdownBoxDesc = document.querySelector(".countdown-desc");
      if (countdownBoxDesc) {
        countdownBoxDesc.textContent = "¡La clase está por comenzar! Únete al grupo de WhatsApp VIP para recibir el enlace directo.";
      }
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const format = num => String(num).padStart(2, "0");

    timerDays.forEach(el => el.textContent = format(days));
    timerHours.forEach(el => el.textContent = format(hours));
    timerMinutes.forEach(el => el.textContent = format(minutes));
    timerSeconds.forEach(el => el.textContent = format(seconds));
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// 3. Botón Flotante Pegajoso (Sticky CTA Móvil)
function initStickyCTA() {
  const stickyBar = document.querySelector(".sticky-bar");
  const heroSection = document.querySelector("#hero");

  if (!stickyBar || !heroSection) return;

  window.addEventListener("scroll", () => {
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

// Helper para obtener o crear span de error
function getOrCreateErrorSpan(input) {
  let errorSpan = input.parentNode.querySelector(".error-msg");
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.className = "error-msg";
    errorSpan.style.color = "var(--color-red-danger)";
    errorSpan.style.fontSize = "0.75rem";
    errorSpan.style.display = "none";
    errorSpan.style.marginTop = "0.25rem";
    errorSpan.style.textAlign = "left";
    errorSpan.style.width = "100%";
    input.parentNode.appendChild(errorSpan);
  }
  return errorSpan;
}

// Validar formato de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Lógica de Validación en Vivo
function setupLiveValidation(form) {
  const nameInput = form.querySelector("[name='name']");
  const emailInput = form.querySelector("[name='email']");
  const phoneInput = form.querySelector("[name='phone']");
  const tcpaCheckbox = form.querySelector("[name='tcpa_consent']");
  const submitBtn = form.querySelector("button[type='submit']");

  if (!nameInput || !emailInput || !phoneInput || !tcpaCheckbox || !submitBtn) return;

  const touched = { name: false, email: false, phone: false };

  function checkFormValidity() {
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.replace(/\D/g, "");
    const tcpaChecked = tcpaCheckbox.checked;

    const isNameValid = nameVal.length > 0;
    const isEmailValid = validateEmail(emailVal);
    const isPhoneValid = phoneVal.length >= 10;

    if (touched.name) {
      const errorSpan = getOrCreateErrorSpan(nameInput);
      errorSpan.textContent = isNameValid ? "" : "El nombre completo es requerido.";
      errorSpan.style.display = isNameValid ? "none" : "block";
    }
    if (touched.email) {
      const errorSpan = getOrCreateErrorSpan(emailInput);
      if (!emailVal) {
        errorSpan.textContent = "El correo electrónico es requerido.";
        errorSpan.style.display = "block";
      } else if (!isEmailValid) {
        errorSpan.textContent = "Introduce un correo válido (ej. usuario@correo.com).";
        errorSpan.style.display = "block";
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    }
    if (touched.phone) {
      const errorSpan = getOrCreateErrorSpan(phoneInput);
      if (!phoneVal) {
        errorSpan.textContent = "El número telefónico es requerido.";
        errorSpan.style.display = "block";
      } else if (!isPhoneValid) {
        errorSpan.textContent = "Introduce tu teléfono a 10 dígitos.";
        errorSpan.style.display = "block";
      } else {
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
      }
    }

    const isValid = isNameValid && isEmailValid && isPhoneValid && tcpaChecked;
    submitBtn.disabled = !isValid;
  }

  nameInput.addEventListener("input", () => {
    touched.name = true;
    checkFormValidity();
  });
  nameInput.addEventListener("blur", () => {
    touched.name = true;
    checkFormValidity();
  });

  emailInput.addEventListener("input", () => {
    touched.email = true;
    checkFormValidity();
  });
  emailInput.addEventListener("blur", () => {
    touched.email = true;
    checkFormValidity();
  });

  phoneInput.addEventListener("input", () => {
    touched.phone = true;
    checkFormValidity();
  });
  phoneInput.addEventListener("blur", () => {
    touched.phone = true;
    checkFormValidity();
  });

  tcpaCheckbox.addEventListener("change", () => {
    checkFormValidity();
  });

  // Ejecución inicial por si el navegador autocompleta
  setTimeout(checkFormValidity, 500);
}

// 4. Envío de Formulario
function initFormHandler() {
  const forms = document.querySelectorAll(".registration-form");

  forms.forEach(form => {
    setupLiveValidation(form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      
      const nameInput = form.querySelector("[name='name']");
      const emailInput = form.querySelector("[name='email']");
      const phoneInput = form.querySelector("[name='phone']");
      const tcpaCheckbox = form.querySelector("[name='tcpa_consent']");

      const cleanedPhone = phoneInput.value.replace(/\D/g, "");

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="btn-icon-wrapper animate-spin" style="margin: 0 auto; display: inline-block;">
          <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        <span>Procesando...</span>
      `;

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: "+1" + cleanedPhone,
        tcpaConsent: tcpaCheckbox.checked,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles",
        abVariant: localStorage.getItem("mandy_ab_variant") || "A"
      };

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.bookingToken) {
          throw new Error(result.message || "No pudimos completar tu registro.");
        }

        sessionStorage.setItem("mandy_booking_token", result.bookingToken);
        sessionStorage.setItem("mandy_booking_expires_at", result.expiresAt || "");
        localStorage.setItem("mandy_lead_name", payload.name);
        window.location.href = "gracias.html";
      } catch (error) {
        console.error("Error al registrar:", error);
        alert(error.message || "Hubo un inconveniente al procesar tu registro. Por favor, vuelve a intentarlo en unos instantes.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
}

// 5. FAQ Accordion
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".accordion-item").forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        }
      });

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
    revealElements.forEach(el => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
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

  if (!modal || !closeBtn) return;

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// 8. Lógica de Scroll suave hacia el formulario inline
function initScrollToForm() {
  const scrollBtns = document.querySelectorAll(".scroll-to-form-btn");
  const formCard = document.querySelector(".hero-form-card");
  const firstInput = document.getElementById("hero-name");

  scrollBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (formCard) {
        formCard.scrollIntoView({ behavior: "smooth", block: "center" });
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 600);
        }
      }
    });
  });
}

// 9. Reproducción coordinada de testimonios en video
function initVideoTestimonials() {
  const videos = Array.from(document.querySelectorAll("[data-testimonial-video]"));

  if (!videos.length) return;

  videos.forEach(video => {
    video.addEventListener("play", () => {
      videos.forEach(otherVideo => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      videos.forEach(video => video.pause());
    }
  });
}

// 11. Sistema de A/B Testing para Copywriting y Optimización de Conversión (CRO)
function initABTesting() {
  const variants = {
    A: {
      heroTitle: "Aprende a Restaurar tu Crédito Tú Mismo",
      heroSubtitle: "Elimina los elementos negativos de tu reporte en los burós de crédito",
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
      heroTitle: "Aprende a Restaurar tu Crédito Tú Mismo",
      heroSubtitle: "Elimina los elementos negativos de tu reporte en los burós de crédito",
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
      heroTitle: "Aprende a Restaurar tu Crédito Tú Mismo",
      heroSubtitle: "Elimina los elementos negativos de tu reporte en los burós de crédito",
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

  const urlParams = new URLSearchParams(window.location.search);
  let selectedVariant = urlParams.get("v");

  if (!["A", "B", "C"].includes(selectedVariant)) {
    selectedVariant = localStorage.getItem("mandy_ab_variant");
    if (!selectedVariant) {
      const keys = ["A", "B", "C"];
      selectedVariant = keys[Math.floor(Math.random() * keys.length)];
      localStorage.setItem("mandy_ab_variant", selectedVariant);
    }
  } else {
    localStorage.setItem("mandy_ab_variant", selectedVariant);
  }

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
