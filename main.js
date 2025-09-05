// Initialize AOS Animation Library
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
          fullName: document.getElementById('fullName').value,
          phone: document.getElementById('phone').value,
          city: document.getElementById('city').value,
          age: document.getElementById('age').value,
          notes: document.getElementById('notes').value
      };
      
      // Validate phone number (Israeli format)
      const phoneRegex = /^0\d{1,2}-?\d{7,8}$/;
      if (!phoneRegex.test(formData.phone)) {
          alert('אנא הכנס מספר טלפון תקין');
          return;
      }
      
      // Show success message
      showSuccessMessage();
      
      // Reset form
      contactForm.reset();
  });
}

// WhatsApp Function
function sendWhatsApp() {
    // Get form data
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const notes = document.getElementById('notes').value;
    
    // Validate required fields
    if (!fullName || !phone || !city || !age) {
        alert('אנא מלא את כל השדות הנדרשים');
        return;
    }
    
    // Format message for WhatsApp
    const message = `*פנייה חדשה מהאתר*%0A%0A` +
        `*שם מלא:* ${fullName}%0A` +
        `*טלפון:* ${phone}%0A` +
        `*עיר/אזור:* ${city}%0A` +
        `*גיל:* ${age}%0A` +
        `${notes ? `*הערות:* ${notes}` : ''}`;
    
    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/972528449147?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Success Message Function
function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>הטופס נשלח בהצלחה! נחזור אליך בהקדם.</p>
    `;
    
    // Style the success message
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        animation: successPop 0.5s ease;
    `;
    
    // Add to body
    document.body.appendChild(successDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'successFade 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 3000);
}

// Add animations for success message
const style = document.createElement('style');
style.innerHTML = `
    @keyframes successPop {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes successFade {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .success-message i {
        font-size: 50px;
        margin-bottom: 15px;
    }
    
    .success-message p {
        font-size: 18px;
        margin: 0;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// No navbar - removed completely

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 0.5s ease';
        });
        
        // If image is already cached and loaded
        if (img.complete) {
            img.style.animation = 'fadeIn 0.5s ease';
        }
    });
});

// Add fade in animation
const fadeStyle = document.createElement('style');
fadeStyle.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(fadeStyle);

// Number Counter Animation for Pricing
function animateNumbers() {
    const numbers = document.querySelectorAll('.amount');
    
    numbers.forEach(number => {
        const target = parseInt(number.innerText);
        const duration = 1000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.innerText = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.innerText = target;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(number);
    });
}

// Initialize number animation
animateNumbers();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Show WhatsApp button only after scrolling past middle of page
window.addEventListener('scroll', () => {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (!whatsappFloat) return;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const middleOfPage = (documentHeight - windowHeight) / 2;
    
    if (scrollPosition > middleOfPage) {
        whatsappFloat.style.display = 'flex';
    } else {
        whatsappFloat.style.display = 'none';
    }
});

// Auto-hide WhatsApp float button when contact form is in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const contactSection = document.getElementById('contact-form');
const whatsappFloat = document.querySelector('.whatsapp-float');

if (contactSection && whatsappFloat) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                whatsappFloat.style.transform = 'scale(0)';
            } else {
                whatsappFloat.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    contactObserver.observe(contactSection);
}

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Testimonial Carousel (auto-rotate)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (window.innerWidth <= 768 && testimonials.length > 0) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    } else {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
        });
    }
}

// Rotate testimonials every 5 seconds on mobile
setInterval(rotateTestimonials, 5000);

// Initialize testimonials display
rotateTestimonials();

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console Easter Egg
console.log('%c🚗 אבי אלחרר - מורה נהיגה מקצועי 🚗', 
    'background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #000; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c📞 052-8449147 | 💼 ניסיון של טסטר לשעבר', 
    'color: #ffd700; font-size: 14px; padding: 5px;');
