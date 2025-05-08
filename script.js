// Initialize AOS
AOS.init();

// Skills Filter
document.querySelectorAll('.skills-filter .btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.skills-filter .btn.active').classList.remove('active');
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.skill-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (name && email && message) {
        alert('Form submitted successfully!');
        this.submit(); // Submit to Formspree
    } else {
        alert('Please fill out all fields.');
    }
});
