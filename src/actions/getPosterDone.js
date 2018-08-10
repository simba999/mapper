import { GET_POSTER_DONE } from './types';

function action(parameter) {
  return { type: GET_POSTER_DONE, parameter };
}

export default action;
