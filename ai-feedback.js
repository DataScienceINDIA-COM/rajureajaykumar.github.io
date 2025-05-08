// ai-feedback.js
// Import the firebase simulator file.
import { callFunction } from './firebase-simulator.js';

class AiFeedback extends HTMLElement {
  constructor() {
    super();
    console.log('AiFeedback component constructor called');
    // Create a shadow root
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
                #feedback-suggestion-title {
                    font-weight: bold;
                }
            </style>
            <div id="feedback-suggestion">
                <div id="feedback-suggestion-title">AI Feedback Suggestion:</div>
                <div id="feedback-suggestion-content"></div>
            </div>
        `;

    // Clone the template and append it to the shadow root
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    //Get the suggestion element
    this.suggestionElement = this.shadowRoot.querySelector('#feedback-suggestion');
    this.contentElement = this.shadowRoot.querySelector('#feedback-suggestion-content');
  }

  connectedCallback() {
    console.log('AiFeedback component connected to DOM');
    // This method is called when the element is added to the DOM
    //Add the show class to show the element.
    // Call the analyzeFeedback function in the firebase simulator.
    callFunction('analyzeFeedback', { feedback: this.textContent });
    this.suggestionElement.classList.add('show');
  }

  //Method to set the suggestion text.
  setSuggestion(suggestion) {
    console.log('Setting feedback suggestion:', suggestion);
    this.contentElement.textContent = suggestion;
  }
}

// Define the custom element
customElements.define('ai-feedback', AiFeedback);