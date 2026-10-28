/**
 * 777 Audiovisual — Main JavaScript (Apex Squad)
 * Vanilla JS, Zero heavy dependencies, 60fps spring interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
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
      header.classList.add('bg-black/90', 'shadow-2xl', 'backdrop-blur-md');
      header.classList.remove('bg-black/40');
    } else {
      header.classList.remove('bg-black/90', 'shadow-2xl');
      header.classList.add('bg-black/40');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Animações de Entrada na Rolagem (Scroll Reveal)
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target); // anima uma única vez
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// 3. Base de Dados dos Cases & Drawer Interativo
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
    image: 'assets/img/imobiliario_1.png',
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

  function openDrawer(caseKey) {
    const data = casesData[caseKey];
    if (!data) return;

    drawerBadge.textContent = data.badge;
    drawerTitle.textContent = data.title;
    drawerImage.src = data.image;
    drawerImage.alt = data.title;
    drawerDesafio.textContent = data.desafio;
    drawerSolucao.textContent = data.solucao;
    drawerResultado.textContent = data.resultado;
    
    drawerCta.href = `https://wa.me/5511945489950?text=${encodeURIComponent(data.whatsappMessage)}`;

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // trava scroll de fundo
  }

  function closeDrawer() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  caseCards.forEach(card => {
    card.addEventListener('click', () => {
      const caseKey = card.getAttribute('data-case');
      openDrawer(caseKey);
    });
  });

  closeBtn.addEventListener('click', closeDrawer);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closeDrawer();
    }
  });
}

// 4. Carrossel de Backstage (Controles de Navegação)
function initBackstageCarousel() {
  const carousel = document.getElementById('backstage-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!carousel || !prevBtn || !nextBtn) return;

  const scrollAmount = 380;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}
