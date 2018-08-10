import { SHOW_CHECKOUT } from './types';

function action(parameter) {
  return { type: SHOW_CHECKOUT, parameter };
}

export default action;
