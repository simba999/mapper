import { TOGGLE_FRAMED } from './types';

function action(parameter) {
  return { type: TOGGLE_FRAMED, parameter };
}

export default action;
