import { GET_CONFIG_DONE } from './types';

function action(parameter) {
  return { type: GET_CONFIG_DONE, parameter };
}

export default action;
