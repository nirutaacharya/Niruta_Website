document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a, .action-btns a[data-target]');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    // Handle Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.right = '20px';
            navLinksContainer.style.background = 'rgba(255, 255, 255, 0.9)';
            navLinksContainer.style.backdropFilter = 'blur(20px)';
            navLinksContainer.style.padding = '20px';
            navLinksContainer.style.borderRadius = '20px';
            navLinksContainer.style.boxShadow = '0 8px 32px 0 rgba(238, 174, 202, 0.25)';
            navLinksContainer.style.gap = '1.5rem';
        }
    });

    // Handle Navigation & SPA structure (Fixes Height problem by using display: none for inactive)
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (!this.hasAttribute('data-target')) return;

            e.preventDefault();
            const targetId = this.getAttribute('data-target');

            if (window.innerWidth <= 992) {
                navLinksContainer.style.display = 'none';
            }

            document.querySelectorAll('.nav-links a').forEach(nav => nav.classList.remove('active'));
            const correspondingNav = document.querySelector(`.nav-links a[data-target="${targetId}"]`);
            if (correspondingNav) {
                correspondingNav.classList.add('active');
            } else if (this.classList.contains('nav-links')) {
                this.classList.add('active');
            }

            // Animate transition between sections
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('section-active');
                } else {
                    section.classList.remove('section-active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Remove Intro Loader from DOM to re-enable clicks on elements behind it
    const introLoader = document.getElementById('intro-loader');
    if (introLoader) {
        setTimeout(() => {
            introLoader.style.pointerEvents = 'none';
            introLoader.style.display = 'none'; // fully remove it from layout after it fades out
        }, 4000); // 3s delay + 0.8s fade out + 0.2s buffer
    }
});
