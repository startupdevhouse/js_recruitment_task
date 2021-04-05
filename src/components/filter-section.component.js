import EVENTS from '../constants/events.json';

const TEMPLATE_ID = 'filter-section-template';
const SELECT_ID = 'sectionSelect';
const CUSTOM_ELEMENT_NAME = 'filter-section';

class FilterSection extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const selectElement = this.shadow.getElementById(SELECT_ID);
        selectElement.addEventListener('change', this.onSelect);
    }

    disconnectedCallback() {
        const selectElement = this.shadow.getElementById(SELECT_ID);
        selectElement.removeEventListener('change', this.onSelect);
    }

    onSelect(event) {
        const e = new CustomEvent(EVENTS.FETCH_NEWS, {
            bubbles: true,
            composed: true,
            detail: {
                section: event.target.value,
            },
        });

        this.dispatchEvent(e);
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, FilterSection);
