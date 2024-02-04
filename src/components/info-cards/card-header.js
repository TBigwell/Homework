import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class CardHeader extends LitElement {
    static properties = {
        color: {type: String}
    };

    static styles = css`
      :host {
        width: 100%;
        display: flex;
      }

      .card-header {
        width: 100%;
        padding: 10px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        position: relative;
        background-color: #5b8ad6;
      }

      .card-header::after {
        position: absolute;
        top: 25px;
        left: 20px;
        content: "";
        width: 25px;
        height: 25px;
        transform: rotateY(45deg) rotateZ(45deg);
        background-color: rgb(91, 138, 214);
        border-radius: 10rem 0px 0px;
      }

      .card-header.blue,
      .card-header.blue:after {
        background-color: #5b8ad6;
      }

      .card-header.yellow,
      .card-header.yellow:after {
        background-color: #f4ba44;
      }

      .card-header.pink,
      .card-header.pink:after {
        background-color: #c5569a;
      }
    `;

    constructor() {
        super();
        this.color = 'blue';
    }

    render() {
        return html`
            <div class="card-header ${this.color}">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('card-header', CardHeader);