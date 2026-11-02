/**
 * 777 Audiovisual — Main JavaScript (Apex Squad Ultra-Premium)
 * Vanilla JS, Zero heavy dependencies, 60fps spring interactions, WCAG AA compliant
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initCaseDrawer();
  initBackstageCarousel();
  initScrollAnimations();
});

// 1. Header Glassmorphism no Scroll
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-black/95', 'shadow-2xl', 'backdrop-blur-md');
      header.classList.remove('bg-black/60');
    } else {
      header.classList.remove('bg-black/95', 'shadow-2xl');
      header.classList.add('bg-black/60');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Menu Mobile Drawer / Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    const isExpanded = open !== undefined ? open : menuBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    menuBtn.setAttribute('aria-expanded', String(nextState));
    if (nextState) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  };

  menuBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true)); // fecha ao clicar em link
  });
}

// 3. Animações de Entrada na Rolagem (Scroll Reveal)
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// 4. Base de Dados dos Cases & Drawer Interativo com A11y
const casesData = {
  automotivo: {
    badge: 'AUTOMOTIVO',
    title: 'Captação de Alta Velocidade & Campanha de Performance',
    image: 'assets/img/automotivo_1.png',
    desafio: 'Traduzir a agressividade, torque e precisão de engenharia de supercarros em pista fechada e tomadas noturnas, onde a iluminação tradicional de estúdio é impraticável.',
    solucao: 'Operação com drones em perseguição em baixa altitude, câmeras Sony Cinema Line a 120fps com lentes de alta abertura e sound design imersivo do motor e escapamento.',
    resultado: '+850 mil visualizações combinadas nas redes sociais e recorde de leads qualificados gerados para a oficina e customizadora parceira.',
    whatsappMessage: 'Olá! Gostei muito do case Automotivo da 777 e gostaria de um projeto similar para minha marca.'
  },
  corporativo: {
    badge: 'CORPORATIVO & INDÚSTRIA',
    title: 'Apresentação Institucional de Fábrica & Infraestrutura',
    image: 'assets/img/institucional_1.png',
    desafio: 'Tornar galpões industriais complexos e linhas de montagem fabris atraentes, dinâmicos e claros para apresentações de negócios com investidores internacionais.',
    solucao: 'Roteirização estratégica guiada pelos diretores, tomadas aéreas com drone dentro e fora dos galpões industriais e captação de bastidores em ritmo de cinema.',
    resultado: 'Filme institucional adotado oficialmente pela diretoria comercial para rodadas de negócios B2B, feiras industriais e apresentações para novos clientes.',
    whatsappMessage: 'Olá! Gostei do case Corporativo/Institucional da 777 e gostaria de uma proposta para minha empresa.'
  },
  imobiliario: {
    badge: 'IMOBILIÁRIO & EMPREENDIMENTOS',
    title: 'Valorização Territorial & Venda de Empreendimentos',
    image: 'assets/img/imobiliario_1.webp',
    desafio: 'Comercializar lotes e unidades de alto padrão enquanto o empreendimento ainda estava em fase inicial de terraplanagem e infraestrutura.',
    solucao: 'Captação aérea em Golden Hour destacando a topografia, acesso viário, áreas verdes e vista panorâmica, combinada com still fotográfico dos decorados.',
    resultado: '100% das cotas iniciais comercializadas no trimestre de lançamento com campanhas de tráfego pago baseadas no vídeo produzido.',
    whatsappMessage: 'Olá! Gostei do case Imobiliário da 777 e gostaria de um orçamento para o meu empreendimento.'
  },
  produto: {
    badge: 'PRODUTO / STILL',
    title: 'Criação de Desejo Visual & Valor Percebido em Catálogo',
    image: 'assets/img/still_1.png',
    desafio: 'Destacar o refinamento da embalagem, pureza dos ingredientes e textura do produto em campanhas digitais sem parecer um render 3D sintético.',
    solucao: 'Macro-fotografia de alta resolução em estúdio com iluminação pontual de recorte, contrastes profundos e tratamento de cor editorial.',
    resultado: 'Redução de 34% no Custo por Aquisição (CPA) em anúncios de tráfego pago e padronização visual completa para o e-commerce e varejo.',
    whatsappMessage: 'Olá! Gostei do case de Still/Produto da 777 e gostaria de um orçamento para fotografia comercial.'
  }
};

function initCaseDrawer() {
  const backdrop = document.getElementById('case-drawer-backdrop');
  const panel = document.getElementById('case-drawer-panel');
  const closeBtn = document.getElementById('drawer-close');
  const caseCards = document.querySelectorAll('.case-card');

  const drawerBadge = document.getElementById('drawer-badge');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerImage = document.getElementById('drawer-image');
  const drawerDesafio = document.getElementById('drawer-desafio');
  const drawerSolucao = document.getElementById('drawer-solucao');
  const drawerResultado = document.getElementById('drawer-resultado');
  const drawerCta = document.getElementById('drawer-cta');

  if (!backdrop || !closeBtn) return;

  let lastActiveElement = null;

  function openDrawer(caseKey, triggeringElement) {
    const data = casesData[caseKey];
    if (!data) return;

    lastActiveElement = triggeringElement || document.activeElement;

    drawerBadge.textContent = data.badge;
    drawerTitle.textContent = data.title;
    drawerImage.src = data.image;
    drawerImage.alt = data.title;
    drawerDesafio.textContent = data.desafio;
    drawerSolucao.textContent = data.solucao;
    drawerResultado.textContent = data.resultado;
    
    drawerCta.href = `https://wa.me/5511945489950?text=${encodeURIComponent(data.whatsappMessage)}`;

    backdrop.classList.add('active');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foca no botão fechar para A11y
    setTimeout(() => {
      closeBtn.focus();
    }, 100);
  }

  function closeDrawer() {
    backdrop.classList.remove('active');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restaura foco para o card que abriu a gaveta
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  caseCards.forEach(card => {
    const caseKey = card.getAttribute('data-case');

    card.addEventListener('click', () => {
      openDrawer(caseKey, card);
    });

    // Acessibilidade por Teclado (Enter / Espaço)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDrawer(caseKey, card);
      }
    });
  });

  closeBtn.addEventListener('click', closeDrawer);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeDrawer();
    }
  });

  // Focus trap & Escape listener
  document.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = panel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// 5. Carrossel de Backstage (Passo Dinâmico Responsivo)
function initBackstageCarousel() {
  const carousel = document.getElementById('backstage-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carousel || !prevBtn || !nextBtn) return;

  const getScrollAmount = () => {
    const firstCard = carousel.querySelector('.snap-center');
    return firstCard ? firstCard.offsetWidth + 24 : 360;
  };

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}
