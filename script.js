/* script.js */

/* ---------- 1. Theme toggle (persisted) ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const body        = document.body;

// load stored theme
const stored = localStorage.getItem('theme');
if(stored){
  body.dataset.theme = stored;
  themeIcon.textContent = stored === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  const newT = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newT;
  themeIcon.textContent = newT === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', newT);
});

/* ---------- 2. Vanta.js hero effect ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  if(hero){
    VANTA.BIRDS({
      el: hero,
      color: 0xffffff,
      backgroundColor: 0x111111,
      maxDistance: 20,
      scale: 1,
      scaleMobile: 0.5,
      fadeIn: 2000
    });
  }
});

/* ---------- 3. GSAP Animations ---------- */
gsap.registerPlugin(ScrollTrigger);

// Hero overlay entrance
gsap.from('.hero-overlay', {duration:1.5, opacity:0, y:-30, ease:'power2.out', delay:0.5});
gsap.from('.hero-title', {duration:0.9, opacity:0, y:-20, ease:'power2.out', delay:0.6});
gsap.from('.hero-subtitle', {duration:0.9, opacity:0, y:-15, ease:'power2.out', delay:0.7});
gsap.from('.cta-button', {duration:0.9, opacity:0, y:-10, ease:'power2.out', delay:0.8});

// Section reveal
gsap.utils.toArray('.skill-section').forEach(section => {
  gsap.from(section, {
    opacity:0, y:50, duration:1, ease:'power3.out',
    scrollTrigger:{trigger:section, start:'top 80%', toggleActions:'play none none reverse'}
  });
});

/* ---------- 4. Navigation scroll indicator ---------- */
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  progress.style.height = `${scrolled}%`;
});

/* ---------- 5. Navigation link highlight ---------- */
const sections = gsap.utils.toArray('.skill-section');
const navLinks = document.querySelectorAll('#nav .nav-links a');

sections.forEach(sec => {
  ScrollTrigger.create({
    trigger: sec, start: 'top 80%',
    onEnter: () => setActiveLink(sec.id),
    onEnterBack: () => setActiveLink(sec.id)
  });
});

function setActiveLink(id){
  navLinks.forEach(l => l.classList.remove('active'));
  const active = document.querySelector(`#nav .nav-links a[href="#${id}"]`);
  if(active) active.classList.add('active');
}

/* ---------- 6. Smooth scrolling to sections ---------- */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      gsap.to(window, {scrollTo:{anchor:target}, duration:1, ease:'power2.inOut'});
    }
  });
});

/* ---------- 7. Custom cursor follow ---------- */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function follow(){
  cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
  requestAnimationFrame(follow);
}
follow();

// enlarge cursor on interactive elements
const interactiveEls = document.querySelectorAll('.skill-card,.cta-button,#nav .nav-links a,.modal-close');
interactiveEls.forEach(el =>{
  el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(1.4)');
  el.addEventListener('mouseleave', () => cursor.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`);
});

/* ---------- 8. Modal (lightbox) ---------- */
const modal        = document.getElementById('generic-modal');
const modalTitle  = document.getElementById('modal-title');
const modalImg    = document.getElementById('modal-img');
const modalDesc    = document.getElementById('modal-desc');
const modalClose   = modal.querySelector('.modal-close');

document.querySelectorAll('.skill-card').forEach(card =>{
  card.addEventListener('click', () =>{
    modalTitle.textContent = card.dataset.modalTitle;
    modalImg.src           = card.dataset.modalImg;
    modalImg.alt           = card.dataset.modalTitle;
    modalDesc.textContent  = card.dataset.modalDesc;
    modal.classList.remove('hidden');
  });
});

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', e => { if(e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') modal.classList.add('hidden'); });

/* ---------- 9. Placeholder for optional advanced features ----------
   (interactive skill map, concierge simulation, dynamic gallery)
   – can be added by developers as needed.
-------------------------------------------- */
