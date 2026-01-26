/* =========================================================
   The Diesel Guy LLC — Utility Script
   Purpose: Calls first. Speed. Clarity.
   ========================================================= */

(() => {
  const phone = "+12108066652";

  /* ---------------------------------------------------------
     1. Mobile Sticky Call Bar
     --------------------------------------------------------- */
  const createStickyCallBar = () => {
    if (window.innerWidth > 768) return;

    const bar = document.createElement("div");
    bar.id = "sticky-call-bar";
    bar.innerHTML = `
      <a href="tel:${phone}" class="sticky-call-btn">
        🚨 CALL DIESEL GUY • (210) 806-6652
      </a>
    `;
    document.body.appendChild(bar);
  };

  /* ---------------------------------------------------------
     2. Smooth Scroll for Internal Links
     --------------------------------------------------------- */
  const enableSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  /* ---------------------------------------------------------
     3. Subtle Pulse on Call Buttons (Urgency)
     --------------------------------------------------------- */
  const pulseCallButtons = () => {
    const buttons = document.querySelectorAll('a[href^="tel:"]');
    buttons.forEach(btn => {
      btn.classList.add("pulse-call");
    });
  };

  /* ---------------------------------------------------------
     4. Click Tracking (Future-Proof)
     --------------------------------------------------------- */
  const trackCalls = () => {
    document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
      btn.addEventListener("click", () => {
        console.log("📞 Call button clicked");

        // Ready for GA / Meta / etc
        // gtag('event', 'call_click', { method: 'phone' });
      });
    });
  };

  /* ---------------------------------------------------------
     5. Open / Closed Status (Optional)
     --------------------------------------------------------- */
  const setOpenStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday

    const isOpen =
      day !== 0 && // closed Sundays
      hour >= 7 && hour <= 18; // example hours

    document.body.dataset.status = isOpen ? "open" : "closed";
  };

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    createStickyCallBar();
    enableSmoothScroll();
    pulseCallButtons();
    trackCalls();
    setOpenStatus();
  });

})();
