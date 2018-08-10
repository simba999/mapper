import {} from '../actions/types';

import {
  PRINTFUL_AQUAMARINE_PRINT,
  PRINTFUL_BLACK_PRINT,
  PRINTFUL_MIDNIGHT_BLUE_PRINT,
  GREY_BLUE,
  WHITE,
  MIDNIGHT_BLUE_DISPLAY,
  BLACK_DISPLAY,
  AQUAMARINE_DISPLAY,
} from '../constants/colors';

const INITIAL_STATE = {
  onWhite: [
    {
      themeId: 'black_white',
      label: 'Black / White',
      whiteBg: true,
      print: {
        mapColor: PRINTFUL_BLACK_PRINT,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: PRINTFUL_BLACK_PRINT,
        marginColor: PRINTFUL_BLACK_PRINT,
      },
      display: {
        mapColor: BLACK_DISPLAY,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: BLACK_DISPLAY,
        marginColor: BLACK_DISPLAY,
      },
    },
    {
      themeId: 'midnightblue_white',
      label: 'Midnight Blue / White',
      whiteBg: true,
      print: {
        mapColor: PRINTFUL_MIDNIGHT_BLUE_PRINT,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: PRINTFUL_MIDNIGHT_BLUE_PRINT,
        marginColor: PRINTFUL_MIDNIGHT_BLUE_PRINT,
      },
      display: {
        mapColor: MIDNIGHT_BLUE_DISPLAY,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: MIDNIGHT_BLUE_DISPLAY,
        marginColor: MIDNIGHT_BLUE_DISPLAY,
      },
    },
    {
      themeId: 'greyblue_white',
      label: 'Grey Blue / White',
      whiteBg: true,
      print: {
        mapColor: GREY_BLUE,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: GREY_BLUE,
        marginColor: GREY_BLUE,
      },
      display: {
        mapColor: GREY_BLUE,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: GREY_BLUE,
        marginColor: GREY_BLUE,
      },
    },
    {
      themeId: 'aquamarine_white',
      label: 'Aquamarine / White',
      whiteBg: true,
      print: {
        mapColor: PRINTFUL_AQUAMARINE_PRINT,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: PRINTFUL_AQUAMARINE_PRINT,
        marginColor: PRINTFUL_AQUAMARINE_PRINT,
      },
      display: {
        mapColor: AQUAMARINE_DISPLAY,
        bgColor: WHITE,
        starColor: WHITE,
        textColor: AQUAMARINE_DISPLAY,
        marginColor: AQUAMARINE_DISPLAY,
      },
    },
  ],
  color: [
    {
      themeId: 'black',
      label: 'Black',
      print: {
        mapColor: PRINTFUL_BLACK_PRINT,
        bgColor: PRINTFUL_BLACK_PRINT,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
      display: {
        mapColor: BLACK_DISPLAY,
        bgColor: BLACK_DISPLAY,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
    },
    {
      themeId: 'midnightblue',
      label: 'Midnight Blue',
      print: {
        mapColor: PRINTFUL_MIDNIGHT_BLUE_PRINT,
        bgColor: PRINTFUL_MIDNIGHT_BLUE_PRINT,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
      display: {
        mapColor: MIDNIGHT_BLUE_DISPLAY,
        bgColor: MIDNIGHT_BLUE_DISPLAY,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
    },
    {
      themeId: 'greyblue',
      label: 'Grey Blue',
      print: {
        mapColor: GREY_BLUE,
        bgColor: GREY_BLUE,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
      display: {
        mapColor: GREY_BLUE,
        bgColor: GREY_BLUE,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
    },
    {
      themeId: 'aquamarine',
      label: 'Aquamarine',
      print: {
        mapColor: PRINTFUL_AQUAMARINE_PRINT,
        bgColor: PRINTFUL_AQUAMARINE_PRINT,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
      display: {
        mapColor: AQUAMARINE_DISPLAY,
        bgColor: AQUAMARINE_DISPLAY,
        starColor: WHITE,
        textColor: WHITE,
        marginColor: WHITE,
      },
    },
  ],
};

const themesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default themesReducer;
