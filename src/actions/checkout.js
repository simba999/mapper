import { CHECKOUT } from './types';

function action(parameter) {
  return { type: CHECKOUT, parameter };
}

export default action;
