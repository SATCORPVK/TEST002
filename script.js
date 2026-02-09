// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);

    // Initialize cursor
    initCursor();

    // Initialize theme toggle
    initThemeToggle();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize progress HUD
    initProgressHUD();

    // Initialize skill cards
    initSkillCards();

    // Initialize skill map
    initSkillMap();

    // Initialize contact form
    initContactForm();

    // Initialize particles
    initParticles();

    // Initialize navbar scroll effect
    initNavbarScroll();
});

// Custom cursor
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Theme toggle
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;

    toggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Reveal animations
    gsap.utils.toArray('.reveal').forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleClass: 'active',
                once: true
            }
        });
    });

    // Parallax effect for hero
    gsap.to('.hero-content', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Skill cards stagger animation
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true
            }
        });
    });
}

// Progress HUD
function initProgressHUD() {
    const sections = document.querySelectorAll('section[id]');
    const progressHud = document.getElementById('progressHud');

    // Create dots for each section
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.setAttribute('data-section', section.id);
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        progressHud.appendChild(dot);
    });

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.progress-dot').forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
}

// Skill cards modal
function initSkillCards() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.getAttribute('data-skill');
            const title = card.querySelector('.skill-title').textContent;
            const description = card.querySelector('.skill-description').textContent;
            
            modalBody.innerHTML = `
                <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">${title}</h2>
                <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem;">${description}</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="background: var(--glass-bg); padding: 1.5rem; border-radius: 12px;">
                        <h4 style="margin-bottom: 0.5rem;">Deliverables</h4>
                        <ul style="color: var(--text-secondary); list-style: none; padding: 0;">
                            <li>✓ System Architecture</li>
                            <li>✓ Implementation Guide</li>
                            <li>✓ Documentation</li>
                        </ul>
                    </div>
                    <div style="background: var(--glass-bg); padding: 1.5rem; border-radius: 12px;">
                        <h4 style="margin-bottom: 0.5rem;">Technologies</h4>
                        <ul style="color: var(--text-secondary); list-style: none; padding: 0;">
                            <li>• React/Vue</li>
                            <li>• Node.js</li>
                            <li>• Cloud Services</li>
                        </ul>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Interactive skill map
function initSkillMap() {
    const container = document.getElementById('skillMapContainer');
    const skills = [
        'Core Identity', 'Brand Systems', 'Web/UI Systems',
        'Systems Architecture', 'Streaming/Overlay', 'AI Workflows',
        'Game Development', 'Client Experience', 'Platforms',
        'Documentation', 'Asset Delivery', 'Ideal Clients'
    ];

    // Clear container
    container.innerHTML = '';

    // Create skill nodes
    skills.forEach((skill, index) => {
        const node = document.createElement('div');
        node.className = 'skill-node';
        node.textContent = skill;
        
        // Position nodes in a circular pattern
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 200;
        const x = 50 + (Math.cos(angle) * radius / 4);
        const y = 50 + (Math.sin(angle) * radius / 4);
        
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.style.transform = 'translate(-50%, -50%)';
        
        node.addEventListener('click', () => {
            const sectionId = skill.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        container.appendChild(node);
    });

    // Add connections between related nodes
    for (let i = 0; i < skills.length; i++) {
        const connection = document.createElement('div');
        connection.className = 'skill-connection';
        
        // Random positioning for demo
        const angle = Math.random() * Math.PI * 2;
        const length = 100 + Math.random() * 200;
        
        connection.style.width = `${length}px`;
        connection.style.left = '50%';
        connection.style.top = '50%';
        connection.style.transform = `rotate(${angle}rad)`;
        
        container.appendChild(connection);
    }

    // Animate nodes on scroll
    gsap.utils.toArray('.skill-node').forEach((node, index) => {
        gsap.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#skill-map',
                start: 'top 80%',
                once: true
            }
        });
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation and submission
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            inquiry: document.getElementById('inquiry').value
        };
        
        // Show success message
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');
        
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
                <h2 style="margin-bottom: 1rem;">Partnership Inquiry Received</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Thank you for your interest in SATCORP. Our systems architect team will review your inquiry and respond within 24 hours.</p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">Reference ID: #SAT${Date.now().toString().slice(-6)}</p>
            </div>
        `;
        
        modal.classList.add('active');
        form.reset();
    });
}

// Particle background
function initParticles() {
    const container = document.getElementById('particleBg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${20 + Math.random() * 20}s`;
        
        container.appendChild(particle);
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
        }
    });
}
