export const UPDATE_SEARCH_CONTENT = 'UPDATE_SEARCH_CONTENT';

export function updateSearchContent(value = '') {
    return {
        type: UPDATE_SEARCH_CONTENT,
        payload: {
            searchContentValue: value
        }
    };
}
