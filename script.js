/* ── Typewriter ─────────────────────────────────── */
const TYPEWRITER_STRINGS = [
  'AI Developer',
  'ML Enthusiast',
  'Problem Solver',
  'GenAI Explorer',
  'Always Learning...',
];
let twIndex = 0, twCharIndex = 0, twDeleting = false;
const twEl = document.getElementById('typewriter');

function typewrite() {
  const current = TYPEWRITER_STRINGS[twIndex];
  if (twDeleting) {
    twEl.textContent = current.substring(0, twCharIndex--);
    if (twCharIndex < 0) {
      twDeleting = false;
      twIndex = (twIndex + 1) % TYPEWRITER_STRINGS.length;
      setTimeout(typewrite, 400);
      return;
    }
  } else {
    twEl.textContent = current.substring(0, twCharIndex++);
    if (twCharIndex > current.length) {
      twDeleting = true;
      setTimeout(typewrite, 1800);
      return;
    }
  }
  setTimeout(typewrite, twDeleting ? 60 : 100);
}
setTimeout(typewrite, 1000);

/* ── Navbar Scroll Effect ───────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Hamburger ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Intersection Observer (Reveal) ─────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 80) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Active Nav Link ────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchs  = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activeObserver.observe(s));

/* ── Particle Canvas ────────────────────────────── */
const canvas  = document.getElementById('particles-canvas');
const ctx     = canvas.getContext('2d');
let particles = [];
let animFrame;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = document.getElementById('hero').offsetHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.vx    = (Math.random() - 0.5) * 0.4;
    this.vy    = (Math.random() - 0.5) * 0.4;
    this.r     = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#7aa2f7' : Math.random() > 0.5 ? '#bb9af7' : '#7dcfff';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = Array.from({ length: 80 }, () => new Particle());
}

function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = '#7aa2f7';
        ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animate);
}

resize();
initParticles();
animate();

window.addEventListener('resize', () => {
  resize();
  initParticles();
});

/* Mouse parallax on particles */
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
document.getElementById('hero').addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  particles.forEach(p => {
    const dx = (mouse.x - p.x) * 0.0003;
    const dy = (mouse.y - p.y) * 0.0003;
    p.vx += dx;
    p.vy += dy;
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 1.5) { p.vx /= speed; p.vy /= speed; }
  });
});

/* ── Avatar 3D tilt ─────────────────────────────── */
const avatarWrap = document.querySelector('.hero-avatar-wrap');
if (avatarWrap) {
  avatarWrap.addEventListener('mousemove', (e) => {
    const rect = avatarWrap.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -10;
    const ry = ((e.clientX - cx) / (rect.width  / 2)) *  10;
    avatarWrap.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  avatarWrap.addEventListener('mouseleave', () => {
    avatarWrap.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
    avatarWrap.style.transition = 'transform 0.6s ease';
  });
}

/* ── Skill tag hover particle burst ─────────────── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 4px 20px rgba(122,162,247,0.3)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});

/* ── Stats image load fallback ──────────────────── */
document.querySelectorAll('.stats-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const msg = document.createElement('div');
    msg.style.cssText = 'padding:20px;text-align:center;color:#565f89;font-size:0.85rem;font-family:monospace;';
    msg.textContent = '📊 GitHub stats loading... (requires internet connection)';
    img.parentNode.appendChild(msg);
  });
});

/* ── Smooth section reveal delay cascade ─────────── */
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${(index % 4) * 80}ms`;
});
