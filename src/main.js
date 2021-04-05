import './styles/main.css';

import './components/news-block.component';
import './components/news-list.component';
import './components/active-page.component';

import api from './services/api.service';

async function fetchNews(page = 1) {
    const data = await api.getLatestNews(page);

    const newsList = document.querySelector('news-list');
    newsList.items = data?.response?.results;

    const pageSelect = document.querySelector('page-select');
    pageSelect.setAttribute('current', data?.response?.currentPage);
    pageSelect.setAttribute('total', data?.response?.pages);
}

function onInit() {
    fetchNews();
}

function onFetchRequest(event) {
    const page = Number.parseInt(event?.detail?.page);
    if (page) {
        fetchNews(page);
    }
}

document.addEventListener('DOMContentLoaded', onInit);
document.addEventListener('fetch-news', onFetchRequest);
