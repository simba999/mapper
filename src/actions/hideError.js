import { HIDE_ERROR } from './types';

function action(parameter) {
  return { type: HIDE_ERROR, parameter };
}

export default action;
