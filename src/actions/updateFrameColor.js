import { UPDATE_FRAME_COLOR } from './types';

function action(parameter) {
  return { type: UPDATE_FRAME_COLOR, parameter };
}

export default action;
