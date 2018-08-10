import React from 'react';
import PropTypes from 'prop-types';
import SweetError from './SweetError/SweetError';
import RedirectBar from './RedirectBar/RedirectBar';

import EuCookiesBar from './EuCookiesBar';
import Layout from '../containers/Layout';
import Options from './Options/Options';
import PosterContainer from '../containers/PosterContainer';

class AppComponent extends React.Component {
  state = {
    gettingPoster: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.poster.gettingPoster !== this.state.gettingPoster) {
      if (nextProps.poster.gettingPoster) {
        this.setState({ gettingPoster: true });
      }
    }
  }

  render() {
    const { actions, error, replaceId } = this.props;
    return (
      <React.Fragment>
        <EuCookiesBar />
        <RedirectBar redirectShow={this.props.actions.redirectShow} />
        <SweetError actions={actions} error={error} />
        {/* TODO: add back margin for redirect show */}
        <Layout posterLoading={!this.props.poster.posterLoaded}>
          <Options {...this.props} themes={this.props.config.config.themes} replaceId={replaceId} />
          <PosterContainer />
        </Layout>
      </React.Fragment>
    );
  }
}

AppComponent.propTypes = {
  poster: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  popups: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  replaceId: PropTypes.string,
  actions: PropTypes.shape({
    updateDevice: PropTypes.func.isRequired,
    redirectShow: PropTypes.func.isRequired,
  }),
};

export default AppComponent;
