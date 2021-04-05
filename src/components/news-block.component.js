const TEMPLATE_ID = 'news-block-template';
const CUSTOM_ELEMENT_NAME = 'news-block';

class NewsBlock extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById(TEMPLATE_ID);
        this.attachShadow({ mode: 'open' }).appendChild(
            template.content.cloneNode(true)
        );
    }
}

window.customElements.define(CUSTOM_ELEMENT_NAME, NewsBlock);
