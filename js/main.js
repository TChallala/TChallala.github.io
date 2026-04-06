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
  const scrollProgress = document.getElementById('scrollProgress');
  const sections = document.querySelectorAll('.section');
  const reveals = document.querySelectorAll('.reveal');

  // --- Role Switcher Elements ---
  const roleTabs = document.querySelectorAll('.role-tab');
  const heroTagline = document.getElementById('heroTagline');
  const heroDescription = document.getElementById('heroDescription');

  // --- Role Content Data ---
  const roleContent = {
    fullstack: {
      tagline: 'I build reliable web applications & distributed systems.',
      description: 'Full Stack Developer with hands-on experience in modern frontend/backend technologies, microservices, and a <strong>QA-first mindset</strong>. I don\'t just ship code &mdash; I make sure it works and stays that way.'
    },
    qa: {
      tagline: 'I ensure software quality through UI, API & E2E automation.',
      description: 'SDET with expertise in <strong>UI automation</strong>, <strong>API automation</strong>, and <strong>end-to-end testing</strong>. I build robust test frameworks using pytest, Selenium, and BDD &mdash; catching bugs before they reach production.'
    }
  };

  // --- Role Switcher Logic ---
  function switchRole(role) {
    // Update active tab
    roleTabs.forEach(function (tab) {
      tab.classList.remove('active');
      if (tab.dataset.role === role) {
        tab.classList.add('active');
      }
    });

    // Animate content change
    if (heroTagline && heroDescription) {
      heroTagline.style.opacity = '0';
      heroDescription.style.opacity = '0';

      setTimeout(function () {
        heroTagline.textContent = roleContent[role].tagline;
        heroDescription.innerHTML = roleContent[role].description;
        heroTagline.style.opacity = '1';
        heroDescription.style.opacity = '1';
      }, 200);
    }
  }

  // Add click listeners to role tabs
  roleTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var role = this.dataset.role;
      switchRole(role);
    });
  });

  // --- Skills Filter Logic ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCategories = document.querySelectorAll('.skill-category');

  function filterSkills(category) {
    // Update active tab
    filterTabs.forEach(function (tab) {
      tab.classList.remove('active');
      if (tab.dataset.filter === category) {
        tab.classList.add('active');
      }
    });

    // Filter skill categories
    skillCategories.forEach(function (card) {
      if (category === 'all') {
        card.classList.remove('hidden');
      } else if (card.dataset.category === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Add click listeners to filter tabs
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var category = this.dataset.filter;
      filterSkills(category);
    });
  });

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
      child.style.setProperty('--stagger-delay', index);
    });
  });

  // --- Scroll Event Listener (throttled) ---
  var ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        handleBackToTop();
        handleScrollProgress();
        highlightActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }

  // --- Scroll Progress Indicator ---
  function handleScrollProgress() {
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
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
