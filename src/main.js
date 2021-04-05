import './styles/main.css';

import './components/news-block.component';
import './components/news-list.component';
import './components/page-select.component';
import './components/filter-section.component';
import './components/filter-search.component';

import NewsController from './controllers/news.controller';

document.addEventListener('DOMContentLoaded', () => {
    NewsController();
});
