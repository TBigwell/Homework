import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class PageTitle extends LitElement {
    static styles = css`
      :host {
        width: 100%;
      }

      .page-title {
        color: #f35b1c;
        font-size: 32px;
        font-weight: 800;
        margin: 0;
        padding: 5px 20px;
      }
    `;

    render() {
        return html`
            <h1 class="page-title">
                <slot></slot>
            </h1>`;
    }
}

customElements.define('page-title', PageTitle);