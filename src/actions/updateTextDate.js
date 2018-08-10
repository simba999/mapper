import { UPDATE_TEXT_DATE } from './types';

function action(parameter) {
  return { type: UPDATE_TEXT_DATE, parameter };
}

export default action;
