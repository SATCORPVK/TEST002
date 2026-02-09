// Main Application Controller
class SATCORP {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeParticles();
        this.setupScrollEffects();
        this.initializeSoundSystem();
    }
    
    setupEventListeners() {
        // Intersection Observer for animations
        this.setupIntersectionObserver();
        
        // Form handling
        this.setupFormHandlers();
        
        // Modal system
        this.setupModalSystem();
        
        // Navigation
        this.setupNavigation();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special handling for stats
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, options);
        
        document.querySelectorAll('.fade-in, .stat-number').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    setupFormHandlers() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!this.validateForm(data)) {
                this.showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const button = form.querySelector('.submit-button');
            const originalText = button.textContent;
            button.textContent = 'TRANSMITTING...';
            button.disabled = true;
            
            // Simulate API call
            await this.submitForm(data);
            
            // Reset form
            button.textContent = originalText;
            button.disabled = false;
            form.reset();
            this.showToast('Request transmitted successfully');
        });
    }
    
    validateForm(data) {
        return data.name && data.email && data.project && data.message;
    }
    
    async submitForm(data) {
        // Simulate API delay
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show';
        
        if (type === 'error') {
            toast.style.borderColor = '#ff00ff';
        }
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    setupModalSystem() {
        const modal = document.getElementById('skillModal');
        const cards = document.querySelectorAll('.skill-card');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const skill = card.dataset.skill;
                this.openSkillModal(skill);
            });
        });
        
        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openSkillModal(skill) {
        const modal = document.getElementById('skillModal');
        const modalBody = document.getElementById('modalBody');
        
        const content = this.getSkillContent(skill);
        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('skillModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    getSkillContent(skill) {
        const contents = {
            identity: `
                <h2>Core Identity & Operator Value</h2>
                <p>Establishing the foundational DNA that drives organizational success through strategic positioning and mission alignment.</p>
                <h3>Key Deliverables:</h3>
                <ul>
                    <li>Brand strategy documentation</li>
                    <li>Value system architecture</li>
                    <li>Positioning framework</li>
                    <li>Cultural integration roadmap</li>
                </ul>
            `,
            visual: `
                <h2>Brand & Visual Systems</h2>
                <p>Creating comprehensive visual language systems that adapt across all touchpoints with consistency and impact.</p>
                <h3>Core Components:</h3>
                <ul>
                    <li>Typography hierarchies</li>
                    <li>Color theory application</li>
                    <li>Iconography systems</li>
                    <li>Motion design principles</li>
                </ul>
            `,
            web: `
                <h2>Web/UI Systems</h2>
                <p>Building scalable, maintainable interface systems using atomic design principles and modern frameworks.</p>
                <h3>Technologies:</h3>
                <p>React, Vue.js, TypeScript, Tailwind CSS, Storybook</p>
            `
        };
        
        return contents[skill] || '<h2>Skill Details</h2><p>Content loading...</p>';
    }
    
    setupNavigation() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Active state on scroll
        this.setupScrollSpy();
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    initializeParticles() {
        const particleSystem = new ParticleSystem(document.getElementById('particles'));
    }
    
    setupScrollEffects() {
        // Parallax hero
        gsap.to('.hero-bg', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Reveal animations
        gsap.utils.toArray('.skill-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
    }
    
    initializeSoundSystem() {
        // Create audio context for click sounds
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Add click sounds to buttons
        document.querySelectorAll('button, .cta-button').forEach(button => {
            button.addEventListener('click', () => this.playClickSound());
        });
    }
    
    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
}

// Particle System Class
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.setupMouseTracking();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${particle.style.width};
                background: #00ffff;
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: parseFloat(particle.style.left),
                y: parseFloat(particle.style.top),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 0.2) {
                particle.vx -= dx * 0.01;
                particle.vy -= dy * 0.01;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
            if (particle.y < 0 || particle.y > 100) particle.vy *= -1;
            
            // Speed limiting
            particle.vx = Math.max(-1, Math.min(1, particle.vx));
            particle.vy = Math.max(-1, Math.min(1, particle.vy));
            
            // Apply position
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = particle.y + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    window.SATCORP = new SATCORP();
    
    // Remove loader after initialization
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when tab is visible
        gsap.globalTimeline.play();
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    }
});
