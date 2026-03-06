document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // Función para actualizar qué diapositiva está activa
    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
    }

    // Event listener para la navegación con el teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            // Mover a la siguiente diapositiva, volviendo al inicio si se está en la última
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowLeft') {
            // Mover a la diapositiva anterior, yendo a la última si se está en la primera
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    });

    // --- Lógica del Temporizador ---
    let timerInterval;
    let timeLeft = 300; // 5 minutos en segundos
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    if (startBtn && resetBtn) {
        startBtn.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                startBtn.textContent = "▶ Iniciar";
            } else {
                startBtn.textContent = "⏸ Pausar";
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        startBtn.textContent = "▶ Iniciar";
                        if(timerDisplay) timerDisplay.style.color = "red"; // Indicador visual de fin
                    }
                }, 1000);
            }
        });

        resetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 300;
            updateTimerDisplay();
            startBtn.textContent = "▶ Iniciar";
            if(timerDisplay) timerDisplay.style.color = "#00f7ff";
        });
    }
});