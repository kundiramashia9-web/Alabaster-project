// ============================================================
// Alabaster Health & Aesthetics — Core Interactive Scripts
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ---------- 1. Mobile Navigation & Backdrop Overlay ----------
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    // Create backdrop overlay if not present
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    function openMobileNav() {
        if (nav && navToggle) {
            nav.classList.add('open');
            navToggle.classList.add('open');
            navOverlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
    }

    function closeMobileNav() {
        if (nav && navToggle) {
            nav.classList.remove('open');
            navToggle.classList.remove('open');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (nav.classList.contains('open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        navOverlay.addEventListener('click', closeMobileNav);

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                closeMobileNav();
            }
        });

        // Close nav when a link is clicked
        const navLinks = nav.querySelectorAll('.nav__link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
    }

    // ---------- 2. Active Nav Link Detection ----------
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav__link');
    navLinksAll.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ---------- 3. Header Shrink & Glassmorphism On Scroll ----------
    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 40) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ---------- 4. Smooth Scrolling for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ---------- 5. Video Modal for Therapy Sessions ----------
    const videoCards = document.querySelectorAll('[data-video-modal]');
    videoCards.forEach((card) => {
        card.addEventListener('click', function (e) {
            const videoUrl = this.getAttribute('data-video-url');
            if (videoUrl) {
                window.open(videoUrl, '_blank', 'noopener,noreferrer');
            }
        });
    });
});