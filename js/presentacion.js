/**
 * 📊 Lógica de Interactividad y Renderizado dinámico de la Presentación Masterclass (Mandy Academy)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Renderizar diapositivas dinámicamente
  renderSlides();

  // 2. Inicializar Reveal.js
  Reveal.initialize({
    width: 1280,
    height: 720,
    margin: 0.05,
    minScale: 0.2,
    maxScale: 2.0,
    hash: true,
    respondToHashChanges: true,
    controls: true,
    progress: true,
    center: false,
    transition: 'slide',
    backgroundTransition: 'fade',
    touch: true,
    keyboard: true
  }).then(() => {
    // Inicializar componentes interactivos una vez Reveal esté listo
    initPresenterNotes();
    initDreamSelector();
    initFICOSimulator();
    initBeforeAfterSlider();
    initComparisonTabs();
  });
});

// --- RENDERIZADO DE SLIDES DESDE DATA ---
function renderSlides() {
  const slidesContainer = document.querySelector(".reveal .slides");
  if (!slidesContainer) return;

  slidesContainer.innerHTML = '';

  SLIDES_DATA.forEach(slide => {
    const slideSection = document.createElement("section");
    // Usamos el fondo de la marca por defecto para Reveal
    slideSection.setAttribute("data-background-color", "#050A13");
    
    const wrapper = document.createElement("div");
    wrapper.className = "slide-content-wrapper";

    // 1. Identificar slides especiales interactivos
    if (slide.slide === 5) {
      wrapper.innerHTML = renderDreamSelectorTemplate(slide);
    } else if (slide.slide === 6) {
      wrapper.innerHTML = renderFICOSimulatorTemplate(slide);
    } else if (slide.slide === 27) {
      wrapper.innerHTML = renderBeforeAfterTemplate(slide);
    } else if (slide.slide === 20) {
      wrapper.innerHTML = renderComparisonTabsTemplate(slide);
    } else if (slide.slide === 41 || slide.slide === 42) {
      wrapper.innerHTML = renderFinalRegisterTemplate(slide);
    } else {
      // 2. Autolayout por Bounding Box (BBox original de PowerPoint)
      let htmlContent = '';

      // Dibujar imágenes
      slide.images.forEach(img => {
        let src = 'logo.png';
        if (img.alt.toLowerCase().includes('logo')) {
          src = 'logo.png';
        } else if (img.alt.toLowerCase().includes('laptop') || img.alt.toLowerCase().includes('sentada')) {
          src = 'fotos-amanda-ia/amanda_masterclass_discovery.webp';
        } else if (img.alt.toLowerCase().includes('de pie') || img.alt.toLowerCase().includes('autoridad')) {
          src = 'fotos-amanda-ia/amanda_authority_warm_navy.webp';
        } else if (img.alt.toLowerCase().includes('retrato') || img.alt.toLowerCase().includes('amanda')) {
          src = 'fotos-amanda-ia/amanda_hero_navy_warm.webp';
        }

        htmlContent += `
          <img src="${src}" alt="${img.alt}" style="position: absolute; left: ${img.bbox[0]}px; top: ${img.bbox[1]}px; width: ${img.bbox[2]}px; height: ${img.bbox[3]}px; object-fit: contain; z-index: 2;" />
        `;
      });

      // Dibujar textos
      slide.textboxes.forEach(box => {
        // Ignorar textos transaccionales redundantes o números de página abajo
        if (box.text.trim() === slide.slide.toString() && box.bbox[1] > 600) return;
        if (box.text.includes("Mandy Academy") && box.bbox[1] < 100) return;
        if (box.text.includes("AMO Management") && box.bbox[1] < 100) return;

        let className = 'text-body';
        if (box.text === slide.title) {
          className = 'text-title';
        } else if (box.text.includes('\n')) {
          className = 'text-list';
        }

        // Convertir bullets
        const lines = box.text.split('\n');
        let formattedText = '';
        let insideList = false;

        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('✅') || 
              (trimmed.match(/^\d+\.?\s/) && box.text.includes('\n'))) {
            if (!insideList) {
              formattedText += '<ul class="text-list">';
              insideList = true;
            }
            // Limpiar el marcador original
            const cleanText = trimmed.replace(/^[•\-\s✅\d\.]+\s?/, '');
            formattedText += `<li class="bullet-item">${cleanText}</li>`;
          } else {
            if (insideList) {
              formattedText += '</ul>';
              insideList = false;
            }
            formattedText += `<p>${line}</p>`;
          }
        });

        if (insideList) formattedText += '</ul>';

        htmlContent += `
          <div class="${className}" style="position: absolute; left: ${box.bbox[0]}px; top: ${box.bbox[1]}px; width: ${box.bbox[2]}px; height: ${box.bbox[3]}px; z-index: 5;">
            ${formattedText}
          </div>
        `;
      });

      wrapper.innerHTML = htmlContent;
    }

    slideSection.appendChild(wrapper);
    slidesContainer.appendChild(slideSection);
  });
}

// --- TEMPLATES DE COMPONENTES INTERACTIVOS ---

function renderDreamSelectorTemplate(slide) {
  return `
    <h2 class="text-title" style="position: absolute; left: 100px; top: 80px; width: 1080px;">${slide.title}</h2>
    <div class="dream-selector-container">
      <div class="dream-card" data-dream="casa">
        <svg class="dream-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <div class="dream-title">CASA</div>
        <div class="dream-stat">El 48% de los latinos en EE.UU. logra calificar para una hipoteca y comprar su casa propia en los primeros 12 meses tras limpiar y estructurar su perfil de crédito.</div>
      </div>
      <div class="dream-card" data-dream="auto">
        <svg class="dream-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
        <div class="dream-title">AUTO</div>
        <div class="dream-stat">Ahorra más de $8,000 en intereses al financiar tu vehículo. Con un score superior a 720 accedes a tasas del 3% al 5%, en lugar del 22% de los concesionarios predatorios.</div>
      </div>
      <div class="dream-card" data-dream="prestamo">
        <svg class="dream-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <div class="dream-title">PRÉSTAMO</div>
        <div class="dream-stat">Accede a préstamos personales de alto límite sin avales ni depósitos de seguridad abusivos. Los bancos te prestan bajo tu firma y reputación crediticia.</div>
      </div>
      <div class="dream-card" data-dream="negocio">
        <svg class="dream-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
        <div class="dream-title">NEGOCIO</div>
        <div class="dream-stat">Apalanca tu LLC o emprendimiento construyendo crédito comercial. Obtén tarjetas corporativas al 0% de interés para comprar herramientas y materiales sin arriesgar tu capital personal.</div>
      </div>
    </div>
    <div class="text-body" style="position: absolute; left: 100px; top: 600px; width: 1080px; text-align: center; color: var(--color-gold-bright) !important; font-weight: 700; font-family: var(--font-headings);">
      ✨ HAZ CLIC EN CUALQUIER SUEÑO PARA VER EL IMPACTO REAL
    </div>
  `;
}

function renderFICOSimulatorTemplate(slide) {
  return `
    <h2 class="text-title" style="position: absolute; left: 100px; top: 60px; width: 1080px;">${slide.title}</h2>
    <div class="fico-simulator-wrapper">
      <div class="fico-gauge-container">
        <svg class="fico-gauge-svg" viewBox="0 0 320 220">
          <path class="fico-gauge-bg" d="M40,160 A120,120 0 0,1 280,160"></path>
          <path class="fico-gauge-active" id="ficoGaugeActive" d="M40,160 A120,120 0 0,1 280,160"></path>
          <circle cx="160" cy="160" r="10" fill="var(--color-text-light)"></circle>
          <line class="fico-gauge-needle" id="ficoGaugeNeedle" x1="160" y1="160" x2="60" y2="160" stroke="var(--color-gold)" stroke-width="4" stroke-linecap="round"></line>
        </svg>
        <div class="fico-value-display">
          <div class="fico-number" id="ficoNumber">620</div>
          <div class="fico-label" id="ficoLabel">Regular (Fair)</div>
        </div>
      </div>
      <div class="fico-controls">
        <div class="fico-slider-container">
          <div class="fico-slider-label">
            <span>Ajustar Score FICO</span>
            <span id="ficoSliderVal" style="font-weight: bold; color: var(--color-gold);">620</span>
          </div>
          <input type="range" class="fico-slider" id="ficoSlider" min="300" max="850" value="620">
        </div>
        <div class="fico-quick-actions">
          <div class="fico-actions-title">Simular Acciones de Crédito:</div>
          <div class="fico-buttons-grid">
            <button class="fico-btn positive" data-val="80">✅ Borrar Colección (+80)</button>
            <button class="fico-btn negative" data-val="-110">❌ Pago Tarde (-110)</button>
            <button class="fico-btn positive" data-val="50">💳 Pagar Tarjeta al 10% (+50)</button>
            <button class="fico-btn negative" data-val="-15">🔍 Indagación Nueva (-15)</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBeforeAfterTemplate(slide) {
  return `
    <h2 class="text-title" style="position: absolute; left: 100px; top: 60px; width: 1080px; text-align: center;">${slide.title}</h2>
    <div class="before-after-slider-container">
      <div class="before-after-img-wrapper">
        <img class="before-after-img img-before" src="outputs/assets/v5.4/caso-real-antes.jpeg" alt="Reporte de Crédito Antes">
        <img class="before-after-img img-after" id="beforeAfterImgAfter" src="outputs/assets/v5.4/caso-real-despues.jpeg" alt="Reporte de Crédito Después">
      </div>
      <input type="range" class="before-after-slider-control" id="beforeAfterSliderControl" min="0" max="100" value="50">
      <div class="before-after-handle" id="beforeAfterHandle">↔</div>
      <span class="before-after-label label-before">ANTES (Reporte Dañado)</span>
      <span class="before-after-label label-after">DESPUÉS (Reporte Limpio)</span>
    </div>
    <div class="text-body" style="position: absolute; left: 100px; top: 610px; width: 1080px; text-align: center; color: var(--color-text-muted); font-size: 16px;">
      Arrastra el control central para comparar el estado del reporte de crédito antes y después de nuestras cartas de disputa.
    </div>
  `;
}

function renderComparisonTabsTemplate(slide) {
  return `
    <h2 class="text-title" style="position: absolute; left: 100px; top: 50px; width: 1080px; text-align: center;">${slide.title}</h2>
    <div class="comparison-tabs-wrapper">
      <div class="comparison-nav">
        <button class="comparison-tab-btn active" data-tab="boom">BOOM REPORTING</button>
        <button class="comparison-tab-btn" data-tab="rentrep">RENT REPORTERS</button>
      </div>
      <div class="comparison-content-card">
        <div class="tab-panel active" id="tab-boom">
          <div class="comparison-logo-section">
            <div class="comp-brand-title">BOOM</div>
            <div class="comp-brand-price">Precio: $3/mes o $10/año</div>
            <p style="color: var(--color-text-soft);">Ideal para reportar de forma económica tus pagos de renta históricos a Equifax, Experian y TransUnion.</p>
          </div>
          <div class="comparison-bullets-section">
            <ul class="text-list">
              <li class="bullet-item">Reporta a los 3 burós principales de crédito.</li>
              <li class="bullet-item">Permite agregar hasta 24 meses de historial retroactivo.</li>
              <li class="bullet-item">No requiere que el arrendador se registre o valide el proceso.</li>
              <li class="bullet-item">Fácil integración bancaria para verificar transferencias.</li>
            </ul>
          </div>
        </div>
        <div class="tab-panel" id="tab-rentrep">
          <div class="comparison-logo-section">
            <div class="comp-brand-title">Rent Reporters</div>
            <div class="comp-brand-price">Precio: $95 costo inicial + $9.95/mes</div>
            <p style="color: var(--color-text-soft);">Enfoque clásico para la declaración del alquiler con verificación directa telefónica con tu casero.</p>
          </div>
          <div class="comparison-bullets-section">
            <ul class="text-list">
              <li class="bullet-item">Reporta principalmente a TransUnion y Equifax.</li>
              <li class="bullet-item">Mayor costo de inicio pero excelente reputación de marca.</li>
              <li class="bullet-item">Historial retroactivo opcional (hasta 2 años).</li>
              <li class="bullet-item">Requiere verificación de contacto directa con el arrendador.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFinalRegisterTemplate(slide) {
  return `
    <h2 class="text-title" style="position: absolute; left: 100px; top: 60px; width: 1080px; text-align: center;">${slide.title}</h2>
    <div class="fico-simulator-wrapper" style="margin-top: 40px;">
      <div style="display: flex; flex-direction: column; gap: 20px; justify-content: center;">
        <h3 style="font-family: var(--font-headings); font-size: 28px; color: var(--color-gold-bright);">¡Elige tu camino de éxito financiero!</h3>
        <p style="font-size: 18px; color: var(--color-text-soft); line-height: 1.5;">Puedes aplicar las leyes por tu cuenta a través de nuestra Academia DIY, o agendar una sesión privada con nuestro equipo para que lo hagamos por ti.</p>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <a href="https://chat.whatsapp.com/Ep40snJhRnoDCIhpTPoArS" target="_blank" class="btn-primary" style="padding: 14px 28px; border-radius: 30px; font-weight: bold; background: var(--color-gold); color: var(--color-bg-deep); display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
            📲 Unirse al WhatsApp VIP
          </a>
          <a href="/registro" target="_blank" style="padding: 14px 28px; border-radius: 30px; font-weight: bold; border: 1px solid var(--color-gold); color: var(--color-gold-bright); display: inline-flex; align-items: center; justify-content: center; text-decoration: none; background: transparent; transition: all 0.3s ease;">
            🔍 Volver al Registro
          </a>
        </div>
      </div>
      <div style="background: var(--color-card); border: 1px solid rgba(216, 184, 115, 0.15); border-radius: 24px; padding: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
        <h4 style="font-family: var(--font-headings); font-size: 20px; color: var(--color-text-light); margin-bottom: 15px; text-align: center;">🚀 Agenda tu Consulta Gratuita</h4>
        <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Escribe tus datos y serás redireccionado para elegir fecha y hora.</p>
        <form id="slide-book-form" style="display: flex; flex-direction: column; gap: 15px;">
          <input type="text" id="book-name" placeholder="Tu Nombre Completo" required style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:#fff; font-family:inherit;">
          <input type="email" id="book-email" placeholder="Tu Correo Electrónico" required style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:#fff; font-family:inherit;">
          <input type="tel" id="book-phone" placeholder="Tu WhatsApp (ej. +1702...)" required style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.1); background:rgba(0,0,0,0.2); color:#fff; font-family:inherit;">
          <button type="submit" style="width:100%; padding:14px; border-radius:10px; border:none; background:linear-gradient(135deg, var(--color-gold-bright), var(--color-gold)); color:var(--color-bg-deep); font-weight:800; font-family:var(--font-headings); cursor:pointer; text-transform:uppercase; transition: transform 0.2s ease;">Agendar Mi Cita Gratis</button>
        </form>
      </div>
    </div>
  `;
}

// --- LOGICA DE NOTAS DEL PRESENTADOR (EXCLUSIVO AMANDA) ---
function initPresenterNotes() {
  const toggle = document.querySelector(".presenter-notes-toggle");
  const sidebar = document.querySelector(".presenter-notes-sidebar");
  const closeBtn = document.querySelector(".notes-close-btn");

  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Cerrar presionando Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      sidebar.classList.remove("open");
    }
  });

  // Escuchar el cambio de slide de Reveal para actualizar las notas
  Reveal.on('slidechanged', event => {
    updateNotesContent(event.indexh);
  });

  // Cargar notas del primer slide al inicio
  updateNotesContent(0);
}

function updateNotesContent(slideIndex) {
  const currentSlideData = SLIDES_DATA[slideIndex];
  const notesContainer = document.getElementById("notesContent");
  if (!notesContainer || !currentSlideData) return;

  const notesText = currentSlideData.notes || '';
  if (!notesText.trim()) {
    notesContainer.innerHTML = '<p style="color: var(--color-text-muted); font-style: italic;">Sin notas para esta diapositiva.</p>';
    return;
  }

  // Parsear la estructura típica del texto de notas:
  // MENSAJE CENTRAL, DESARROLLO, INTERACCIÓN, TRANSICIÓN
  const sections = notesText.split('\n\n');
  let html = '';

  sections.forEach(section => {
    const lines = section.split('\n');
    const title = lines[0];
    const content = lines.slice(1).join('<br>');

    html += `
      <div class="notes-section">
        <div class="notes-section-title">${title}</div>
        <div class="notes-section-content">${content || '...'}</div>
      </div>
    `;
  });

  notesContainer.innerHTML = html;
}

// --- LOGICA DE WIDGETS INTERACTIVOS ---

// 1. Selector de Sueños
function initDreamSelector() {
  const cards = document.querySelectorAll(".dream-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Si ya está activa, no hace nada
      if (card.classList.contains("active")) return;

      // Remover activa de las otras
      cards.forEach(c => c.classList.remove("active"));
      // Activar la actual
      card.classList.add("active");

      // Reproducir una micro-animación de entrada en la estadística
      const stat = card.querySelector(".dream-stat");
      stat.style.opacity = 0;
      setTimeout(() => {
        stat.style.opacity = 1;
      }, 50);
    });
  });
}

// 2. Simulador FICO Score
function initFICOSimulator() {
  const slider = document.getElementById("ficoSlider");
  const numberDisplay = document.getElementById("ficoNumber");
  const labelDisplay = document.getElementById("ficoLabel");
  const sliderVal = document.getElementById("ficoSliderVal");
  const activeArc = document.getElementById("ficoGaugeActive");
  const needle = document.getElementById("ficoGaugeNeedle");

  if (!slider) return;

  function updateSimulator(score) {
    numberDisplay.textContent = score;
    sliderVal.textContent = score;
    slider.value = score;

    // Calcular dashoffset para el SVG (longitud total del semicírculo de radio 120 es ~377 px)
    // El radio es 120, la fórmula es 2*PI*r/2 = PI * r = 3.14159 * 120 = 376.99
    // Usamos 377 en CSS
    const totalLength = 377;
    const percentage = (score - 300) / (850 - 300);
    const offset = totalLength - (totalLength * percentage);
    
    if (activeArc) {
      activeArc.style.strokeDashoffset = offset;
      
      // Cambiar colores según rango
      let color = '#ef4444'; // Malo
      let label = 'Malo (Pobre) 🔴';
      
      if (score >= 580 && score < 670) {
        color = '#f59e0b'; // Regular
        label = 'Regular (Fair) 🟡';
      } else if (score >= 670 && score < 740) {
        color = '#10b981'; // Bueno
        label = 'Bueno (Good) 🟢';
      } else if (score >= 740) {
        color = '#059669'; // Excelente
        label = 'Excelente (Excellent) 🏆';
      }
      
      activeArc.style.stroke = color;
      labelDisplay.style.backgroundColor = color + '22';
      labelDisplay.style.borderColor = color + '88';
      labelDisplay.style.border = `1px solid ${color}`;
      labelDisplay.style.color = score >= 740 ? '#6ee7b7' : (score >= 670 ? '#a7f3d0' : (score >= 580 ? '#fde68a' : '#fca5a5'));
      labelDisplay.textContent = label;
    }

    // Rotar aguja (0 grados = apuntando a la izquierda, 180 grados = apuntando a la derecha)
    const angle = percentage * 180;
    if (needle) {
      needle.style.transform = `rotate(${angle}deg)`;
    }
  }

  // Escuchar inputs en el slider
  slider.addEventListener("input", (e) => {
    updateSimulator(parseInt(e.target.value));
  });

  // Botones de acciones rápidas
  const quickBtns = document.querySelectorAll(".fico-btn");
  quickBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modifier = parseInt(btn.getAttribute("data-val"));
      let currentVal = parseInt(slider.value);
      let newVal = Math.min(Math.max(currentVal + modifier, 300), 850);
      
      // Animación suave de aumento/decremento en pasos
      animateScoreChange(currentVal, newVal);
    });
  });

  function animateScoreChange(start, end) {
    const duration = 400; // ms
    const startTime = performance.now();
    
    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolación lineal
      const current = Math.round(start + (end - start) * progress);
      updateSimulator(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Inicializar en 620
  updateSimulator(620);
}

// 3. Comparador Antes/Después (Before/After)
function initBeforeAfterSlider() {
  const slider = document.getElementById("beforeAfterSliderControl");
  const imgAfter = document.getElementById("beforeAfterImgAfter");
  const handle = document.getElementById("beforeAfterHandle");

  if (!slider || !imgAfter || !handle) return;

  function updateSliderPosition(val) {
    // Cambiar clip-path de la imagen de arriba (despues)
    imgAfter.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
    // Mover el cursor circular
    handle.style.left = `${val}%`;
  }

  slider.addEventListener("input", (e) => {
    updateSliderPosition(e.target.value);
  });

  // Inicializar en el medio (50%)
  updateSliderPosition(50);
}

// 4. Comparador de Pestañas (Boom vs Rent Reporters)
function initComparisonTabs() {
  const tabBtns = document.querySelectorAll(".comparison-tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabTarget = btn.getAttribute("data-tab");

      // Remover activo de los botones
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Ocultar todos los paneles
      panels.forEach(p => p.classList.remove("active"));
      
      // Mostrar el correcto
      const targetPanel = document.getElementById(`tab-${tabTarget}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}
