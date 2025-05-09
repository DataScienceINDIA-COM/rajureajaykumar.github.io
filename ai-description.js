// This file defines the AiDescription web component.
// ai-description.js

class AiDescription extends HTMLElement {
  // Constructor for the AiDescription class.
  constructor() {
    // Always call super first in the constructor of a custom element.
    super();
    // Create a shadow root
    // This creates a separate DOM tree attached to the custom element, encapsulating its structure and styles.
    this.attachShadow({ mode: 'open' });
    // Create a template
    // A template element is used to hold HTML content that is not rendered immediately,
    // but can be used later via JavaScript.
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        /* Add your styles here */
        /* Style for the container of the AI suggestion text */
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
      <!-- This div will hold the AI generated description suggestion -->
      <div class="ai-suggestion"></div>
    `;
  }

  // Called when the element is inserted into a document.
  // This is a good place to perform setup work that requires the element
  // to be in the DOM, like adding event listeners or accessing its children.
  // Here, we append the template content to the shadow DOM.
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
    console.log('ai-feedback showFeedback', suggestion); // Log for debugging
    // Set the text of the suggestion
    // The textContent property sets the text inside the selected element.
    this.suggestionElement.textContent = suggestion;
    // Show the suggestion element
    // Change the display style to 'block' to make the suggestion visible.
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
// This registers the AiDescription class with a custom element tag 'ai-description'.
// Now you can use <ai-description></ai-description> in your HTML.
customElements.define('ai-description', AiDescription);