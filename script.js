Initialize AOS
AOS.init();

Skills Filter
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

Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
 e.preventDefault();
 const name = document.querySelector('input[name="name"]').value;
 const email = document.querySelector('input[name="email"]').value;
 const message = document.querySelector('textarea[name="message"]').value;

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const feedbackElement = document.createElement('div');
 feedbackElement.classList.add('mt-3', 'text-center');

 Remove any existing feedback messages
 const existingFeedback = this.querySelector('.mt-3.text-center');
 if (existingFeedback) {
 existingFeedback.remove();
 }

 if (!name || !email || !message) {
 feedbackElement.classList.add('text-danger');
 feedbackElement.innerText = 'Please fill out all fields.';
 } else if (!emailRegex.test(email)) {
 feedbackElement.classList.add('text-danger');
 feedbackElement.innerText = 'Please enter a valid email address.';
 } else {
 Use fetch to submit the form data
 fetch(this.action, {
 method: 'POST',
 body: new FormData(this),
 headers: {
 'Accept': 'application/json'
 }
 }).then(response => {
 if (response.ok) {
 feedbackElement.classList.add('text-success');
 feedbackElement.innerText = 'Thank you! Your message has been sent.';
 this.reset(); // Clear form fields
 } else {
 response.json().then(data => {
 if (Object.hasOwnProperty.call(data, 'errors')) {
 feedbackElement.classList.add('text-danger');
 feedbackElement.innerText = data["errors"].map(error => error["message"]).join(", ");
 } else {
 feedbackElement.classList.add('text-danger');
 feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
 }
 })
 }
 }).catch(error => {
 feedbackElement.classList.add('text-danger');
 feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
 });
 }

 this.appendChild(feedbackElement);
});

Animated Counters
document.querySelectorAll('.counter').forEach(counter => {
 const target = +counter.getAttribute('data-target');
 let count = 0;
 const increment = target / 100;
 const updateCounter = () => {
 if (count < target) {
 count += increment;
 counter.innerText = Math.ceil(count);
 setTimeout(updateCounter, 20);
 } else {
 counter.innerText = target;
 }
 };
 updateCounter();
});
