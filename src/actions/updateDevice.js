import { UPDATE_DEVICE } from './types';

function action(parameter) {
  return { type: UPDATE_DEVICE, parameter };
}

export default action;
