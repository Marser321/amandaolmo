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

  scrollBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (formCard) {
        formCard.scrollIntoView({ behavior: "smooth", block: "center" });
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
