import { UPDATE_SEARCH_REQUEST, RESET_SEARCH } from '../constants/actionTypes';

const search = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_REQUEST:
      return action.text;
    case RESET_SEARCH:
      return '';
    default:
      return state;
  }
};

export default search;
