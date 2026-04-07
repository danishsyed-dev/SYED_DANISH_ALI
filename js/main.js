/* ============================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   Author: Syed Danish Ali
   Description: Interactive functionality for portfolio
   ============================================ */

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initResumeModal();
    initMobileMenu();
    initProjectCarousel();
});

/* ============================================
   SMOOTH SCROLL NAVIGATION
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   RESUME MODAL
   ============================================ */

function initResumeModal() {
    const resumeModal = document.getElementById('resumeModal');
    const openModalBtn = document.getElementById('openResumeModal');
    const closeModalBtn = document.getElementById('closeResumeModal');

    if (!resumeModal || !openModalBtn || !closeModalBtn) {
        console.warn('Resume modal elements not found');
        return;
    }

    openModalBtn.addEventListener('click', () => openModal(resumeModal));
    closeModalBtn.addEventListener('click', () => closeModal(resumeModal));

    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) closeModal(resumeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal(resumeModal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   PAGE LOAD
   ============================================ */

window.onload = () => {
    window.scrollTo(0, 0);
};

/* ============================================
   PROJECT CAROUSEL
   Shows 2 cards/page (desktop), 1 card (mobile)
   Supports arrows, dots, keyboard, touch swipe
   ============================================ */

function initProjectCarousel() {
    const viewport = document.getElementById('carouselViewport');
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const pageCurrentEl = document.getElementById('carouselPageCurrent');
    const pageTotalEl = document.getElementById('carouselPageTotal');
    const dotsContainer = document.getElementById('carouselDots');

    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    const GAP = 48; // 3rem = 48px (matches CSS gap: 3rem)
    let currentPage = 0;

    function getPerPage() {
        return window.innerWidth >= 768 ? 2 : 1;
    }

    function getTotalPages() {
        return Math.ceil(cards.length / getPerPage());
    }

    function getCardWidth() {
        const perPage = getPerPage();
        return (viewport.offsetWidth - GAP * (perPage - 1)) / perPage;
    }

    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const total = getTotalPages();
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === currentPage ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to page ' + (i + 1));
            dot.addEventListener('click', () => {
                currentPage = i;
                render();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function render() {
        const cardWidth = getCardWidth();
        const perPage = getPerPage();
        const totalPages = getTotalPages();

        // Clamp page
        currentPage = Math.max(0, Math.min(currentPage, totalPages - 1));

        // Size all cards to fit viewport
        cards.forEach(card => {
            card.style.width = cardWidth + 'px';
            card.style.minWidth = cardWidth + 'px';
        });

        // Slide track via transform (GPU-accelerated)
        const firstCardIndex = currentPage * perPage;
        const offset = firstCardIndex * (cardWidth + GAP);
        track.style.transform = 'translateX(-' + offset + 'px)';

        // Update counter
        if (pageCurrentEl) pageCurrentEl.textContent = currentPage + 1;
        if (pageTotalEl) pageTotalEl.textContent = totalPages;

        // Update arrow states
        if (prevBtn) prevBtn.disabled = currentPage === 0;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages - 1;

        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentPage);
            });
        }
    }

    // Arrow handlers
    if (prevBtn) prevBtn.addEventListener('click', () => { currentPage--; render(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentPage++; render(); });

    // Keyboard navigation (only when projects section is in viewport)
    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('projects');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;

        if (e.key === 'ArrowLeft') {
            currentPage = Math.max(0, currentPage - 1);
            render();
        }
        if (e.key === 'ArrowRight') {
            currentPage = Math.min(getTotalPages() - 1, currentPage + 1);
            render();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                currentPage = Math.min(getTotalPages() - 1, currentPage + 1);
            } else {
                currentPage = Math.max(0, currentPage - 1);
            }
            render();
        }
    }, { passive: true });

    // Resize handler (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildDots();
            render();
        }, 150);
    });

    // Initial render
    buildDots();
    render();
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menuIcon = document.getElementById('mobileMenuIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const resumeBtnMobile = document.getElementById('openResumeModalMobile');
    const resumeModal = document.getElementById('resumeModal');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = 'menu';
        });
    });

    if (resumeBtnMobile && resumeModal) {
        resumeBtnMobile.addEventListener('click', () => {
            openModal(resumeModal);
            mobileMenu.classList.add('hidden');
            menuIcon.textContent = 'menu';
        });
    }
}
