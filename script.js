// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Smooth Scroll for Navigation
document.querySelectorAll('.nav-link, .hero .btn').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
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
            item.style.transition = 'opacity 0.3s ease';
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
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
        alert('Please fill out all fields.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Form submitted successfully!');
    this.submit(); // Submit to Formspree
});

// Animated Counters
document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 50;
    const duration = 2000; // 2 seconds
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

    // Trigger counter when in view
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
    scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
