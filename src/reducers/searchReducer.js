import { UPDATE_SEARCH_CONTENT } from '../actions/search';

export default function searchReducer(state, action) {
    switch (action.type) {
    case UPDATE_SEARCH_CONTENT:
        return {
            ...state,
            searchContentValue: action.payload.searchContentValue
        };
    }
}