document.addEventListener("DOMContentLoaded", () => {

  const nav = document.getElementById('nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('solid', window.scrollY > 10);
    });
  }

});

function toggleMenu() {
  const h = document.getElementById('ham');
  const m = document.getElementById('mnav');

  if (h && m) {
    h.classList.toggle('open');
    m.classList.toggle('open');
  }
}