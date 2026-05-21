// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100, delay = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.delay = delay;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.delay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Particle System for Project Cards
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < 20; i++) {
            this.createParticle();
        }
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = Math.random();
        
        const x = Math.random() * this.container.offsetWidth;
        const y = Math.random() * this.container.offsetHeight;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach(particle => {
            const x = parseFloat(particle.style.left);
            const y = parseFloat(particle.style.top);
            
            particle.style.left = (x + particle.vx) + 'px';
            particle.style.top = (y + particle.vy) + 'px';
            
            if (x < 0 || x > this.container.offsetWidth) particle.vx *= -1;
            if (y < 0 || y > this.container.offsetHeight) particle.vy *= -1;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1 }
        );
        this.init();
    }
    
    init() {
        const elements = document.querySelectorAll('.project-card, .education-card, .timeline-item');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Navigation Active State
class Navigation {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.updateActiveLink();
    }
    
    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.querySelector('.cyber-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Add input focus effects
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => this.addFocusEffect(input));
                input.addEventListener('blur', () => this.removeFocusEffect(input));
            });
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.querySelector('span').textContent = 'TRANSMITTING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'TRANSMISSION COMPLETE';
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                this.form.reset();
            }, 2000);
        }, 2000);
    }
    
    addFocusEffect(input) {
        input.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
    }
    
    removeFocusEffect(input) {
        input.style.boxShadow = 'none';
    }
}

// Glitch Effect for Hero Text
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.init();
    }
    
    init() {
        setInterval(() => this.glitch(), 3000);
    }
    
    glitch() {
        let iterations = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iterations >= this.originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1/3;
        }, 30);
    }
}

// Cyber Grid Background
class CyberGrid {
    constructor() {
        this.createGrid();
    }
    
    createGrid() {
        const grid = document.createElement('div');
        grid.className = 'cyber-grid';
        grid.innerHTML = `
            <style>
                .cyber-grid {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    z-index: -2;
                    animation: grid-move 20s linear infinite;
                }
                
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
            </style>
        `;
        document.body.appendChild(grid);
    }
}

// Audio Visualizer Effect (simulated)
class AudioVisualizer {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100px';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = 100;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const bars = 50;
        const barWidth = this.canvas.width / bars;
        
        for (let i = 0; i < bars; i++) {
            const barHeight = Math.random() * this.canvas.height;
            const gradient = this.ctx.createLinearGradient(0, this.canvas.height, 0, this.canvas.height - barHeight);
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(1, '#ff00ff');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(i * barWidth, this.canvas.height - barHeight, barWidth - 2, barHeight);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const matrixRain = new MatrixRain();
    
    // Initialize Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'Full-Stack Developer',
            'UI/UX Designer', 
            'Digital Innovator',
            'Code Architect',
            'Tech Visionary'
        ]);
    }
    
    // Initialize Smooth Scrolling
    new SmoothScroll();
    
    // Initialize Scroll Animations
    new ScrollAnimations();
    
    // Initialize Navigation
    new Navigation();
    
    // Initialize Form Handler
    new FormHandler();
    
    // Initialize Glitch Effect
    const glitchElement = document.querySelector('.glitch-text');
    if (glitchElement) {
        new GlitchEffect(glitchElement);
    }
    
    // Initialize Cyber Grid
    new CyberGrid();
    
    // Initialize Audio Visualizer
    new AudioVisualizer();
    
    // Initialize Particle Systems for Project Cards
    document.querySelectorAll('.project-particles').forEach(container => {
        new ParticleSystem(container);
    });
    
    // Cursor Trail Effect
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Remove old trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
        
        // Create trail effect
        const trail = document.querySelector('.mouse-trail') || document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            width: 20px;
            height: 20px;
            border: 2px solid #00ffff;
            border-radius: 50%;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: trail-fade 0.5s ease-out forwards;
        `;
        
        if (!document.querySelector('.mouse-trail')) {
            document.body.appendChild(trail);
        }
    });
    
    // Add trail fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trail-fade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(style);
    
    // Window resize handler
    window.addEventListener('resize', () => {
        matrixRain.resize();
    });
    
    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Orbitron', monospace;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid #00ffff;
                    border-top: 3px solid transparent;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: spin 1s linear infinite;
                "></div>
                <div style="color: #00ffff; font-size: 1.2rem;">INITIALIZING SYSTEM...</div>
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after initialization
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
});
