/* global document */
import 'react-select/dist/react-select.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './resources/polyfills';
import configureStore from './stores';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import PageNotFound from './containers/PageNotFound';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/create/:id" component={App} />
        <Route path="/poster/edit_cart/:replaceId" component={App} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
