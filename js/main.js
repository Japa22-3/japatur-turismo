// ============================================
// JAPATUR TURISMO - JavaScript Principal
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
  header.classList.toggle('scrolled', window.scrollY > 50);

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.service-card, .fleet-card, .diff-card, .testimonial-card, .contact-item, .fleet-capacity, .trust-item'
  ).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
  });

  // ===== ACTIVE NAV LINK =====
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navA.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? '#fff'
        : 'rgba(255,255,255,0.85)';
      a.style.background = a.getAttribute('href') === `#${current}`
        ? 'rgba(255,255,255,0.1)'
        : '';
    });
  });

  // ===== FORM SUBMIT =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const servico = document.getElementById('servico').value;
      const passageiros = document.getElementById('passageiros').value;
      const mensagem = document.getElementById('mensagem').value;

      const texto = `Olá! Vim pelo site da Japatur.%0A%0A*Nome:* ${encodeURIComponent(nome)}%0A*Telefone:* ${encodeURIComponent(telefone)}%0A*Serviço:* ${encodeURIComponent(servico)}%0A*Passageiros:* ${encodeURIComponent(passageiros)}%0A*Mensagem:* ${encodeURIComponent(mensagem || 'Nenhuma mensagem adicional')}%0A%0AAguardo retorno!`;

      window.open(`https://wa.me/5515999999999?text=${texto}`, '_blank');

      form.reset();
      showToast('✅ Redirecionando para o WhatsApp...');
    });
  }

  // ===== TOAST =====
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '100px', right: '28px',
      background: '#1a56db', color: '#fff',
      padding: '14px 24px', borderRadius: '12px',
      fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: '600',
      boxShadow: '0 8px 32px rgba(26,86,219,0.4)',
      zIndex: '9999', animation: 'slideIn 0.4s ease',
      transition: 'opacity 0.4s ease'
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, suffix = '') {
    let current = 0;
    const duration = 1600;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(0)) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat strong, .capacity-item strong').forEach(el => {
          const raw = el.textContent.replace('%','').replace('+','');
          const num = parseInt(raw);
          const suffix = el.textContent.includes('%') ? '%' : (el.textContent.includes('+') ? '+' : '');
          if (!isNaN(num)) animateCounter(el, num, suffix);
        });
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.hero-stats, .fleet-capacity').forEach(el => statsObs.observe(el));

});
