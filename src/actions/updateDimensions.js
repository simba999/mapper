import { UPDATE_DIMENSIONS } from './types';

function action(parameter) {
  return { type: UPDATE_DIMENSIONS, parameter };
}

export default action;
