import { UPDATE_POSTER_TITLE } from './types';

function action(parameter) {
  return { type: UPDATE_POSTER_TITLE, parameter };
}

export default action;
