/* ========================================
   TEOFILO GONZAGA III — PORTFOLIO JS
   Scroll animations, mobile nav, 
   active section highlighting
   ======================================== */

(function () {
  'use strict';

  // --- DOM Elements ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('.section');
  const reveals = document.querySelectorAll('.reveal');

  // --- Mobile Nav Overlay ---
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  // --- Mobile Navigation Toggle ---
  function toggleMobileNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileNav() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', toggleMobileNav);
  overlay.addEventListener('click', closeMobileNav);

  // Close mobile nav when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMobileNav();
    }
  });

  // --- Navbar Scroll Effect ---
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // --- Back to Top Button ---
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Active Section Highlighting ---
  function highlightActiveSection() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // --- Scroll Reveal (Intersection Observer) ---
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- Staggered reveal for skill categories and project cards ---
  var staggerContainers = document.querySelectorAll('.skills-grid, .projects-grid, .about-highlights');

  staggerContainers.forEach(function (container) {
    var children = container.querySelectorAll('.reveal');
    children.forEach(function (child, index) {
      child.style.transitionDelay = index * 0.1 + 's';
    });
  });

  // --- Scroll Event Listener (throttled) ---
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        handleBackToTop();
        highlightActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Initial calls ---
  handleNavbarScroll();
  handleBackToTop();

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
})();
