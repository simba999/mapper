import { UPDATE_SHOW_TIME } from './types';

function action(parameter) {
  return { type: UPDATE_SHOW_TIME, parameter };
}

export default action;
