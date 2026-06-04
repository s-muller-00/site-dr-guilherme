/* =========================================================================
   JAVASCRIPT COMPARTILHADO — páginas de artigo
   ========================================================================= */

/* >>>>>>>>>>>>>>>>>>>>>  TROCAR-WHATSAPP  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
   Coloque aqui o número real. Formato: 55 + DDD + número (só dígitos).
   Ex.: (51) 98765-4321  ->  '5551987654321'
   ----------------------------------------------------------------------- */
const WHATSAPP_NUMBER = '5551991187716'; // (51) 99118-7716  <-- TROCAR-WHATSAPP

function waLink(message){
  const base = 'https://wa.me/' + WHATSAPP_NUMBER;
  return message ? base + '?text=' + encodeURIComponent(message) : base;
}

document.querySelectorAll('[data-wa]').forEach(function(el){
  el.setAttribute('href', waLink(el.getAttribute('data-msg') || ''));
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

// Sombra na navbar ao rolar
const nav = document.getElementById('nav');
if (nav){
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
}

// Menu mobile (hambúrguer)
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks){
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Animações de entrada (fade-in ao rolar)
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Ano automático no rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
