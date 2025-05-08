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

// Function to smoothly scroll the window to the top of the page
// This function is called when the back-to-top button is clicked.
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling animation
    });
}
// Contact Form Validation using Fetch API
// Event listener for contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const feedback = document.querySelector('input[name="feedback"]').value;

    // Log the form submission and the values captured from the form.
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

    // Validate the form fields. If any required field is empty or the email is invalid,
    // display an error message.
    // Validate form fields
    // Validate form fields
    if (!name || !email || !message) {
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please fill out all fields.';
    } else if (!emailRegex.test(email)) {
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please enter a valid email address.';
    } else {
        // If form validation passes, simulate an AI analysis of the feedback provided by the user.
        // Simulate AI analysis of the feedback
 console.log('Calling simulate AI analysis for feedback...');
        const aiSuggestion = callFunction('analyzeFeedback', feedback); // Call the simulated AI function using the simulator
        // Display the AI feedback suggestion to the user before attempting to send the form data.
        // Display the AI feedback suggestion
        feedbackElement.innerHTML = `${aiSuggestion}`; // Display the suggestion before fetch

        // Prepare the data from the form to be saved. This simulates a new description entry
        // that would typically be sent to a backend or database like Firestore.
        // Prepare data to be saved (simulating a new description entry)
        const newDescription = {
 name: name,
 email: email,
 message: message,
 feedback: feedback
        // Log the description data being prepared for saving.
        };
 console.log('Saving description data:', newDescription);
        saveData('descriptions', newDescription); // Save the description data using the simulator
        // Use the Fetch API to actually submit the form data to the specified action URL.

        // Use fetch to submit the form data (for actual form submission if needed)
        fetch(this.action, {
 console.log('Sending fetch request to:', this.action);
 }
        }).then(response => {
            if (response.ok) {
                // If the fetch request is successful (response status is OK),
                // display a success message and reset the form.
                feedbackElement.classList.add('text-success');
                feedbackElement.innerText = 'Thank you! Your message has been sent.';
                this.reset(); // Reset the form after successful submission
                // Append the AI suggestion to the success message.
                // Add AI suggestion after success message
                feedbackElement.innerHTML += `<br>${aiSuggestion}`; // Add AI suggestion after success message
            } else {
                response.json().then(data => {
                    // Handle errors from the server
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
            // Handle network or other errors
            // If there is a network error or other issues with the fetch request,
            // log the error and display an error message to the user.
            console.error('Error submitting form:', error);
            feedbackElement.classList.add('text-danger');
            feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
            feedbackElement.innerHTML += `<br>${aiSuggestion}`; // Add AI suggestion even on error
        });
        // Append the feedback element (containing either success or error message and AI suggestion)
        // to the form to display it to the user.
    }

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

// Back-to-Top Button Logic
const backToTopBtn = document.getElementById('backToTopBtn'); // Get the back-to-top button element
backToTopBtn.classList.add('hidden'); // Initially hide the button

// Add a scroll event listener to show/hide the back-to-top button
// This event listener is triggered every time the user scrolls
window.addEventListener('scroll', () => {
    // Show the button when scrolling down more than a certain amount
    const scrollThreshold = 400; // Adjust this value as needed to control when the button appears
    if (window.scrollY > scrollThreshold) {
        backToTopBtn.classList.remove('hidden'); // Show the button
    } else {
        backToTopBtn.classList.add('hidden'); // Hide the button
    }
});

// Add a click event listener to the back-to-top button for smooth scrolling
// This listens for clicks on the back-to-top button
backToTopBtn.addEventListener('click', scrollToTop);

// Function to simulate AI text analysis and provide feedback suggestions
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
function scrollToTop() {
 // This function is now part of the back-to-top-button.js web component
}


// Function to create and display a modal by fetching content from an HTML template.
// Takes the modal ID and the path to the template file as arguments.
async function createModal(modalId, templatePath) {
    // Fetch the modal content from the HTML template
    try {
 // Log the start of the modal template fetching process.
 console.log('Fetching modal template from:', templatePath);
        const response = await fetch(templatePath);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
 // Log an error if the HTTP response is not OK.
        }
        const modalContentHtml = await response.text();

        // Create the modal element
        const response = await fetch(templatePath);

        const modalElement = document.createElement('div');
        modalElement.id = modalId;
        modalElement.classList.add('modal');
        // Insert the fetched modal content into the modal structure
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                ${modalContentHtml}
            </div>
        `;

        // Append the modal to the body
        document.body.appendChild(modalElement);

        // Get modal elements
        // Get the newly created modal element and the close button within it.
        const modal = document.getElementById(modalId);
        const closeBtn = modal.querySelector('.close');
        // Event listeners to close the modal
        // Add an event listener to the close button to remove the modal when clicked.
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        // Close the modal on outside click
        // Add an event listener to the window to close the modal if the user clicks outside the modal content.
        // Close the modal when clicking outside of the modal content
        window.addEventListener('click', event => {
            if (event.target === modal) {
                modal.remove(); // Remove the modal element from the DOM
            }
        });
        // Close the modal when pressing the Escape key
        // Add an event listener to the window to close the modal when the Escape key is pressed.
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                modal.remove();
            }
        });

        // If there is a mermaid diagram in the modal, initialize it
        // Check if the modal content contains a pre element with the class 'mermaid',
        // indicating a Mermaid diagram that needs to be initialized.
        const mermaidPre = modal.querySelector('pre.mermaid');
        if (mermaidPre) {
            // Delay the initialization slightly to ensure the modal is fully rendered
            mermaid.init(undefined, mermaidPre);
        }

    } catch (error) {
        console.error('Error loading modal template:', error);
        // If an error occurs during fetching or processing the modal template,
        // log the error and display an error modal to the user.
        // Display an error modal if the template fails to load
        // Optionally, display an error message to the user
        const errorModal = document.createElement('div');
        errorModal.classList.add('modal', 'error-modal');
        errorModal.innerHTML = `
            <div class="modal-content">
                // Structure of the error modal, including a close button and an error message.
                // Get the close button within the error modal.
                <span class="close">&times;</span>
                <h2>Error</h2>
                <p>Could not load the modal content. Please try again later.</p>
            </div>
        `;
        document.body.appendChild(errorModal);
        const closeErrorBtn = errorModal.querySelector('.close');
        // Add an event listener to the error modal's close button to remove the modal when clicked.
        // Event listener to close the error modal
        closeErrorBtn.addEventListener('click', () => errorModal.remove());
        // Add an event listener to the window to close the error modal if the user clicks outside the modal content.
        // Close the error modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === errorModal) {
                errorModal.remove();
            }
        });
        // The line below was likely a remnant from previous code and can be removed.
        // Display the modal
 // modal.style.display = 'block'; // This is handled by CSS now
        // Add an event listener to the window to close the error modal when the Escape key is pressed.
        // Close on Escape key
        }); // Corrected closing parenthesis for keydown event listener
 // Close the createModal function.
    }
}; // Close createModal function

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
            createModal(`modal-${buttonId}`, templatePath);
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

