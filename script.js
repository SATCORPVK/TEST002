// Vanta Background
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
});

// Smooth Scroll
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.querySelector("#core").scrollIntoView({ behavior: "smooth" });
});

// Skill Cards Animation
gsap.from(".skill-cards", {
  scrollTrigger: ".skill-section",
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2
});

// Contact Form Submission (Formspree)
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    body: formData
  });
  alert("Message sent!");
});
