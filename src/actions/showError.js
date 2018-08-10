import { SHOW_ERROR } from './types';

function action(parameter) {
  return { type: SHOW_ERROR, parameter };
}

export default action;
