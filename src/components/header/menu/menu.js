import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MenuComponent extends LitElement {
    static properties = {
        menuItems: {type: Array},
        isMenuOpen: {type: Boolean},
    };

    static styles = css`
      :host {
        width: 100%;
      }

      .menu {
        display: flex;
        width: 100%;
      }

      .menu-item {
        list-style: none;
        margin: 0;
        flex: 1;
        text-align: center;
        border-right: 2px solid #f0ede9;
        border-top: solid 2px #f0ede9;
        justify-content: center;
      }

      .menu-item:last-child {
        border-right: none;
      }

      .menu-item:hover {
        background-color: #fdf8f4;
        transition: all 0.3s ease-in-out;
        border-top: solid 2px #f8a480;
      }

      .menu-item.active a {
        color: #ed6816;
      }

      .menu-item.active img {
        filter: invert(20%) sepia(243%) saturate(1576%) hue-rotate(-21deg) brightness(137%) contrast(73%);
      }

      .menu-link {
        text-decoration: none;
        color: #512b2b;
        padding: 1em;
        display: block;
        text-align: center;
      }

      @media (max-width: 768px) {
        .menu {
          display: none;
          flex-direction: column;
          width: 100%;
        }

        .menu.active {
          display: flex;
          position: absolute;
          width: 100%;
          background: white;
          top: 0;
        }

        .menu-item {
          border-bottom: solid 1px #f0ede9;
          border-right: none;
          justify-content: left;
        }

        .menu-link {
          text-align: left;
        }

        .menu-item img {
          display: none;
        }
      }

    `;

    render() {
        return html`
            <div class="menu ${this.isMenuOpen ? 'active' : ''}"
                 @mouseover="${this.handleMouseEnter}"
                 @mouseout="${this.handleMouseOut}">
                ${this.menuItems.map((item) => html`
                    <div class="menu-item ${window.location.pathname == item.link ? 'active' : ''}">
                        <a class="menu-link" href=${item.link}>
                            <img class="menu-link-icon" src=${item.img} alt=${item.label}/>
                            <div class="menu-link-label">
                                ${item.label}
                            </div>
                        </a>
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('menu-component', MenuComponent);