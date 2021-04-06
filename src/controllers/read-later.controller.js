import EVENTS from '../constants/events.json';
import { setItem, getItem } from '../services/local-storage.service';

const LS_KEY = 'read-later';
const MAX_LENGTH = 20;
const ACTION = {
    ADD: 'add',
    REMOVE: 'remove',
};

export default function ReadLaterController() {
    const state = {
        savedNews: getItem(LS_KEY) || {},
    };

    document.addEventListener(EVENTS.READ_LATER, onUpdate);

    render();

    function onUpdate(event) {
        if (
            event.detail.action === ACTION.ADD &&
            Object.keys(state.savedNews).length < MAX_LENGTH
        ) {
            state.savedNews[event.detail.id] = {
                title: event.detail.title,
                url: event.detail.url,
                id: event.detail.id,
            };
        } else if (event.detail.action === ACTION.REMOVE) {
            delete state.savedNews[event.detail.id];
        }

        saveStateToLocalStorage();
        render();
    }

    function saveStateToLocalStorage() {
        setItem(LS_KEY, state.savedNews);
    }

    function render() {
        document.querySelector('read-later-list').savedNews = Object.values(
            state.savedNews
        );
    }
}
