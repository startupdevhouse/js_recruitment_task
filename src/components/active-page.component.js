class ActivePageSelect extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('page-select-template');
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
        const selectElement = this.shadow.getElementById('activePageSelect');
        selectElement.addEventListener('change', this.onSelect);
    }

    disconnectedCallback() {
        const selectElement = this.shadow.getElementById('activePageSelect');
        selectElement.removeEventListener('change', this.onSelect);
    }

    onSelect(event) {
        const e = new CustomEvent('fetch-news', {
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
            const selectNode = this.shadow.getElementById('activePageSelect');
            selectNode.innerHTML = '';
            selectNode.append(...options);
        }
    }
}

window.customElements.define('page-select', ActivePageSelect);
