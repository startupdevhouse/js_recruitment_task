import { dispatch, getState } from '../store/store';
import { addReadLater, removeReadLater } from '../actions/readLater';
import { markNewsAsReadLater, unmarkNewsAsReadLater } from '../actions/news';
import { loadNewsRequest } from '../actions/loadNewsRequest';
import { updateSearchContent } from '../actions/search';

export function attachEventListeners() {
    document.addEventListener('click', (event) => {
        if (event.target.matches('[data-role="read-later-add"]')) {
            const state = getState();
            const activeNewsId = event.target.getAttribute('data-id');
            const activeNews = state.newsList.find((news) => news.id === activeNewsId);
            dispatch(markNewsAsReadLater(activeNews.id));
            dispatch(addReadLater(activeNews.id, activeNews.webTitle));
        }

        if (event.target.matches('[data-role="read-later-remove"]')) {
            const activeReadLaterId = event.target.getAttribute('data-id');
            dispatch(unmarkNewsAsReadLater(activeReadLaterId));
            dispatch(removeReadLater(activeReadLaterId));
        }
    });

    document.addEventListener('change', (event) => {
        if (event.target.matches('[data-role="content-search"]')) {
            dispatch(updateSearchContent(event.target.value));
            dispatch(loadNewsRequest({ q: event.target.value }));
        }
    });
  
}