import './styles/main.css';

import './components/news-block/news-block.component';
import './components/news-block/news-list.component';

import api from './services/api.service';

async function init() {
    const data = await api.getLatestNews();
    const newsList = document.querySelector('news-list');
    newsList.items = data?.response?.results;
}

document.addEventListener('DOMContentLoaded', init);
