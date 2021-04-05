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
            </news-block>`;
            nodes.push(liNode);
        }
        ulNode.innerHTML = '';
        ulNode.append(...nodes);
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, NewsList);
