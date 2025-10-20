
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
    const targetElement = document.querySelector('.greeting ');

    // Verifica que el elemento y el plugin SplitText (de GSAP) existan
    if (!targetElement || typeof SplitText === 'undefined') {
        console.warn("Elemento o librería de animación no encontrada.");
        return;
    }

    // 2. Inicializar SplitText: divide el texto en "words" (palabras)
    const splitText = new SplitText(targetElement, {
        type: "words",
        wordsClass: "animated-word" 
    });

    // 3. --- INICIO de la Animación GSAP ---
    gsap.from(splitText.words, {
        // Estado INICIAL (Desde donde empieza a animar)
        opacity: 0,
        y: 30, // Se desliza 30px hacia arriba
        filter: 'blur(2px)', // Inicia ligeramente borroso
        
        // Estado FINAL (A donde llega la animación)
        duration: 1, // Tiempo que tarda CADA palabra en animarse
        ease: "power2.out", // Curva de aceleración/desaceleración
        stagger: 0.1, // CLAVE: El retraso entre el inicio de la animación de cada palabra (efecto escalonado)
    });
    // --- FIN de la Animación GSAP ---
});