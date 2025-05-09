/*
  This script registers a service worker for the website.
  Service workers enable features like offline support and caching.
*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
let aosLoaded = false;

// Basic WebSocket implementation (simulated)
// This is a placeholder for future real-time features.
let websocket;

// Function to connect to the WebSocket server
function connectWebSocket() {
    // Replace 'ws://your-websocket-server-url' with your actual WebSocket server URL
    console.log('Attempting to connect to WebSocket...');
    websocket = new WebSocket('ws://localhost:8080');

    // Event handler for when the WebSocket connection is opened
    websocket.onopen = () => {
        console.log('WebSocket connection established');
        // Send a message to the server (simulated)
 console.log('Sending test message via WebSocket');
        websocket.send('Hello from the client!');
    };

    // Event handler for receiving messages from the server
    websocket.onmessage = (event) => {
        console.log('Message from server:', event.data);
    };

    // Event handler for WebSocket errors
    websocket.onerror = (error) => {
 console.error('WebSocket error:', error);
    };

    // Event handler for when the WebSocket connection is closed
    websocket.onclose = (event) => {
 console.log('WebSocket connection closed:', event.code, event.reason);
    };
}

connectWebSocket(); // Connect to the WebSocket server on page load

// Dark Mode Implementation with Local Storage
const darkModeToggle = document.getElementById('darkModeToggle');
const currentTheme = localStorage.getItem('theme');

// Contact Form Validation using Fetch API
// Event listener for contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const feedback = document.querySelector('input[name="feedback"]').value;

    // Log the form values for debugging purposes.
    console.log('Form submitted. Values:', { name, email, message, feedback });

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Create a div element to display feedback messages to the user.
    // Create a div to display feedback messages to the user
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('mt-3', 'text-center');

    // Remove any existing feedback messages from previous submissions.
    // Remove any existing feedback messages
    const existingFeedback = this.querySelector('.mt-3.text-center');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // Validate form fields
    if (!name || !email || !message) {
        console.log('Validation failed: Missing required fields.'); // Log validation failure
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please fill out all fields.';
    } else if (!emailRegex.test(email)) {
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please enter a valid email address.';
    } else {
        // Use the Fetch API to actually submit the form data to the specified action URL.

        // Use fetch to submit the form data (for actual form submission if needed)
        fetch(this.action, {
 console.log('Sending fetch request to:', this.action);
 }
        }).then(response => { // Handle the response from the fetch request
            if (response.ok) {
                // If the fetch request is successful (response status is OK),
                // display a success message and reset the form.
                console.log('Form submission successful.'); // Log successful submission
                feedbackElement.classList.add('text-success');
                feedbackElement.innerText = 'Thank you! Your message has been sent.';
                this.reset(); // Reset the form after successful submission
            } else {
                response.json().then(data => {
                    // Handle errors from the server
                    console.error('Form submission failed. Server response:', data); // Log server errors
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        feedbackElement.classList.add('text-danger');
                        feedbackElement.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        console.error('Form submission failed with unknown error format.'); // Log unknown error format
                        feedbackElement.classList.add('text-danger');
                        feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
                    }
                })
            }
        }).catch(error => {
            // Handle network or other errors
            // If there is a network error or other issues with the fetch request,
            // log the error and display an error message to the user.
            console.error('Error submitting form:', error);
            feedbackElement.classList.add('text-danger'); // Display a generic error message
            feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';

    // Append the feedback element to the form to display validation or submission status.
    this.appendChild(feedbackElement); // Append the feedback element to the form
});


// Navigation Bar Improvements

// Get the navigation bar element
const navbar = document.getElementById('navbar');
// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');
// Get all section elements that have an ID
const sections = document.querySelectorAll('section[id]');

// Add a scroll event listener to change the navbar background and active link
// This event listener is triggered every time the user scrolls
window.addEventListener('scroll', () => {
    // Add a background color to the navbar when the user scrolls down
    if (window.scrollY > 50) { // Adjust the scroll threshold as needed
        navbar.classList.add('scrolled'); // Add a class to change the background
    } else {
        navbar.classList.remove('scrolled'); // Remove the class when at the top
    }

    // Add a class to the active link based on the current section in view
    let currentSectionId = ''; // Initialize the current section ID
    // Iterate over each section to check if it's in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Get the distance from the top of the document to the section
        const sectionHeight = section.clientHeight; // Get the height of the section
        // Determine if the top of the section is within the viewport
        // We subtract navbar.clientHeight to account for the fixed navbar
        if (window.scrollY >= sectionTop - navbar.clientHeight && window.scrollY < sectionTop + sectionHeight - navbar.clientHeight) {
            currentSectionId = section.id; // Set the current section ID
        }
    });

    // Remove the 'active' class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add the 'active' class to the link that corresponds to the current section
    const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`); // Select the link with the matching href
    if (activeLink) {
        activeLink.classList.add('active'); // Add the 'active' class to the active link
    }
});

// Animated Counters
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target; // Get the counter element
            const target = +counter.getAttribute('data-target'); // Get the target number from the data-target attribute
            let count = 0; // Initialize the counter value
            const duration = 2000; // Animation duration in milliseconds
            const increment = target / (duration / 16); // Determine the increment step (assuming ~60fps)
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count); // Update the displayed counter value, rounding up
                    requestAnimationFrame(updateCounter); // Use requestAnimationFrame for smoother animation
                } else {
                    counter.innerText = target; // Ensure the final value is the target
                }
            };
            updateCounter(); // Start the counter animation
            observer.unobserve(counter); // Stop observing once the counter is animated
        }
    });
});

// Observe all elements with the class 'counter'
// This starts observing the counter elements when the script loads
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter); // Observe each counter element
});

// Intersection Observer for lazy loading AOS
// This observer checks when sections with data-aos attributes are visible
const observerAos = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !aosLoaded) {
            // If the section is visible and AOS hasn't been loaded yet
            lazyLoadAOS(); // Load the AOS library
            aosLoaded = true; // Set the flag to true to prevent multiple loads
            observer.disconnect(); // Disconnect the observer as it's no longer needed
        }
    });
});

// Function to dynamically load the AOS library
// This function creates a script element and appends it to the head
function lazyLoadAOS() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js'; // AOS library URL
    script.onload = () => {
        // Initialize AOS once the script is loaded
        AOS.init({
            duration: 1000, // Animation duration
            once: true, // Whether animation should happen only once - while scrolling down
        });
        // Refresh AOS to consider any dynamically added elements
        AOS.refresh();
    };
    document.head.appendChild(script); // Append the script to the head of the document
}

// Observe all section containers for lazy loading AOS
// This starts observing the sections that might contain AOS animations
document.querySelectorAll('.section-container').forEach(section => {
    observerAos.observe(section); // Observe each section container
});




// Back-to-Top Button visibility


// Function to smoothly scroll the window to the top of the page
// Mapping of button IDs to their corresponding modal template paths
const modalTemplates = {
    datoramaBtn: 'datorama_modal_template.html',
    dataikuMlBtn: 'dataiku_modal_template.html',
    tableauBtn: 'tableau_modal_template.html',
    alteryxDataikuBtn: 'alteryx_modal_template.html',
    predictiveModelsBtn: 'predictive_modal_template.html',
    dataPipelineBtn: 'pipeline_modal_template.html'
};

// Add event listeners to project buttons to create and display modals
document.querySelectorAll('.project-card button').forEach(button => {
    const buttonId = button.id;
    const templatePath = modalTemplates[buttonId];
    if (templatePath) {
        button.addEventListener('click', () => {
 console.log(`Project button clicked: ${buttonId}. Creating modal from: ${templatePath}`);
            // Remove any existing modal before creating a new one
            const existingModal = document.querySelector('.modal');
            if (existingModal) {
                existingModal.remove();
            }
            // createModal(`modal-${buttonId}`, templatePath); // Replaced by web component
        });
    }
});

// Apply the saved theme from local storage on page load
if (currentTheme) {
    document.body.classList.add(currentTheme);
}

// Add event listener to the dark mode toggle button
darkModeToggle.addEventListener('click', toggleDarkMode);

// Function to toggle dark mode and save the preference to local storage
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode'); // Toggle the 'dark-mode' class on the body
    let theme = 'light-mode';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
    }
    localStorage.setItem('theme', theme); // Save the current theme to local storage
}


// Add a scroll event listener to change the navbar background and active link
window.addEventListener('scroll', () => {
    // Add a background color to the navbar when the user scrolls down
    if (window.scrollY > 50) { // Adjust the scroll threshold as needed
        navbar.classList.add('scrolled'); // Add a class to change the background
    } else {
        navbar.classList.remove('scrolled'); // Remove the class when at the top
    }

    // Add a class to the active link based on the current section in view
    let currentSectionId = '';
    // Iterate over each section to check if it's in the viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Determine if the top of the section is within the viewport
        if (window.scrollY >= sectionTop - navbar.clientHeight && window.scrollY < sectionTop + sectionHeight - navbar.clientHeight) {
            currentSectionId = section.id;
        }
    });

    // Remove the 'active' class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add the 'active' class to the link that corresponds to the current section
    const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

