import { MARK_NEWS_AS_READ_LATER, UNMARK_NEWS_AS_READ_LATER } from '../actions/news';

export default function newsReducer(state, action) {
    switch (action.type) {
    case MARK_NEWS_AS_READ_LATER:
        return {
            ...state,
            newsList: state.newsList.reduce((result, news) => {
                if(news.id === action.payload.news.id) {
                    news.disabled = true;
                }
                return result.concat([news]);
            }, [])
        };

    case UNMARK_NEWS_AS_READ_LATER:
        return {
            ...state,
            newsList: state.newsList.reduce((result, news) => {
                if(news.id === action.payload.news.id) {
                    news.disabled = false;
                }
                return result.concat([news]);
            }, [])
        };
    }
}
