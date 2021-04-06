import EVENTS from '../constants/events.json';

const TEMPLATE_ID = 'read-later-template';
const CUSTOM_ELEMENT_NAME = 'read-later-list';

class ReadLaterList extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);

        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.appendChild(template.content.cloneNode(true));

        this._savedNews = [];
    }

    static get observedAttributes() {
        return ['data-key'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'data-key' && oldVal !== newVal) {
            this.render();
        }
    }

    set savedNews(value) {
        if (Array.isArray(value)) {
            this._savedNews = value;
            this.setAttribute('data-key', Date.now());
        }
    }

    get savedNews() {
        return this._savedNews;
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
            const { id } = e.target.dataset;
            const event = new CustomEvent(EVENTS.READ_LATER, {
                bubbles: true,
                composed: true,
                detail: {
                    action: 'remove',
                    id,
                },
            });

            this.dispatchEvent(event);
        }
    }

    render() {
        const ulNode = this.shadow.querySelector('ul');
        const nodes = [];

        for (let item of this._savedNews) {
            const liNode = document.createElement('li');
            liNode.innerHTML = `<h4>${item.title}</h4>
            <section>
              <a href="${item.url}" target="_blank">Read</a>
              <button data-id="${item.id}">Remove</button>
            </section>`;
            nodes.push(liNode);
        }

        if (nodes.length > 0) {
            ulNode.innerHTML = '';
            ulNode.append(...nodes);
        } else {
            ulNode.innerHTML = '<div>List is empty</div>';
        }
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, ReadLaterList);
