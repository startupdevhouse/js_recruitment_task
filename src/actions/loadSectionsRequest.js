import { dispatch } from '../store/store';
import { getUrl, URL_SECTIONS_TYPE } from '../utils/url';

export const LOAD_SECTIONS_REQUEST = 'LOAD_SECTIONS_REQUEST';
export const LOAD_SECTIONS_FAILURE = 'LOAD_SECTIONS_FAILURE';
export const LOAD_SECTIONS_SUCCESS = 'LOAD_SECTIONS_SUCCESS';

function loadSectionsSuccess(data) {
    return {
        type: LOAD_SECTIONS_SUCCESS,
        payload: {
            sectionsList: data.response.results
        }
    };
}

export function loadSectionsRequest(searchParams) {
    return ((url) => {
        fetch(url)
            .then(res => {
                res.json().then((data) => {
                    dispatch(loadSectionsSuccess(data));
                });
            }, err => {
                console.log(err);
                // @TODO add error exaption
            });
    })(getUrl(URL_SECTIONS_TYPE, searchParams));
}
