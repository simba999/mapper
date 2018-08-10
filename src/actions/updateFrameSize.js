import { UPDATE_FRAME_SIZE } from './types';

function action(parameter) {
  return { type: UPDATE_FRAME_SIZE, parameter };
}

export default action;
