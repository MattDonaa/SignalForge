// SignalForge - Main JavaScript
// Modern, interactive features for psychology practice management website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeIntersectionObserver();
    initializeSocialCarousel();
    initializeFormInteractions();
    initializeCounterAnimations();
    initializeParallaxEffects();
    
    console.log('SignalForge website initialized successfully');
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            // Add background blur when scrolled
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// ===== SMOOTH SCROLLING =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle all anchor links for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.use-case-card, .value-item, .stat, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
                
                // Add stagger effect for cards
                if (entry.target.classList.contains('use-case-card')) {
                    const cards = document.querySelectorAll('.use-case-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.opacity = '1';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stat, .use-case-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== SOCIAL MEDIA CAROUSEL =====
function initializeSocialCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    
    if (carouselTrack) {
        // Pause animation on hover
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Add click handlers for social links
        const socialItems = document.querySelectorAll('.social-item a');
        socialItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Here you would typically open the social media link
                console.log('Social media link clicked:', this.textContent.trim());
            });
        });
    }
}

// ===== FORM INTERACTIONS =====
function initializeFormInteractions() {
    // Add enhanced button interactions
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', function() {
            // Could add subtle hover sound here
        });
    });
}

// ===== COUNTER ANIMATIONS =====
function animateCounter(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    const targetText = numberElement.textContent;
    const target = parseInt(targetText.replace(/\D/g, '')) || 0;
    const suffix = targetText.replace(/[\d]/g, '');
    
    if (target === 0) return;
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        numberElement.textContent = Math.floor(current) + suffix;
    }, 16);
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    
    if (window.innerWidth > 768) { // Only on desktop
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (heroSection) {
                const heroNodes = heroSection.querySelectorAll('.node');
                heroNodes.forEach((node, index) => {
                    const speed = (index + 1) * 0.1;
                    node.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }
}

// ===== BOOK A CALL FUNCTIONALITY =====
function bookCall() {
    // Enhanced booking modal/redirect
    const booking = {
        source: 'signalforge_website',
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        userAgent: navigator.userAgent
    };
    
    // Add visual feedback
    const button = event.target.closest('button');
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    // Track event (you would send this to your analytics)
    console.log('Book a call clicked:', booking);
    
    // Show booking confirmation or redirect
    showBookingModal();
}

function showBookingModal() {
    // Create and show booking modal
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideInUp 0.4s ease-out;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #4CAF7D, #5B9BD5);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                ">
                    <i class="fas fa-calendar-check" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="color: #2C3E50; margin-bottom: 16px; font-family: 'Poppins', sans-serif;">Ready to Transform Your Practice?</h3>
                <p style="color: #5D6D7E; margin-bottom: 32px; line-height: 1.6;">
                    You'll be redirected to our n8n booking workflow where you can schedule your free consultation 
                    with our AI specialists. We'll show you exactly how to increase leads and reduce no-shows.
                </p>
                <div style="display: flex; gap: 16px; justify-content: center;">
                    <button onclick="proceedToBooking()" style="
                        background: linear-gradient(135deg, #4CAF7D, #5B9BD5);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <i class="fas fa-arrow-right" style="margin-right: 8px;"></i>
                        Continue to Booking
                    </button>
                    <button onclick="closeBookingModal()" style="
                        background: transparent;
                        color: #5D6D7E;
                        border: 2px solid #E5E5E5;
                        padding: 12px 24px;
                        border-radius: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    " onmouseover="this.style.borderColor='#4CAF7D'; this.style.color='#4CAF7D';" onmouseout="this.style.borderColor='#E5E5E5'; this.style.color='#5D6D7E';">
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 10 seconds if no action
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeBookingModal();
        }
    }, 10000);
}

function proceedToBooking() {
    // Track conversion
    console.log('Proceeding to n8n booking workflow');
    
    // Close modal
    closeBookingModal();
    
    // Here you would redirect to your n8n booking workflow
    // For now, we'll show a placeholder message
    alert('🚀 Redirecting to booking system...\n\nIn a real implementation, this would redirect to your n8n workflow for appointment scheduling.');
    
    // Example redirect (replace with your actual n8n webhook URL):
    // window.open('https://your-n8n-instance.com/webhook/booking', '_blank');
}

function closeBookingModal() {
    const modal = document.querySelector('[style*="position: fixed"]');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll performance
window.addEventListener('scroll', throttle(() => {
    // Scroll-based interactions go here
}, 16)); // ~60fps

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        closeBookingModal();
        
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Enter key support for buttons
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused && focused.classList.contains('hamburger')) {
            focused.click();
        }
    }
});

// Focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.matches('button, a, input, textarea, select')) {
        e.target.style.outline = '2px solid #4CAF7D';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('button, a, input, textarea, select')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// ===== PERFORMANCE MONITORING =====

// Monitor page load performance
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`SignalForge page loaded in ${loadTime}ms`);
        
        // Track performance metrics (you would send this to analytics)
        const metrics = {
            loadTime: loadTime,
            domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            timeToFirstByte: performance.timing.responseStart - performance.timing.navigationStart
        };
        
        console.log('Performance metrics:', metrics);
    }
});

// ===== ERROR HANDLING =====

window.addEventListener('error', function(e) {
    console.error('SignalForge JavaScript error:', e.error);
    // You would typically send this to your error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('SignalForge unhandled promise rejection:', e.reason);
    // You would typically send this to your error tracking service
});

// ===== EXPORT FUNCTIONS (if using modules) =====

// Make functions available globally
window.bookCall = bookCall;
window.scrollToSection = scrollToSection;
window.proceedToBooking = proceedToBooking;
window.closeBookingModal = closeBookingModal;