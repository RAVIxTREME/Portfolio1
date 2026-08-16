/**
 * Ravi Bhosale Portfolio - Interactive Scripts
 * Terminal-inspired interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize modules
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initMagneticButtons();
    initParticles();
    initTerminalTyping();
    initSmoothScroll();
    
    // Reveal animations
    if (!prefersReducedMotion) {
        initRevealAnimations();
    }
});

/**
 * Custom Cursor
 * Subtle dot with outer ring, magnetic effect on interactive elements
 */
function initCustomCursor() {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        
        // Ring follows with delay
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorRing.style.borderColor = 'rgba(0, 212, 255, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorRing.style.borderColor = 'rgba(0, 212, 255, 0.5)';
        });
    });
}

/**
 * Navigation
 * Sticky nav with scroll effects and mobile menu
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky nav on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update active section
        updateActiveSection();
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            }
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            });
        });
    }
}

/**
 * Update Active Section
 * Highlights current section in navigation
 */
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll Animations
 * Parallax and scroll-triggered effects
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-indicator, .hero-terminal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    scrollElements.forEach(el => observer.observe(el));
}

/**
 * Magnetic Buttons
 * Subtle magnetic pull effect on hover
 */
function initMagneticButtons() {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/**
 * Particles
 * Floating particles in hero background
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 3 + 1;
    const startX = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = 15 + Math.random() * 10;
    
    particle.style.cssText = `
        width: ${size}px;\n        height: ${size}px;\n        left: ${startX}%;\n        bottom: -10px;\n        animation-delay: ${delay}s;\n        animation-duration: ${duration}s;\n    `;
    
    container.appendChild(particle);
}

/**
 * Terminal Typing Effect
 * Simulates typing in the hero terminal
 */
function initTerminalTyping() {
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach((el, index) => {
        const text = el.getAttribute('data-text');
        if (!text) return;
        
        el.textContent = '';
        el.style.width = '0';
        
        // Stagger the typing animations
        setTimeout(() => {
            typeText(el, text);
        }, index * 800);
    });
}

function typeText(element, text, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        element.style.width = 'auto';
        
        // Random typing speed for realism
        const speed = 50 + Math.random() * 50;
        
        setTimeout(() => {
            typeText(element, text, index + 1);
        }, speed);
    }
}

/**
 * Smooth Scroll
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Reveal Animations
 * Elements fade/slide in when scrolling into view
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .skill-category, .project-card, .timeline-item, .featured-content'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Counter Animation
 * Animates numbers when they come into view
 */
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Pause animations when tab is hidden
 * Performance optimization
 */
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        particles.forEach(p => p.style.animationPlayState = 'paused');
    } else {
        particles.forEach(p => p.style.animationPlayState = 'running');
    }
});

/**
 * Keyboard Navigation
 * Accessibility: Allow keyboard users to navigate
 */
document.addEventListener('keydown', (e) => {
    // Escape closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.transform = '';
        }
    }
});

/**
 * Console Easter Egg
 * Fun message for developers who check the console
 */
console.log('%c$ ravix.system.init()', 'color: #00d4ff; font-family: monospace; font-size: 14px;');
console.log('%c> Welcome to my portfolio!', 'color: #a1a1aa; font-family: monospace;');
console.log('%c> Building Ravix Language from scratch...', 'color: #4ade80; font-family: monospace;');
