/* ============================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   Author: Syed Danish Ali
   Description: Interactive functionality for portfolio
   ============================================ */

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initResumeModal();
    initProjectsToggle();
    initMobileNavScroll();
});

/* ============================================
   MOBILE NAV AUTO-SCROLL
   ============================================ */

/**
 * Auto-scroll navigation when a link is clicked on mobile
 * Moves the clicked item to the left, revealing items to its right
 */
function initMobileNavScroll() {
    const navInner = document.querySelector('.nav-inner');
    const navLinks = document.querySelectorAll('.nav-inner a');

    if (!navInner || !navLinks.length) return;

    const isMobile = () => window.innerWidth <= 768;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!isMobile()) return;

            // Get the clicked link's position relative to the nav container
            const linkLeft = link.offsetLeft;

            // Scroll the nav so the clicked item is near the left (with small padding)
            navInner.scrollTo({
                left: linkLeft - 16,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   PROJECTS TOGGLE
   ============================================ */

/**
 * Initialize projects expand/collapse functionality
 */
function initProjectsToggle() {
    const toggleBtn = document.getElementById('toggleProjects');
    const projectsList = document.querySelector('.projects-list');

    if (!toggleBtn || !projectsList) {
        console.warn('Projects toggle elements not found');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        const isExpanded = projectsList.classList.toggle('expanded');
        toggleBtn.classList.toggle('expanded');

        // Update button text
        const textSpan = toggleBtn.querySelector('span');
        if (textSpan) {
            textSpan.textContent = isExpanded ? 'Show Less' : 'View All Projects';
        }
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Initialize Intersection Observer for fade-in animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   SMOOTH SCROLL NAVIGATION
   ============================================ */

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
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

/**
 * Initialize resume modal functionality
 */
function initResumeModal() {
    const resumeModal = document.getElementById('resumeModal');
    const openModalBtn = document.getElementById('openResumeModal');
    const closeModalBtn = document.getElementById('closeResumeModal');

    // Guard clause if elements don't exist
    if (!resumeModal || !openModalBtn || !closeModalBtn) {
        console.warn('Resume modal elements not found');
        return;
    }

    // Open modal
    openModalBtn.addEventListener('click', () => {
        openModal(resumeModal);
    });

    // Close modal via button
    closeModalBtn.addEventListener('click', () => {
        closeModal(resumeModal);
    });

    // Close modal when clicking outside
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeModal(resumeModal);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal(resumeModal);
        }
    });
}

/**
 * Open the modal
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   PAGE LOAD
   ============================================ */

/**
 * Scroll to top on page load
 */
window.onload = () => {
    window.scrollTo(0, 0);
};
