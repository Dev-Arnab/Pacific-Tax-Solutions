// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    console.log('Mobile menu toggle and nav menu found');
    const toggleMenu = (e) => {
        e.preventDefault(); // Prevent default for both click and touch
        console.log('Hamburger menu triggered (event type: ' + e.type + ')');
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    };
    // Handle both click and touch events
    ['click', 'touchstart'].forEach(eventType => {
        mobileMenuToggle.addEventListener(eventType, toggleMenu, { passive: false });
    });
} else {
    console.error('Mobile menu toggle or nav menu not found');
}

// Toggle services dropdown on mobile
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownToggle && dropdownMenu) {
    ['click', 'touchstart'].forEach(eventType => {
        dropdownToggle.addEventListener(eventType, (e) => {
            e.preventDefault();
            dropdownMenu.classList.toggle('active');
        }, { passive: false });
    });
}

// Add touch support for closing menu on link tap
// navLinks.forEach(link => {
//     link.addEventListener('touchstart', (e) => {
//         e.preventDefault();
//         navMenu.classList.remove('active');
//         mobileMenuToggle.classList.remove('active');
//         // Trigger the link's default behavior (e.g., navigate to href)
//         if (link.href) {
//             window.location.href = link.href;
//         }
//     }, { passive: false });
// });

// Close mobile menu when clicking or tapping on a link
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
navLinks.forEach(link => {
    ['click', 'touchstart'].forEach(eventType => {
        link.addEventListener(eventType, (e) => {
            e.preventDefault();
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            // Navigate to the link's href after closing the menu
            if (link.href && eventType === 'click') {
                window.location.href = link.href;
            }
        }, { passive: false });
    });
});

// Mobile Menu Toggle

// const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
// const navMenu = document.getElementById('nav-menu');

// mobileMenuToggle.addEventListener('click', () => {
//     navMenu.classList.toggle('active');
//     mobileMenuToggle.classList.toggle('active');
// });

// // Close mobile menu when clicking on a link
// const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         navMenu.classList.remove('active');
//         mobileMenuToggle.classList.remove('active');
//     });
// });

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, select, textarea');

// Add floating label effect
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      showNotification('Failed to send. Please try again.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
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
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(420px);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin: 0;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(420px)';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Scroll animations
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

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .service-card, .section-header');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Add loading animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add hover effects for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click to call functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent === '778-926-8315') {
        window.location.href = 'tel:778-926-8315';
    }
});

// Add click to email functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'PacificTax@gmail.com') {
        window.location.href = 'mailto:PacificTax@gmail.com';
    }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}


const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
            // Execute original action after animation
            if (this.getAttribute('href')) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 600);
    });
});

// Add CSS for bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);