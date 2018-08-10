/* global window, location */

import axios from 'axios';
import queryString from 'qs';
import ReactGA from 'react-ga';

import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import {
  GET_POSTER_DONE,
  UPDATE_DIMENSIONS,
  UPDATE_VARIANT_ID,
  UPDATE_POSTER,
  EMAIL_POSTER,
  CHECKOUT_READY,
  SAVE_POSTER_DONE,
  SHOW_ERROR,
  SHOW_EMAIL_COMPLETE,
  EMAIL_POSTER_DONE,
  GET_POSTER,
  SAVE_POSTER,
  TOGGLE_FRAMED,
} from '../actions/types';
import {
  TNS_BASE_API_URL,
  TNS_API_AUTHORIZATION,
  HOST_DEFAULT,
  LOCALHOST,
  POSTERS_ENDPOINT,
  POSTERS_ENDPOINT_HOST,
  THEME_BLACK,
  THEME_BLACK_WHITE,
  THEME_MIDNIGHT_BLUE,
  THEME_MIDNIGHT_BLUE_WHITE,
  THEME_AQUAMARINE,
  THEME_AQUAMARINE_WHITE,
  THEME_GREY_BLUE,
  THEME_GREY_BLUE_WHITE,
  THEME_BLACK_LABEL,
  THEME_BLACK_WHITE_LABEL,
  THEME_MIDNIGHT_BLUE_LABEL,
  THEME_MIDNIGHT_BLUE_WHITE_LABEL,
  THEME_AQUAMARINE_LABEL,
  THEME_AQUAMARINE_WHITE_LABEL,
  THEME_GREY_BLUE_LABEL,
  THEME_GREY_BLUE_WHITE_LABEL,
  THEME_WHITE_BACKGROUND,
  STARMAPPER_DOMAIN,
} from '../constants/variables';
import { CATEGORY_CHECKOUT_BUTTON, CATEGORY_SAVED_POSTERS } from '../constants/ga';

axios.defaults.baseURL = TNS_BASE_API_URL;
axios.defaults.headers.common.AUTHORIZATION = TNS_API_AUTHORIZATION;

const posterHandle = state => state.poster;
const configHandle = state => state.config;

export function* getPoster(action) {
  const format = 'preview';
  const { size } = action.parameter;
  const id = action.parameter.chartId || 'default';

  const configReducer = yield select(configHandle);
  const { config } = configReducer;

  let host = HOST_DEFAULT;

  if (window.location.hostname !== LOCALHOST && window.location.hostname !== STARMAPPER_DOMAIN) {
    host = window.location.hostname;
  }

  const endpoint = POSTERS_ENDPOINT_HOST.replace('$format', format)
    .replace('$size', size)
    .replace('$id', id || 'default')
    .replace('$host', host);

  try {
    // Get Poster from API
    const resp = yield call(axios.get, endpoint);

    if (action.parameter.chartId) {
      resp.data.location = {
        lat: resp.data.latitude,
        lng: resp.data.longitude,
      };
    }

    yield put({ type: GET_POSTER_DONE });

    config.configThemes.forEach((theme) => {
      if (theme.themeId === resp.data.theme.themeId) {
        resp.data.theme = theme;
      }
    });

    // Get Framed / Not Framed
    // eslint-disable-next-line
    const qs = queryString.parse(location.search.replace('?', ''));
    resp.data.frame_color = qs.frame || '';

    const sizeId = resp.data.layout.posterSize || config.default_size;
    const sizeObject = config.available_sizes.filter(s => s.id === sizeId)[0];

    yield put({
      type: UPDATE_DIMENSIONS,
      parameter: {
        width: size.split('x')[0],
        height: size.split('x')[1],
        units: sizeObject.units,
        posterSize: sizeObject.size,
      },
    });

    yield put({
      type: UPDATE_VARIANT_ID,
      parameter: {
        theme: resp.data.theme,
        framed: resp.data.theme.framed || false,
        size: sizeObject.size,
      },
    });

    if (resp.data.theme.background === THEME_WHITE_BACKGROUND) {
      resp.data.onWhite = true;
    }
    switch (resp.data.theme.themeId) {
      case THEME_BLACK:
        resp.data.theme.label = THEME_BLACK_LABEL;
        break;

      case THEME_BLACK_WHITE:
        resp.data.theme.label = THEME_BLACK_WHITE_LABEL;
        break;

      case THEME_MIDNIGHT_BLUE:
        resp.data.theme.label = THEME_MIDNIGHT_BLUE_LABEL;
        break;

      case THEME_MIDNIGHT_BLUE_WHITE:
        resp.data.theme.label = THEME_MIDNIGHT_BLUE_WHITE_LABEL;
        break;

      case THEME_AQUAMARINE:
        resp.data.theme.label = THEME_AQUAMARINE_LABEL;
        break;

      case THEME_AQUAMARINE_WHITE:
        resp.data.theme.label = THEME_AQUAMARINE_WHITE_LABEL;
        break;

      case THEME_GREY_BLUE:
        resp.data.theme.label = THEME_GREY_BLUE_LABEL;
        break;

      case THEME_GREY_BLUE_WHITE:
        resp.data.theme.label = THEME_GREY_BLUE_WHITE_LABEL;
        break;

      default:
        break;
    }

    yield put({ type: UPDATE_POSTER, payload: resp.data });
  } catch (err) {
    yield put({ type: GET_POSTER_DONE });
  }
}

