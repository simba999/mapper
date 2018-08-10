import { SHOW_ERROR, HIDE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  showError: false,
  errorType: 'error',
  errorTitle: 'Uh Oh!',
  errorText: 'There was an error',
  errorStatus: null,
  confirmText: 'Ok',
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        showError: true,
        errorTitle: action.parameter.errorTitle,
        errorText: action.parameter.errorText,
        errorType: action.parameter.errorType,
        confirmText: action.parameter.confirmText || 'OK',
      };

    case HIDE_ERROR:
      return {
        ...state,
        showError: false,
      };

    default:
      return state;
  }
};

export default errorReducer;
