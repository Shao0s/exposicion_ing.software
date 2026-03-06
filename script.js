let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    const items = slides[index].querySelectorAll("li");
    items.forEach((item, i) => {
        item.classList.remove("show");
        setTimeout(() => {
            item.classList.add("show");
        }, i * 250);
    });
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    if (e.key === "ArrowLeft") {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
});

showSlide(currentSlide);
