import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';

import posterSagas from '../sagas/posterSagas';
import configSagas from '../sagas/configSagas';

const sagaMiddleware = createSagaMiddleware();
const reduxStore = (initialState) => {
  let store;

  if (process.env.NODE_ENV !== 'production') {
    store = createStore(
      reducers,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );
  } else {
    store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
  }

  sagaMiddleware.run(posterSagas);
  sagaMiddleware.run(configSagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      // eslint-disable-next-line global-require
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default reduxStore;
