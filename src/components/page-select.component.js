import EVENTS from '../constants/events.json';

const TEMPLATE_ID = 'page-select-template';
const SELECT_ID = 'activePageSelect';
const CUSTOM_ELEMENT_NAME = 'page-select';

class PageSelect extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['current', 'total'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'total' && oldVal !== newVal) {
            this.render(newVal);
        }
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
                page: event.target.value,
            },
        });

        this.dispatchEvent(e);
    }

    render(total) {
        const totalPages = Number.parseInt(total);
        if (totalPages) {
            const options = [];
            for (let i = 1; i <= totalPages; i++) {
                const optionNode = document.createElement('option');
                optionNode.setAttribute('value', i);
                optionNode.innerText = i;
                options.push(optionNode);
            }
            const selectNode = this.shadow.getElementById(SELECT_ID);
            selectNode.innerHTML = '';
            selectNode.append(...options);
        }
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, PageSelect);
