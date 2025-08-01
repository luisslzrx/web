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


//Este es para hacer scrooll en header y que el header se haga de un color 
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const introSection = document.querySelector('.intro');

  window.addEventListener('scroll', () => {
    // Mide la distancia que llevas scrolleado
    if(window.scrollY > introSection.offsetHeight) {
      // Si ya bajaste más que la altura del intro, quita la clase que activa fondo animado
      header.classList.add('scrolled');
    } else {
      // Si estás dentro de la intro, quita la clase 'scrolled'
      header.classList.remove('scrolled');
    }
  });
});

