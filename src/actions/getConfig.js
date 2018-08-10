import { GET_CONFIG } from './types';

function action(parameter) {
  return { type: GET_CONFIG, parameter };
}

export default action;
