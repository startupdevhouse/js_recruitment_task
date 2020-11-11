import { ADD_READ_LATER, REMOVE_READ_LATER } from '../actions/readLater';

export default function readLaterReducer(state, action) {
    switch (action.type) {
    case ADD_READ_LATER:
        return {
            ...state,
            readLaterList: state.readLaterList.concat([action.payload.readLater])
        };
    case REMOVE_READ_LATER:
        return {
            ...state,
            readLaterList: state.readLaterList.filter(item => item.id !== action.payload.readLater.id)
        };
    }
}