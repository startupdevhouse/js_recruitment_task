import './styles/main.css';

const newsListElement = document.querySelector('.newsList');

// Please use https://open-platform.theguardian.com/documentation/

const loadData = async () => {
    const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
    const URL = 'https://content.guardianapis.com';
    const section = 'search';

    const response = await fetch(`${URL}/${section}?api-key=${API_KEY}`);
    const json = await response.json();
    console.log(json);

    const news = json.response.results
        .map(
            (item) => `
    <li>
    <article class="news">
      <header>
        <h3>${item.webTitle}</h3>
      </header>
      <section class="newsDetails">
        <ul>
          <li><strong>Section Name:</strong> ${item.sectionName}</li>
          <li><strong>Publication Date:</strong>${item.webPublicationDate}</li>
        </ul>
      </section>
      <section class="newsActions">
        <a href="${item.webUrl}" class="button">Full article</a>
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

// console.log(news);
// const newsContent = loadNews(news);
