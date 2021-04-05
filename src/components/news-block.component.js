class NewsBlock extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('news-block-template');
        this.attachShadow({ mode: 'open' }).appendChild(
            template.content.cloneNode(true)
        );
    }
}

window.customElements.define('news-block', NewsBlock);
