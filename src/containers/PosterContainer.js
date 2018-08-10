import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updatePosterTheme,
  updatePosterOnWhite,
  loadingComplete,
  updateMaxTextWidth,
  updatePosterDate,
} from '../actions/';
import Poster from '../components/Poster';

const PosterContainer = (props) => {
  if (props.poster.posterLoaded) {
    return (
      <Poster
        {...props}
        poster={props.poster.poster}
        themes={props.config.config.configThemes}
        loadingPoster={props.poster.loadingPoster}
        loadingComplete={props.actions.loadingComplete}
      />
    );
  }

  return <div />;
};

PosterContainer.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const props = {
    poster: state.poster,
    config: state.config,
  };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updatePosterTheme,
    updatePosterOnWhite,
    loadingComplete,
    updateMaxTextWidth,
    updatePosterDate,
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PosterContainer);
