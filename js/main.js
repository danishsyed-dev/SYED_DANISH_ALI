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
    initProjectsToggle();
    initMobileMenu();
});

/* ============================================
   SMOOTH SCROLL NAVIGATION
   ============================================ */

/**
 * Initialize smooth scroll for anchor links
 */
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

/* ============================================
   PROJECTS TOGGLE
   ============================================ */

/**
 * Initialize projects expand functionality
 */
function initProjectsToggle() {
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const btnContainer = document.getElementById('viewAllProjectsContainer');

    if (!toggleBtn || !hiddenProjects.length) return;

    toggleBtn.addEventListener('click', () => {
        // Unhide all past initial 6 projects
        hiddenProjects.forEach(proj => {
            proj.style.display = 'flex';
        });

        // Hide the view all button now that everything is visible
        if (btnContainer) {
            btnContainer.style.display = 'none';
        }
    });
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
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.textContent = 'menu';
        } else {
            menuIcon.textContent = 'close';
        }
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
