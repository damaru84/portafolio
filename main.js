/* ─────────────────────────────────────────────────────────
   PORTFOLIO — main.js
   ───────────────────────────────────────────────────────── */

// ── AÑO AUTOMÁTICO EN EL FOOTER ────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


// ── FILTROS ─────────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.card');
const grid       = document.getElementById('cards-grid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Activo visual del botón
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    cards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.cat === filter;

      if (match) {
        card.style.display = '';
        // Resetear la animación para el efecto de entrada
        card.style.animation = 'none';
        card.offsetHeight; // force reflow
        card.style.animation = '';
        card.style.animationDelay = `${i * 0.05}s`;
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    // Mensaje si no hay resultados
    const existing = grid.querySelector('.empty-state');
    if (existing) existing.remove();

    if (visible === 0) {
      const msg = document.createElement('p');
      msg.className = 'empty-state';
      msg.textContent = 'No hay proyectos en esta categoría todavía.';
      grid.appendChild(msg);
    }
  });
});


// ── SMOOTH SCROLL PARA LINKS INTERNOS ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── SCROLL REVEAL (Intersection Observer) ──────────────
// Hace que las tarjetas aparezcan al hacer scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Observar las secciones que no son las tarjetas (hero, contacto, etc.)
document.querySelectorAll('.contact-section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
