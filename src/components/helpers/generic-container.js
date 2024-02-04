import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class GenericContainer extends LitElement {
    static styles = css`
      :host {
        width: 100%;
      }

      .swed-container {
        background-color: white;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
      }
    `;

    render() {
        return html`
            <div class="swed-container">
                <slot></slot>
            </div>`;
    }
}

customElements.define('generic-container', GenericContainer);