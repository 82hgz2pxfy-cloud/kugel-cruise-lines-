// ================================
// KUGEL CRUISES — LUXURY FRONTEND
// ================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeaderScroll();
  initRevealAnimations();
  initCounterAnimations();
  initSmoothScrollButtons();
  initDemoForms();
  initParallaxHero();
});

// ------------------------
// MOBILE MENU
// ------------------------
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

// ------------------------
// STICKY HEADER EFFECT
// ------------------------
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.background = "rgba(5, 18, 40, 0.92)";
      header.style.boxShadow = "0 12px 30px rgba(0,0,0,0.18)";
    } else {
      header.style.background = "rgba(7, 27, 58, 0.78)";
      header.style.boxShadow = "none";
    }
  });
}

// ------------------------
// SCROLL REVEAL
// ------------------------
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(`
    .card,
    .deal-card,
    .feature-box,
    .destination-card,
    .split > div,
    .split img,
    .newsletter-card,
    .search-card,
    .section-header,
    .stats-row .stat
  `);

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = "all 0.8s ease";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}

// ------------------------
// COUNTERS
// ------------------------
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix || "";
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      counter.textContent = value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ------------------------
// SMOOTH SCROLL BUTTONS
// ------------------------
function initSmoothScrollButtons() {
  document.querySelectorAll("[data-scroll]").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = button.getAttribute("data-scroll");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ------------------------
// DEMO FORMS (NO BACKEND)
// ------------------------
function initDemoForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const button = form.querySelector("button[type='submit']");
      if (button) {
        const originalText = button.textContent;
        button.textContent = "Submitted";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
          alert("Thanks for your interest in Kugel Cruises. This is a demo frontend, so submissions are not yet connected.");
        }, 900);
      }
    });
  });
}

// ------------------------
// HERO PARALLAX
// ------------------------
function initParallaxHero() {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.18;
    heroBg.style.transform = `translateY(${offset}px) scale(1.08)`;
  });
}
