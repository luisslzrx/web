const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
const colors = ["#00d2ff", "#a12fff", "#ff00c3", "#00f5a0"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = 6;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Detecta si es un dispositivo móvil (ancho menor a 768px)
const isMobile = window.innerWidth <= 768;

// Define el número de partículas según el dispositivo
const numberOfParticles = isMobile ? 15 : 45; // 15 para móviles, 35 para PC

function initParticles() {
  particles = [];
  // Usa la variable numberOfParticles para el bucle
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 160) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

initParticles();
animate();


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