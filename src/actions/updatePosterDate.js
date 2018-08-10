import { UPDATE_POSTER_DATE } from './types';

function action(parameter) {
  return { type: UPDATE_POSTER_DATE, parameter };
}

export default action;
