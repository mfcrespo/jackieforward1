// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 50));

// Mobile menu
function toggleMenu() {
  const h = document.getElementById('ham');
  const m = document.getElementById('mnav');
  h.classList.toggle('open');
  m.classList.toggle('open');
}