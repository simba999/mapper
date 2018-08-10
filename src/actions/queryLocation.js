import { QUERY_LOCATION } from './types';

function action(parameter) {
  return { type: QUERY_LOCATION, parameter };
}

export default action;
