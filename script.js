// Mobile Menu Toggle

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

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
const contactForm = document.getElementById('contact-form');
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

// Form validation and submission
// contactForm.addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     // Get form data
//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);
    
//     // Basic validation
//     if (!data.name || !data.email || !data.service || !data.message) {
//         showNotification('Please fill in all required fields.', 'error');
//         return;
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(data.email)) {
//         showNotification('Please enter a valid email address.', 'error');
//         return;
//     }
    
//     // Simulate form submission
//     const submitButton = this.querySelector('button[type="submit"]');
//     const originalText = submitButton.textContent;
    
//     submitButton.textContent = 'Sending...';
//     submitButton.disabled = true;
    
//     // Simulate API call
//     setTimeout(() => {
//         showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
//         contactForm.reset();
//         submitButton.textContent = originalText;
//         submitButton.disabled = false;
        
//         // Remove focused class from all form groups
//         document.querySelectorAll('.form-group').forEach(group => {
//             group.classList.remove('focused');
//         });
//     }, 2000);
// });

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

// Initialize typing effect on page load (uncomment to enable)
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// Add bounce effect to CTA buttons
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





//Working code below
// Contact Form Handling with Formspree
// const contactForm = document.getElementById('contact-form');
// if (contactForm) {
//     const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
//     // Add floating label effect
//     formInputs.forEach(input => {
//         input.addEventListener('focus', function() {
//             this.parentElement.classList.add('focused');
//         });
        
//         input.addEventListener('blur', function() {
//             if (this.value === '') {
//                 this.parentElement.classList.remove('focused');
//             }
//         });
        
//         // Check if input has value on page load
//         if (input.value !== '') {
//             input.parentElement.classList.add('focused');
//         }
//     });

//     // Form validation and submission
//     contactForm.addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         // Get form elements
//         const submitButton = this.querySelector('button[type="submit"]');
//         const originalText = submitButton.textContent;
        
//         // Validate form
//         const name = this.elements['name'].value.trim();
//         const email = this.elements['email'].value.trim();
//         const service = this.elements['service'].value;
//         const message = this.elements['message'].value.trim();
        
//         if (!name || !email || !service || !message) {
//             showNotification('Please fill in all required fields.', 'error');
//             return;
//         }
        
//         // Email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             showNotification('Please enter a valid email address.', 'error');
//             return;
//         }
        
//         // Disable button during submission
//         submitButton.textContent = 'Sending...';
//         submitButton.disabled = true;
        
//         try {
//             // Send to Formspree
//             const response = await fetch(this.action, {
//                 method: 'POST',
//                 body: new FormData(this),
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
            
//             if (response.ok) {
//                 showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
//                 this.reset();
                
//                 // Remove focused class from all form groups
//                 document.querySelectorAll('.form-group').forEach(group => {
//                     group.classList.remove('focused');
//                 });
//             } else {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Form submission failed');
//             }
//         } catch (error) {
//             console.error('Form submission error:', error);
//             showNotification('There was a problem sending your message. Please try again later.', 'error');
//         } finally {
//             submitButton.textContent = originalText;
//             submitButton.disabled = false;
//         }
//     });
// }