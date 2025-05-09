class CustomModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._modalVisible = false; // Internal state for visibility
  }

  connectedCallback() {
    this.render();
    // loadTemplateContent will no longer be primary way to load content
  }

  static get observedAttributes() {
    // return ['template-path', 'modal-title']; // template-path no longer needed
    return ['modal-title']; // Only observe modal-title if set directly, or handle via new method
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    // if (name === 'template-path') { // No longer needed
    //   this.templatePath = newValue;
    //   this.loadTemplateContent();
    // }
    if (name === 'modal-title') {
      this.updateModalTitle(newValue);
    }
  }

  updateModalTitle(title) {
    if (this.shadowRoot) {
      const modalTitleElement = this.shadowRoot.querySelector('.modal-title');
      if (modalTitleElement) {
        modalTitleElement.textContent = title || ''; // Set to empty if no title
      }
    }
  }

  // New method to set title and body content directly
  setBodyContent(title, htmlContent) {
    this.updateModalTitle(title);
    if (this.modalBody) {
        this.modalBody.innerHTML = htmlContent;
    }
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
            /* Assuming these CSS variables are defined globally and accessible */
            --modal-bg-color: var(--card-color, #fefefe);
            --modal-text-color: var(--text-color, #333);
            --modal-border-color: var(--border-color, #888);
            --modal-close-color: var(--secondary-text-color, #aaa);
            --modal-close-hover-color: var(--text-color, #000);
        }
        .modal {
          /* display: none; Will be handled by opacity and pointer-events for transitions */
          opacity: 0;
          transform: scale(0.95);
          pointer-events: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.6); /* Darker, sleeker overlay */
          transition: opacity 0.3s ease, transform 0.3s ease;
          display: flex; /* Use flex to center content */
          align-items: center;
          justify-content: center;
        }
        .modal.modal-visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }
        .modal-content {
          background-color: var(--modal-bg-color);
          color: var(--modal-text-color);
          margin: auto; /* Centered by flex on .modal */
          padding: 25px;
          border: 1px solid var(--modal-border-color);
          width: 80%;
          max-width: 700px; /* Max width for larger screens */
          border-radius: 8px; /* Sleeker rounded corners */
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          position: relative; /* For positioning the close button */
          transform: scale(0.95); /* Initial state for transition */
          transition: transform 0.3s ease;
        }
        .modal.modal-visible .modal-content {
            transform: scale(1);
        }
        .close {
          color: var(--modal-close-color);
          position: absolute; /* Position relative to modal-content */
          top: 10px;
          right: 15px;
          font-size: 32px;
          font-weight: bold;
          line-height: 1;
        }
        .close:hover,
        .close:focus {
          color: var(--modal-close-hover-color);
          text-decoration: none;
          cursor: pointer;
        }
        .modal-title {
            color: var(--modal-text-color); /* Use CSS variable */
            margin-top: 0;
            margin-bottom: 15px;
            font-size: 1.8rem; /* Slightly larger title */
        }
        .modal-body {
            /* Styles for modal body content can be added here if needed,
               but primary content styling is via .project-modal-content in global CSS */
        }
        .modal-body p,
        .modal-body ul {
            color: var(--modal-text-color); /* Ensure text inside has right color */
        }
      </style>
      <div class="modal" id="customModalInstance">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2 class="modal-title"></h2>
          <div class="modal-body">Loading...</div>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Assign elements after render
    this.modalElement = this.shadowRoot.querySelector('#customModalInstance');
    this.modalContentElement = this.shadowRoot.querySelector('.modal-content'); // Renamed from this.modalContent to avoid confusion
    this.closeButton = this.shadowRoot.querySelector('.close');
    this.modalBody = this.shadowRoot.querySelector('.modal-body');

    // Add event listeners
    this.closeButton.addEventListener('click', () => this.hideModal());
    this.modalElement.addEventListener('click', (event) => {
      if (event.target === this.modalElement) {
        this.hideModal();
      }
    });
  }

  showModal() {
    if (!this.modalElement) return;
    // It might be good practice to ensure content is loaded before showing,
    // but for now, we just make it visible. loadTemplateContent has its own placeholders.
    this.modalElement.classList.add('modal-visible');
    this._modalVisible = true;
  }

  hideModal() {
    if (!this.modalElement) return;
    this.modalElement.classList.remove('modal-visible');
    this._modalVisible = false;
  }
}

customElements.define('custom-modal', CustomModal);