class CustomModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
 console.log('CustomModal constructor called'); // Log when the constructor is called
    this.modalContent = null;
    this.templatePath = '';
  }

  connectedCallback() {
    this.render();
    this.loadTemplateContent();
 console.log('CustomModal connectedCallback called'); // Log when the component is connected to the DOM
  }

  static get observedAttributes() {
    return ['template-path', 'modal-title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'template-path') {
 console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`); // Log attribute changes
      this.templatePath = newValue;
      this.loadTemplateContent();
    }
 console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`); // Log attribute changes
    if (name === 'modal-title') {
      this.updateModalTitle(newValue);
    }
  }

  updateModalTitle(title) {
    if (this.modalContent) {
      const modalTitleElement = this.modalContent.querySelector('.modal-title');
      if (modalTitleElement) {
 console.log(`Updating modal title to: ${title}`); // Log modal title update
        modalTitleElement.textContent = title;
      }
    }
  }

  render() {
    // Define the template for the modal
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        /* Modal styles */
        .modal {
          display: none; /* Hidden by default */
          position: fixed; /* Stay in place */
          z-index: 1000; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0,0,0); /* Fallback color */
          background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 1px solid #888;
          width: 80%; /* Could be more or less, depending on screen size */
        }

        /* Close Button */
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
        </style>
        <div class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2 class="modal-title"></h2>
            <div class="modal-body"></div>
          </div>
        </div>
      `;

    // Clone the template and append it to the shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  loadTemplateContent() {
    if (!this.templatePath) return;
 console.log(`Loading template content from: ${this.templatePath}`); // Log template loading start

    // Get modal elements
    this.modalContent = this.shadowRoot.querySelector('.modal-content');
    const modalBody = this.modalContent.querySelector('.modal-body');
    const modal = this.shadowRoot.querySelector('.modal');
    const closeButton = this.modalContent.querySelector('.close');

    //Show loading message
    modalBody.innerHTML = "<p>Loading...</p>";
 console.log('Displaying loading message.'); // Log display of loading message
    
    // Fetch the modal content template
    fetch(this.templatePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        // Insert the modal content into the modal body
 console.log('Modal content template fetched successfully.'); // Log successful fetch
        modalBody.innerHTML = html;
      })
      .catch(error => {
        // Handle errors
        console.error('Error loading modal content:', error);
        modalBody.innerHTML = "<p>Error loading content.</p>";
 console.log('Displaying error message.'); // Log display of error message
      });

    // Add event listener to close button
    closeButton.addEventListener('click', () => {
      modal.style.display = "none";
    });

    // Add event listener to close modal when clicking outside of it
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  showModal() {
 console.log('Showing modal.'); // Log showing modal
    this.shadowRoot.querySelector('.modal').style.display = "block";
  }

  hideModal() {
 console.log('Hiding modal.'); // Log hiding modal
    this.shadowRoot.querySelector('.modal').style.display = "none";
  }
}

customElements.define('custom-modal', CustomModal);