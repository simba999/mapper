import { UPDATE_MAX_LINES } from './types';

function action(parameter) {
  return { type: UPDATE_MAX_LINES, parameter };
}

export default action;
