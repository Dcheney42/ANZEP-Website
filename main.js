// ANZEP Website — shared JS

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Mobile hamburger ──
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Mailing list signup ──
  const signupForm = document.querySelector('.signup-form');
  const signupSuccess = document.querySelector('.signup-success');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm.querySelector('input[type="email"]').value;
      if (email) {
        signupForm.style.display = 'none';
        if (signupSuccess) {
          signupSuccess.style.display = 'block';
          signupSuccess.textContent = `Thanks! We've noted ${email} for our mailing list. We'll be in touch soon.`;
        }
      }
    });
  }

  // ── Lightning talk toggle ──
  document.querySelectorAll('.lt-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const talk = btn.closest('.lightning-talk');
      const abstract = talk.querySelector('.lt-abstract');
      const isOpen = abstract.style.display === 'block';
      abstract.style.display = isOpen ? 'none' : 'block';
      btn.textContent = isOpen ? 'Read abstract ↓' : 'Hide abstract ↑';
    });
  });

  // ── Tabs ──
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        // Deactivate all in this group
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Find panels scoped to the parent container
        const container = tabGroup.closest('.tabs-container') || document;
        container.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  });

  // ── Hero photo parallax ──
const heroPhoto = document.querySelector('.hero-photo, .mission-hero-photo-full, .preconf-hero-photo');
const heroSection = document.querySelector('.home-hero, .page-hero');
  if (heroPhoto && heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const speed = 0.35; // how much slower the photo moves than the page
    let ticking = false;

    const updateParallax = () => {
      const rect = heroSection.getBoundingClientRect();
      // Only move the photo while the hero is at least partly on screen
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        heroPhoto.style.transform = `translateY(${window.scrollY * speed}px)`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    updateParallax();
  }

  // ── Scroll reveal (subtle) ──
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.team-card, .feature-card, .pillar-card, .keynote-card, .seminar-feature').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

});
