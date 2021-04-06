import './styles/main.css';

import './components/news-block.component';
import './components/news-list.component';
import './components/page-select.component';
import './components/filter-section.component';
import './components/filter-search.component';
import './components/read-later.component';

import NewsController from './controllers/news.controller';
import ReadLaterController from './controllers/read-later.controller';

document.addEventListener('DOMContentLoaded', () => {
    NewsController();
    ReadLaterController();
});
