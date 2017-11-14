class TimeClock extends HTMLElement {
  constructor(){
    super();
  }
  connectedCallback(){
    this.variable = window.innerWidth;
    this.styles = `
      <style>
        html, body {
          width: 100%;
          height: auto;
          margin: 0;
        }
        .clock_wrapper-outer{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
        }
      
      </style>
    `;

    this.innerHTML = `
    <div class="clock_wrapper-outer">
      ${this.variable}
    </div>
    ${this.styles}
    `;

    
  }
}

window.customElements.define('time-clock', TimeClock);