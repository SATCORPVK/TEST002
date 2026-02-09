// Boot Sequence with enhanced behavior
const bootSequence = [
    "INITIALIZING SATCORP NODE PRIME",
    "AUTHENTICATING OPERATOR CREDENTIALS",
    "LOADING SECURITY PROTOCOLS",
    "MOUNTING SYSTEM MODULES",
    "ESTABLISHING NETWORK CONNECTIONS",
    "SYSTEM READY FOR OPERATION"
];

let bootIndex = 0;

function executeBootSequence() {
    if (bootIndex < bootSequence.length) {
        const bootLogs = document.getElementById('boot-logs');
        const line = document.createElement('div');
        line.className = 'boot-line';
        line.style.animationDelay = `${bootIndex * 800}ms`;
        line.textContent = bootSequence[bootIndex];
        bootLogs.appendChild(line);
        
        bootIndex++;
        setTimeout(executeBootSequence, 800);
    } else {
        setTimeout(transitionToInterface, 1200);
    }
}

function transitionToInterface() {
    const bootSequence = document.getElementById('boot-sequence');
    bootSequence.style.opacity = '0';
    bootSequence.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        bootSequence.classList.add('hidden');
        document.getElementById('interface').classList.remove('hidden');
        initializeInterface();
    }, 1000);
}

// System Clock
function updateSystemTime() {
    const now = new Date();
    const timeString = now.toUTCString().split(' ')[4];
    document.getElementById('system-time').textContent = `${timeString} UTC`;
}

// Capability Matrix
function initializeCapabilityMatrix() {
    const modules = document.querySelectorAll('.matrix-module');
    modules.forEach(module => {
        module.addEventListener('click', () => {
            // Close other modules
            modules.forEach(m => m.classList.remove('active'));
            
            // Open current module with delay
            setTimeout(() => {
                module.classList.add('active');
                showModuleDetail(module.dataset.module);
            }, 200);
        });
    });
}

const moduleDetails = {
    strategy: {
        id: "STR-001",
        title: "STRATEGY ARCHITECTURE",
        content: "Structural planning of operational systems and procedural frameworks for complex creative endeavors. Development of strategic pathways and systematic approaches to problem-solving."
    },
    identity: {
        id: "IDS-002", 
        title: "IDENTITY SYSTEMS",
        content: "Development of cohesive identity architectures that function across multiple operational layers. Creation of symbolic systems with structural integrity."
    },
    experience: {
        id: "EXP-003",
        title: "EXPERIENCE ENGINEERING", 
        content: "Construction of interactive environments and procedural user pathways. Design of systematic experiences with measurable outcomes."
    },
    interface: {
        id: "INT-004",
        title: "INTERFACE DESIGN",
        content: "Creation of control systems and information architectures for operational dashboards. Development of intuitive interaction models."
    },
    automation: {
        id: "AUT-005",
        title: "AUTOMATION LOGIC",
        content: "Implementation of systematic automation and procedural optimization protocols. Design of self-regulating systems."
    },
    creative: {
        id: "CRT-006",
        title: "CREATIVE DIRECTION",
        content: "Orchestration of creative resources and strategic artistic implementation. Guidance of aesthetic and functional development."
    }
};

function showModuleDetail(moduleKey) {
    const detail = moduleDetails[moduleKey];
    if (!detail) return;
    
    const overlay = document.getElementById('module-detail');
    document.getElementById('detail-id').textContent = detail.id;
    document.getElementById('detail-title').textContent = detail.title;
    document.getElementById('detail-content').textContent = detail.content;
    
    overlay.classList.remove('hidden');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }, 10);
}

// Network Nodes
function initializeNetworkNodes() {
    const nodes = document.querySelectorAll('.network-node');
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
        });
    });
}

// Methodology Sequence
function initializeMethodologySequence() {
    const steps = document.querySelectorAll('.sequence-step');
    steps.forEach(step => {
        step.addEventListener('click', () => {
            const stepName = step.dataset.step;
            
            // Update active step
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
            
            // Update description
            document.querySelectorAll('.step-description').forEach(desc => {
                desc.classList.remove('active');
            });
            document.getElementById(`desc-${stepName}`).classList.add('active');
        });
    });
}

// Contact Protocol with enhanced behavior
const systemResponses = [
    "TRANSMISSION RECEIVED. SATCORP WILL EVALUATE COMPATIBILITY.",
    "MESSAGE PROCESSING. OPERATOR RESPONSE PENDING.",
    "TRANSMISSION ANALYZED. COMPATIBILITY ASSESSMENT INITIATED.",
    "CHANNEL ACCEPTED. AWAITING OPERATOR REVIEW.",
    "REQUEST LOGGED. SYSTEM EVALUATION IN PROGRESS."
];

function initializeContactProtocol() {
    const input = document.getElementById('transmission-input');
    const output = document.getElementById('console-output');
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            // Add user message
            const userLine = document.createElement('div');
            userLine.className = 'console-line';
            userLine.textContent = `OPERATOR: ${input.value}`;
            output.appendChild(userLine);
            
            // Clear input
            const message = input.value;
            input.value = '';
            
            // System response with delay
            setTimeout(() => {
                const responseLine = document.createElement('div');
                responseLine.className = 'console-line';
                output.appendChild(responseLine);
                
                typeResponse(responseLine, message);
            }, 800);
        }
    });
}

function typeResponse(element, userMessage) {
    const response = systemResponses[Math.floor(Math.random() * systemResponses.length)];
    let index = 0;
    
    element.textContent = 'SYSTEM: ';
    
    function typeCharacter() {
        if (index < response.length) {
            element.textContent += response.charAt(index);
            index++;
            setTimeout(typeCharacter, 50);
        }
    }
    
    setTimeout(typeCharacter, 300);
}

// Overlay Management
function initializeOverlay() {
    const overlay = document.getElementById('module-detail');
    const closeBtn = overlay.querySelector('.overlay-close');
    
    closeBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        }
    });
}

// Initialize Interface
function initializeInterface() {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    initializeCapabilityMatrix();
    initializeNetworkNodes();
    initializeMethodologySequence();
    initializeContactProtocol();
    initializeOverlay();
}

// Start System
document.addEventListener('DOMContentLoaded', () => {
    executeBootSequence();
});
