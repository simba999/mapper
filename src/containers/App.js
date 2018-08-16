/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  login,
  logout,
  loginSuccess,
  loginError,
  emailPoster,
  savePoster,
  updatePosterTheme,
  updatePosterText,
  updatePosterLocation,
  updatePosterDate,
  showError,
  hideError,
  getPosterDone,
  savePosterDone,
  emailPosterDone,
  updatePoster,
  getPoster,
  updateStep,
  updatePosterConstellations,
  updatePosterGrid,
  updatePosterOnWhite,
  updatePosterTitle,
  updatePosterLocationText,
  updatePosterLongitude,
  updatePosterLattitude,
  loadingComplete,
  showCheckout,
  hideCheckout,
  getConfig,
  getConfigDone,
  updateConfig,
  checkout,
  checkoutReady,
  posterReceived,
  queryLocation,
  updateMaxTextWidth,
  redirectShow,
  updateDevice,
  showEmailComplete,
  setPosterId,
  updateMaxLines,
  updateVariantId,
  updateFrameColor,
  toggleFramed,
  updateFrameSize,
  updateDimensions,
  updateTextDate,
  updateShowTime,
  updatePosterMoon,
} from '../actions/';
import Main from '../components/App';


class App extends Component {
  constructor(props) {
    super(props);
    ReactGA.initialize('UA-000000-01');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  componentWillMount() {
    // Async initial data to load
    this.props.actions.getConfig({
      host: window.location.host,
      chartId: this.props.match.params.id || this.props.match.params.replaceId,
    });
  }
  render() {
    const {
      actions,
      order,
      poster,
      themes,
      error,
      navigation,
      popups,
      location,
      config,
      chartId,
      replaceId,
    } = this.props;
    return (
      <Main
        actions={actions}
        order={order}
        poster={poster}
        themes={themes}
        error={error}
        navigation={navigation}
        popups={popups}
        location={location}
        config={config}
        chartId={chartId}
        replaceId={replaceId}
      />
    );
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    loginError: PropTypes.func.isRequired,
    emailPoster: PropTypes.func.isRequired,
    savePoster: PropTypes.func.isRequired,
    updatePosterTheme: PropTypes.func.isRequired,
    updatePosterText: PropTypes.func.isRequired,
    updatePosterLocation: PropTypes.func.isRequired,
    updatePosterDate: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    hideError: PropTypes.func.isRequired,
    getPosterDone: PropTypes.func.isRequired,
    savePosterDone: PropTypes.func.isRequired,
    emailPosterDone: PropTypes.func.isRequired,
    updatePoster: PropTypes.func.isRequired,
    getPoster: PropTypes.func.isRequired,
    updateStep: PropTypes.func.isRequired,
    updatePosterConstellations: PropTypes.func.isRequired,
    updatePosterGrid: PropTypes.func.isRequired,
    updatePosterOnWhite: PropTypes.func.isRequired,
    updatePosterTitle: PropTypes.func.isRequired,
    updatePosterLocationText: PropTypes.func.isRequired,
    updatePosterLongitude: PropTypes.func.isRequired,
    updatePosterLattitude: PropTypes.func.isRequired,
    loadingComplete: PropTypes.func.isRequired,
    showCheckout: PropTypes.func.isRequired,
    hideCheckout: PropTypes.func.isRequired,
    getConfig: PropTypes.func.isRequired,
    getConfigDone: PropTypes.func.isRequired,
    updateConfig: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
    checkoutReady: PropTypes.func.isRequired,
    posterReceived: PropTypes.func.isRequired,
    queryLocation: PropTypes.func.isRequired,
    updateMaxTextWidth: PropTypes.func.isRequired,
    redirectShow: PropTypes.func.isRequired,
    showEmailComplete: PropTypes.func.isRequired,
    setPosterId: PropTypes.func.isRequired,
    updateMaxLines: PropTypes.func.isRequired,
    updateVariantId: PropTypes.func.isRequired,
    updateFrameColor: PropTypes.func.isRequired,
    toggleFramed: PropTypes.func.isRequired,
    updateFrameSize: PropTypes.func.isRequired,
    updateDimensions: PropTypes.func.isRequired,
    updateTextDate: PropTypes.func.isRequired,
    updateShowTime: PropTypes.func.isRequired,
    updatePosterMoon: PropTypes.func.isRequired,
  }),
  order: PropTypes.object.isRequired,
  poster: PropTypes.object.isRequired,
  themes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  popups: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  chartId: PropTypes.string,
  replaceId: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const props = {
    order: state.order,
    poster: state.poster,
    themes: state.themes,
    error: state.error,
    locations: state.locations,
    navigation: state.navigation,
    popups: state.popups,
    config: state.config,
    chartId: ownProps.match.params.id,
    replaceId: ownProps.match.params.replaceId,
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    login,
    logout,
    loginSuccess,
    loginError,
    emailPoster,
    savePoster,
    updatePosterTheme,
    updatePosterText,
    updatePosterLocation,
    updatePosterDate,
    showError,
    hideError,
    getPosterDone,
    savePosterDone,
    emailPosterDone,
    updatePoster,
    getPoster,
    updateStep,
    updatePosterConstellations,
    updatePosterGrid,
    updatePosterOnWhite,
    updatePosterTitle,
    updatePosterLocationText,
    updatePosterLongitude,
    updatePosterLattitude,
    loadingComplete,
    showCheckout,
    hideCheckout,
    getConfig,
    getConfigDone,
    updateConfig,
    checkout,
    checkoutReady,
    posterReceived,
    queryLocation,
    updateMaxTextWidth,
    redirectShow,
    updateDevice,
    showEmailComplete,
    setPosterId,
    updateMaxLines,
    updateVariantId,
    updateFrameColor,
    toggleFramed,
    updateFrameSize,
    updateDimensions,
    updateTextDate,
    updateShowTime,
    updatePosterMoon,
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
