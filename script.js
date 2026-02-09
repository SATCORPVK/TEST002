// Smooth scroll to skill deck
document.getElementById('explore-btn').addEventListener('click', () => {
  document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
});

// Dark/Light mode toggle
document.getElementById('toggle-mode').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// GSAP Animations
gsap.from(".hero h1", { y: -50, opacity: 0, duration: 1 });
gsap.from(".hero p", { y: -20, opacity: 0, duration: 1, delay: 0.3 });
gsap.from("#explore-btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.6 });
gsap.utils.toArray(".skill-section").forEach(section => {
  gsap.from(section.querySelectorAll(".card"), {
    scrollTrigger: { trigger: section, start: "top 80%" },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8
  });
});

// Responsive Skill Map
const mapCanvas = document.getElementById('map-canvas');
const ctx = mapCanvas.getContext('2d');

// Original node positions (desktop reference)
const baseWidth = 1200;
const baseHeight = 600;

const nodesBase = [
  { name: 'Core Identity', x: 200, y: 100 },
  { name: 'Brand Systems', x: 400, y: 50 },
  { name: 'Web/UI Systems', x: 600, y: 120 },
  { name: 'Systems Architecture', x: 800, y: 80 },
  { name: 'Streaming/Overlay', x: 1000, y: 150 },
  { name: 'AI Workflows', x: 300, y: 300 },
  { name: 'Game Development', x: 500, y: 350 },
  { name: 'Client Experience', x: 700, y: 300 },
  { name: 'Platforms', x: 900, y: 330 },
  { name: 'Documentation', x: 200, y: 500 },
  { name: 'Asset Delivery', x: 600, y: 500 },
  { name: 'Ideal Clients', x: 1000, y: 500 }
];

const connections = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[6,10],[8,11]
];

let nodes = [];

// Resize canvas and scale nodes
function resizeCanvas() {
  mapCanvas.width = mapCanvas.clientWidth;
  mapCanvas.height = mapCanvas.clientWidth * (baseHeight / baseWidth); // maintain aspect ratio
  const scaleX = mapCanvas.width / baseWidth;
  const scaleY = mapCanvas.height / baseHeight;
  nodes = nodesBase.map(n => ({ name: n.name, x: n.x * scaleX, y: n.y * scaleY }));
  drawMap();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Draw the map
function drawMap(hoverIndex = null) {
  ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 2;
  connections.forEach(([i,j]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[i].x, nodes[i].y);
    ctx.lineTo(nodes[j].x, nodes[j].y);
    ctx.stroke();
  });
  nodes.forEach((node,i) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI*2);
    ctx.fillStyle = (i === hoverIndex) ? '#9b5de5' : '#555';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  });
}

// Hover detection
mapCanvas.addEventListener('mousemove', e => {
  const rect = mapCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  let hoverIndex = null;
  nodes.forEach((node,i) => {
    if(Math.hypot(mouseX-node.x, mouseY-node.y) < 20) hoverIndex = i;
  });
  drawMap(hoverIndex);
});

// Concierge Workflow Simulation
const serviceSelect = document.getElementById('service-select');
const steps = document.querySelectorAll('.workflow-steps .step');
serviceSelect.addEventListener('change', () => {
  steps.forEach(step => step.classList.remove('active'));
  let delay = 0;
  steps.forEach(step => {
    setTimeout(() => step.classList.add('active'), delay);
    delay += 500;
  });
});
