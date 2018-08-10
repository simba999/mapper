import { SHOW_EMAIL_COMPLETE } from './types';

function action(parameter) {
  return { type: SHOW_EMAIL_COMPLETE, parameter };
}

export default action;
