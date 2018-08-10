import { EMAIL_POSTER_DONE } from './types';

function action(parameter) {
  return { type: EMAIL_POSTER_DONE, parameter };
}

export default action;
