import EVENTS from '../constants/events.json';
import { setItem, getItem } from '../services/local-storage.service';

const LS_KEY = 'read-later';
const MAX_LENGTH = 20;

export default function ReadLaterController() {
    const state = {
        savedNews: getItem(LS_KEY) || {},
    };

    document.addEventListener(EVENTS.READ_LATER, onUpdate);

    render();

    function onUpdate(event) {
        if (
            event.detail.action === 'add' &&
            Object.keys(state.savedNews).length < MAX_LENGTH
        ) {
            console.log();
            state.savedNews[event.detail.id] = {
                title: event.detail.title,
                url: event.detail.url,
                id: event.detail.id,
            };
        } else if (event.detail.action === 'remove') {
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
