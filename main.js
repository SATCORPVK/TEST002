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

// Smooth Scroll Function
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Dark Mode Toggle
const toggle = document.getElementById("toggle-darkmode");
toggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode");
});

// Custom Cursor
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// === Interactive Skill Map ===
const skills = [
  { id: 'skill1', name: 'Core Identity', desc: 'Modular operator value system, philosophy, and identity mapping.' },
  { id: 'skill2', name: 'Brand Systems', desc: 'Strategic branding with cross-platform cohesion.' },
  { id: 'skill3', name: 'Web/UI Systems', desc: 'High-performance, interactive user interface systems.' },
  { id: 'skill4', name: 'Systems Architecture', desc: 'Modular backend/frontend orchestration and pipelines.' },
  { id: 'skill5', name: 'Broadcast Design', desc: 'Immersive overlays and live streaming interfaces.' },
  { id: 'skill6', name: 'AI Workflows', desc: 'AI-accelerated creative workflow pipelines.' },
  { id: 'skill7', name: 'Game Dev', desc: 'World-building and gameplay systems with cinematic design.' },
  { id: 'skill8', name: 'Client Experience', desc: 'Concierge-level engagement and adaptive feedback loops.' },
  { id: 'skill9', name: 'Platforms', desc: 'Integration and optimization for digital marketplaces.' },
  { id: 'skill10', name: 'Documentation', desc: 'Structured, interactive knowledge management.' },
  { id: 'skill11', name: 'Asset Delivery', desc: 'Optimized packaging and deployment pipelines.' },
  { id: 'skill12', name: 'Ideal Clients', desc: 'High-caliber client ecosystem mapping.' }
];

const container = document.getElementById('skill-map-container');
const workflowDesc = document.getElementById('workflow-description');

skills.forEach((skill, index) => {
  const node = document.createElement('div');
  node.className = 'skill-node';
  node.innerText = skill.name;
  
  const angle = (index / skills.length) * (2 * Math.PI);
  const radius = 180;
  node.style.left = `${50 + radius * Math.cos(angle)}%`;
  node.style.top = `${50 + radius * Math.sin(angle)}%`;
  node.style.transform = 'translate(-50%, -50%)';
  
  node.addEventListener('click', () => {
    workflowDesc.innerText = skill.desc;
    const bar = document.getElementById('workflow-animation');
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = null;
  });
  
  container.appendChild(node);
});
