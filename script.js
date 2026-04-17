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

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function highlightActiveLink() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Combined scroll handler
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    handleScrollIndicator();
    highlightActiveLink();
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

  // ===== FADE-IN ANIMATIONS (Intersection Observer) =====
  var fadeElements = document.querySelectorAll('.fade-in');

  var fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent
          var parent = entry.target.parentElement;
          var siblings = parent.querySelectorAll('.fade-in');
          var index = Array.prototype.indexOf.call(siblings, entry.target);

          if (index > 0) {
            entry.target.style.transitionDelay = (index * 0.1) + 's';
          }

          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach(function (el) {
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

  // ===== CONTACT FORM VALIDATION =====
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    var fields = {
      name: {
        input: document.getElementById('name'),
        error: document.getElementById('nameError'),
        validate: function (val) {
          return val.trim() !== '' ? '' : 'Please enter your name.';
        }
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('emailError'),
        validate: function (val) {
          if (val.trim() === '') return 'Please enter your email address.';
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(val) ? '' : 'Please enter a valid email address.';
        }
      },
      phone: {
        input: document.getElementById('phone'),
        error: document.getElementById('phoneError'),
        validate: function (val) {
          return val.trim() !== '' ? '' : 'Please enter your phone number.';
        }
      },
      message: {
        input: document.getElementById('message'),
        error: document.getElementById('messageError'),
        validate: function (val) {
          return val.trim() !== '' ? '' : 'Please enter a message.';
        }
      }
    };

    // Clear error styling on input focus
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      field.input.addEventListener('focus', function () {
        field.input.classList.remove('input-error');
        field.error.textContent = '';
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      Object.keys(fields).forEach(function (key) {
        var field = fields[key];
        var errorMsg = field.validate(field.input.value);

        if (errorMsg) {
          isValid = false;
          field.error.textContent = errorMsg;
          field.input.classList.add('input-error');
        } else {
          field.error.textContent = '';
          field.input.classList.remove('input-error');
        }
      });

      if (isValid) {
        // Submit to Formspree
        var formData = new FormData(contactForm);
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(function (response) {
          if (response.ok) {
            var formElements = contactForm.querySelectorAll(
              '.form-row, .form-group, .btn'
            );
            formElements.forEach(function (el) {
              el.style.display = 'none';
            });
            formSuccess.style.display = 'block';
            contactForm.reset();
          } else {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
            alert('Oops! Something went wrong. Please try again or email us directly.');
          }
        }).catch(function () {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Send Message';
          alert('Oops! Something went wrong. Please try again or email us directly.');
        });
      }
    });
  }

  // Run handlers once on load in case page is already scrolled
  handleNavbarScroll();
  handleScrollIndicator();
  highlightActiveLink();
});
