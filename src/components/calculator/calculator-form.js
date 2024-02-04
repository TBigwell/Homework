import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class CalculatorForm extends LitElement {
    static styles = css`
      form {
        width: 100%;
        display: flex;
      }

      .submit-container {
        border-left: 1px solid #e7e7e7;
        padding-left: 10px;
        flex-basis: 20%;
        flex-grow: 1;
        box-sizing: border-box;
      }

      .form-container {
        flex-basis: 50%;
        flex-grow: 1;
        padding-top: 50px;
      }

      .payment-row {
        padding-top: 20px;
        padding-left: 20px;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e7e7e7;
      }

      .payment-row h3 {
        white-space: nowrap;
        font-weight: normal;
        margin: auto 0;
        color: #785f5f;
        font-size: 14px;
      }

      .payment-row span {
        margin: 0;
        white-space: nowrap;
      }

      .payment-calculation {
        font-size: 26px;
        color: #ed6816;
      }

      .currency {
        color: #785f5f;
        font-size: 14px;
      }

      input {
        width: 300px;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #bfdbdc;
        border-radius: 3px;
        color: #785f5f;
      }

      button {
        background-color: #4caf50;
        color: white;
        padding: 8px 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #45a049;
      }

      button.save {
        background-color: #31a3ae;
        margin-right: 10px;
      }

      button.submit {
        background-color: #ee7023;
      }

      .submit-row {
        padding-top: 20px;
      }

      @media (min-width: 850px) {
        .form-row,
        .submit-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-row {
          justify-content: flex-end;
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

        button {
          width: 100%;
          margin-bottom: 10px;
        }

      }
    `;

    static properties = {
        formData: {type: Object},
        loanAmount: {type: Number},
        loanTerm: {type: Number},
        interestRate: {type: Number},
        monthlyPayment: {type: Number},
    };

    periodOptions = Array.from({length: 30}, (_, i) => `${i + 1}`);
    interestOptions = Array.from({length: 50}, (_, i) => `${(i + 1) / 10}`);

    constructor() {
        super();
        this.formData = {
            loanAmount: '32000',
            loanTerm: '30',
            interestRate: '4.5',
        };
        this.loanAmount = '32000';
        this.loanTerm = '30';
        this.interestRate = '4.5';
    }

    static calculateLabelPosition() {
        return (100 / 288000) * (this.formData.loanAmount - 32000);
    }

    calculateMonthlyPayment() {
        const principal = this.formData.loanAmount;
        const annualRate = this.formData.interestRate / 100;
        const numberOfPayments = this.formData.loanTerm * 12;

        const monthlyInterestRate = annualRate / 12;
        const denominator = Math.pow(1 + monthlyInterestRate, -numberOfPayments);

        this.monthlyPayment = (monthlyInterestRate * principal) / (1 - denominator);
        return this.monthlyPayment.toFixed(2);
    }

    handleLoanSizeChange(value) {
        console.log('value', value)
        this.formData.loanAmount = value;
        const labelElement = this.shadowRoot.querySelector('.value-label');
        const calc = ((this.formData.loanAmount - 32000) / (320000 - 32000)) * 100;
        labelElement.style.left = `calc(${calc}% - ${calc / 10}% - 20px)`;

        this.requestUpdate();
    }

    handleChange(property, value) {
        this.formData[property] = value;
        this.requestUpdate();
    }

    render() {
        return html`
            <form @submit="${this.handleSubmit}">
                <div class="form-container">
                    
                    <loan-slider
                            .value="${this.formData}"
                            id="loanAmount"
                            @change="${(body) => this.handleChange('loanAmount', body.detail)}"
                    ></loan-slider>

                    <render-field
                            labelText="Period"
                            id="loanTerm"
                            elementType="select"
                            defaultOption="30"
                            property="loanTerm"
                            optionLabel=" years"
                            .options="${this.periodOptions}"
                            .value="${this.formData}"
                            @change="${(body) => this.handleChange('loanTerm', body.detail)}"
                    ></render-field>

                    <render-field
                            labelText="Interest"
                            id="interestRate"
                            elementType="select"
                            defaultOption="4.5"
                            property="interestRate"
                            optionLabel=" %"
                            .options="${this.interestOptions}"
                            .value="${this.formData}"
                            @change="${(body) => this.handleChange('interestRate', body.detail)}"
                    ></render-field>
                </div>

                <div class="submit-container">
                    <div class="payment-row">
                        <h3>Monthly Payment:</h3>
                        <span class="payment-calculation">
                            ${this.calculateMonthlyPayment()}
                            <span class="currency"> EUR </span>
                        </span>
                    </div>
                    <div class="submit-row">
                        <button type="submit" class="submit">Apply</button>
                    </div>
                </div>
            </form>
        `;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Form submitted:', this.formData);
    }
}

customElements.define('calculator-form', CalculatorForm);