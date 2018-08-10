import { LOGIN_ERROR } from './types';

function action(parameter) {
  return { type: LOGIN_ERROR, parameter };
}

export default action;
