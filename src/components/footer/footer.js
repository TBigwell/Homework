import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class FooterElement extends LitElement {
    static properties = {
        menuItems: {type: Array},
        socialIcons: {type: Array},
    };

    static styles = css`
      :host {
        width: 100%;
        position: relative;
        bottom: 0px;
        margin-top: auto;
        background-color: #ebe7e2;
        font-size: 15px;
      }

      .gradient-line {
        background: linear-gradient(to right, #f4641d, #f5bb44);
        width: 100%;
        height: 4px;
        position: relative;
      }
    `;

    render() {
        return html`
            <footer>
                <div class="gradient-line"></div>
                <footer-menu></footer-menu>
                <swed-disclaimer></swed-disclaimer>
            </footer>
        `;
    }

}

customElements.define('swed-footer', FooterElement);