import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class AccountOverview extends LitElement {
    static styles = css`
      :host {
        width: 100%;
        color: #574545;
      }

      a {
        color: #69a2ac;
      }

      .overview .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .header .title {
        display: flex;
        align-items: center;
        padding: 10px;
        font-weight: bold;
      }

      .download-icons {
        display: flex;
      }

      .download-icons a {
        display: inline-flex;
        padding-right: 10px;
        font-size: 14px;
        text-decoration: none;
        align-items: center;
      }

      .download-icons a img {
        padding-right: 5px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 5px;
        font-size: 13px;
      }

      th, td {
        border-bottom: 1px solid #ddd;
        padding: 10px;
        text-align: right;
      }

      tr {
        padding: 5px;
      }

      th {
        background-color: #e9f7fb;
        font-weight: normal;
        border: none;
      }

      th:first-child {
        text-align: left;
      }

      td:first-child {
        text-align: left;
      }

      tr:last-child td {
        border: none;
      }

      .final-row {
        font-weight: bold;
      }

      .final-row td:last-child {
        font-weight: normal;
        font-size: 25px;
      }

      .currency {
        font-size: 12px;
        color: #785f5f;
      }

      @media (max-width: 768px) {
        th, td {
          display: none;
        }

        th:first-child,
        th:last-child,
        td:first-child,
        td:last-child {
          display: table-cell;
        }
      }
    `;

    constructor() {
        super();
        this.accountData = [
            {
                name: 'Siim Tamm',
                accountNumber: 'EE752200221057734534',
                balance: '3 342 000.00',
                credit: '20.00',
                reserved: '725.00',
                available: '900.56',
                currency: 'EUR',
            },
            {
                name: 'Marju Lepik',
                accountNumber: 'EE752200221057734534',
                balance: '50.90',
                credit: '2000.00',
                reserved: '',
                available: '3 000.00',
                currency: 'EUR',
            },
            {
                name: 'Liina Roospõld',
                accountNumber: 'EE752200221057734534',
                balance: '12 041.00',
                credit: '20.00',
                reserved: '',
                available: '1300.12',
                currency: 'EUR',
            },
        ];
    }

    render() {
        return html`
            <div class="overview">
                <div class="header">
                    <div class="title">Your Swedbank overview</div>
                    <div class="download-icons">
                        <a class="icon" href="#">
                            <img class="menu-link-icon" src='../../assets/icons/generic/pdf.svg' alt='pdf'/>PDF
                        </a>
                        <a class="icon" href="#">
                            <img class="menu-link-icon" src='../../assets/icons/generic/pdf.svg' alt='pdf'/>XSL
                        </a>
                    </div>
                </div>
                <div class="balance-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Balance</th>
                                <th>Credit</th>
                                <th>Reserved</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.accountData.map((account) => html`
                                <tr>
                                    <td><a href="#">${account.name}</a> ${account.accountNumber}</td>
                                    <td>${account.balance}</td>
                                    <td>${account.credit}</td>
                                    <td>${account.reserved}</td>
                                    <td>${account.available} <span class="currency">${account.currency}</span></td>
                                </tr>
                            `)}
                            <tr class="final-row">
                                <td>Total:</td>
                                <td>5456.56</td>
                                <td>456.56</td>
                                <td></td>
                                <td>456.56 <span class="currency">EUR</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

customElements.define('account-overview', AccountOverview);