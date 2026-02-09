/* ==============================================================
   SATCORP – Interactive UI Logic
   --------------------------------------------------------------
   1️⃣ Vanta background init (hero)
   2️⃣ GSAP scroll-triggered reveals for hero & skill sections
   3️⃣ Navigation active‑link highlighting
   4️⃣ Theme (dark/light) toggle
   5️⃣ Custom cursor movement
   6️⃣ Modal lightbox handler for card clicks
   -------------------------------------------------------------- */

(() => {
  // -----------------------------------------------------------------
  // 0️⃣ Utility functions
  // -----------------------------------------------------------------
  const qs = s => document.querySelector(s);
  const qsa = s => document.querySelectorAll(s);

  // -----------------------------------------------------------------
  // 1️⃣ VANTA – hero background
  // -----------------------------------------------------------------
  let vantaEffect;
  function initVanta() {
    if (typeof VANTA !== 'undefined') {
      vantaEffect = VANTA.WAVES({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        waveHeight: 18.00,
        waveSpeed: 1.0,
        zoom: 0.85,
        color: 0x9d00ff, // neon purple
        shininess: 50.00,
        speed: 1.2
      });
    }
  }

  // -----------------------------------------------------------------
  // 2️⃣ GSAP – entrance & scroll animations
  // -----------------------------------------------------------------
  function initAnimations() {
    // Hero elements fade in on page load
    const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
    heroTl.from(".hero-title", { y: 40, opacity: 0 })
          .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.5")
          .from(".cta-btn", { opacity: 0, scale: 0.9 }, "-=0.4");

    // Skill sections: heading + cards reveal on scroll
    qsa(".skill-section").forEach(section => {
      const heading = section.querySelector(".skill-header h2");
      const sub = section.querySelector(".skill-header .sub");
      const cards = section.querySelectorAll(".card");

      // Animate heading & sub
      gsap.from([heading, sub], {
        scrollTrigger: { trigger: section, start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });

      // Animate cards with a staggered fade/slide
      gsap.from(cards, {
        scrollTrigger: { trigger: section, start: "top 85%" },
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }

  // -----------------------------------------------------------------
  // 3️⃣ Navigation – active link highlighting on scroll
  // -----------------------------------------------------------------
  function initNavHighlight() {
    const sections = qsa(".skill-section");
    const navLinks = qsa(".nav-link");

    // Helper: get top offset of each section
    const sectionTops = Array.from(sections).map(sec => ({
      id: sec.id,
      offsetTop: sec.offsetTop
    }));

    window.addEventListener("scroll", () => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      // find the current section
      let currentId = "";
      for (let i = sectionTops.length - 1; i >= 0; i--) {
        if (scrollPos + 150 >= sectionTops[i].offsetTop) { // 150px buffer
          currentId = sectionTops[i].id;
          break;
        }
      }
      // update nav links
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    });
  }

  // -----------------------------------------------------------------
  // 4️⃣ Dark / Light mode toggle
  // -----------------------------------------------------------------
  function initThemeToggle() {
    const btn = qs("#theme-toggle");
    btn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const isDark = document.documentElement.classList.contains("dark");
      btn.textContent = isDark ? "☀️" : "🌓";
    });
  }

  // -----------------------------------------------------------------
  // 5️⃣ Custom cursor
  // -----------------------------------------------------------------
  function initCustomCursor() {
    const cursor = qs(".custom-cursor");
    const moveCursor = e => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", moveCursor);
    // Add interactive class to any element that should enlarge cursor
    qsa(".card, .cta-btn, .nav-link, .social-icon, .modal-close, button, a")
      .forEach(el => el.classList.add("interactive"));
  }

  // -----------------------------------------------------------------
  // 6️⃣ Modal Lightbox – generic handler for all cards
  // -----------------------------------------------------------------
  function initModals() {
    const modal = qs("#modal");
    const body = qs("#modal-body");
    const closeBtn = qs("#modal-close");

    // Close when clicking X or outside content
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.add("hidden");
    });

    // Example: using data-modal attribute to load sample content.
    // In a real project you would load actual assets based on ID.
    qsa(".card[data-modal]").forEach(card => {
      card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        // Populate modal with placeholder content – you can replace this
        // with ajax fetch or static HTML fragments.
        body.innerHTML = `
          <h3>${card.querySelector('h3').innerText} – Sample</h3>
          <img src="https://via.placeholder.com/800x450?text=${encodeURIComponent(modalId)}"
               alt="${modalId}" class="modal-img">
          <p>This is a placeholder for a deliverable (PNG, SVG, PDF, video, etc.). Replace the source URL with your real asset.</p>`;
        modal.classList.remove("hidden");
      });
    });
  }

  // -----------------------------------------------------------------
  // 7️⃣ CTA – smooth scroll to first skill deck
  // -----------------------------------------------------------------
  function initCTA() {
    const btn = qs("#explore-cta");
    btn.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector("#skill-1").scrollIntoView({ behavior: "smooth" });
    });
  }

  // -----------------------------------------------------------------
  // 8️⃣ Init everything after DOM ready
  // -----------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initVanta();
    initAnimations();
    initNavHighlight();
    initThemeToggle();
    initCustomCursor();
    initModals();
    initCTA();
  });

  // -----------------------------------------------------------------
  // 9️⃣ Optional: Clean up Vanta on page unload (good practice)
  // -----------------------------------------------------------------
  window.addEventListener("beforeunload", () => {
    if (vantaEffect) vantaEffect.destroy();
  });

})();
