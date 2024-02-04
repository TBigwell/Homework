import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class LoanSlider extends LitElement {
    static styles = css`
      .container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        max-width: 445px;
        margin-bottom: 10px;
      }
      
      input {
        width: 300px;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #bfdbdc;
        border-radius: 3px;
        color: #785f5f;
      }

      input[type="range"] {
        padding: 0;
        height: 10px;
        -webkit-appearance: none;
        margin: 10px 0;
        border: 0;
        border-radius: 5px;
        background-color: #eaded7;
      }

      input[type="range"]:focus {
        outline: none;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 25px;
        height: 25px;
        background-color: #ee7023;
        border-radius: 50%;
        cursor: pointer;
      }

      input[type="range"]::-webkit-slider-thumb:hover {
        background-color: #af541a;
      }

      .min-max-labels {
        display: flex;
        justify-content: space-between;
        margin: 3px 10px 0 137px;
        font-size: 12px;
        color: #785f5f;
      }

      .value-label {
        position: absolute;
        top: -30px;
        left: -20px;
        font-size: 20px;
        color: #ed6816;
        white-space: nowrap;
      }

      .slider-container {
        position: relative;
      }

      .value-label-mobile {
        color: #ed6816;
        font-size: 18px;
        white-space: nowrap;
      }

      label {
        color: #785f5f;
        font-size: 14px;
      }

      @media (min-width: 850px) {
        label {
          display: inline-block;
          width: 140px;
          text-align: right;
          white-space: nowrap;
          padding-right: 10px;
          margin: auto 0;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }

        .desktop-hidden {
          display: none;
        }
      }

      @media (max-width: 850px) {
        form {
          padding-top: 0;
          flex-wrap: wrap;
        }

        .form-container {
          padding: 0;
          flex-basis: 100%;
        }

        .submit-container {
          border: none;
          padding-left: 0;
          flex-basis: 100%;
        }

        input {
          width: 100%;
        }

        .payment-row {
          padding-left: 0;
        }
        
        .min-max-labels {
          margin: 3px 0 0 0;
        }

        .mobile-hidden {
          display: none;
        }
      }
    `;

    static get properties() {
        return {
            id: {type: String},
            value: {type: Object},
        };
    }

    constructor() {
        super();
        this.id = '';
        this.value = {}; // Set default values if needed
    }

    render() {
        return html`
            <div class="container">
                <div class="row">
                    <label for="${this.id}">
                        Loan size
                        <span class="desktop-hidden"> - </span>
                        <span class="value-label-mobile desktop-hidden">${this.value.loanAmount} €</span>
                    </label>
                    <div class="slider-container">
                        <input
                                id="${this.id}"
                                class="custom-slider"
                                type="range"
                                min="32000"
                                max="320000"
                                step="1000"
                                .value="${this.value.loanAmount}"
                                @input="${this.handleLoanSizeChange}"
                        />
                        <div class="value-label mobile-hidden">${this.value.loanAmount} €</div>
                    </div>
                </div>
                <div class="min-max-labels">
                    <span>32000 €</span>
                    <span>320000 €</span>
                </div>
            </div>
        `;
    }

    handleLoanSizeChange(event) {
        this.value[this.id] = event.target.value;
        const labelElement = this.shadowRoot.querySelector('.value-label');
        const calc = ((this.value.loanAmount - 32000) / (320000 - 32000)) * 100;
        labelElement.style.left = `calc(${calc}% - ${calc / 10}% - 20px)`;
        this.dispatchEvent(new CustomEvent('change', {detail: this.value[this.id]}));
        this.requestUpdate();
    }

}

customElements.define('loan-slider', LoanSlider);