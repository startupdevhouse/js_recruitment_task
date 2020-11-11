import { dispatch } from '../store/store';
import { getUrl, URL_SEARCH_TYPE } from '../utils/url';

export const LOAD_NEWS_REQUEST = 'LOAD_NEWS_REQUEST';
export const LOAD_NEWS_FAILURE = 'LOAD_NEWS_FAILURE';
export const LOAD_NEWS_SUCCESS = 'LOAD_NEWS_SUCCESS';

function loadNewsSuccess(data) {
    return {
        type: LOAD_NEWS_SUCCESS,
        payload: {
            newsList: data.response.results
        }
    };
}

export function loadNewsRequest(searchParams) {
    return ((url) => {
        fetch(url)
            .then(res => {
                res.json().then((data) => {
                    dispatch(loadNewsSuccess(data));
                });
            }, err => {
                console.log(err);
                // @TODO add error exaption
            });
    })(getUrl(URL_SEARCH_TYPE, searchParams));
}
