import './styles/main.css';

// Please use https://open-platform.theguardian.com/documentation/

//selectors
const newsListElement = document.querySelector('.newsList');
const sectionSelectElement = document.querySelector('#sectionSelect');
const activePageSelectElement = document.querySelector('#activePageSelect');
const readLaterListElement = document.querySelector('.readLaterList');
const newsContentSearchElement = document.querySelector('#newsContentSearch');
const errorElement = document.querySelector('.error');

//values
let currSearch = newsContentSearchElement.value;
let currSection = sectionSelectElement.value;
let currPage = activePageSelectElement.value;

const saveToLocalStorage = (e, items) => {
  const { id, webTitle, webUrl } = items[e.target.dataset.index];
  const item = { id, webTitle, webUrl, added: Date.now() };
  const obj = JSON.stringify(item);
  localStorage.setItem(id, obj);
  readFromLocalStorage();
};

const readFromLocalStorage = () => {
  const values = [];
  const keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) values.push(JSON.parse(localStorage.getItem(keys[i])));

  const render = values
    ?.sort((a, b) => b.added - a.added)
    ?.map(
      ({ id, webTitle, webUrl }) => `
            <li class="readLaterItem>
                <h4 class="readLaterItem-title">${webTitle}</h4>
                <section>
                <a href="${webUrl}" target="_blank" class="button button-clear">Read</a>
                <button class="button button-clear remove-button" data-id="${id}">Remove</button>
                </section>
            </li> `
    )
    .join('');

  if (!render) {
    readLaterListElement.innerHTML =
      '<div><p>Nothing on your list yet... <br> Click "Read Later" to add items to your list</div>';
  } else {
    readLaterListElement.innerHTML = render;
  }
  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) =>
    button.addEventListener('click', (e) => removeFromLocalStorage(e))
  );
};

const removeFromLocalStorage = (e) => {
  const { id } = e.target.dataset;
  localStorage.removeItem(id);
  readFromLocalStorage();
};

const getData = async () => {
  const API_KEY = '7eb760ef-b13f-409e-a7d0-0a7226c8356c';
  const URL = 'https://content.guardianapis.com';
  const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
  const params = {
    q: currSearch ? currSearch : '',
    page: currPage ? currPage : 1,
    'from-date': startDate.toISOString().slice(0, 10),
    'api-key': API_KEY,
  };

  if (currSection !== 'all') params['section'] = currSection;

  const resp = await fetch(
    URL + '/search?' + new URLSearchParams(params)
  ).catch(() => {
    errorElement.innerHTML =
      'Oops, we cannot get the latest news, please try again';
  });
  const json = await resp.json();
  return json;
};

const renderContent = (json) => {
  const pagesArr = [];
  const { pages } = json.response;
  const { results } = json.response;

  const news = results
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
  for (let i = 1; i <= pages; i++) {
    pagesArr?.push(`<option value="${i}">${i}</option>`);
  }

  //render elements
  activePageSelectElement.innerHTML = pagesArr;
  activePageSelectElement.value = currPage;
  newsListElement.innerHTML = news;

  //add functions to read-later buttons
  const saveButtons = document.querySelectorAll('.save-button');
  saveButtons?.forEach((button) =>
    button.addEventListener('click', (e) => saveToLocalStorage(e, results))
  );
};

const onLoad = () => {
  getData().then((data) => renderContent(data));
  readFromLocalStorage();

  //event listeners
  sectionSelectElement?.addEventListener('change', (e) => {
    currSection = e.target.value.toLowerCase();
    currPage = 1;
    getData().then((data) => renderContent(data));
  });

  activePageSelectElement?.addEventListener('change', (e) => {
    currPage = e.target.value;
    getData().then((data) => renderContent(data));
  });

  newsContentSearchElement?.addEventListener('input', (e) => {
    let timeout = null;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      currSearch = e.target.value;
      currPage = 1;
      getData().then((data) => renderContent(data));
    }, 1000);
  });
};

onLoad();
