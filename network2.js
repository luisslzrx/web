document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const miniPlayer = document.getElementById('mini-player');
    const audioSource = document.getElementById('audio-source');
    const playerTitle = document.getElementById('player-title');
    
    cards.forEach(card => {
        const playButton = card.querySelector('.play-button');

        playButton.addEventListener('click', function(e) {
            e.preventDefault(); 

            // Lee la ruta y el título de los atributos data-* de la tarjeta
            const audioPath = card.dataset.audio;
            const trackTitle = card.dataset.title;

            // 1. Mostrar el reproductor
            miniPlayer.classList.remove('mini-player-hidden');

            // 2. Lógica para cargar/reproducir
            // Verificar si la fuente ya está cargada y es la misma.
            // Usamos includes para manejar la URL completa del src que genera el navegador.
            const isNewTrack = !audioSource.src.includes(audioPath);

            if (isNewTrack) {
                // Es una nueva canción: Asignar nueva fuente y cargar
                audioSource.src = audioPath;
                audioSource.load(); 
                playerTitle.textContent = trackTitle;
            } else if (!audioSource.paused) {
                // Es la misma canción y está sonando: Pausar
                audioSource.pause();
                playerTitle.textContent = `${trackTitle} (Pausado)`;
                return;
            }
            
            // 3. Intentar la reproducción (función asíncrona)
            audioSource.play()
                .then(() => {
                    // Éxito: La reproducción se inició
                    console.log("Reproducción iniciada con éxito.");
                    playerTitle.textContent = trackTitle;
                })
                .catch(error => {
                    // Falla: Autoplay bloqueado por el navegador
                    console.error("Autoplay bloqueado. La canción está cargada.", error);
                    // Mensaje claro para el usuario
                    playerTitle.textContent = `${trackTitle} (¡Clic en el botón de abajo!)`;
                });
        });
    });
});