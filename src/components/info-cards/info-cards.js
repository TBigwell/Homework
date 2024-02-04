import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class InfoCards extends LitElement {
    static styles = css`
      :host {
        font-size: 14px;
      }

      .card-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }
    `;

    constructor() {
        super();
        this.customList = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ];
    }

    render() {
        return html`
            <div class="card-container">
                <card-content cardTitle="Open" 
                              cardColor="blue" 
                              contentTitle="One of the core values of Swedbank"
                              customContent>
                    <div slot="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </div>
                </card-content>
                <card-content cardTitle="Caring" 
                              cardColor="yellow" 
                              readMoreLink="#" 
                              customContent>
                    <div slot="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                    </div>
                </card-content>
                <card-content cardTitle="Simple" 
                              cardColor="pink" 
                              .customList="${this.customList}">
                </card-content>
            </div>
        `;
    }
}

customElements.define('info-cards', InfoCards);