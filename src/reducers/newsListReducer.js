import { LOAD_NEWS_SUCCESS } from '../actions/loadNewsRequest';

export default function newsListReducer(state, action) {
    const readLaterListIds = state.readLaterList.map(({ id }) => id);

    switch (action.type) {
    case LOAD_NEWS_SUCCESS:
        return {
            ...state,
            newsList: action.payload.newsList.reduce((result, news) => {
                if (readLaterListIds.includes(news.id)) {
                    news.disabled = true;
                }
                return result.concat([news]);
            }, [])
        };
    }
}