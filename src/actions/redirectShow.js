import { REDIRECT_SHOW } from './types';

function action(parameter) {
  return { type: REDIRECT_SHOW, parameter };
}

export default action;
