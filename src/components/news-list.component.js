import EVENTS from '../constants/events.json';

const TEMPLATE_ID = 'news-list-template';
const CUSTOM_ELEMENT_NAME = 'news-list';

class NewsList extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));

        this._items = [];
    }

    static get observedAttributes() {
        return ['data-key'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'data-key' && oldVal !== newVal) {
            this.render();
        }
    }

    set items(value) {
        if (Array.isArray(value)) {
            this._items = value;
            this.setAttribute('data-key', Date.now());
        }
    }

    get items() {
        return this._items;
    }

    connectedCallback() {
        const el = this.shadow.querySelector('ul');
        el.addEventListener('click', this.onClick);
    }

    disconnectedCallback() {
        const el = this.shadow.querySelector('ul');
        el.removeEventListener('click', this.onClick);
    }

    onClick(e) {
        if (e.target.tagName === 'BUTTON') {
            const { url, id, title } = e.target.dataset;
            const event = new CustomEvent(EVENTS.READ_LATER, {
                bubbles: true,
                composed: true,
                detail: {
                    action: 'add',
                    id,
                    url,
                    title,
                },
            });

            this.dispatchEvent(event);
        }
    }

    render() {
        const ulNode = this.shadow.querySelector('ul');
        const nodes = [];

        for (let item of this._items) {
            const liNode = document.createElement('li');
            liNode.innerHTML = `<news-block data-id="${item.id}">
            <span slot="title">${item.webTitle}</span>
            <span slot="section-name">${item.sectionName}</span>
            <span slot="date">${item.webPublicationDate}</span>
            <a slot="button" href="${item.webUrl}" target="_blank">Full article</a>
            <button slot="readLater"
                data-id="${item.id}"
                data-title="${item.webTitle}"
                data-url="${item.webUrl}"
            >
                Read Later
            </button>
            </news-block>`;
            nodes.push(liNode);
        }
        if (nodes.length > 0) {
            ulNode.innerHTML = '';
            ulNode.append(...nodes);
        } else {
            ulNode.innerHTML = '<div>No results</div>';
        }
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, NewsList);
