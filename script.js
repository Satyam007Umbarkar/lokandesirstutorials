/* ============================================================
   LOKHANDE SIR'S TUTORIAL — SCRIPT.JS
   ============================================================ */

// ====== LOADER ======
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ====== SCROLL PROGRESS ======
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});

// ====== NAVBAR BLUR ON SCROLL ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ====== HAMBURGER MENU ======
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ====== ACTIVE NAV ON SCROLL ======
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--blue-light)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// ====== PARTICLE CANVAS ======
(function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5
      ? `rgba(59,130,246,${this.alpha})`
      : `rgba(6,182,212,${this.alpha})`;
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ====== TYPING TEXT EFFECT ======
const typedPhrases = [
  'JEE Main & Advanced',
  'NEET Examination',
  'MH-CET Success',
  'State Board Excellence',
  'A Bright Future'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  if (!typedEl) return;
  const phrase = typedPhrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % typedPhrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 60 : 80);
}
setTimeout(typeLoop, 2200);

// ====== SCROLL REVEAL ======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ====== ANIMATED COUNTERS ======
function animateCounter(el, target) {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number[data-target]');
      nums.forEach(num => {
        animateCounter(num, parseInt(num.dataset.target));
        num.removeAttribute('data-target');
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);

// ====== TESTIMONIALS SLIDER ======
const wrapper = document.getElementById('testimonialsWrapper');
const dotsContainer = document.getElementById('testiDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (wrapper) {
  const cards = wrapper.querySelectorAll('.testi-card');
  let current = 0;
  let autoPlay;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    wrapper.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  resetAuto();
}

// ====== FAQ ACCORDION ======
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ====== CONTACT FORM ======
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const course = document.getElementById('fcourse').value;
  const msg = document.getElementById('fmsg').value.trim();

  if (!name || !phone) {
    showToast('Please fill in your name and phone number.', 'error');
    return;
  }

  const waMessage = encodeURIComponent(
    `Hello! I'm *${name}* and I'm interested in *${course || 'a course'}* at Lokhande Sir's Tutorial.\n\nPhone: ${phone}${msg ? '\n\nMessage: ' + msg : ''}`
  );
  window.open(`https://wa.me/918421950606?text=${waMessage}`, '_blank');
  showToast('Redirecting to WhatsApp...', 'success');
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:${type === 'success' ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'linear-gradient(135deg,#dc2626,#ef4444)'};
    color:white; padding:14px 24px; border-radius:10px; font-weight:600;
    font-size:0.9rem; z-index:9999; box-shadow:0 8px 30px rgba(0,0,0,0.4);
    transition:all 0.4s ease; opacity:0;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = '1', 50);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ====== SMOOTH SCROLL OFFSET for fixed navbar ======
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const offset = navH + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====== GALLERY HOVER (already CSS) — touch ripple for mobile ======
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(1.02)';
    setTimeout(() => item.style.transform = '', 300);
  });
});

// ====== FLOATING WHATSAPP pulsing ring ======
(function() {
  const wa = document.querySelector('.whatsapp-float');
  if (!wa) return;
  const ring = document.createElement('span');
  ring.style.cssText = `
    position:absolute; inset:-4px; border-radius:50%;
    border:2px solid rgba(34,197,94,0.5);
    animation:waRing 2s ease infinite;
  `;
  wa.style.position = 'relative';
  wa.appendChild(ring);
  const style = document.createElement('style');
  style.textContent = `
    @keyframes waRing {
      0%{transform:scale(1);opacity:0.7}
      100%{transform:scale(1.5);opacity:0}
    }
  `;
  document.head.appendChild(style);
})();
