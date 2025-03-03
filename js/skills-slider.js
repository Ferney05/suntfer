document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.skills-slider');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.skills-category').length;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event listeners para botones
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Touch events para dispositivos móviles
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) { // Mínimo 50px de deslizamiento
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Autoplay
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pausar autoplay en hover/touch
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Pausar autoplay en touch
    slider.addEventListener('touchstart', () => {
        clearInterval(autoplayInterval);
    });

    slider.addEventListener('touchend', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Inicializar el slider
    updateSlider();
}); 