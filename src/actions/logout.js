import { LOGOUT } from './types';

function action(parameter) {
  return { type: LOGOUT, parameter };
}

export default action;
