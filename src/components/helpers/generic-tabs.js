import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class GenericTabs extends LitElement {
    static properties = {
        selectedIndex: {type: Number}
    };

    static styles = css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;
      }

      .tabs {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
      }

      .tabs ::slotted(*) {
        padding: 20px;
        user-select: none;
        cursor: pointer;
        background: #efefef;
        border-radius: 3px 3px 0 0;
        margin-right: 1px;
      }

      .tabs ::slotted(.selected) {
        background: white;
      }

      .tab-contents ::slotted(*) {
        display: none;
        background-color: white;
      }

      .tab-contents ::slotted(.selected) {
        display: block;
        padding: 20px;
        border-radius: 0 3px 3px 3px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
      }
    `;

    constructor() {
        super();
        this.selectedIndex = 0;
    }

    render() {
        return html`
            <div class="tabs">
                <slot id="tab-slot" name="tab"></slot>
            </div>
            <div class="tab-contents">
                <slot id="content-slot" name="content"></slot>
            </div>
        `;
    }

    firstUpdated() {
        this.cacheDom();
        this.attachEvents();
        this.selectTabByIndex(this.selectedIndex);
    }

    cacheDom() {
        this.dom = {
            tabSlot: this.shadowRoot.getElementById('tab-slot'),
            contentSlot: this.shadowRoot.getElementById('content-slot'),
        };
        this.dom.tabs = this.dom.tabSlot.assignedElements();
        this.dom.contents = this.dom.contentSlot.assignedElements();
    }

    attachEvents() {
        this.dom.tabSlot.addEventListener('click', this.onTabClick.bind(this));
        this.dom.tabSlot.addEventListener('slotchange', this.onTabSlotChange.bind(this));
        this.dom.contentSlot.addEventListener('slotchange', this.onContentSlotChange.bind(this));
    }

    onTabSlotChange() {
        this.dom.tabs = this.dom.tabSlot.assignedElements();
    }

    onContentSlotChange() {
        this.dom.contents = this.dom.contentSlot.assignedElements();
    }

    onTabClick(e) {
        const target = e.target;
        if (target.slot === 'tab') {
            const tabIndex = this.dom.tabs.indexOf(target);
            this.selectTabByIndex(tabIndex);
        }
    }

    selectTabByIndex(index) {
        const tab = this.dom.tabs[index];
        const content = this.dom.contents[index];
        if (!tab || !content) return;
        this.dom.contents.forEach(p => p.classList.remove('selected'));
        this.dom.tabs.forEach(p => p.classList.remove('selected'));
        content.classList.add('selected');
        tab.classList.add('selected');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'selected-index') {
                this.selectedIndex = parseInt(newValue);
            } else {
                this[name] = newValue;
            }
        }
    }
}

customElements.define('generic-tabs', GenericTabs);