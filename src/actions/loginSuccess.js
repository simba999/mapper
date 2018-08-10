import { LOGIN_SUCCESS } from './types';

function action(parameter) {
  return { type: LOGIN_SUCCESS, parameter };
}

export default action;
