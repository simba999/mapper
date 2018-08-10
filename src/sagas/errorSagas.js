import 'babel-polyfill';

import { put, takeEvery, all } from 'redux-saga/effects';
import { SHOW_ERROR, NO_AUTH, HANDLE_ERROR } from '../actions/types';

export function* handleError(action) {
  if (action.payload.errorStatus === 403) {
    yield put({ type: NO_AUTH });
  } else {
    yield put({ type: SHOW_ERROR, parameter: action.payload });
  }
}

export function* watchHandleError() {
  yield takeEvery(HANDLE_ERROR, handleError);
}

export default function* errorSagas() {
  yield all([watchHandleError()]);
}
