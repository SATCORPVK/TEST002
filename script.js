// Smooth scroll to skill deck
document.getElementById('explore-btn').addEventListener('click', () => {
  document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
});

// Dark/Light mode toggle
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// GSAP Animations
gsap.from(".hero h1", { y:-50, opacity:0, duration:1 });
gsap.from(".hero p", { y:-20, opacity:0, duration:1, delay:0.3 });
gsap.from("#explore-btn", { scale:0.8, opacity:0, duration:0.8, delay:0.6 });

gsap.utils.toArray(".skill-section").forEach(section => {
  gsap.from(section.querySelectorAll(".card"), {
    scrollTrigger: { trigger: section, start:"top 80%" },
    opacity:0,
    y:50,
    stagger:0.2,
    duration:0.8
  });
});
