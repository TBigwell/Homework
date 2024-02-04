import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class PaymentForm extends LitElement {
    static styles = css`
      form {
        width: 100%;
        padding-top: 20px;
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

      @media (min-width: 768px) {
        .submit-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-row {
          justify-content: flex-end;
        }
      }

      @media (max-width: 768px) {
        form {
          padding-top: 0;
        }

        button {
          width: 100%;
          margin-bottom: 5px;
        }
      }
    `;

    static properties = {
        formData: {type: Object},
        errors: {type: Object},
    };

    constructor() {
        super();
        this.formData = {
            account: 'Home account',
            savedPayment: 'Select a saved payment',
            amount: '',
            currency: 'eur',
            description: '',
        };
        this.accountOptions = ['Home account', 'Invest account'];
        this.savedPaymentsOptions = ['Select a saved payment', 'Regular'];
        this.errors = {};
    }

    validateForm() {
        this.errors = {};

        if (!this.formData.account) {
            this.errors.account = 'Account is required';
        }

        if (!this.formData.savedPayment) {
            this.errors.savedPayment = 'Saved Payment is required';
        }

        if (!this.formData.amount) {
            this.errors.amount = 'Amount is required';
        } else if (!this.validateNumber(this.formData.amount)) {
            this.errors.amount = 'Amount accepts only numbers';
        }

        if (!this.formData.description) {
            this.errors.description = 'Description is required';
        }

        return Object.keys(this.errors).length === 0;
    }

    validateNumber(number) {
        const numberRegex = /^\d+$/;
        return numberRegex.test(number);
    }

    render() {
        return html`
            <form @submit="${this.handleSubmit}">
                <render-field
                        labelText="Account"
                        id="account"
                        elementType="select"
                        defaultOption="Account name 1"
                        property="account"
                        .options="${this.accountOptions}"
                        .value="${this.formData}"
                        .error="${this.errors.account}"
                ></render-field>

                <render-field
                        labelText="Saved payments"
                        id="savedPayments"
                        elementType="select"
                        defaultOption="Select a saved payment"
                        property="savedPayment"
                        .options="${this.savedPaymentsOptions}"
                        .value="${this.formData}"
                        .error="${this.errors.savedPayment}"
                ></render-field>

                <render-field
                        labelText="Amount"
                        id="amount"
                        elementType="input"
                        defaultOption="eur"
                        property="amount"
                        .value="${this.formData}"
                        .error="${this.errors.amount}"
                ></render-field>

                <render-field
                        labelText="Description"
                        id="description"
                        elementType="input"
                        property="description"
                        .value="${this.formData}"
                        .error="${this.errors.description}"
                ></render-field>
                <div class="submit-row">
                    <button type="button" @click="${this.handleSave}" class="save">Save</button>
                    <button type="submit" class="submit">Pay</button>
                </div>
            </form>
        `;
    }

    handleSave() {
        console.log('Saving form data...');
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            console.log('Form submitted:', this.formData);
        } else {
            console.log('Form has errors:', this.errors);
        }
    }
}

customElements.define('payment-form', PaymentForm);