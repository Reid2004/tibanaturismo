// Lazy loading de imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
});

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menú responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const body = document.body;

    // Abrir/cerrar menú
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});

// Efectos de scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    const items = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    let isAnimating = false;

    function unify(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    }

    let startX = null;
    let startY = null;

    function lock(e) {
        const touch = unify(e);
        startX = touch.clientX;
        startY = touch.clientY;
    }

    function drag(e) {
        if (!startX || isAnimating) return;
        e.preventDefault();
        const touch = unify(e);
        const dx = touch.clientX - startX;
        const dy = Math.abs(touch.clientY - startY);
        if (dy > 50) return; // Evitar conflicto con scroll vertical
        galleryWrapper.style.transform = `translateX(${dx}px)`;
    }

    function move(e) {
        if (!startX || isAnimating) {
            startX = null;
            return;
        }
        const touch = unify(e);
        const dx = touch.clientX - startX;
        const threshold = window.innerWidth * 0.2;
        if (Math.abs(dx) > threshold && !isAnimating) {
            isAnimating = true;
            if (dx < 0 && currentIndex < items.length - 1) {
                currentIndex++;
            } else if (dx > 0 && currentIndex > 0) {
                currentIndex--;
            }
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        } else {
            galleryWrapper.style.transform = 'translateX(0)';
        }
        startX = null;
    }

    // Eventos táctiles
    galleryContainer.addEventListener('touchstart', lock);
    galleryContainer.addEventListener('touchmove', drag);
    galleryContainer.addEventListener('touchend', move);

    // Eventos mouse
    galleryContainer.addEventListener('mousedown', lock);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', move);

    // Controles de navegación
    document.querySelector('.gallery-prev')?.addEventListener('click', () => {
        if (currentIndex > 0 && !isAnimating) {
            isAnimating = true;
            currentIndex--;
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => isAnimating = false, 500);
        }
    });

    document.querySelector('.gallery-next')?.addEventListener('click', () => {
        if (currentIndex < items.length - 1 && !isAnimating) {
            isAnimating = true;
            currentIndex++;
            galleryWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => isAnimating = false, 500);
        }
    });
});