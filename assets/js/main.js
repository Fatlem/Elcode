// ===========================
// Navbar Toggle (Mobile)
// ===========================
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navbarToggle.querySelectorAll('span');
        spans[0].style.transform = navbarMenu.classList.contains('active') 
            ? 'rotate(45deg) translate(5px, 5px)' 
            : '';
        spans[1].style.opacity = navbarMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navbarMenu.classList.contains('active') 
            ? 'rotate(-45deg) translate(7px, -6px)' 
            : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarMenu.classList.remove('active');
            const spans = navbarToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Optional: Add animation
        html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// ===========================
// Service Filter
// ===========================
const filterCategory = document.getElementById('filterCategory');
const filterLanguage = document.getElementById('filterLanguage');
const filterDeadline = document.getElementById('filterDeadline');
const servicesGrid = document.getElementById('servicesGrid');
const serviceCount = document.getElementById('serviceCount');

function filterServices() {
    if (!servicesGrid) return;
    
    const services = servicesGrid.querySelectorAll('.service-card');
    const categoryValue = filterCategory?.value || '';
    const languageValue = filterLanguage?.value || '';
    
    let visibleCount = 0;
    
    services.forEach(service => {
        const serviceCategory = service.getAttribute('data-category') || '';
        const serviceLanguage = service.getAttribute('data-language') || '';
        
        const categoryMatch = !categoryValue || serviceCategory === categoryValue;
        const languageMatch = !languageValue || serviceLanguage === languageValue;
        
        if (categoryMatch && languageMatch) {
            service.style.display = 'block';
            visibleCount++;
            
            // Add fade-in animation
            service.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            service.style.display = 'none';
        }
    });
    
    if (serviceCount) {
        serviceCount.textContent = visibleCount;
    }
}

// Add event listeners to filters
if (filterCategory) {
    filterCategory.addEventListener('change', filterServices);
}

if (filterLanguage) {
    filterLanguage.addEventListener('change', filterServices);
}

if (filterDeadline) {
    filterDeadline.addEventListener('change', filterServices);
}

// Filter button
const filterBtn = document.querySelector('.filter-bar__btn');
if (filterBtn) {
    filterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterServices();
    });
}

// ===========================
// FAQ Accordion
// ===========================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// ===========================
// Contact Form Validation
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const projectType = document.getElementById('projectType').value;
        const deadline = document.getElementById('deadline').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!firstName || !lastName || !email || !phone || !projectType || !deadline || !message) {
            alert('Harap isi semua field yang diperlukan!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }
        
        // Show success message
        alert(`Terima kasih ${firstName}! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.`);
        
        // Reset form
        contactForm.reset();
        
        // In production, you would send this to a server
        console.log({
            firstName,
            lastName,
            email,
            phone,
            projectType,
            deadline,
            message
        });
    });
}

// ===========================
// Smooth Scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Scroll to Top Button (Optional)
// ===========================
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 15l7-7 7 7"/>
        </svg>
    `;
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        transition: var(--transition-base);
        z-index: 999;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-4px)';
        scrollBtn.style.boxShadow = 'var(--shadow-xl)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = 'var(--shadow-lg)';
    });
};

// Initialize scroll to top button
createScrollToTop();

// ===========================
// Animate on Scroll (Simple)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const animateElements = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .values__item, .stats__item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===========================
// Add fade-in animation keyframes
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Loading State for Images
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.3s ease-in';
                img.style.opacity = '1';
            }, 50);
        });
        
        // Handle error
        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            img.alt = 'Image failed to load';
        });
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log(
    '%cCodeAssist - Joki Tugas IT',
    'color: #2eca6a; font-size: 24px; font-weight: bold;'
);
console.log(
    '%cBuilt with ❤️ for students',
    'color: #6b7280; font-size: 14px;'
);

// ===========================
// Performance: Lazy Loading
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}