import { UPDATE_POSTER_LOCATION } from './types';

function action(parameter) {
  return { type: UPDATE_POSTER_LOCATION, parameter };
}

export default action;
