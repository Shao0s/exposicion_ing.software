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
});