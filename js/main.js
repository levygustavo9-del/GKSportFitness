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
      const target = parseInt(entry.target.getAttribute('data-count'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(element, target) {
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
    element.textContent = Math.floor(current) + '+';
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
    const telefone = data.telefone || '';
    const objetivo = data.objetivo || '';
    const horario = data.horario || '';

    let tipo = form.id === 'formMatricula' ? 'Pré-Matrícula' : 'Aula Experimental';

    let message = `Olá! Vim pelo site da academia.%0A`;
    message += `*${tipo}*%0A`;
    message += `Nome: ${nome}%0A`;
    message += `Telefone: ${telefone}%0A`;
    message += `Objetivo: ${objetivo}%0A`;
    message += `Horário: ${horario}`;

    // Substitua pelo número da academia
    const whatsappNumber = '5500000000000';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    form.reset();
  });
});

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

// ===== PLAY BUTTON =====
const video = document.querySelector('.about-video video');
const playBtn = document.getElementById('playBtn');

if (video && playBtn) {
  // Toggle play/pause ao clicar no botão
  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // Atualizar ícone e visibilidade do botão conforme estado do vídeo
  video.addEventListener('play', () => {
    playBtn.textContent = '❚❚';
    playBtn.classList.add('playing');
  });

  video.addEventListener('pause', () => {
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
  });

  video.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    playBtn.classList.remove('playing');
  });

  // Pausar automaticamente quando o vídeo sair da tela
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !video.paused) {
        video.pause();
      }
    });
  }, { threshold: 0.25 });

  videoObserver.observe(video);
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

// Conteúdo dinâmico com imagens
const content = {
  musculacao: {
    title: "Musculação",
    description: "Treino focado em hipertrofia e ganho de força. Ideal para quem quer construir massa muscular, melhorar o metabolismo e definir o corpo com acompanhamento profissional.",
    images: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop"
    ]
  },
  funcional: {
    title: "Funcional",
    description: "Treinos dinâmicos com movimentos naturais que trabalham o corpo inteiro, melhoram a mobilidade, a coordenação e a resistência. Ideal para todas as idades.",
    images: [
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&h=400&fit=crop"
    ]
  },
  step: {
    title: "Step",
    description: "Atividade aeróbica com plataforma que melhora a resistência cardiovascular, coordenação motora e fortalece os membros inferiores de forma ritmada e divertida.",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=400&fit=crop"
    ]
  },
  powerjump: {
    title: "Power Jump",
    description: "Aula intensa no mini trampolim que fortalece pernas, glúteos e melhora a circulação. Alto gasto calórico com baixo impacto nas articulações.",
    images: [
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
    ]
  },
  fitdance: {
    title: "FitDance",
    description: "Treino divertido com dança e coreografias dos maiores hits. Queima calorias, melhora a coordenação e é perfeito para quem quer se exercitar se divertindo.",
    images: [
      "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=400&fit=crop"
    ]
  },
  bodypump: {
    title: "Body Pump",
    description: "Treino com barras e pesos em ritmo de aula coletiva, focado em definição muscular e resistência. Combina força e energia em grupo.",
    images: [
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop"
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
    img.src = src;
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