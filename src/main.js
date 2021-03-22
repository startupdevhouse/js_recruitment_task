import './styles/main.css';

// Please use https://open-platform.theguardian.com/documentation/

//selectors
const newsListElement = document.querySelector('.newsList');
const sectionSelectElement = document.querySelector('#sectionSelect');
const activePageSelectElement = document.querySelector('#activePageSelect');

let currSection = 'search';
let currPage = 1;

const today = new Date(); //today's date
const startDate = new Date(new Date().setDate(today.getDate() - 30))
    .toISOString()
    .slice(0, 10); //30 days ago
const endDate = today.toISOString().slice(0, 10);

const loadData = async (section, page) => {
    const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
    const URL = 'https://content.guardianapis.com';
    const slug = section ? section : 'search';
    const pageNr = page ? page : 1;

    const response = await fetch(
        `${URL}/${slug}?api-key=${API_KEY}&page=${pageNr}&from-date=${startDate}&to-date=${endDate}`
    );
    const json = await response.json();
    console.log(json);

    const news = json.response.results
        .map(({ webTitle, sectionName, webPublicationDate, webUrl }) => {
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
                        <button class="button button-outline">Read Later</button>
                    </section>
                    </article>
                </li>
                `;
        })
        .join('');

    // const pages = [];
    // for (let i = 0; i < json.response.pages; i++) {
    //     pages.push(`<option value="${page}">${page}</option>`);
    // }

    // activePageSelectElement.innerHTML = pages;
    newsListElement.innerHTML = news;
};

loadData(currSection);

//event listeners
sectionSelectElement.addEventListener('change', (e) => {
    currSection = e.target.value.toLowerCase();
    if (currSection === 'all') currSection = 'search';
    loadData(currSection);
});

activePageSelectElement.addEventListener('change', (e) => {
    currPage = e.target.value;
    console.log(currPage);
    loadData(currSection, currPage);
});
