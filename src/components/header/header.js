import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class newHeader extends LitElement {
    static properties = {
        menuItems: {type: Array},
        isMenuOpen: {type: Boolean},
        backdropOpen: {type: Boolean},
    };

    static styles = css`
      header {
        border-bottom: solid 1px #f0ede9;
        background: #fff;
        z-index: 3;
      }

      .gradient-line {
        background: linear-gradient(to right, #f4641d, #f5bb44);
        width: 100%;
        height: 8px;
        z-index: 3;
        position: relative;
      }

      .top-header {
        justify-content: space-between;
        display: flex;
        z-index: 3;
        position: relative;
        background: #fff;
      }

      .logo {
        padding: 8px;
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        z-index: 3;
        position: relative;
      }

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

      .backdrop {
        position: fixed;
        z-index: 2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #837471;
        opacity: 70%;
        transition: all 0.3s ease-in-out;
        display: none;
      }

      @media (max-width: 768px) {
        nav {
          padding: 0;
        }

        .burger-menu {
          display: block;
        }
      }

    `;

    constructor() {
        super();
        this.menuItems = [
            {label: 'Home', link: '/', img: '../../assets/icons/generic/home.svg#img'},
            {label: 'Everyday banking', link: '/everyday-banking', img: '../../assets/icons/generic/wallet.svg#img'},
        ];
        this.isMenuOpen = false;
        this.backdropOpen = false;
        this.handleResize = this.handleResize.bind(this);
    }

    render() {
        return html`
            <header>
                <div class="gradient-line"></div>
                <div class="top-header">
                    <a class="logo" href="/">
                        <img alt="Swedbank logo" src="../../assets/branding/swedbank_logo.png">
                    </a>
                    <burger-component
                            .isMenuOpen=${this.isMenuOpen}
                            @click="${this.toggleMenu}"
                    </burger-component>
                </div>
                <nav>
                    <menu-component
                            .menuItems=${this.menuItems}
                            .isMenuOpen=${this.isMenuOpen}
                            @mouseover="${this.handleMouseEnter}"
                            @mouseout="${this.handleMouseOut}">
                    </menu-component>
                </nav>
            </header>
            <div class="backdrop" @click="${this.toggleMenu}"></div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        if (this.isMenuOpen) {
            this.toggleMenu();
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const targetElement = this.shadowRoot.querySelector('.backdrop');
        if (targetElement) {
            this.isMenuOpen ? targetElement.style.display = 'block' : targetElement.style.display = 'none'
        }
    }

    handleMouseEnter() {
        const targetElement = this.shadowRoot.querySelector('.backdrop');
        if (targetElement) {
            targetElement.style.display = 'block';
        }
    }

    handleMouseOut() {
        if (!this.isMenuOpen) {
            const targetElement = this.shadowRoot.querySelector('.backdrop');
            if (targetElement) {
                targetElement.style.display = 'none';
            }
        }
    }
}

customElements.define('swed-header', newHeader);