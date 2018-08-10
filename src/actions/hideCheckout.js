import { HIDE_CHECKOUT } from './types';

function action(parameter) {
  return { type: HIDE_CHECKOUT, parameter };
}

export default action;
