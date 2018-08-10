import { EMAIL_POSTER } from './types';

function action(parameter) {
  return { type: EMAIL_POSTER, parameter };
}

export default action;
