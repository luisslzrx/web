
//CODIGO PARA LA BARRA DE MENU RESPONSIVE

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    // Función para alternar el menú
    function toggleMenu() {
        navbar.classList.toggle('active');
        // Opcional: Bloquear scroll del body cuando el menú esté abierto
        document.body.classList.toggle('no-scroll', navbar.classList.contains('active')); 
    }

    // 1. Abrir/Cerrar al hacer clic en el ícono
    menuIcon.addEventListener('click', toggleMenu);

    // 2. Cerrar el menú al hacer clic en un enlace (navegar)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                toggleMenu(); // Cierra el menú después de la navegación
            }
        });
    });

    // 3. NUEVA FUNCIONALIDAD: Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (event) => {
        // Verifica si el menú está abierto Y si el clic NO fue dentro del navbar Y NO fue en el icono de menú
        if (
            navbar.classList.contains('active') && // Menú está activo
            !navbar.contains(event.target) &&      // El clic NO fue dentro del navbar
            !menuIcon.contains(event.target)       // El clic NO fue en el icono (o en el header)
        ) {
            toggleMenu(); // Cierra el menú
        }
    });
});



//CODIGO PARA ANIMACION DESDE LA LIBRERIA DE GSAP

document.addEventListener('DOMContentLoaded', function() {
    // 1. Define el elemento de texto que quieres animar
    const targetElement = document.querySelector('.greeting');

    // Verifica la disponibilidad de SplitType
    if (!targetElement || typeof SplitType === 'undefined') {
        console.warn("Elemento o librería SplitType no encontrada. Animación omitida.");
        return;
    }

    // 2. Inicializar SplitType: divide el texto en "words" (palabras)
    // Usamos SplitType para dividir el texto y obtener los targets.
    const splitText = new SplitType(targetElement, { 
        types: 'words', // Especificamos que queremos dividir por palabras
        tagName: 'span' // Envuelve cada palabra en un <span>
    });

    // 3. Define la animación GSAP para las palabras
    // NOTA: Los targets para GSAP ahora son splitText.words
    gsap.from(splitText.words, {
        // Estado INICIAL
        opacity: 0,
        y: 30, // Se desliza 30px hacia arriba
        filter: 'blur(3px)',
        
        // Estado FINAL
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08, // Efecto escalonado
    });
});