import { LOAD_SECTIONS_SUCCESS } from '../actions/loadNewsRequest';

export default function sectionsReducer(state, action) {
  switch (action.type) {
    case LOAD_SECTIONS_SUCCESS:
      return {
        ...state,
        sectionsList: action.payload.sectionsList,
      };
  }
}