export function* savePoster(action) {
  // Pull poster off the store
  const posterReducer = yield select(posterHandle);
  const { poster } = posterReducer;
  const { checkout, email } = action.parameter;

  let host = HOST_DEFAULT;

  // For Testing
  if (window.location.hostname !== LOCALHOST) {
    host = window.location.hostname;
  }

  const posterData = {
    latitude: poster.latitude,
    longitude: poster.longitude,
    text: poster.text,
    themeId: poster.theme.themeId,
    textLocation: poster.textLocation,
    textDate: poster.textDate,
    textTitle: poster.textTitle,
    constellations: poster.constellations,
    grid: poster.grid,
    time: poster.time,
    moon: poster.moon,
    highlight: poster.highlight,
  };
  // Only save if no poster id
  if (poster.id) {
    if (email && checkout) {
      yield put({
        type: EMAIL_POSTER,
        parameter: { email, chartId: poster.id, checkout, source_hostname: host },
      });
    } else if (email) {
      yield put({
        type: EMAIL_POSTER,
        parameter: { email, chartId: poster.id, checkout, source_hostname: host },
      });
    } else if (checkout) {
      yield put({ type: CHECKOUT_READY, parameter: { ready: true, id: poster.id } });
    } else {
      yield put({ type: SAVE_POSTER_DONE });
    }
  } else {
    try {
      const now = new Date().getTime();

      // TODO: maybe convert GA calls to objects
      // Save Poster to API
      const resp = yield call(axios.post, POSTERS_ENDPOINT, posterData);
      ReactGA.timing({
        category: CATEGORY_CHECKOUT_BUTTON,
        variable: 'load',
        value: new Date().getTime() - now,
        label: 'Persist Poster',
      });

      if (email && checkout) {
        yield put({
          type: EMAIL_POSTER,
          parameter: {
            email,
            chartId: resp.data.id,
            checkout,
            source_hostname: host,
          },
        });
      } else if (email) {
        yield put({
          type: EMAIL_POSTER,
          parameter: {
            email,
            chartId: resp.data.id,
            checkout,
            source_hostname: host,
          },
        });
      } else if (checkout) {
        yield put({ type: CHECKOUT_READY, parameter: { ready: true, id: resp.data.id } });
      } else {
        yield put({ type: SAVE_POSTER_DONE });
      }
    } catch (err) {
      yield put({ type: SAVE_POSTER_DONE });

      const error = {
        errorTitle: 'Uh Oh!',
        errorText: err.response.data.errors.text,
        errorStatus: 'error',
        showCancel: false,
        confirmText: 'OK',
      };

      yield put({ type: SHOW_ERROR, parameter: error });
    }
  }
}

export function* emailPoster(action) {
  const { chartId, checkout, email } = action.parameter;
  try {
    ReactGA.event({
      category: CATEGORY_SAVED_POSTERS,
      action: email,
      label: chartId,
      value: 1,
    });

    yield put({ type: SHOW_EMAIL_COMPLETE, parameter: true });
    yield put({ type: EMAIL_POSTER_DONE });

    if (checkout) {
      // TODO: why are we doing this twice?
      yield put({ type: CHECKOUT_READY, parameter: true });
      yield put({ type: CHECKOUT_READY, parameter: true });
    } else {
      yield put({ type: SAVE_POSTER_DONE });
    }
  } catch (err) {
    yield put({ type: SAVE_POSTER_DONE });
    console.error(err);
  }
}

export function* toggleFramed(action) {
  const posterReducer = yield select(posterHandle);
  const { poster } = posterReducer;
  yield put({
    type: UPDATE_VARIANT_ID,
    parameter: { theme: poster.theme, framed: action.parameter, size: poster.layout.posterSize },
  });
}

export function* watchGetPoster() {
  yield takeEvery(GET_POSTER, getPoster);
}

export function* watchSavePoster() {
  yield takeEvery(SAVE_POSTER, savePoster);
}

export function* watchEmailPoster() {
  yield takeEvery(EMAIL_POSTER, emailPoster);
}

export function* watchToggleFramed() {
  yield takeEvery(TOGGLE_FRAMED, toggleFramed);
}

export default function* posterSagas() {
  yield all([watchGetPoster(), watchSavePoster(), watchEmailPoster(), watchToggleFramed()]);
}
