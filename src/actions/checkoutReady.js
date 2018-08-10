import { CHECKOUT_READY } from './types';

function action(parameter) {
  return { type: CHECKOUT_READY, parameter };
}

export default action;
