import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MenuComponent extends LitElement {
    static properties = {
        menuItems: {type: Array},
        isMenuOpen: {type: Boolean},
    };

    static styles = css`
      .burger-menu {
        width: 55px;
        height: 55px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        position: relative;
        display: none;
      }

      .burger-menu-icon {
        position: absolute;
        top: 50%;
        left: 30%;
        margin-top: -2px;
        right: 0;
        width: 40%;
      }

      .burger-menu-icon::before,
      .burger-menu-icon::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
      }

      .burger-menu-icon::before {
        top: -8px;
      }

      .burger-menu-icon::after {
        bottom: -8px;
      }

      .burger-menu-icon,
      .burger-menu-icon::before,
      .burger-menu-icon::after {
        height: 2px;
        background-color: #512b2b;
        transition: all 0.3s ease-in-out;
        border-radius: 2px;
      }

      .burger-menu.active .burger-menu-icon {
        left: 25%;
        width: 50%;
        background-color: transparent;
      }

      .burger-menu.active .burger-menu-icon::before,
      .burger-menu.active .burger-menu-icon::after {
        top: 50%;
      }

      .burger-menu.active .burger-menu-icon::before {
        transform: rotate(45deg);
      }

      .burger-menu.active .burger-menu-icon::after {
        transform: rotate(-45deg);
      }

      @media (max-width: 768px) {
        .burger-menu {
          display: block;
        }
      }
    `;

    render() {
        return html`
            <div class="burger-menu ${this.isMenuOpen ? 'active' : ''}"
                 @click="${this.toggleMenu}">
                <div class="burger-menu-icon"></div>
            </div>
        `;
    }
}

customElements.define('burger-component', MenuComponent);