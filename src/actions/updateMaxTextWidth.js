import { UPDATE_MAX_TEXT_WIDTH } from './types';

function action(parameter) {
  return { type: UPDATE_MAX_TEXT_WIDTH, parameter };
}

export default action;
