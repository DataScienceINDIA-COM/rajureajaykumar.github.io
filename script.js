/*
  This script registers a service worker for the website.
  Service workers enable features like offline support and caching.
*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            // Registration was successful
            // console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            // console.log('ServiceWorker registration failed: ', err);
        });
    });
}
let aosLoaded = false;

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
    // console.log('Form submitted. Values:', { name, email, message, feedback });

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
        // console.log('Validation failed: Missing required fields.'); // Log validation failure
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please fill out all fields.';
    } else if (!emailRegex.test(email)) {
        feedbackElement.classList.add('text-danger');
        feedbackElement.innerText = 'Please enter a valid email address.';
    } else {
        // Use the Fetch API to actually submit the form data to the specified action URL.

        // Use fetch to submit the form data (for actual form submission if needed)
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => { // Handle the response from the fetch request
            if (response.ok) {
                // If the fetch request is successful (response status is OK),
                // display a success message and reset the form.
                // console.log('Form submission successful.'); // Log successful submission
                feedbackElement.classList.add('text-success');
                feedbackElement.innerText = 'Thank you! Your message has been sent.';
                this.reset(); // Reset the form after successful submission
            } else {
                response.json().then(data => {
                    // Handle errors from the server
                    // console.error('Form submission failed. Server response:', data); // Log server errors
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        feedbackElement.classList.add('text-danger');
                        feedbackElement.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        // console.error('Form submission failed with unknown error format.'); // Log unknown error format
                        feedbackElement.classList.add('text-danger');
                        feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
                    }
                })
            }
        }).catch(error => {
            // Handle network or other errors
            // If there is a network error or other issues with the fetch request,
            // log the error and display an error message to the user.
            // console.error('Error submitting form:', error);
            feedbackElement.classList.add('text-danger'); // Display a generic error message
            feedbackElement.innerText = 'Oops! Something went wrong. Please try again later.';
        });

    // Append the feedback element to the form to display validation or submission status.
    this.appendChild(feedbackElement); // Append the feedback element to the form
    } // This closes the main else block for form validation
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
            // Remove any existing modal before creating a new one
            const existingModal = document.querySelector('custom-modal'); // Query for custom-modal
            if (existingModal) {
                existingModal.remove();
            }

            // Create and configure the custom-modal element
            const newModal = document.createElement('custom-modal');
            newModal.setAttribute('template-path', templatePath);
            
            // Get project title from the card
            const cardBody = button.closest('.card-body');
            const projectTitle = cardBody ? cardBody.querySelector('h5')?.textContent : 'Project Details';
            newModal.setAttribute('modal-title', projectTitle);
            
            document.body.appendChild(newModal);
            // The modal should show itself once content is loaded or an attribute changes triggering a load.
            // If direct show is needed: 
            // setTimeout(() => newModal.showModal(), 0); // Ensure it's in DOM and processed
            // However, showModal is already called in loadTemplateContent if successful
            // and attributeChangedCallback calls loadTemplateContent.
            // So, explicitly calling showModal here might be redundant if loadTemplateContent shows it.
            // For safety, let's ensure it shows after attributes are set.
            // The component itself should handle showing when ready. 
            // Let's rely on connectedCallback and attributeChangedCallback to trigger rendering and loading.
            // If the modal isn't showing, then newModal.showModal() would be needed here.
            // The current modal.js shows the modal after content load.

            // The modal's connectedCallback and attributeChangedCallback will handle rendering and loading.
            // loadTemplateContent in modal.js does not automatically call showModal.
            // Let's explicitly call showModal after appending and setting attributes.
            // We might need a slight delay for the component to initialize if showModal depends on internal state set by callbacks.
            // However, the showModal method just changes display style, so it should be fine.
            newModal.showModal();
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

document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectDetailModal');

    const projectDetailsContent = {
        datorama: {
            title: 'Datorama Reporting Ecosystem - Details',
            html: `
                <div class="project-modal-content">
                    <!-- This h3 is part of the content, the modal itself has a title -->
                    <p>Detailed information about the Datorama Reporting Ecosystem project will go here.</p>
                    <ul>
                        <li>Architected a real-time reporting system for over 800 marketing campaigns using Datorama.</li>
                        <li>Integrated multiple platforms (Google Ads, Meta, The Trade Desk, Double Verify, IAS, Pinterest, Bing Ads, Walmart).</li>
                        <li>Reduced report turnaround time by 70%.</li>
                        <li>Standardized data using Datorama's Harmonization Center.</li>
                        <li>Designed dynamic dashboards for stakeholders.</li>
                    </ul>
                    <p><em>More content, images, or links can be added.</em></p>
                </div>
            `
        },
        dataikuMl: {
            title: 'Dataiku ML Model Deployment - Details',
            html: `
                <div class="project-modal-content">
                    <p>Detailed information about the Dataiku ML Model Deployment project.</p>
                    <ul>
                        <li>Implemented machine learning models in production using Dataiku DSS.</li>
                        <li>Focused on leveraging ML for actionable business insights.</li>
                        <li>Ensured model scalability and maintainability.</li>
                    </ul>
                    <p><em>Further details on model types, performance metrics, etc.</em></p>
                </div>
            `
        },
        tableau: {
            title: 'Tableau Dashboard Optimization - Details',
            html: `
                <div class="project-modal-content">
                    <p>Detailed information about Tableau Dashboard Optimization.</p>
                    <ul>
                        <li>Streamlined Tableau Dashboard refreshing process.</li>
                        <li>Reduced data analysis time by 50% through optimization.</li>
                        <li>Improved dashboard interactivity and user experience.</li>
                    </ul>
                    <p><em>Specific optimization techniques can be detailed here.</em></p>
                </div>
            `
        },
        alteryxDataiku: {
            title: 'Alteryx to Dataiku Migration - Details',
            html: `
                <div class="project-modal-content">
                    <p>Details on the Alteryx to Dataiku Migration project.</p>
                    <ul>
                        <li>Successfully migrated complex Alteryx workflows to Dataiku DSS.</li>
                        <li>Improved workflow efficiency by 70%.</li>
                        <li>Retrained teams and documented new Dataiku processes.</li>
                    </ul>
                    <p><em>Challenges and solutions during migration can be added.</em></p>
                </div>
            `
        },
        predictiveModels: {
            title: 'Predictive Models for Customer Retention - Details',
            html: `
                <div class="project-modal-content">
                    <p>Information about Predictive Models for Customer Retention.</p>
                    <ul>
                        <li>Developed and deployed predictive models.</li>
                        <li>Achieved a 20% increase in customer retention rates.</li>
                        <li>Utilized customer data to identify at-risk segments.</li>
                    </ul>
                    <p><em>More on model validation and impact.</em></p>
                </div>
            `
        },
        dataPipeline: {
            title: 'Data Pipeline for a Marketing Campaign - Details',
            html: `
                <div class="project-modal-content">
                    <p>This project describes the end-to-end workflow for handling data in a marketing campaign.</p>
                    <ul>
                        <li>Data Ingestion from multiple sources.</li>
                        <li>Data Cleaning and Transformation.</li>
                        <li>Data Storage and Warehousing.</li>
                        <li>Automation scripts for the pipeline.</li>
                        <li>Reporting and Visualization outputs.</li>
                    </ul>
                    <p><em>Include diagrams or specific technologies used if available.</em></p>
                </div>
            `
        }
    };

    // Function to open modal with specific project content
    function openProjectModal(projectKey) {
        if (projectModal && projectDetailsContent[projectKey]) {
            const content = projectDetailsContent[projectKey];
            projectModal.setBodyContent(content.title, content.html);
            projectModal.showModal();
        }
    }

    // Add event listeners to project buttons
    document.getElementById('datoramaBtn')?.addEventListener('click', () => openProjectModal('datorama'));
    document.getElementById('dataikuMlBtn')?.addEventListener('click', () => openProjectModal('dataikuMl'));
    document.getElementById('tableauBtn')?.addEventListener('click', () => openProjectModal('tableau'));
    document.getElementById('alteryxDataikuBtn')?.addEventListener('click', () => openProjectModal('alteryxDataiku'));
    document.getElementById('predictiveModelsBtn')?.addEventListener('click', () => openProjectModal('predictiveModels'));
    document.getElementById('dataPipelineBtn')?.addEventListener('click', () => openProjectModal('dataPipeline'));

    // Dark Mode Toggle Logic (if not already present or to ensure it's correctly placed)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    // Check for saved dark mode preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    darkModeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });

});

