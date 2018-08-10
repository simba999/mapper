import {
  SHOW_CHECKOUT,
  HIDE_CHECKOUT,
  SHOW_SAVE_DESIGN,
  HIDE_SAVE_DESIGN,
  SHOW_EMAIL_COMPLETE,
} from '../actions/types';

const INITIAL_STATE = {
  saveDesign: {
    showEmailComplete: false,
    showPopup: false,
  },
  checkout: {
    showPopup: false,
  },
};

const popupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_CHECKOUT:
      return {
        ...state,
        checkout: {
          showPopup: { ...state.checkout, showPopup: true },
        },
      };

    case HIDE_CHECKOUT:
      return {
        ...state,
        checkout: { showPopup: false },
      };

    case SHOW_SAVE_DESIGN:
      return {
        ...state,
        saveDesign: { ...state.saveDesign, showPopup: true },
      };

    case HIDE_SAVE_DESIGN:
      return {
        ...state,
        saveDesign: { ...state.saveDesign, showPopup: false },
      };

    case SHOW_EMAIL_COMPLETE:
      return {
        ...state,
        saveDesign: { ...state.saveDesign, showEmailComplete: true },
      };

    default:
      return state;
  }
};

export default popupsReducer;
