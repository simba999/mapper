import { LOGIN } from './types';

function action(parameter) {
  return { type: LOGIN, parameter };
}

export default action;
