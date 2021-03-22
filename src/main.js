import './styles/main.css';

const newsListElement = document.querySelector('.newsList');
const sectionSelectElement = document.querySelector('#sectionSelect');

// Please use https://open-platform.theguardian.com/documentation/

const loadData = async (section) => {
    const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
    const URL = 'https://content.guardianapis.com';
    const slug = section ? section : 'search';

    const response = await fetch(`${URL}/${slug}?api-key=${API_KEY}`);
    const json = await response.json();
    console.log(json);

    const news = json.response.results
        .map(
            ({ webTitle, sectionName, webPublicationDate, webUrl }) => `
                <li>
                    <article class="news">
                    <header>
                        <h3>${webTitle}</h3>
                    </header>
                    <section class="newsDetails">
                        <ul>
                        <li><strong>Section Name:</strong> ${sectionName}</li>
                        <li><strong>Publication Date:</strong>${webPublicationDate}</li>
                        </ul>
                    </section>
                    <section class="newsActions">
                        <a href="${webUrl}" target="_blank" class="button">Full article</a>
                        <button class="button button-outline">Read Later</button>
                    </section>
                    </article>
                </li>
                `
        )
        .join('');

    newsListElement.innerHTML = news;
};

loadData();

sectionSelectElement.addEventListener('change', (e) => {
    let section = e.target.value.toLowerCase();
    if (section === 'all') section = 'search';
    loadData(section);
});
