// Hero CTA
document.getElementById('explore-btn').addEventListener('click', () => {
  document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
});

// GSAP animations
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1 });
gsap.from(".skill-cards .card", {
  scrollTrigger: ".skill-cards",
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 0.8
});
