// Sample Data
const SKILLS = [
  {
    title: "Core Identity / Operator Value",
    cards: ["Outcome-first briefs", "Executive alignment", "Resilient delivery"]
  },
  {
    title: "Brand, Visual / Platform Systems",
    cards: ["Identity architecture", "Design tokens", "Component libraries"]
  },
  {
    title: "Web Design / UI Systems",
    cards: ["Accessible UI", "Micro-interactions", "Design systems"]
  },
  {
    title: "AI-Enhanced Creative Workflows",
    cards: ["Prompt engineering", "RAG pipelines", "Image/audio generation"]
  }
];

const GALLERY = [
  { label: "Brand Kit", color: "#8b5cf6" },
  { label: "UI Mockup", color: "#0ea5e9" },
  { label: "Overlay Design", color: "#f59e0b" },
  { label: "Architecture Map", color: "#ef4444" }
];

// DOM Elements
const modulesContainer = document.getElementById("skillModules");
const galleryGrid = document.getElementById("galleryGrid");
const simResult = document.getElementById("simResult");
const progress = document.getElementById("progress");
const yearSpan = document.getElementById("year");

// Populate Skills
SKILLS.forEach(skill => {
  const module = document.createElement("div");
  module.className = "module";
  module.innerHTML = `
    <h3>${skill.title}</h3>
    <div class="cards">
      ${skill.cards.map(c => `<div class="card">${c}</div>`).join("")}
    </div>
  `;
  modulesContainer.appendChild(module);
});

// Populate Gallery
GALLERY.forEach(item => {
  const div = document.createElement("div");
  div.style.background = item.color;
  div.textContent = item.label;
  galleryGrid.appendChild(div);
});

// Simulation
function simulate(type) {
  const messages = {
    brand: ["Audit existing brand", "Create token system", "Build component library"],
    web: ["Analyze user journeys", "Design system tokens", "Prototype key views"],
    ai: ["Define prompt library", "Set up RAG pipeline", "Run test generations"]
  };

  const steps = messages[type] || [];
  simResult.innerHTML = steps.map(s => `<div class="card">${s}</div>`).join("");
}

// Scroll to Section
function scrollToSection(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

// Progress Bar
window.addEventListener("scroll", () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const perc = (scrolled / total) * 100;
  progress.style.width = `${perc}%`;
});

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

// Load Theme
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  yearSpan.textContent = new Date().getFullYear();
});
