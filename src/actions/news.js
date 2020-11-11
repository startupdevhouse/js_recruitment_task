export const MARK_NEWS_AS_READ_LATER = 'MARK_NEWS_AS_READ_LATER';
export const UNMARK_NEWS_AS_READ_LATER = 'UNMARK_NEWS_AS_READ_LATER';

export function markNewsAsReadLater(id) {
    return {
        type: MARK_NEWS_AS_READ_LATER,
        payload: {
            news: {
                id
            }
        }
    };
}

export function unmarkNewsAsReadLater(id) {
    return {
        type: UNMARK_NEWS_AS_READ_LATER,
        payload: {
            news: {
                id
            }
        }
    };
}
  