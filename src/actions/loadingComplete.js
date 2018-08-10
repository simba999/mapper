import { LOADING_COMPLETE } from './types';

function action(parameter) {
  return { type: LOADING_COMPLETE, parameter };
}

export default action;
