import renderApp from './views/renderApp';
import { createStore, getState, subscribe, dispatch } from './store/store';
import { attachEventListeners } from './controllers/controllers';
import { loadNewsRequest } from './actions/loadNewsRequest';
import { loadSectionsRequest } from './actions/loadSectionsRequest';
import { saveStateToStorage, getStateFromStorage } from './utils/storage';

import './styles/main.css';

const render = (state) => {
    const wrapperNodes = document.getElementsByClassName('wrapper');

    if (wrapperNodes.length > 0) {
        const wrapperNode = wrapperNodes[0];
        wrapperNode.innerHTML = renderApp(state);
    }
};

const storageState = getStateFromStorage();
const initialState = {
    newsList: [],
    readLaterList: [],
    sectionsList: [],
    searchContentValue: ''
};

createStore({ ...initialState, ...storageState });
dispatch(loadNewsRequest());
dispatch(loadSectionsRequest());
attachEventListeners();
render(getState());
subscribe(() => { render(getState()); });
subscribe(() => { saveStateToStorage(getState()); });

// Please use https://open-platform.theguardian.com/documentation/
