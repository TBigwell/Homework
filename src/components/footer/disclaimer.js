import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Disclaimer extends LitElement {
    static styles = css`
    .disclaimer {
      padding: 30px;
      display: flex;
      justify-content: center;
      background-color: white;
    }

    .disclaimer p {
      font-size: 10px;
      padding: 0px;
      margin: 0px;
      max-width: 876px;
      line-height: 16px;
      text-align: center;
    }
  `;

    render() {
        return html`
      <div class="disclaimer">
        <p>
          This is a website of companies offering financial services – Swedbank AS, Swedbank Liising AS,
          Swedbank P&amp;C Insurance AS, Swedbank Life Insurance SE, and Swedbank Investeerimisfondid AS.
          Before entering into any agreement read the terms and conditions of the respective service.
          Consult a specialist, where necessary.
          Swedbank AS does not provide a credit advisory service for the purposes of the Creditors and
          Credit Intermediaries Act. The borrower makes the decision of taking out a loan, who assesses the
          suitability of the loan product and contractual terms to his/her personal loan interest, need and
          financial situation on the basis of the information and warnings presented by the bank and is
          responsible for the consequences related to concluding the agreement.
        </p>
      </div>
    `;
    }
}

customElements.define('swed-disclaimer', Disclaimer);