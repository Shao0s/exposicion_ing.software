document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    // -------------------------------
    // NAVEGACIÓN DE DIAPOSITIVAS
    // -------------------------------

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        slides[index].classList.add('active');
        currentSlide = index;

        // Reiniciar pasos cuando se entra a la diapositiva
        resetSteps();
    }

    document.addEventListener('keydown', (e) => {

        if (e.key === 'ArrowRight') {

            // Si estamos en la diapositiva de actividad
            if (slides[currentSlide].querySelector('.step')) {

                if (showNextStep()) {
                    return;
                }
            }

            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);

        } else if (e.key === 'ArrowLeft') {

            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);

        }
    });

    // -------------------------------
    // PASOS DE AGILE INCEPTION
    // -------------------------------

    const steps = document.querySelectorAll(".step");
    const description = document.getElementById("step-description");

    let currentStep = 0;

    const descriptions = [

        "Definir la visión del producto. Se establece qué se quiere construir y cuál es el objetivo del sistema.",

        "Elevator Pitch: explicar la idea del producto de forma clara y rápida para que todos entiendan su propósito.",

        "Lista de Personas: identificar los tipos de usuarios que utilizarán el sistema.",

        "Características del Producto: definir las principales funcionalidades que tendrá el sistema.",

        "Jornada del Usuario: describir cómo interactúa el usuario con el sistema paso a paso.",

        "Mostrar la Solución: visualizar cómo funcionará el sistema o cómo resolverá el problema.",

        "Identificar Riesgos: detectar posibles problemas técnicos, de negocio o de recursos.",

        "Definir el MVP: elegir el conjunto mínimo de funcionalidades necesarias para lanzar el producto.",

        "Plan de Entregas: organizar las funcionalidades en diferentes etapas o versiones.",

        "Mostrar el Plan del Proyecto: presentar cómo se desarrollará el proyecto en el tiempo."

    ];

    function showNextStep() {

        if (currentStep < steps.length) {

            steps[currentStep].classList.add("show");

            if (description) {
                description.textContent = descriptions[currentStep];
            }

            currentStep++;
            return true;
        }

        return false;
    }

    function resetSteps() {

        currentStep = 0;

        steps.forEach(step => {
            step.classList.remove("show");
        });

        if (description) {
            description.textContent =
                "Haz clic en → para ir mostrando cada paso de Agile Inception.";
        }
    }

    // -------------------------------
    // TEMPORIZADOR
    // -------------------------------

    let timerInterval;
    let timeLeft = 300;

    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    function updateTimerDisplay() {

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        if (timerDisplay) {
            timerDisplay.textContent =
                `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
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

                        if(timerDisplay)
                            timerDisplay.style.color = "red";
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

            if(timerDisplay)
                timerDisplay.style.color = "#00f7ff";
        });
    }

});
