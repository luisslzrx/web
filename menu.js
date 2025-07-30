const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header nav');

burger.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.toggle('active');
});

// Cierra el menú al hacer clic fuera del menú o del botón
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// Cierra el menú al hacer clic en cualquier enlace del nav
const links = nav.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});
