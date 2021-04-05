import EVENTS from '../constants/events.json';

const SEARCH_TIMEOUT_MS = 1000;
const TEMPLATE_ID = 'filter-search-template';
const INPUT_ID = 'newsContentSearch';
const CUSTOM_ELEMENT_NAME = 'filter-search';

class FilterSearch extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
        this.timer = null;
    }

    connectedCallback() {
        const selectElement = this.shadow.getElementById(INPUT_ID);
        selectElement.addEventListener('input', this.onUpdate);
    }

    disconnectedCallback() {
        const selectElement = this.shadow.getElementById(INPUT_ID);
        selectElement.removeEventListener('input', this.onUpdate);
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    onUpdate(event) {
        const phrase = event.target.value.trim().toLowerCase();

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            const e = new CustomEvent(EVENTS.FETCH_NEWS, {
                bubbles: true,
                composed: true,
                detail: {
                    phrase,
                },
            });

            this.dispatchEvent(e);
        }, SEARCH_TIMEOUT_MS);
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, FilterSearch);
