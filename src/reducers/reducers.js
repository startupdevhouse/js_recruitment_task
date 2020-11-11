import newsListReducer from './newsListReducer';
import readLaterReducer from './readLaterReducer';
import newsReducer from './newsReducer';
import searchReducer from './searchReducer';
import sectionsReducer from './sectionsReducer';

const reducersList = [
    newsListReducer,
    readLaterReducer,
    newsReducer,
    searchReducer,
    sectionsReducer
];

export default function reducers(state, action) {
    let result = state;
    const reducersLength = reducersList.length;

    if (action) {
        for(let i = 0; i < reducersLength; i++) {
            const reducer = reducersList[i];
            const reducerResult = reducer(state, action);

            if (reducerResult) {
                result = reducerResult;
                break;
            }
        }
    }

    console.log('newState', result);

    return result;
}