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