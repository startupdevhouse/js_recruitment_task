import EVENTS from '../constants/events.json';
import api from '../services/api.service';

const DEFAULT_PAGE = 1;

export default function NewsController() {
    const state = {
        isLoading: false,
        filterQuery: '',
        filterSection: '',
        pageCurrent: DEFAULT_PAGE,
        pageTotal: DEFAULT_PAGE,
        news: [],
    };

    document.addEventListener(EVENTS.FETCH_NEWS, onFetchRequest);

    fetchNews();

    function onFetchRequest(event) {
        const page = Number.parseInt(event?.detail?.page);
        const { section, phrase } = event?.detail;

        if (typeof phrase === 'string') {
            state.filterQuery = phrase;
            state.pageCurrent = DEFAULT_PAGE;
        } else if (section) {
            state.filterSection = section !== 'all' ? section : null;
            state.pageCurrent = DEFAULT_PAGE;
        } else {
            state.pageCurrent = page;
        }

        fetchNews();
    }

    async function fetchNews() {
        const data = await api.getLatestNews(
            state.pageCurrent,
            state.filterSection,
            state.filterQuery
        );
        const response = data?.response || {};
        const items = response.results || [];
        const news = items.map((item) => ({
            ...item,
            webPublicationDate: new Date(
                item.webPublicationDate
            ).toLocaleDateString(),
        }));

        state.news = news;
        state.pageCurrent = response.currentPage;
        state.pageTotal = response.pages;

        render();
    }

    function render() {
        document.querySelector('news-list').items = state.news;

        const pageSelect = document.querySelector('page-select');
        pageSelect.setAttribute('current', state.pageCurrent);
        pageSelect.setAttribute('total', state.pageTotal);
    }
}
