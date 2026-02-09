/* ================================================================
   SATCORP – Site Interactions
   ============================================================= */

(() => {
  const doc = document.documentElement;
  const body = document.body;

  /* -------------------------------------------------
     1️⃣ Custom Cursor
     ------------------------------------------------- */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // position the small dot instantly
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // follower lags behind for a subtle trailing effect
  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  /* -------------------------------------------------
     2️⃣ Dark / Light Theme
     ------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'satcorp-theme';

  const setTheme = (mode) => {
    if (mode === 'light') {
      doc.classList.add('light-mode');
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      doc.classList.remove('light-mode');
      localStorage.setItem(THEME_KEY, 'dark');
    }
  };

  // Load persisted preference
  const persisted = localStorage.getItem(THEME_KEY);
  if (persisted) setTheme(persisted);
  else setTheme('dark'); // default

  themeToggle.addEventListener('click', () => {
    if (doc.classList.contains('light-mode')) setTheme('dark');
    else setTheme('light');
  });

  /* -------------------------------------------------
     3️⃣ VANTA.JS – Hero Background
     ------------------------------------------------- */
  let vantaEffect;
  const initVanta = () => {
    const hero = document.getElementById('vanta-bg');
    if (!hero) return;

    // Only enable on larger screens for performance
    if (window.innerWidth < 768) return;

    vantaEffect = VANTA.DOTS({
      el: hero,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 300.00,
      minWidth: 300.00,
      backgroundColor: 0x0b0c10,
      color: 0x6c5ce7,
      spacing: 20.0,
      // subtle motion, not too distracting
      speed: 0.5
    });
  };
  initVanta();
  window.addEventListener('resize', () => {
    if (vantaEffect) vantaEffect.destroy();
    initVanta();
  });

  /* -------------------------------------------------
     4️⃣ GSAP – Scroll‑Triggered Animations
     ------------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger);

  // Section titles fade‑in + slide-up when entering viewport
  document.querySelectorAll('.skill-section').forEach(section => {
    const title = section.querySelector('.section-title');
    const intro = section.querySelector('.section-intro');

    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(intro, {
      y: 30,
      opacity: 0,
      delay: 0.15,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Cards – staggered fade + scale
    const cards = section.querySelectorAll('.skill-card');
    gsap.from(cards, {
      opacity: 0,
      scale: 0.95,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Hero text animation
  gsap.from('.hero-title', {
    y: -60,
    opacity: 0,
    ease: "power3.out",
    duration: 1
  });
  gsap.from('.hero-subtitle', {
    y: -40,
    opacity: 0,
    delay: 0.2,
    ease: "power3.out",
    duration: 0.9
  });
  gsap.from('.cta-btn', {
    y: 20,
    opacity: 0,
    delay: 0.4,
    ease: "power3.out",
    duration: 0.8
  });

  /* -------------------------------------------------
     5️⃣ Modal – Unified for all skill cards
     ------------------------------------------------- */
  const modal = document.getElementById('modal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalImg = modal.querySelector('.modal-img');
  const modalClose = modal.querySelector('.modal-close');

  const openModal = (title, desc, img) => {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = img;
    modalImg.alt = title;
    modal.setAttribute('aria-hidden', 'false');
    // Lock scroll
    body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  };

  // Clicking a skill card reads data- attributes and opens the modal
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      const img = card.dataset.img;
      openModal(title, desc, img);
    });
  });

  // Modal close actions
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click outside content
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  /* -------------------------------------------------
     6️⃣ CTA Scroll‑To (Hero button)
     ------------------------------------------------- */
  const cta = document.querySelector('.cta-btn');
  if (cta) {
    cta.addEventListener('click', () => {
      const target = document.querySelector(cta.dataset.scrollTo);
      if (target) {
        gsap.to(window, {duration: 0.8, scrollTo: target});
      }
    });
  }

  /* -------------------------------------------------
     7️⃣ Contact Form – Success Message (Formspree)
     ------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Formspree redirects back to the page with a hash #success on success.
      // We'll just show a temporary toast if the URL contains that hash.
    });
  }
  // Toast logic – check hash on load
  if (window.location.hash === '#success') {
    const toast = document.createElement('div');
    toast.textContent = '✅ Message sent! I’ll be in touch shortly.';
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'var(--color-primary)';
    toast.style.color = '#fff';
    toast.style.padding = '0.9rem 1.6rem';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    toast.style.zIndex = 5000;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
    // Clean hash so it's not shown on refresh
    history.replaceState(null, null, ' ');
  }

  /* -------------------------------------------------
     8️⃣ Footer – Current Year
     ------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* -------------------------------------------------
     9️⃣ Misc – Smooth scroll for anchor links (fallback)
     ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {duration: 0.9, scrollTo: target});
      }
    });
  });
})();
