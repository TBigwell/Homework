import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class CardContent extends LitElement {
    static styles = css`
      :host {
        box-sizing: border-box;
        background-color: #fbf2ea;
        margin: 10px;
        width: calc(33.33% - 20px);
      }

      .card-content {
        padding: 30px 10px 20px 10px;
      }

      .card-text strong {
        line-height: 25px;
      }

      .card-link {
        padding-top: 10px;
      }

      .card-link a {
        text-decoration: none;
        margin-left: -4px;
        color: #2f7e8a;
      }

      .half-circle-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .half-circle-list li {
        position: relative;
        padding-left: 15px;
        margin-bottom: 10px;
      }

      .half-circle-list li::before {
        content: '';
        position: absolute;
        left: 0;
        width: 8px;
        height: 15px;
        background-color: #5b8ad6;
        border-radius: 0 15rem 15rem 0;
      }

      .half-circle-list.pink li::before {
        background-color: #c5569a;
      }

      .half-circle-list.yellow li::before {
        background-color: #f4ba44;
      }

      .arrow-right {
        padding-right: 10px;
        padding-left: 6px;
        position: relative;
      }

      .arrow-right::after {
        content: '';
        position: absolute;
        top: calc(50% - 5px);
        width: 0;
        height: 0;
        border-bottom: 5px solid transparent;
        border-top: 5px solid transparent;
        border-left: 5px solid #2f7e8a;
        pointer-events: none;
      }

      @media (max-width: 768px) {
        :host {
          width: 100%;
          margin: 0 0 10px 0;
        }

        :host:last-child {
          margin: 0;
        }
      }
    `;

    static get properties() {
        return {
            cardTitle: {type: String},
            cardColor: {type: String},
            contentTitle: {type: String},
            customContent: {type: Boolean},
            readMoreLink: {type: String},
            customList: {type: Array},
        };
    }

    render() {
        return html`
            <div class="card">
                <card-header color="${this.cardColor}">${this.cardTitle}</card-header>
                <div class="card-content">
                    ${this.customContent ? html`
                        <div class="card-text">
                            ${this.contentTitle ? this.renderContentTitle() : ''}
                            <slot name="content"></slot>
                        </div>
                    `: ''}
                    ${this.customList ? this.renderList() : ''}
                    ${this.readMoreLink ? this.renderLink() : ''}
                </div>
            </div>
        `;
    }

    renderList() {
        return html`
            <ul class="half-circle-list ${this.cardColor}">
                ${this.customList.map((item) => html`
                    <li>${item}</li>`)}
            </ul>
        `;
    }

    renderContentTitle() {
        return html`<strong>${this.contentTitle}</strong> <br/>`;
    }

    renderLink() {
        return html`
            <div class="card-link">
                <a href="${this.readMoreLink}"><span class="arrow-right"></span>Read more</a>
            </div>
        `;
    }
}

customElements.define('card-content', CardContent);