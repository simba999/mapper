import moment from 'moment';

import {
  GET_POSTER,
  GET_POSTER_DONE,
  SAVE_POSTER,
  SAVE_POSTER_DONE,
  EMAIL_POSTER,
  EMAIL_POSTER_DONE,
  UPDATE_POSTER,
  UPDATE_POSTER_DATE,
  UPDATE_POSTER_LOCATION,
  UPDATE_POSTER_TEXT,
  UPDATE_POSTER_THEME,
  UPDATE_POSTER_CONSTELLATIONS,
  UPDATE_POSTER_GRID,
  UPDATE_POSTER_ON_WHITE,
  UPDATE_POSTER_TITLE,
  UPDATE_POSTER_LOCATION_TEXT,
  UPDATE_POSTER_LONGITUDE,
  UPDATE_POSTER_LATTITUDE,
  LOADING_COMPLETE,
  CHECKOUT_READY,
  POSTER_RECEIVED,
  UPDATE_MAX_TEXT_WIDTH,
  SET_POSTER_ID,
  UPDATE_MAX_LINES,
  UPDATE_FRAME_COLOR,
  TOGGLE_FRAMED,
  UPDATE_FRAME_SIZE,
  UPDATE_DIMENSIONS,
  UPDATE_TEXT_DATE,
  UPDATE_SHOW_TIME,
  UPDATE_POSTER_MOON,
} from '../actions/types';

// let newFormat = { id: null,
//   timestamp: 1510272000000,
//   latitude: 37.7759,
//   longitude: -122.3997,
//   text: "",
//   textLocation: "SAN FRANCISCO, CA, USA",
//   textTitle: "THE NIGHT SKY",
//   textDate: "10th NOVEMBER 2017",
//   constellations: true,
//   grid: true,
//   themeId: "midnightblue",
//   theme: {
//     themeId:"midnightblue",
//     background:"color",
//     display:{
//       mapColor:"#191D29",
//       bgColor: "#191D29",
//       starColor:"#fff",
//       textColor:"#fff",
//       marginColor:"#fff"
//     }
//   },
//   layout:{
//     layoutId:"print_18x24",
//     type:"print",
//     posterSize:"18x24",
//     posterWidth:5400,
//     posterHeight:7200,
//     posterMargin:280,
//     posterMarginWidth:40, chartDiameter:4070,
//     chartMarginY:260,
//     chartMarginWidth:40,
//     textQuoteLineHeight:140,
//     textTitleBottomMargin:520,
//     textTitleLineHeight:100,
//     fontSpacing:3,
//     fontName:"Avenir",
//     fontQuoteSize:110,
//     fontTitleSize:76,
//     graticuleLineWidth:2,
//     constellationLineWidth:2,
//     starSizes:[24, 22, 20, 18, 12, 11, 10, 5, 4],
//     moonSize:80,
//     previewWatermark:false
//   },
//   layoutId:"print_18x24"
// }

const initDate = moment();

const INITIAL_STATE = {
  gettingPoster: false,
  savingPoster: false,
  emailingPoster: false,
  loadingPoster: true,
  checkoutReady: false,
  posterLoaded: false,
  showTime: false,
  poster: {
    maxTextWidth: 500,
    date: initDate,
    location: '',
    message: '',
    onWhite: false,
    preview: true,
    sourceStore: 'timeandplace',
    theme: {},
    frame: false,
    frame_color: 'natural',
    latitude: 37.7759,
    longitude: -122.3997,
    constellations: true,
    stars: true,
    grid: true,
    time: {},
    planets: true,
    textTitle: 'THE NIGHT SKY',
    textLocation: '',
    textDate: null,
    previewWatermark: true,
    posterWidth: 2000,
    posterHeight: 2660,
    posterMargin: 104,
    posterMarginWidth: 16,
    chartDiameter: 1500,
    chartMarginY: 96,
    chartMarginWidth: 16,
    textQuoteLineHeight: 51,
    textTitleBottomMargin: 186,
    textTitleLineHeight: 37,
    fontSpacing: 6,
    fontName: 'Avenir',
    fontQuoteSize: 41,
    fontTitleSize: 28,
    graticuleLineWidth: 0.8,
    constellationLineWidth: 0.8,
    starSizes: [8, 7.3, 6.7, 6, 4, 3.7, 3.3, 1.7, 1.3],
    moonSize: 35,
    frontEnd: true,
    lightboxVisible: false,
    canvasLoaded: false,
    widthLabel: '18',
    heightLabel: '24',
    units: '',
    textLatLong: '37.7759° N 122.3997° W',
    id: '',
    overMaxLines: false,
    layout: {
      posterSize: '18x24',
    },
  },
};

const posterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTER:
      return {
        ...state,
        gettingPoster: true,
      };

    case GET_POSTER_DONE:
      return {
        ...state,
        gettingPoster: false,
      };

    case SAVE_POSTER:
      return {
        ...state,
        savingPoster: true,
      };

    case SAVE_POSTER_DONE:
      return {
        ...state,
        savingPoster: false,
      };

    case EMAIL_POSTER:
      return {
        ...state,
        emailingPoster: true,
      };

    case EMAIL_POSTER_DONE:
      return {
        ...state,
        emailingPoster: false,
      };

    case UPDATE_POSTER:
      return {
        ...state,
        posterLoaded: true,
        poster: {
          ...state.poster,
          ...action.payload,
          posterWidth: action.payload.layout.posterWidth,
          posterHeight: action.payload.layout.posterHeight,
          id: null,
        },
      };

    case POSTER_RECEIVED:
      return {
        ...state,
        posterReceived: true,
      };

    case UPDATE_POSTER_TEXT:
      return {
        ...state,
        poster: { ...state.poster, text: action.parameter },
      };

    case UPDATE_POSTER_LOCATION:
      return {
        ...state,
        poster: { ...state.poster, location: action.parameter.formatted_address },
      };

    case UPDATE_POSTER_DATE:
      return {
        ...state,
        poster: {
          ...state.poster,
          textDate: action.parameter.textDate,
          date: action.parameter.fullDate,
          time: action.parameter.time,
        },
      };

    case UPDATE_TEXT_DATE:
      return {
        ...state,
        poster: { ...state.poster, textDate: action.parameter },
      };

    case UPDATE_SHOW_TIME:
      return {
        ...state,
        poster: { ...state.poster, showTime: action.parameter },
      };

    case UPDATE_POSTER_THEME:
      return {
        ...state,
        poster: { ...state.poster, theme: action.parameter },
      };

    case UPDATE_POSTER_CONSTELLATIONS:
      return {
        ...state,
        poster: { ...state.poster, constellations: action.parameter },
      };

    case UPDATE_POSTER_GRID:
      return {
        ...state,
        poster: { ...state.poster, grid: action.parameter },
      };

    case UPDATE_POSTER_ON_WHITE:
      return {
        ...state,
        poster: { ...state.poster, onWhite: action.parameter },
      };

    case UPDATE_POSTER_TITLE:
      return {
        ...state,
        poster: { ...state.poster, textTitle: action.parameter.toUpperCase() },
      };

    case UPDATE_POSTER_LOCATION_TEXT:
      return {
        ...state,
        poster: { ...state.poster, textLocation: action.parameter.toUpperCase() },
      };

    case UPDATE_POSTER_LATTITUDE:
      return {
        ...state,
        poster: { ...state.poster, latitude: action.parameter },
      };

    case UPDATE_POSTER_LONGITUDE:
      return {
        ...state,
        poster: { ...state.poster, longitude: action.parameter },
      };

    case LOADING_COMPLETE:
      return {
        ...state,
        poster: { ...state.poster, loadingPoster: false },
      };

    case CHECKOUT_READY:
      return {
        ...state,
        checkoutReady: action.parameter.ready,
        poster: { ...state.poster, id: action.parameter.id },
      };

    case UPDATE_MAX_TEXT_WIDTH:
      return {
        ...state,
        poster: { ...state.poster, maxTextWidth: action.parameter },
      };

    case SET_POSTER_ID:
      return {
        ...state,
        poster: { ...state.poster, id: action.parameter },
      };

    case UPDATE_MAX_LINES:
      return {
        ...state,
        poster: { ...state.poster, overMaxLines: action.parameter },
      };

    case UPDATE_FRAME_COLOR:
      return {
        ...state,
        poster: { ...state.poster, frame_color: action.parameter },
      };

    case UPDATE_FRAME_SIZE:
      return {
        ...state,
        poster: {
          ...state.poster,
          layout: { ...state.poster.layout, posterSize: action.parameter },
        },
      };

    case TOGGLE_FRAMED:
      return {
        ...state,
        poster: { ...state.poster, frame: action.parameter },
      };

    case UPDATE_DIMENSIONS:
      return {
        ...state,
        poster: {
          ...state.poster,
          layout: { ...state.poster.layout, posterSize: action.parameter.posterSize },
          widthLabel: action.parameter.width,
          heightLabel: action.parameter.height,
          units: action.parameter.units,
        },
      };

    case UPDATE_POSTER_MOON:
      return {
        ...state,
        poster: { ...state.poster, moon: action.parameter },
      };

    default:
      return state;
  }
};

export default posterReducer;
