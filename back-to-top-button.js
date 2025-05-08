class BackToTopButton extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    console.log('BackToTopButton: Constructor called');
    this.attachShadow({ mode: 'open' });

    // Create the button element
    this.button = document.createElement('button');
    this.button.id = 'backToTopBtn';
    this.button.textContent = 'Top';
    this.button.style.display = 'none'; // Hide the button initially
    this.button.style.position = 'fixed';
    this.button.style.bottom = '20px'; // Position it 20px from the bottom
    this.button.style.right = '20px'; // Position it 20px from the right
    this.button.style.padding = '10px';
    this.button.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.button.style.color = 'white';
    this.button.style.border = 'none';
    this.button.style.borderRadius = '5px';
    this.button.style.cursor = 'pointer';

    // Add styles to the shadow root
    const style = document.createElement('style');
    style.textContent = `
      #backToTopBtn {
        opacity: 0.7;
        transition: opacity 0.3s ease;
      }

      #backToTopBtn:hover {
        opacity: 1;
      }
    `;

    // Append the button and styles to the shadow root
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.button);

    // Bind the methods to the current instance
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  connectedCallback() {
    console.log('BackToTopButton: connectedCallback called');
    // Add event listeners when the component is added to the DOM
    window.addEventListener('scroll', this.handleScroll);
    this.button.addEventListener('click', this.scrollToTop);
  }

  disconnectedCallback() {
    console.log('BackToTopButton: disconnectedCallback called');
    // Remove event listeners when the component is removed from the DOM
    window.removeEventListener('scroll', this.handleScroll);
    this.button.removeEventListener('click', this.scrollToTop);
  }

  handleScroll() {
    // Function to handle the scroll event
    // console.log('BackToTopButton: handleScroll called'); // Uncomment for detailed scroll debugging
    const offset = 300; // Offset to show the button a little bit lower
    if (window.scrollY > offset) {
        // If the user has scrolled down more than the offset, show the button
        this.button.style.display = 'block';
    } else {
        // Otherwise, hide the button
        this.button.style.display = 'none';
    }
  }

  scrollToTop() {
    // Function to scroll to the top of the page
    console.log('BackToTopButton: scrollToTop called');
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  }
}

// Define the custom element
customElements.define('back-to-top-button', BackToTopButton);