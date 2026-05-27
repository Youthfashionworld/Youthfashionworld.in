/* ======================== DOM ELEMENT SELECTION ======================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const addCartBtns = document.querySelectorAll('.add-cart-btn');
const viewBtns = document.querySelectorAll('.view-btn');

/* ======================== HAMBURGER MENU TOGGLE ======================== */
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    hamburger.style.transition = 'all 0.3s ease';
    if (navMenu.classList.contains('active')) {
        hamburger.style.transform = 'rotate(90deg)';
    } else {
        hamburger.style.transform = 'rotate(0deg)';
    }
});

// Close menu when navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    }
});

/* ======================== SMOOTH SCROLL NAVIGATION ======================== */
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

/* ======================== FORM HANDLING ======================== */
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showToast('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

/* ======================== TOAST NOTIFICATION ======================== */
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.background = type === 'success' 
        ? 'linear-gradient(135deg, #0066cc, #1a80ff)' 
        : 'linear-gradient(135deg, #e74c3c, #c0392b)';
    
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ======================== ADD TO CART BUTTON ======================== */
addCartBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();

        // Button animation
        const originalText = this.textContent;
        const originalBg = this.style.background;

        this.textContent = '✓ Added to Cart!';
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);

        // Show toast
        showToast('Item added to cart!', 'success');
    });
});

/* ======================== QUICK VIEW BUTTON ======================== */
viewBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get product info from the card
        const card = this.closest('.gallery-item');
        const productName = card.querySelector('.product-info h3').textContent;
        const productPrice = card.querySelector('.price').textContent;

        showToast(`${productName} - ${productPrice}`, 'success');
    });
});

/* ======================== SCROLL ANIMATIONS ======================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

/* ======================== ACTIVE NAVIGATION LINK ======================== */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = '#0066cc';
        }
    });

    // Hide hamburger menu on scroll
    if (window.scrollY > 100 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    }
});

/* ======================== HEADER SCROLL EFFECT ======================== */
let lastScrollTop = 0;
const header = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

header.style.transition = 'transform 0.3s ease';

/* ======================== PARALLAX EFFECT ======================== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (scrolled < hero.clientHeight) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

/* ======================== UTILITY FUNCTIONS ======================== */

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Counter animation
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Fade element in
function fadeInElement(element, duration = 500) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

/* ======================== IMAGE LAZY LOADING ======================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ======================== PAGE LOAD ANIMATION ======================== */
window.addEventListener('load', () => {
    // Fade in main content
    document.body.style.animation = 'fadeIn 0.5s ease';
});

/* ======================== KEYBOARD NAVIGATION ======================== */
document.addEventListener('keydown', (e) => {
    // Close menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0deg)';
    }

    // Quick navigation with Alt key
    if (e.altKey && e.key === 'g') {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
});

/* ======================== INITIALIZATION ======================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Youth Fashion World - Premium Handmade Jewelry');
    console.log('🚀 Website loaded successfully');
    console.log('📞 Phone: +91 8115945623');
    console.log('📧 Email: contactyouthfashionworld@gmail.com');
});
