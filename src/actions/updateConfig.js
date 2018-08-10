import { UPDATE_CONFIG } from './types';

function action(parameter) {
  return { type: UPDATE_CONFIG, parameter };
}

export default action;
