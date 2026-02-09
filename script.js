// Boot Sequence
const bootLogs = [
    "INITIALIZING SATCORP NODE",
    "AUTHENTICATING USER",
    "LOADING OPERATOR PROFILE: ANU",
    "MOUNTING MODULES",
    "SYSTEM READY"
];

let currentLog = 0;

function typeBootLine() {
    if (currentLog < bootLogs.length) {
        const bootLogsElement = document.getElementById('boot-logs');
        const line = document.createElement('div');
        line.className = 'boot-line';
        line.textContent = bootLogs[currentLog];
        bootLogsElement.appendChild(line);
        
        currentLog++;
        setTimeout(typeBootLine, 800);
    } else {
        setTimeout(showInterface, 1000);
    }
}

function showInterface() {
    document.getElementById('boot-sequence').classList.add('hidden');
    document.getElementById('interface').classList.remove('hidden');
}

// Capability Modules
document.querySelectorAll('.capability-module').forEach(module => {
    module.addEventListener('click', () => {
        // Close other modules
        document.querySelectorAll('.capability-module').forEach(m => {
            if (m !== module) m.classList.remove('active');
        });
        
        // Toggle current module
        module.classList.toggle('active');
    });
});

// Network Nodes
document.querySelectorAll('.network-node').forEach(node => {
    node.addEventListener('click', () => {
        // Close other nodes
        document.querySelectorAll('.network-node').forEach(n => {
            if (n !== node) n.classList.remove('active');
        });
        
        // Toggle current node
        node.classList.toggle('active');
    });
});

// Methodology Timeline
document.querySelectorAll('.timeline-step').forEach((step, index) => {
    step.addEventListener('click', () => {
        // Update active step
        document.querySelectorAll('.timeline-step').forEach(s => {
            s.classList.remove('active');
        });
        step.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        const stepId = `step-${step.dataset.step}`;
        document.getElementById(stepId).classList.remove('hidden');
    });
});

// Contact Protocol
const messageInput = document.getElementById('message-input');
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim()) {
        const consoleOutput = document.querySelector('.console-output');
        const userMessage = document.createElement('div');
        userMessage.className = 'console-line';
        userMessage.textContent = `USER: ${messageInput.value}`;
        consoleOutput.appendChild(userMessage);
        
        const systemResponse = document.createElement('div');
        systemResponse.className = 'console-line';
        systemResponse.textContent = "SYSTEM: Transmission received. SATCORP will evaluate compatibility.";
        consoleOutput.appendChild(systemResponse);
        
        messageInput.value = '';
        
        // Scroll to bottom
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start boot sequence
    typeBootLine();
    
    // Set first methodology step as active
    document.querySelector('.timeline-step').classList.add('active');
    document.getElementById('step-observe').classList.remove('hidden');
});
