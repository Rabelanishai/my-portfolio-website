// Global Variables
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingTexts = ['Web Developer', 'HTML Expert', 'CSS Specialist', 'JavaScript Developer'];
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDelay = 2000;

// DOM Elements
const typingElement = document.getElementById('typing-text');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const navbar = document.getElementById('navbar');
const contactForm = document.getElementById('contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Start typing animation
    startTypingAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize project filtering
    initProjectFilters();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
});

// Typing Animation
function startTypingAnimation() {
    if (!typingElement) return;
    
    function typeText() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500);
                return;
            }
            
            setTimeout(typeText, deletingSpeed);
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, pauseDelay);
                return;
            }
            
            setTimeout(typeText, typingSpeed);
        }
    }
    
    typeText();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.highlight-card, .skill-item, .project-card, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill Progress Bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Project Filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenuOverlay) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.toggle('active');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            const isOpen = mobileMenuOverlay.classList.contains('active');
            icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    });
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }
    });
    
    // Close menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

// Form Validation
function initFormValidation() {
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    
    // Real-time validation
    nameInput?.addEventListener('blur', () => validateField(nameInput, 'name'));
    emailInput?.addEventListener('blur', () => validateField(emailInput, 'email'));
    subjectInput?.addEventListener('blur', () => validateField(subjectInput, 'subject'));
    messageInput?.addEventListener('blur', () => validateField(messageInput, 'message'));
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isValid = [
            validateField(nameInput, 'name'),
            validateField(emailInput, 'email'),
            validateField(subjectInput, 'subject'),
            validateField(messageInput, 'message')
        ].every(Boolean);
        
        if (!isValid) return;
        
        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        
        btnText.style.display = 'none';
        spinner.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Field Validation
function validateField(field, type) {
    if (!field) return false;
    
    const value = field.value.trim();
    const errorElement = document.getElementById(`${type}-error`);
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error state
    field.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    switch (type) {
        case 'name':
            if (!value) {
                errorMessage = 'Name is required.';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters.';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'Email is required.';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!value) {
                errorMessage = 'Subject is required.';
                isValid = false;
            } else if (value.length < 3) {
                errorMessage = 'Subject must be at least 3 characters.';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Message is required.';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
    
    return isValid;
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call
    updateActiveNavLink();
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Download CV Function
function downloadCV() {
    const cvContent = `RABELANI SHAI - WEB DEVELOPER

Contact Information:
Email: rabelanishai2@gmail.com
Phone: 0818203223
GitHub: https://github.com/rabelanishai
LinkedIn: https://linkedin.com/in/rabelanishai

Experience: 2 Years

Skills:
- HTML5 & Semantic Markup
- CSS3 & Advanced Styling
- JavaScript & DOM Manipulation
- Responsive Web Design
- Version Control (Git)
- Web Accessibility (a11y)
- SEO Best Practices
- Cross-browser Compatibility

Projects:
1. Student Management System
   - Comprehensive web application for managing student records
   - Technologies: HTML5, CSS3, JavaScript
   - Features: Student registration, grade tracking, interactive dashboard

2. Coffee Shop Website
   - Elegant responsive website for local coffee shop
   - Technologies: HTML5, CSS3, JavaScript
   - Features: Interactive menu, image gallery, contact form

3. Banking System Application
   - Secure banking interface simulation
   - Technologies: HTML5, CSS3, JavaScript
   - Features: Account management, transaction history, fund transfers

Education:
Web Development Program Graduate

Professional Summary:
Passionate web developer with 2 years of hands-on experience in creating 
engaging and functional web applications. Specialized in HTML5, CSS3, and 
JavaScript with a strong focus on responsive design and user accessibility.
Successfully completed 5 projects ranging from management systems to 
e-commerce platforms.
`;
    
    try {
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Rabelani_Shai_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('CV downloaded successfully!', 'success');
    } catch (error) {
        showNotification('Failed to download CV. Please try again.', 'error');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Performance Optimization - Debounced scroll handler
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
}, 100));

// Lazy load images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/hero-image.jpg',
        'images/profile-image.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when page loads
window.addEventListener('load', preloadImages);

// Accessibility improvements
function initAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6b7280';
            this.style.fontSize = '0.875rem';
            this.alt = 'Image not available';
        });
    });
});

// Console welcome message (for developers)
console.log(`
🚀 Rabelani Shai - Portfolio Website
Built with: HTML5, CSS3, JavaScript
Author: Rabelani Shai
Email: rabelanishai2@gmail.com

Thanks for checking out the code! 
Feel free to reach out if you have any questions.
`);
