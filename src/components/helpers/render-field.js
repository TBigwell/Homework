import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class RenderField extends LitElement {
    static styles = css`
      .error {
        color: red;
        font-size: 14px;
      }

      select,
      input {
        width: 300px;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #bfdbdc;
        border-radius: 3px;
        color: #5d2527;
      }
      
      .input-error {
        border: 1px solid red;
      }

      select {
        background-color: #ebf8f2;
        appearance: none;
      }

      select:focus {
        outline: #04aa6d solid 1px;
      }

      .select-container {
        position: relative;
      }

      .select-container::before,
      .select-container::after {
        content: '';
        position: absolute;
        bottom: 8px;
        right: 10px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        pointer-events: none;
      }

      .select-container::before {
        border-top: 7px solid #4e2727;
      }

      .select-container::after {
        bottom: 17px;
        border-bottom: 7px solid #4e2727;
      }

      #amount {
        width: 207px;
      }

      #currency {
        width: 83px;
        margin-left: 10px;
      }

      #loanTerm {
        width: 86px;
      }

      #interestRate {
        width: 69px;
      }

      .container {
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 10px;
        max-width: 445px;
      }

      label {
        color: #785f5f;
        font-size: 14px;
      }

      @media (min-width: 768px) {
        label {
          display: inline-block;
          width: 140px;
          text-align: right;
          white-space: nowrap;
          padding-right: 10px;
          margin: auto 0;
        }

        .error-mobile {
          display: none;
        }

        .error {
          margin-left: 150px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }
      }

      @media (max-width: 768px) {
        select,
        input {
          width: 100%;
        }

        .input-wrapper {
          margin-bottom: 10px;
        }

        #amount,
        #description,
        #currency,
        #loanTerm,
        #interestRate {
          width: 100%;
        }

        #currency {
          margin-left: 0;
        }

        .error-desktop {
          display: none;
        }
      }
    `;

    static get properties() {
        return {
            labelText: {type: String},
            id: {type: String},
            elementType: {type: String},
            defaultOption: {type: String},
            optionLabel: {type: String},
            property: {type: String},
            options: {type: Array},
            value: {type: Object},
            error: {type: String},
        };
    }

    constructor() {
        super();
        this.labelText = '';
        this.id = '';
        this.elementType = '';
        this.defaultOption = '';
        this.optionLabel = '';
        this.property = '';
        this.options = [];
        this.value = {};
        this.error = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="row">
                    <label for="${this.id}">${this.labelText}</label>
                    <div class="input-wrapper">
                        ${this.elementType === 'select' ? html`
                            <div class="select-container">
                                <select
                                    id="${this.id}"
                                    name="${this.id}"
                                    class="${this.error ? 'input-error' : ''}"
                                    @change="${this.handleSelectChange}"
                                >
                                    ${this.options.map( (option) => html`
                                        <option
                                            value="${option}"
                                            ?selected="${this.defaultOption === option}"
                                        >
                                            ${option}${this.optionLabel}
                                        </option>
                                    `)}
                                </select>
                            </div>
                        ` : html`
                            <input
                                type="${this.elementType}"
                                id="${this.id}"
                                class="${this.error ? 'input-error' : ''}"
                                name="${this.id}"
                                .value="${this.value[this.id]}"
                                @input="${(e) => (this.value[this.id] = e.target.value)}"
                            />
                        `}
                        ${this.error ? html`
                            <div class="error error-mobile">${this.error}</div>
                        ` : ''}
                    </div>
                    ${this.property === 'amount' ? html`
                        <div class="select-container">
                            <select
                                id="currency"
                                name="currency"
                                @change="${(e) => (this.value.currency = e.target.value)}"
                            >
                                <option value="usd" ?selected="${this.defaultOption === 'usd'}">USD</option>
                                <option value="eur" ?selected="${this.defaultOption === 'eur'}">EUR</option>
                            </select>
                        </div>
                    ` : ''}
                </div>
                <div class="row">
                    ${this.error ? html`
                        <div class="error error-desktop">${this.error}</div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    handleSelectChange(event) {
        this.value[this.id] = event.target.value;
        this.dispatchEvent(new CustomEvent('change', {detail: this.value[this.id]}));
    }
}

customElements.define('render-field', RenderField);