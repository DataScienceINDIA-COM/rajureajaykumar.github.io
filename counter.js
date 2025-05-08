// counter.js

class Counter extends HTMLElement {
  // Constructor of the Counter web component.
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.target = parseInt(this.getAttribute('data-target'));
    this.count = 0;
    this.increment = 0;
    this.intervalId = null;
  }

  connectedCallback() {
    console.log('Counter component connected to the DOM.');
    // Create the element that will display the count.
    this.counterElement = document.createElement('span');
    this.counterElement.textContent = '0';

    // Create the CSS style for the counter.
    const style = document.createElement('style');
    style.textContent = `
      span {
        font-size: 2rem;
      }
    `;

    // Add the elements to the shadow DOM.
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.counterElement);

    // Set the initial count to 0.
    this.counterElement.textContent = this.count;

    // Create the intersection observer.
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { threshold: 0.5 });
    this.observer.observe(this);
  }

  disconnectedCallback() {
    console.log('Counter component disconnected from the DOM.');
    // Disconnect the observer when the component is removed from the DOM.
    this.observer.disconnect();
    // Clear the interval if the component is removed from the DOM.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      console.log('Intersection Observer entry:', entry);
      if (entry.isIntersecting) {
        // Start the animation when the counter is visible.
        this.animateCounter();
        // Disconnect the observer, since we only need to animate the counter once.
        this.observer.unobserve(this);
      }
    });
  }

  animateCounter() {
    console.log('Starting counter animation.');
    // Calculate the increment value.
    this.increment = this.target / 200;

    // Animate the counter.
    this.intervalId = setInterval(() => {
      // Update the counter value.
      this.count += this.increment;

      console.log('Current count:', this.count);
      // If the count is bigger than the target, set the count to the target.
      if (this.count >= this.target) {
        this.count = this.target;
      }

      // Update the counter element.
      this.counterElement.textContent = Math.floor(this.count);

      // If the counter has reached the target, stop the animation.
      if (this.count === this.target) {
        console.log('Counter animation finished.');
        clearInterval(this.intervalId);
      }
    }, 1);
  }
}

// Register the counter web component.
customElements.define('custom-counter', Counter);