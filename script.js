// script.js - SATCORP Interactive System Controller

// =================== Initialization ===================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    initThemeSystem();
    initCustomCursor();
    initScrollAnimations();
    initNavigationProgress();
    initFormHandling();
    initInteractiveElements();
    initVantaBackground();
    initSkillInteractions();
    initPerformanceOptimizations();
    
    // Welcome console message
    console.log('%c SATCORP System Initialized ', 'background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 4px;');
});

// =================== Theme System ===================
function initThemeSystem() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('satcorp-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('satcorp-theme', newTheme);
        
        // Add transition animation
        html.style.transition = 'background 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            html.style.transition = '';
        }, 300);
    });
}

// =================== Custom Cursor ===================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    const animateCursor = () => {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        
        // Follower has delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('button, a, .cap-card, .platform-card, .client-type');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.style.background = 'rgba(139, 92, 246, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.style.background = 'rgba(139, 92, 246, 0.1)';
        });
    });
}

// =================== Scroll Animations (GSAP) ===================
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.timeline()
        .from('.hero-intro .role-tag', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        })
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-title .title-sub', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-desc', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.cta-primary', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.metric', {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4');
    
    // Skill sections animation
    gsap.utils.toArray('.skill-section').forEach((section, index) => {
        const header = section.querySelector('.skill-header');
        const content = section.querySelector('.skill-content');
        
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        })
        .from(header, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from(content, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');
    });
    
    // Skill cards stagger animation
    gsap.utils.toArray('.cap-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
    
    // System diagram connections
    gsap.utils.toArray('.diagram-node').forEach((node, index) => {
        gsap.from(node, {
            scrollTrigger: {
                trigger: node,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });
    
    // Number counter animation
    gsap.utils.toArray('.metric-value').forEach(value => {
        const text = value.textContent;
        const isNumber = /^\d+$/.test(text);
        
        if (isNumber) {
            gsap.from(value, {
                scrollTrigger: {
                    trigger: value,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                textContent: 0,
                duration: 2,
                ease: 'power1.inOut',
                snap: { textContent: 1 },
                onUpdate: function() {
                    value.textContent = Math.ceil(value.textContent);
                }
            });
        }
    });
}

// =================== Navigation Progress ===================
function initNavigationProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const sections = document.querySelectorAll('section');
    
    const updateProgress = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const totalScroll = documentHeight - windowHeight;
        const scrollPercent = (scrollY / totalScroll) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
        
        // Update active section highlighting
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const id = section.getAttribute('id');
            
            if (rect.top <= 100 && rect.bottom >= 100) {
                // Could add nav active state here
            }
        });
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// =================== Form Handling ===================
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    const submitButton = form?.querySelector('.form-submit');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Update button state
        const originalContent = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Processing...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<span>✓ Request Deployed</span>';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 2000);
    });
    
    // Form validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
    });
}

// =================== Interactive Elements ===================
function initInteractiveElements() {
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('[data-scroll-to]');
    ctaButton?.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = ctaButton.getAttribute('data-scroll-to');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    // Platform cards interaction
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', () => {
            // Simulate platform exploration
            const platformName = card.querySelector('h5').textContent;
            console.log(`Exploring ${platformName} capabilities...`);
        });
    });
    
    // AI tools interaction
    const aiTools = document.querySelectorAll('.ai-tool');
    aiTools.forEach(tool => {
        tool.addEventListener('click', () => {
            // Toggle selection
            tool.style.background = tool.style.background ? '' : 'rgba(139, 92, 246, 0.3)';
            tool.style.transform = tool.style.transform ? '' : 'scale(1.1)';
        });
    });
    
    // System diagram node connections
    const diagramNodes = document.querySelectorAll('.diagram-node');
    diagramNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const systemName = node.textContent.trim();
            node.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5)';
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.boxShadow = '';
        });
    });
    
    // Game grid interaction
    const gridTiles = document.querySelectorAll('.grid-tile');
    gridTiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            // Animate tile sequence
            gsap.to(tile, {
                scale: 1.2,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// =================== Vanta Background ===================
function initVantaBackground() {
    // Initialize Vanta.js clouds effect
    if (typeof VANTA !== 'undefined') {
        VANTA.CLOUDS({
            el: '#vanta-bg',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x0,
            cloudColor: 0x8b5cf6,
            cloudShadowColor: 0x111111,
            sunColor: 0x3b82f6,
            speed: 0.5
        });
    }
}

// =================== Skill Interactions ===================
function initSkillInteractions() {
    // Create skill connection visualization
    const skillSections = document.querySelectorAll('.skill-section');
    
    skillSections.forEach((section, index) => {
        section.addEventListener('mouseenter', () => {
            // Highlight related skills
            const skillNumber = section.dataset.skill;
            // Implementation for showing skill connections
        });
    });
    
    // Interactive capability cards
    const capCards = document.querySelectorAll('.cap-card');
    capCards.forEach(card => {
        card.addEventListener('click', () => {
            // Open detail modal or expand card
            const isExpanded = card.classList.contains('expanded');
            
            if (!isExpanded) {
                card.classList.add('expanded');
                card.style.transform = 'scale(1.05)';
                card.style.zIndex = '10';
            } else {
                card.classList.remove('expanded');
                card.style.transform = '';
                card.style.zIndex = '';
            }
        });
    });
    
    // System workflow animations
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Animate workflow progress
            gsap.timeline()
                .to(step, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: 'power2.out'
                })
                .to(step, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.inOut'
                });
        });
    });
}

// =================== Performance Optimizations ===================
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Throttle scroll events
    let ticking = false;
    const updateScrollEffects = () => {
        // Update parallax, scroll animations, etc.
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@400;500;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Service Worker for offline support (future enhancement)
    if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register('/sw.js');
    }
}

// =================== Utility Functions ===================
const SATCORP = {
    // System information
    version: '1.0.0',
    
    // Navigation helpers
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Theme helpers
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('satcorp-theme', newTheme);
    },
    
    // Analytics tracking (placeholder)
    trackEvent(eventName, properties = {}) {
        // Implementation for analytics
        console.log('Event:', eventName, properties);
    },
    
    // Form validation helper
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
};

// Global error handling
window.addEventListener('error', (e) => {
    console.error('SATCORP System Error:', e);
});

// Make SATCORP object globally available
window.SATCORP = SATCORP;
