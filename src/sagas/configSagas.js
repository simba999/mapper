/* global location */
import axios from 'axios';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import queryString from 'qs';
import {
  GET_CONFIG_DONE,
  UPDATE_CONFIG,
  GET_POSTER,
  QUERY_LOCATION,
  GET_CONFIG,
} from '../actions/types';
import {
  TNS_BASE_API_URL,
  TNS_API_AUTHORIZATION,
  HOST_DEFAULT,
  CONFIG_ENDPOINT,
  LOCALHOST,
  STARMAPPER_DOMAIN,
} from '../constants/variables';

axios.defaults.baseURL = TNS_BASE_API_URL;
axios.defaults.headers.common.AUTHORIZATION = TNS_API_AUTHORIZATION;

export function* getConfig(action) {
  let host = HOST_DEFAULT;

  // For Testing
  if (
    action.parameter.host !== `${LOCALHOST}:3000` &&
    action.parameter.host !== STARMAPPER_DOMAIN
  ) {
    // eslint-disable-next-line
    host = action.parameter.host;
  }

  const endpoint = `${CONFIG_ENDPOINT}${host}`;

  try {
    const resp = yield call(axios.get, endpoint);
    const color = [];
    const onWhite = [];
    const config = resp.data;
    config.configThemes = resp.data.themes;

    if (config.themes.length) {
      config.themes.forEach((theme) => {
        const charIndex = theme.themeId.indexOf('_', 0);

        // TODO: what is this doing?
        if (charIndex > 0) {
          onWhite.push(theme);
        } else {
          color.push(theme);
        }
      });
    }

    config.themes = { color, onWhite };

    yield put({ type: GET_CONFIG_DONE });
    yield put({ type: UPDATE_CONFIG, payload: config });

    // eslint-disable-next-line
    const qs = queryString.parse(location.search.replace('?', ''));
    const posterSizeKey = qs.size || config.default_size;

    yield put({
      type: GET_POSTER,
      parameter: { size: posterSizeKey, chartId: action.parameter.chartId },
    });
  } catch (err) {
    yield put({ type: GET_CONFIG_DONE });
    console.error('Could not get config: ', err);
  }
}

// eslint-disable-next-line
export function* queryLocation(action) {
  const endpoint = action.parameter;

  try {
    const resp = yield call(axios.get, endpoint);
    return resp.data;
  } catch (err) {
    yield put({ type: GET_CONFIG_DONE });
    console.error('Could not get config: ', err);
  }
}

export function* watchGetConfig() {
  yield takeEvery(GET_CONFIG, getConfig);
}

export function* watchQueryLocation() {
  yield takeEvery(QUERY_LOCATION, queryLocation);
}

export default function* configSagas() {
  yield all([watchGetConfig(), watchQueryLocation()]);
}
