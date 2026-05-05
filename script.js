document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL EFFECT =====
  var navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ===== SCROLL INDICATOR =====
  var scrollIndicator = document.querySelector('.hero-scroll-indicator');

  function handleScrollIndicator() {
    if (!scrollIndicator) return;
    if (window.scrollY > 200) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING (pathname-based for multi-page) =====
  var navLinks = document.querySelectorAll('.nav-link');

  function setActiveNavLink() {
    var path = window.location.pathname;
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href');
      if (path === '/' && (href === '/' || href === '/index.html')) {
        link.classList.add('active');
      } else if (href !== '/' && path.indexOf(href) === 0) {
        link.classList.add('active');
      }
    });
  }

  setActiveNavLink();

  // Combined scroll handler
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    handleScrollIndicator();
  });

  // ===== MOBILE MENU TOGGLE =====
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute(
      'aria-expanded',
      navToggle.classList.contains('active').toString()
    );
  });

  // Close menu when a nav-link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navbarHeight = 70;
      var targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ===== FADE-IN / SLIDE / SCALE ANIMATIONS (Intersection Observer) =====
  var animElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');

  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var parent = entry.target.parentElement;
          var siblings = parent.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
          var index = Array.prototype.indexOf.call(siblings, entry.target);

          if (index > 0) {
            entry.target.style.transitionDelay = (index * 0.12) + 's';
          }

          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ===== ANIMATED NUMBER COUNTERS =====
  // Only animate elements with a data-target attribute (e.g. About section stats).
  // Testimonial stat-numbers contain non-numeric text like "Multi-site", "6 AM", "$0".
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out curve for a natural feel
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easedProgress * target);

      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  statNumbers.forEach(function (el) {
    counterObserver.observe(el);
  });

  // ===== FORM SUBMISSION HANDLER (works for all .contact-form forms) =====
  var allForms = document.querySelectorAll('form.contact-form');

  allForms.forEach(function (form) {
    var formSuccess = form.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate required fields (browser HTML5 validation)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Email validation
      var emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim() !== '') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          emailInput.classList.add('input-error');
          var errSpan = form.querySelector('#emailError');
          if (errSpan) errSpan.textContent = 'Please enter a valid email address.';
          emailInput.focus();
          return;
        }
      }

      // Submit to Formspree via AJAX
      var formData = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      var btnSpan = submitBtn ? submitBtn.querySelector('span') : null;
      var originalText = btnSpan ? btnSpan.textContent : 'Sending...';

      if (submitBtn) submitBtn.disabled = true;
      if (btnSpan) btnSpan.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          // If form has a _next redirect URL, go there for conversion tracking
          var nextInput = form.querySelector('input[name="_next"]');
          if (nextInput && nextInput.value) {
            window.location.href = nextInput.value;
            return;
          }
          // Otherwise show inline success message
          var formElements = form.querySelectorAll('.form-row, .form-group, .btn, .form-fineprint, .form-section-title');
          formElements.forEach(function (el) { el.style.display = 'none'; });
          if (formSuccess) formSuccess.style.display = 'block';
          form.reset();
        } else {
          if (submitBtn) submitBtn.disabled = false;
          if (btnSpan) btnSpan.textContent = originalText;
          alert('Oops! Something went wrong. Please try again or call us at (720) 736-1614.');
        }
      }).catch(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (btnSpan) btnSpan.textContent = originalText;
        alert('Oops! Something went wrong. Please try again or call us at (720) 736-1614.');
      });
    });

    // Clear error styling on focus
    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('focus', function () {
        input.classList.remove('input-error');
        var errId = input.id + 'Error';
        var errSpan = form.querySelector('#' + errId);
        if (errSpan) errSpan.textContent = '';
      });
    });
  });

  // Run handlers once on load in case page is already scrolled
  handleNavbarScroll();
  handleScrollIndicator();
});
