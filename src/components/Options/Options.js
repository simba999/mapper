import React from 'react';
import PropTypes from 'prop-types';
import LocationSelector from '../LocationSelector';
import DateSelector from '../DateSelector/DateSelector';
import TextSelector from '../TextSelector/TextSelector';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import AdvancedOptions from '../AdvancedOptions';
import EmailPanel from '../EmailPanel';
import Dimensions from '../Dimensions/Dimensions';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { AU_SITE_URL } from '../../constants/variables';

class Options extends React.Component {
  state = {
    okay: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.poster.checkoutReady &&
      nextProps.poster.poster.id &&
      !nextProps.poster.checkingOut
    ) {
      this.setState({ okay: true });
      setTimeout(() => this.checkoutForm.form.submit(), 1000);
    }
  }

  savePoster = (checkout, email) => {
    if (!this.props.poster.poster.location) {
      const error = {
        errorTitle: 'Oops!',
        errorText: 'You forgot to provide a location.',
        errorType: 'warning',
        showCancel: false,
        confirmText: 'Got it',
      };
      return this.props.actions.showError(error);
    }

    if (this.props.poster.poster.overMaxLines) {
      const error = {
        errorTitle: 'Oops!',
        errorText: 'Looks like your quote is too big',
        errorType: 'warning',
        showCancel: false,
        confirmText: 'Got it',
      };
      return this.props.actions.showError(error);
    }

    return this.props.actions.savePoster({ checkout, email });
  };

  checkout = (email) => {
    if (email) {
      this.savePoster(false, email);
      this.savePoster(true, false);
    } else {
      this.savePoster(true, false);
    }
  };

  render() {
    const { actions, poster, config, replaceId } = this.props;

    return (
      <React.Fragment>
        <ThemeSelector
          {...this.props}
          poster={poster.poster}
          updatePosterTheme={actions.updatePosterTheme}
          updateVariantId={actions.updateVariantId}
        />
        <LocationSelector
          updatePosterLocation={actions.updatePosterLocation}
          updatePosterLocationText={actions.updatePosterLocationText}
          updatePosterLongitude={actions.updatePosterLongitude}
          updatePosterLattitude={actions.updatePosterLattitude}
          poster={poster.poster}
          queryLocation={actions.queryLocation}
        />
        <DateSelector poster={poster.poster} updatePosterDate={actions.updatePosterDate} />
        <TextSelector
          updatePosterText={actions.updatePosterText}
          poster={poster.poster}
          updateMaxLines={actions.updateMaxLines}
        />

        {config.config.site_url === AU_SITE_URL && (
          <Dimensions
            {...this.props}
            updateDimensions={actions.updateDimensions}
            poster={poster.poster}
            updateVariantId={actions.updateVariantId}
          />
        )}

        <AdvancedOptions
          config={config}
          poster={poster.poster}
          updatePosterTitle={actions.updatePosterTitle}
          updatePosterLocationText={actions.updatePosterLocationText}
          updatePosterLattitude={actions.updatePosterLattitude}
          updatePosterLongitude={actions.updatePosterLongitude}
          updatePosterDate={actions.updatePosterDate}
          updateTextDate={actions.updateTextDate}
          updateShowTime={actions.updateShowTime}
        />

        <EmailPanel goToCheckout={this.checkout} />

        {this.state.okay && (
          <div>
            <CheckoutForm
              ref={(c) => {
                this.checkoutForm = c;
              }}
              poster={poster}
              config={config}
              replaceId={replaceId}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

Options.propTypes = {
  config: PropTypes.object.isRequired,
  poster: PropTypes.object.isRequired,
  popups: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    showError: PropTypes.func.isRequired,
    savePoster: PropTypes.func.isRequired,
    showCheckout: PropTypes.func.isRequired,
    updatePosterMoon: PropTypes.func.isRequired,
  }),
  replaceId: PropTypes.string,
};

export default Options;
