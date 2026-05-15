// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== COMMENTS SWIPER =====
if (typeof Swiper !== 'undefined' && document.querySelector('.comments-swiper')) {
  new Swiper('.comments-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: '.comments-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.comments-next',
      prevEl: '.comments-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });
}

// ===== MODALITIES SWIPER (TABLET + MOBILE) =====
let modalitiesSwiper;
const modalitiesBreakpoint = window.matchMedia('(max-width: 1024px)');

function toggleModalitiesSwiper() {
  if (typeof Swiper === 'undefined') {
    return;
  }

  const modalitiesElement = document.querySelector('.modalities-swiper');
  if (!modalitiesElement) {
    return;
  }

  if (modalitiesBreakpoint.matches) {
    if (!modalitiesSwiper) {
      modalitiesSwiper = new Swiper('.modalities-swiper', {
        slidesPerView: 1.08,
        spaceBetween: 16,
        grabCursor: true,
        watchOverflow: true,
        pagination: {
          el: '.modalities-pagination',
          clickable: true,
        },
        breakpoints: {
          480: {
            slidesPerView: 1.12,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        },
      });
    }

    return;
  }

  if (modalitiesSwiper) {
    modalitiesSwiper.destroy(true, true);
    modalitiesSwiper = undefined;
  }
}

toggleModalitiesSwiper();
modalitiesBreakpoint.addEventListener('change', toggleModalitiesSwiper);

// ===== TEAM SWIPER (TABLET + MOBILE) =====
let teamSwiper;
const teamBreakpoint = window.matchMedia('(max-width: 1024px)');

function toggleTeamSwiper() {
  if (typeof Swiper === 'undefined') {
    return;
  }

  const teamElement = document.querySelector('.team-swiper');
  if (!teamElement) {
    return;
  }

  if (teamBreakpoint.matches) {
    if (!teamSwiper) {
      teamSwiper = new Swiper('.team-swiper', {
        slidesPerView: 1.05,
        spaceBetween: 16,
        grabCursor: true,
        watchOverflow: true,
        pagination: {
          el: '.team-pagination',
          clickable: true,
        },
        breakpoints: {
          480: {
            slidesPerView: 1.08,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        },
      });
    }

    return;
  }

  if (teamSwiper) {
    teamSwiper.destroy(true, true);
    teamSwiper = undefined;
  }
}

toggleTeamSwiper();
teamBreakpoint.addEventListener('change', toggleTeamSwiper);

// ===== SCROLL TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-count');
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element, targetValue) {
  const isPercent = targetValue.includes('%');
  const target = parseInt(targetValue);

  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (isPercent) {
      element.textContent = Math.floor(current) + '%';
    } else {
      element.textContent = Math.floor(current) + '+';
    }

  }, stepTime);
}

// ===== CPF MASK =====
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    e.target.value = value;
  });
}

// ===== PHONE MASK =====
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    }
    e.target.value = value;
  });
}

// ===== FORM SUBMIT =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Montar mensagem para WhatsApp
    const nome = data.nome || '';
    const email = data.email || '';
    const cpf = data.cpf || '';
    const nascimento = data.nascimento || '';
    const telefone = data.telefone || '';
    const objetivo = data.objetivo || '';
    const horario = data.horario || '';

    const tipo = form.id === 'formMatricula' ? 'Pré-Matrícula' : 'Aula Experimental';

    let message = `Olá! Vim pelo site da academia.%0A`;
    message += `*${tipo}*%0A`;
    message += `Nome: ${nome}%0A`;
    if (email) message += `E-mail: ${email}%0A`;
    if (cpf) message += `CPF: ${cpf}%0A`;
    if (nascimento) message += `Nascimento: ${nascimento}%0A`;
    message += `Telefone: ${telefone}%0A`;
    message += `Objetivo: ${objetivo}%0A`;
    message += `Horário: ${horario}`;

    // Número oficial para envio das mensagens do site
    const whatsappNumber = '558293966592';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    form.reset();
  });
});

// ===== MODAL TERMOS =====
const abrirTermos = document.getElementById('abrir-termos');
const modalTermos = document.getElementById('modal-termos');
const fecharTermos = document.getElementById('fechar-termos');

if (abrirTermos && modalTermos && fecharTermos) {
  abrirTermos.addEventListener('click', (e) => {
    e.preventDefault();
    modalTermos.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  fecharTermos.addEventListener('click', () => {
    modalTermos.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  modalTermos.addEventListener('click', (e) => {
    if (e.target === modalTermos) {
      modalTermos.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalTermos.classList.contains('active')) {
      modalTermos.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ABOUT MEDIA CONTROL =====
const aboutSection = document.querySelector('.about-video');
const aboutVideo = document.querySelector('.about-video video');
const aboutYoutube = document.querySelector('.about-video iframe');

function pauseAboutMedia() {
  if (aboutVideo && !aboutVideo.paused) {
    aboutVideo.pause();
  }

  if (aboutYoutube && aboutYoutube.contentWindow) {
    aboutYoutube.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'pauseVideo',
        args: []
      }),
      '*'
    );
  }
}

if (aboutSection) {
  // Pausa quando a seção de vídeo sai da viewport
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        pauseAboutMedia();
      }
    });
  }, { threshold: 0.25 });

  aboutObserver.observe(aboutSection);

  // Pausa ao trocar de aba/minimizar ou fechar/sair da página
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAboutMedia();
    }
  });

  window.addEventListener('pagehide', pauseAboutMedia);
  window.addEventListener('beforeunload', pauseAboutMedia);
}

