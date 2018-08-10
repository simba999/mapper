import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import configReducer from './configReducer';
import popupsReducer from './popupsReducer';
import navigationReducer from './navigationReducer';
import errorReducer from './errorReducer';
import themesReducer from './themesReducer';
import posterReducer from './posterReducer';
import orderReducer from './orderReducer';

const reducers = {
  form: formReducer,
  order: orderReducer,
  poster: posterReducer,
  themes: themesReducer,
  error: errorReducer,
  navigation: navigationReducer,
  popups: popupsReducer,
  config: configReducer,
};

const rootReducer = combineReducers(reducers);
export default rootReducer;
