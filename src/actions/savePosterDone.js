import { SAVE_POSTER_DONE } from './types';

function action(parameter) {
  return { type: SAVE_POSTER_DONE, parameter };
}

export default action;
