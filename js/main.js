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

  // Keep the rendered page aligned with the way clients evaluate the work.
  const mainContent = document.querySelector('.main-content');
  const footer = mainContent ? mainContent.querySelector('.footer') : null;
  const clientSectionOrder = [
    'services',
    'projects',
    'experience',
    'skills',
    'about',
    'contact'
  ];

  if (mainContent && footer) {
    clientSectionOrder.forEach(function (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) mainContent.insertBefore(section, footer);
    });
  }

  // --- Role Switcher Elements ---
  const roleTabs = document.querySelectorAll('.role-tab');
  const heroTagline = document.getElementById('heroTagline');
  const heroDescription = document.getElementById('heroDescription');

  // --- Role Content Data ---
  const roleContent = {
    fullstack: {
      tagline: 'Build, improve, and maintain the digital tools your business depends on.',
      description: 'I help businesses launch responsive websites, improve <strong>WordPress, Shopify, and Wix</strong> sites, and build custom full-stack applications. Every project combines clear communication, thoughtful implementation, and practical QA from the start.'
    },
    qa: {
      tagline: 'Release dependable software with testing built into delivery.',
      description: 'I test critical user journeys, APIs, and integrations through <strong>UI, API, regression, and end-to-end testing</strong> &mdash; helping teams catch problems earlier and release with greater confidence.'
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

  // --- Theme Toggle (Dark/Light Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const theme = savedTheme || systemTheme;
    
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
  }
  
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  themeToggle.addEventListener('click', toggleTheme);
  
  // Initialize theme on page load
  initializeTheme();

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
  var staggerContainers = document.querySelectorAll('.services-grid, .skills-grid, .projects-grid, .about-highlights');

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

  // --- Project Gallery Navigation ---
  document.querySelectorAll('.project-gallery').forEach(function (gallery) {
    const mainImage = gallery.querySelector('.project-image');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const thumbs = gallery.querySelectorAll('.thumb');
    
    function updateImage(src) {
      mainImage.style.opacity = '0';
      setTimeout(function () {
        mainImage.src = src;
        mainImage.style.opacity = '1';
      }, 150);
      
      thumbs.forEach(function (thumb) {
        thumb.classList.toggle('active', thumb.dataset.src === src);
      });
    }
    
    function goToNext() {
      const activeThumb = gallery.querySelector('.thumb.active');
      const nextThumb = activeThumb.nextElementSibling || thumbs[0];
      updateImage(nextThumb.dataset.src);
    }
    
    function goToPrev() {
      const activeThumb = gallery.querySelector('.thumb.active');
      const prevThumb = activeThumb.previousElementSibling || thumbs[thumbs.length - 1];
      updateImage(prevThumb.dataset.src);
    }
    
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    
    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        updateImage(thumb.dataset.src);
      });
    });
  });

  // --- Lightbox Modal ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCurrent = document.getElementById('lightboxCurrent');
  const lightboxTotal = document.getElementById('lightboxTotal');
  
  let currentGallery = null;
  let currentImageIndex = 0;
  
  function openLightbox(gallery, imageIndex) {
    currentGallery = gallery;
    currentImageIndex = imageIndex;
    const thumbs = gallery.querySelectorAll('.thumb');
    lightboxTotal.textContent = thumbs.length;
    
    const thumbSrc = thumbs[imageIndex].dataset.src;
    lightboxImage.src = thumbSrc;
    lightboxImage.alt = thumbs[imageIndex].alt;
    lightboxCurrent.textContent = imageIndex + 1;
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    currentGallery = null;
  }
  
  function nextImage() {
    if (!currentGallery) return;
    const thumbs = currentGallery.querySelectorAll('.thumb');
    currentImageIndex = (currentImageIndex + 1) % thumbs.length;
    openLightbox(currentGallery, currentImageIndex);
  }
  
  function prevImage() {
    if (!currentGallery) return;
    const thumbs = currentGallery.querySelectorAll('.thumb');
    currentImageIndex = (currentImageIndex - 1 + thumbs.length) % thumbs.length;
    openLightbox(currentGallery, currentImageIndex);
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);
  
  lightboxModal.addEventListener('click', function (e) {
    if (e.target === lightboxModal) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
  
  // Click on project image to open lightbox
  document.querySelectorAll('.clickable-image').forEach(function (img) {
    img.addEventListener('click', function () {
      const gallery = img.closest('.project-gallery');
      if (gallery) {
        const activeThumb = gallery.querySelector('.thumb.active');
        const allThumbs = gallery.querySelectorAll('.thumb');
        let index = 0;
        allThumbs.forEach(function (thumb, i) {
          if (thumb === activeThumb) index = i;
        });
        openLightbox(gallery, index);
      }
    });
  });

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
