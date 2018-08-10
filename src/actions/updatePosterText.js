import { UPDATE_POSTER_TEXT } from './types';

function action(parameter) {
  return { type: UPDATE_POSTER_TEXT, parameter };
}

export default action;
