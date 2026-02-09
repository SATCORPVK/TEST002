// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll(".skill-section").forEach(section => {
  gsap.from(section.querySelectorAll(".cards-grid .card"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y:50, opacity:0, stagger:0.2, duration:0.8
  });
});

// Smooth Scroll Function for CTA Button
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Dark Mode Toggle
const toggle = document.getElementById("toggle-darkmode");
toggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode");
});

// Optional: Custom Cursor
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
