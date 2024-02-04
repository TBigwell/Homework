import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class FooterMenu extends LitElement {
    static properties = {
        menuItems: {type: Array},
        socialIcons: {type: Array},
    };

    static styles = css`
      .footer-menu {
        display: flex;
      }

      .menu-column {
        width: 100%;
        float: left;
        box-sizing: border-box;
        padding: 0 20px;
        text-align: left;
        max-height: 1000px;
      }

      .menu-column h3 span {
        display: none;
      }

      .menu-column.contacts {
        max-height: none;
      }

      .menu-column.show {
        display: block;
      }

      h3 {
        margin: 14px 0;
        font-weight: normal;
      }

      a {
        color: #512b2b;
        text-decoration: none;
        display: block;
        margin-bottom: 10px;
        font-size: 15px;
        margin-left: -4px;
      }

      a:hover {
        color: #3a1f1f;
      }

      .footer-container {
        max-width: 1220px;
        margin: 0px auto;
        display: flex;
        flex-direction: column;
        padding: 0 30px 20px 30px;
      }

      .contacts .number {
        color: #f35b1c;
        font-size: 37px;
        font-weight: bold;
      }

      .contacts .email a {
        text-decoration: underline;
        color: #4c8f98;
        padding: 10px 0;
        margin-left: 0;
      }

      .social-icons {
        padding-top: 20px;
        display: flex;
      }

      .social-icon {
        padding-right: 15px;
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
        border-left: 5px solid #4e2727;
        pointer-events: none;
      }

      .arrow {
        position: relative;
      }

      .menu-column .arrow::after {
        content: '';
        position: absolute;
        top: calc(50% - 6px);
        right: 0px;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 12px solid #f35b1c;
        pointer-events: none;
      }

      .menu-column.open .arrow::after {
        border-bottom: 12px solid #4e2727;
        border-top: 0;
      }

      .menu-column .arrow::before {
        content: '';
        position: absolute;
        top: calc(50% - 7px);
        right: 4px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #ebe7e2;
        pointer-events: none;
        z-index: 1;
      }

      .menu-column.open .arrow::before {
        border-bottom: 8px solid #ebe7e2;
        top: calc(50% - 1px);
        border-top: 0;
        z-index: 1;
      }

      @media (min-width: 768px) {
        .menu-column:first-child {
          padding-left: 0;
        }

        .menu-column:last-child {
          padding-right: 0;
        }
      }

      @media (max-width: 768px) {
        h3 {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        h3 span {
          color: #ed6816;
        }

        .disclaimer {
          padding: 30px 10px;
        }

        .footer-container {
          padding: 0 0 20px 0;
        }

        .footer-menu {
          display: block;
        }

        .menu-column {
          padding: 0px 20px;
        }

        .menu-column h3 span {
          display: block;
        }

        .menu-column.open {
          max-height: 1000px;
        }

        .menu-column {
          width: 100%;
          max-height: 50px;
          overflow: hidden;
          border-bottom: 1px solid lightgray;
        }
      }
    `;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleToggleColumn.bind(this));
        this.addEventListener('touchstart', this.handleToggleColumn.bind(this));
    }

    handleToggleColumn(event) {
        const h3Element = event.target;
        if (h3Element.tagName === 'H3') {
            const menuColumn = h3Element.nextElementSibling;
            menuColumn.classList.toggle('show');
        }
    }

    constructor() {
        super();

        this.menuItems = [
            {
                title: 'Quicklinks',
                items: [
                    'Calculators',
                    'Prices',
                    'Terms of service',
                    'Privacy and security',
                ],
            },
            {
                title: 'Join Swedbank',
                items: [
                    'Client programs',
                    'Business customers',
                    'Jobs',
                    'Internship',
                ],
            },
            {
                title: 'Products',
                items: [
                    'Everyday banking',
                    'Loans',
                    'Insurance',
                    'Cards',
                    'Stocks',
                ],
            },
        ];
        this.socialIcons = [
            {href: '/facebook', src: '../../assets/icons/social/facebook.svg', alt: 'facebook'},
            {href: '/instagram', src: '../../assets/icons/social/instagram.svg', alt: 'instagram'},
            {href: '/youtube', src: '../../assets/icons/social/youtube.svg', alt: 'youtube'},
            {href: '/twitter', src: '../../assets/icons/social/twitter.svg', alt: 'twitter'},
            {href: '/skype', src: '../../assets/icons/social/skype.svg', alt: 'skype'},
        ];
    }

    render() {
        return html`
            <div class="footer-container">
                <div class="footer-menu">
                    <div class="menu-column contacts">
                        <h3>Contact</h3>
                        <div class="number">6 310 310</div>
                        <div class="email"><a href="mailto:info@swedbank.com">info@swedbank.ee</a></div>
                        <div class="firm-name">SWEDBANK AS</div>
                        <div class="location">Liivalaia 8, 15040 Tallinn</div>
                        <div class="swift">SWIFT kood/BIC: HABAEE2X</div>
                        <div class="reg-nr">Reg. number. 10060701</div>
                        <div class="social-icons">
                            ${this.socialIcons.map((icon) => html`
                                <a class="social-icon" href="${icon.href}">
                                    <img class="svg-icon" src="${icon.src}" alt="${icon.alt}">
                                </a>
                            `)}
                        </div>
                    </div>
                    ${this.menuItems.map((menu) => html`
                        <div class="menu-column">
                            <h3 @click="${this.toggleMenu}">${menu.title}<span class="arrow"></span></h3>
                            ${menu.items.map((item) => html`
                                <a href="#"><span class="arrow-right"></span>${item}</a>
                            `)}
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    toggleMenu(event) {
        const clickedElement = event.target;

        let parentElement = clickedElement;
        while (parentElement && !parentElement.classList.contains('menu-column')) {
            parentElement = parentElement.parentElement;
        }

        if (parentElement) {
            parentElement.classList.toggle('open');
        }
    }
}

customElements.define('footer-menu', FooterMenu);