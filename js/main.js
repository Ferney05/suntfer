document.addEventListener('DOMContentLoaded', () => {
    // Carrusel de proyectos
    const carouselTrack = document.querySelector('.carousel-track');
    const projects = document.querySelectorAll('.c-project');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    const totalProjects = projects.length;

    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Actualizar visibilidad de botones
        if (prevButton && nextButton) {
            prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
            nextButton.style.display = currentIndex === totalProjects - 1 ? 'none' : 'flex';
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % totalProjects;
        updateCarousel();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
        updateCarousel();
    }

    function startAutoPlay() {
        if (autoPlayInterval) return;
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Event listeners para navegación
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            stopAutoPlay();
            currentIndex = index;
            updateCarousel();
            startAutoPlay();
        });
    });

    // Pausar autoplay al hover
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);

    // Inicializar carrusel
    updateCarousel();
    startAutoPlay();

    // Botón "Ver más"
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const description = this.previousElementSibling;
            description.classList.toggle('expanded');
            this.classList.toggle('expanded');
            this.textContent = description.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        });
    });

    // Botones de like en proyectos
    const projectLikeButtons = document.querySelectorAll('.project-like-btn');
    projectLikeButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const projectId = this.dataset.project;
            try {
                const likesRef = db.collection('projectLikes').doc(projectId);
                await db.runTransaction(async (transaction) => {
                    const doc = await transaction.get(likesRef);
                    if (!doc.exists) {
                        transaction.set(likesRef, { count: 1 });
                    } else {
                        transaction.update(likesRef, { count: doc.data().count + 1 });
                    }
                });
                
                const doc = await likesRef.get();
                this.querySelector('.like-count').textContent = doc.data().count;
                this.classList.add('liked');
                
                Toastify({
                    text: "¡Gracias por tu apoyo!",
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #3772e4, #2496e4)",
                        borderRadius: "10px",
                        padding: "15px 25px"
                    }
                }).showToast();
            } catch (error) {
                console.error("Error al actualizar likes:", error);
            }
        });
    });
});

// Función para cargar los likes de un proyecto
async function loadProjectLikes(projectId, likeCountElement) {
    try {
        const doc = await db.collection('projects').doc(projectId).get();
        if (doc.exists) {
            likeCountElement.textContent = doc.data().likes || 0;
        } else {
            likeCountElement.textContent = '0';
        }
    } catch (error) {
        console.error("Error al cargar likes:", error);
        likeCountElement.textContent = '0';
    }
} 