// MODAL DE MODALIDADE:

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalButtons = document.querySelectorAll(".modality-link[data-modal]");
const closeBtn = document.querySelector(".close-btn");
const carouselTrack = document.getElementById("carouselTrack");
const carouselDots = document.getElementById("carouselDots");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

let currentSlide = 0;
let totalSlides = 0;

function getGithubProjectBasePath() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const firstSegment = pathParts[0] || '';
  const isGithubPagesHost = window.location.hostname.endsWith('github.io');
  const looksLikeFile = firstSegment.includes('.');

  if (isGithubPagesHost && firstSegment && !looksLikeFile) {
    return `/${firstSegment}`;
  }

  return '';
}

function normalizeModalImagePath(src) {
  if (!src || /^(https?:|data:|blob:)/i.test(src)) {
    return src;
  }

  const cleaned = src
    .replace(/^\/?gksportfitness\//i, '')
    .replace(/^\/+/, '');

  const basePath = getGithubProjectBasePath();
  return `${basePath}/${cleaned}`.replace(/\/\/{2,}/g, '/');
}

// Conteúdo dinâmico com imagens
const content = {
  musculacao: {
    title: "Musculação",
    description: "Treino de força e hipertrofia com prescrição individual. Indicado para ganho de massa muscular, definição e evolução segura da performance.",
    images: [
      "midia/img/musculacao1.png",
      "midia/img/musculacao2.png",
      "midia/img/musculacao3.png"
    ]
  },
  funcional: {
    title: "Funcional",
    description: "Aulas dinâmicas com movimentos integrados para desenvolver força, agilidade, mobilidade e condicionamento no corpo inteiro.",
    images: [
      "midia/img/funcional1.png",
      "midia/img/funcional2.png",
      "midia/img/funcional3.png"
    ]
  },
  step: {
    title: "Step",
    description: "Aula aeróbica com plataforma que melhora o condicionamento cardiorrespiratório, a coordenação motora e o fortalecimento de pernas e glúteos.",
    images: [
      "midia/img/step1.png",
      "midia/img/step2.png",
      "midia/img/step3.png"
    ]
  },
  jump: {
    title: "Jump",
    description: "Treino no mini trampolim com alta queima calórica, foco cardiovascular e baixo impacto, ideal para aumentar disposição e resistência.",
    images: [
      "midia/img/jump1.png",
      "midia/img/jump2.png",
      "midia/img/jump3.png"
    ]
  },
  fitdance: {
    title: "FitDance",
    description: "Aulas coreografadas e animadas para queima calórica, coordenação e expressão corporal, com música e energia do início ao fim.",
    images: [
      "midia/img/fitdance1.png",
      "midia/img/fitdance2.png",
      "midia/img/fitdance3.png"
    ]
  },
  pump: {
    title: "Pump",
    description: "Treino coletivo com barras e anilhas para resistência muscular, definição e fortalecimento global em aulas ritmadas e motivadoras.",
    images: [
      "midia/img/pump1.png",
      "midia/img/pump2.png",
      "midia/img/pump3.png"
    ]
  },
  gap: {
    title: "GAP",
    description: "Aula localizada com foco em Glúteos, Abdômen e Pernas, ideal para tonificação, postura e fortalecimento de regiões estratégicas.",
    images: [
      "midia/img/gap1.png",
      "midia/img/gap2.png",
      "midia/img/gap3.png"
    ]
  }
};

function goToSlide(index) {
  currentSlide = index;
  carouselTrack.style.transform = `translateX(-${index * 100}%)`;
  const dots = carouselDots.querySelectorAll(".carousel-dot");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function buildCarousel(images) {
  carouselTrack.innerHTML = "";
  carouselDots.innerHTML = "";
  currentSlide = 0;
  totalSlides = images.length;

  images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = normalizeModalImagePath(src);
    img.alt = "Imagem da modalidade";
    img.draggable = false;
    carouselTrack.appendChild(img);

    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    carouselDots.appendChild(dot);
  });

  carouselTrack.style.transform = "translateX(0)";
}

if (modal && closeBtn) {
  // Abrir modal
  modalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-modal");
      if (content[key]) {
        modalTitle.textContent = content[key].title;
        modalDescription.textContent = content[key].description;
        buildCarousel(content[key].images);
        modal.classList.add("active");
      }
    });
  });

  // Navegação do carrossel
  carouselPrev.addEventListener("click", () => {
    goToSlide(currentSlide <= 0 ? totalSlides - 1 : currentSlide - 1);
  });

  carouselNext.addEventListener("click", () => {
    goToSlide(currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1);
  });

  // Fechar modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Fechar clicando fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Fechar com Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });
}

// ===== LIGHTBOX PARA FOTOS DOS COMENTÁRIOS =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// Coletar todas as imagens dos comentários
const commentImages = document.querySelectorAll('.card-comments-header img');

if (lightbox && lightboxImage && lightboxClose && commentImages.length > 0) {
  function openLightbox(imageElement) {
    const selectedSrc = imageElement.src;
    lightboxImage.src = selectedSrc;
    lightboxImage.alt = imageElement.alt;

    // Mostrar o lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Event listeners do lightbox
  lightboxClose.addEventListener('click', closeLightbox);

  // Fechar ao clicar fora da imagem
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Adicionar click listeners em todas as imagens de comentários
  commentImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
  });
}