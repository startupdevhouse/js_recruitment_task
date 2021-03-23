import './styles/main.css';

// Please use https://open-platform.theguardian.com/documentation/

//selectors
const newsListElement = document.querySelector('.newsList');
const sectionSelectElement = document.querySelector('#sectionSelect');
const activePageSelectElement = document.querySelector('#activePageSelect');
const readLaterListElement = document.querySelector('.readLaterList');
const newsContentSearchElement = document.querySelector('#newsContentSearch');

//values
let currSearch = newsContentSearchElement.value;
let currSection = sectionSelectElement.value;
let currPage = activePageSelectElement.value;

const today = new Date(); //today's date
const startDate = new Date(new Date().setDate(today.getDate() - 30))
    .toISOString()
    .slice(0, 10); //30 days ago
const endDate = today.toISOString().slice(0, 10);

const saveToLocalStorage = (e, items) => {
    const item = items[e.target.dataset.index];
    const { id } = item;
    const jsonObj = JSON.stringify(item);
    localStorage.setItem(id, jsonObj);
    readFromLocalStorage();
};

const readFromLocalStorage = () => {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    const toRender = values
        ?.map(({ webTitle, webUrl, id }) => {
            return `
                <li class="readLaterItem>
                    <h4 class="readLaterItem-title">${webTitle}</h4>
                    <section>
                    <a href="${webUrl}" target="_blank" class="button button-clear">Read</a>
                    <button class="button button-clear remove-button" data-id="${id}">Remove</button>
                    </section>
                </li>
            `;
        })
        .join('');

    if (!toRender) {
        readLaterListElement.innerHTML =
      '<div><p>Nothing on your list yet... <br> Click "Read Later" to add items to your list</div>';
    } else {
        readLaterListElement.innerHTML = toRender;
    }
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((button) =>
        button.addEventListener('click', (e) => removeFromLocalStorage(e))
    );
};

const removeFromLocalStorage = (e) => {
    const itemId = e.target.dataset.id;
    localStorage.removeItem(itemId);
    readFromLocalStorage();
};

const loadData = async () => {
    const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
    const URL = 'https://content.guardianapis.com';
    const params = {
        q: currSearch ? currSearch : '',
        page: currPage ? currPage : 1,
        'from-date': startDate,
        'to-date': endDate,
        'api-key': API_KEY,
    };

    if (currSection !== 'all') params['section'] = currSection;

    const response = await fetch(URL + '/search?' + new URLSearchParams(params));
    const json = await response.json();
    console.log(json);
    return json;
};

const renderContent = (json) => {
    const pages = [{}];
    const pageAmount = json.response.pages;
    const items = json.response.results;

    const news = items
        ?.map(({ webTitle, sectionName, webPublicationDate, webUrl }, index) => {
            const date = new Date(webPublicationDate).toLocaleDateString('pl-PL');
            return `
                <li>
                    <article class="news">
                    <header>
                        <h3>${webTitle}</h3>
                    </header>
                    <section class="newsDetails">
                        <ul>
                        <li><strong>Section Name:</strong> ${sectionName}</li>
                        <li><strong>Publication Date:</strong> ${date}</li>
                        </ul>
                    </section>
                    <section class="newsActions">
                        <a href="${webUrl}" target="_blank" class="button">Full article</a>
                        <button class="button button-outline save-button" data-index="${index}">Read Later</button>
                    </section>
                    </article>
                </li>
                `;
        })
        .join('');

    //render active page list
    for (let i = 1; i <= pageAmount; i++) {
        pages.push(`<option value="${i}">${i}</option>`);
    }

    //render elements
    activePageSelectElement.innerHTML = pages;
    activePageSelectElement.value = currPage;
    newsListElement.innerHTML = news;

    //add functions to read later buttons
    const saveButtons = document.querySelectorAll('.save-button');
    saveButtons.forEach((button) =>
        button.addEventListener('click', (e) => saveToLocalStorage(e, items))
    );
};

//initial load data
loadData(currSection).then((data) => renderContent(data));
readFromLocalStorage();

//event listeners
sectionSelectElement?.addEventListener('change', (e) => {
    currSection = e.target.value.toLowerCase();
    currPage = 1;
    console.log(currSearch);
    loadData(currSection, currPage, currSearch).then((data) =>
        renderContent(data)
    );
});

activePageSelectElement?.addEventListener('change', (e) => {
    currPage = e.target.value;
    loadData(currSection, currPage, currSearch).then((data) =>
        renderContent(data)
    );
});

newsContentSearchElement?.addEventListener('input', (e) => {
    let timeout = null;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        currSearch = e.target.value;
        loadData(currSection, currPage, currSearch).then((data) =>
            renderContent(data)
        );
    }, 1000);
});
