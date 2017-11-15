class TimeClock extends HTMLElement {
  constructor(){
    super();
    this.currentDate = new Date();
    this.min = this.currentDate.getMinutes();
    this.hour = this.currentDate.getHours();
  }
  connectedCallback(){
  
    this.textNumbers = [
      "", "one", "two", "three", "four", "five", "six", "seven", 
      "eight", "nine", "ten", "eleven", "twelve", "thirteen", 
      "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];

    this.textTens = ["twenty", "thirty", "forty", "fifty"];

    this.styles = `
      <style>
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          font-size: 14px;
        }
        .clock_wrapper{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        p{
          width: 100%;
          text-align: center;
          font-family: serif;
          font-size: 16em;
          background-image: -webkit-gradient(linear,31% 0%,25% 100%,from(rgba(255, 44, 44, 0.5)),to(rgba(122, 94, 145, .5)));          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          // letter-spacing: -75px; 
          line-height: .7em;
        }
      
      </style>
    `;

    this.innerHTML = `
    <div class="clock_wrapper">
      <p class="clock_text">
        ${this.getTimeInString()}
      </p>
    </div>
    ${this.styles}
    `;

    
  }
  getTimeInString(){
    if (this.min >= 45){
      return this.getCurrentMinutes() + " til " + this.getCurrentHours() ;
    } else {
      return this.getCurrentHours() +' '+ this.getCurrentMinutes();
    }
  }

  getCurrentHours(){
    let hour = this.hour;
    if (hour > 12) {
      hour -= 12;
      hour = this.textNumbers[hour];
    } else if (this.min >= 45){
      if(hour == 12){
        hour = this.textNumbers[1];
      } else if (hour == 1){
        hour = this.textNumbers[12];
      }
      hour = this.textNumbers[(hour - 11)];
    }

    return hour;
  }

  getCurrentMinutes(){
    let min = this.min;
    let minString = min.toString();
    let minFirstDigit = minString[0];
    let minSecondDigit = minString[1];

    if (min % 60 == 0){
      min = "o' clock"
    } else if (min == 15){
      min = "quarter past";
    } else if (min == 30){
      min = "half past";
    } else if (min == 45){
      min = "quarter";
    } else {
      if(this.min > 0 && this.min < 20){
        min = this.textNumbers[this.min];
      } else {
        min = this.textTens[parseInt(minFirstDigit) - 2] + ' ' + this.textNumbers[parseInt(minSecondDigit)]; 
      }
    }
  
    return min;
  }


}

window.customElements.define('time-clock', TimeClock);