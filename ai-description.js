// This file defines the AiDescription web component.
// ai-description.js

class AiDescription extends HTMLElement {
  // Constructor for the AiDescription class.
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: 'open' });
    // Create a template
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        /* Add your styles here */
        .ai-suggestion {
          display: none; /* Hide by default */
          background-color: #f0f0f0;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          font-size: 0.9em;
          color: #333;
        }
      </style>
      <div class="ai-suggestion"></div>
    `;
  }

  // Called when the element is inserted into a document.
  connectedCallback() {
    console.log('ai-feedback connectedCallback');
    // Clone the template and append it to the shadow root
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    // Get the suggestion element
    // This element will display the AI suggestion.
    this.suggestionElement = this.shadowRoot.querySelector('.ai-suggestion');
    // Initially hide the feedback
    this.hideFeedback();
  }

  /**
   * Shows the feedback suggestion.
   * @param {string} suggestion - The suggestion to show.
   */
  showFeedback(suggestion) {
    console.log('ai-feedback showFeedback', suggestion);
    // Set the text of the suggestion
    this.suggestionElement.textContent = suggestion;
    // Show the suggestion element
    this.suggestionElement.style.display = 'block';
  }

  /**
   * Hides the feedback suggestion.
   */
  hideFeedback() {    console.log('ai-feedback hideFeedback');
    // Hide the suggestion element
    this.suggestionElement.style.display = 'none';
  }
}

// Define the custom element
customElements.define('ai-description', AiDescription);