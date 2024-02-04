import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class WelcomePanel extends LitElement {
    static styles = css`
      :host {
        width: 100%;
        display: flex;
        font-size: 14px;
      }

      .welcome-container {
        display: flex;
        width: 100%;
        margin: 10px;
        padding: 20px;
        background-color: #ebf8f2;
      }

      .welcome-logo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: #fdc129;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        margin-right: 20px;
        margin-bottom: 20px;
        position: relative;
      }

      .welcome-logo::after {
        position: absolute;
        bottom: -13px;
        left: calc(50% - 18px);
        content: "";
        width: 36px;
        height: 36px;
        transform: rotateY(35deg) rotateZ(45deg);
        background-color: #fdc129;
        border-radius: 10rem 0px 0px;
      }

      .container {
        flex: 1;
      }

      .go-button {
        background-color: #ee7023;
        color: white;
        padding: 8px 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .title h2 {
        color: #512b2b;
        margin-bottom: 10px;
      }

      .text {
        font-size: 13px;
        color: #512b2b;
      }

      .links {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
      }

      .read-more {
        text-decoration: none;
        margin-left: -4px;
        color: #2f7e8a;
        margin: auto 0;
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
        .welcome-container {
          flex-wrap: wrap;
          padding: 10px;
          margin: 0;
        }

        .container {
          width: 100%;
        }

        .logo-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .welcome-logo {
          margin-bottom: 20px;
          margin-right: 0px;
        }

        .links {
          flex-wrap: wrap;
        }

        .go-button {
          margin-top: 10px;
          width: 100%;
        }
      }
    `;

    render() {
        return html`
            <div class="welcome-container">
                <div class="logo-container">
                    <div class="welcome-logo">Hello world!</div>
                </div>
                <div class="container">
                    <div class="row title"><h2>Welcome to Swedbank!</h2></div>
                    <div class="row text">
                        With 7.2 million private customers and more than 574 000 corporate and
                        organisational customers. This makes us Sweden's largest bank in terms of number of customers
                        and gives us a leading position in our other home markets of Estonia, Latvia and Lithuania. As a
                        major bank, we are a significant part of the financial system and play an important role in the
                        local communities we serve. We are dedicated to helping our customers, our shareholders and
                        society as a whole stay financially sound and sustainable.
                    </div>
                    <div class="row links">
                        <a href="#" class="read-more"><span class="arrow-right"></span>Read more</a>
                        <a class="go-button">Go</a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('welcome-panel', WelcomePanel);