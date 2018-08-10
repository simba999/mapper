import { POSTER_RECEIVED } from './types';

function action(parameter) {
  return { type: POSTER_RECEIVED, parameter };
}

export default action;
