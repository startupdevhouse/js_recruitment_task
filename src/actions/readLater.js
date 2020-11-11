export const ADD_READ_LATER = 'ADD_READ_LATER';
export const REMOVE_READ_LATER = 'REMOVE_READ_LATER';

export function addReadLater(id, webTitle) {
    return {
        type: ADD_READ_LATER,
        payload: {
            readLater: {
                id,
                webTitle
            }
        }
    };
}

export function removeReadLater(id) {
    return {
        type: REMOVE_READ_LATER,
        payload: {
            readLater: {
                id
            }
        }
    };
}
