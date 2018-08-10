import { GET_POSTER } from './types';

function action(parameter) {
  return { type: GET_POSTER, parameter };
}

export default action;
