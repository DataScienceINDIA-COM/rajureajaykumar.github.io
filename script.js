// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
    easing: 'ease-out-quart'
});

// Typed.js for Hero Section
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: [
            'Marketing Science Professional',
            'Data Operations Specialist',
            'Datorama Expert',
            'Strategic Insights Builder'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true
    });
}

// Smooth Scroll for Navigation
document.querySelectorAll('.nav-link, .hero .btn, .contact-info a[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Highlight
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Skills Filter
document.querySelectorAll('.skills-filter .btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.skills-filter .btn.active').classList.remove('active');
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.skill-item').forEach(item => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
        showAlert('Please fill out all fields.', 'danger');
        return;
    }

    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'danger');
        return;
    }

    showAlert('Message sent successfully!', 'success');
    this.submit(); // Submit to Formspree
});

// Alert Function
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('#contact .container').prepend(alertDiv);
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Animated Counters
document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 50;
    const duration = 2500;
    const stepTime = Math.abs(Math.floor(duration / target));

    const updateCounter = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCounter, stepTime);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
});

// Scroll-to-Top Button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Re-render Mermaid on Modal Open
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(() => {
            mermaid.init(undefined, document.querySelectorAll('.mermaid'));
        }, 100);
    });
});
