import { UPDATE_STEP } from './types';

function action(parameter) {
  return { type: UPDATE_STEP, parameter };
}

export default action;
