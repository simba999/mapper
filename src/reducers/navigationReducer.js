import { UPDATE_STEP } from '../actions/types';

const INITIAL_STATE = {
  step: 1,
};

const navigationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STEP:
      return {
        ...state,
        step: action.parameter,
      };

    default:
      return state;
  }
};

export default navigationReducer;
