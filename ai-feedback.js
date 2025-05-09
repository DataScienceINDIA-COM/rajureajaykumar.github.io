// ai-feedback.js
// This file defines the AiFeedback web component, which displays AI-generated feedback suggestions.
class AiFeedback extends HTMLElement {
  // Constructor for the AiFeedback class.
  constructor() {
    super();
    // Create a shadow root
    // The shadow DOM provides encapsulation for the component's styles and structure.
    this.attachShadow({ mode: 'open' });

    // Create a template
    this.template = document.createElement('template');
    this.template.innerHTML = `
            <style>
                #feedback-suggestion {
                    display: none; /* Hide the suggestion by default */
                    margin-top: 10px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    background-color: #f9f9f9;
                    border-radius: 5px;
                }
                #feedback-suggestion.show {
                  display: block; /* Show the suggestion when the class is present */
                }
                /* Style for the suggestion title */
                #feedback-suggestion-title {
                    font-weight: bold;
                }
            </style>
            <!-- The main container for the feedback suggestion -->
            <div id="feedback-suggestion">
                <!-- Title for the AI feedback suggestion -->
                <div id="feedback-suggestion-title">AI Feedback Suggestion:</div>
                <!-- Element to display the actual AI feedback content -->
                <div id="feedback-suggestion-content"></div>
            </div>
        `;

    // Clone the template and append it to the shadow root
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    // Get the main suggestion element from the shadow DOM
    // This element is used to show or hide the entire suggestion box.
    this.suggestionElement = this.shadowRoot.querySelector('#feedback-suggestion');

    // Get the element that will display the suggestion content
    // This is where the AI-generated text will be placed.
    this.contentElement = this.shadowRoot.querySelector('#feedback-suggestion-content');
  }

  // Called when the element is inserted into a document.
  connectedCallback() {
    // Hide the suggestion initially when the component is added to the DOM.
    this.hideSuggestion();
  }

  // Method to get the feedback from the input
  // This method is likely intended to read the user's feedback from an input field
  // with the ID 'feedback' in the main document.
  getFeedback() {
    const feedbackInput = document.getElementById('feedback');
    return feedbackInput ? feedbackInput.value : '';
  }

  // Method to set the suggestion text and show the suggestion
  // @param {string} suggestion - The AI-generated feedback text to display.
  setSuggestion(suggestion) {
    this.contentElement.textContent = suggestion;
    this.suggestionElement.classList.add('show');
  }

  hideSuggestion() {
    // Hides the feedback suggestion by removing the 'show' class.
    // The CSS handles setting 'display: none' when the 'show' class is absent.
    this.suggestionElement.classList.remove('show');
  }
}

// Define the custom element
customElements.define('ai-feedback', AiFeedback);