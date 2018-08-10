import React from 'react';
import PropTypes from 'prop-types';
import GeoLocator from './GeoLocator/GeoLocator';
import Panel from './common/Panel';
import { Label } from '../resources/styles';

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);

    this.updateLocation = this.updateLocation.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.poster.textLocation !== this.props.poster.textLocation) {
  //     this.props.updatePosterLocationText('horse');
  //   }
  // }

  updateLocation(selected) {
    if (selected != null) {
      this.props.updatePosterLocation(selected);
      const lattitude = selected.geometry.location.lat;
      const longitude = selected.geometry.location.lng;
      this.props.updatePosterLongitude(longitude);
      this.props.updatePosterLattitude(lattitude);
      this.props.updatePosterLocationText(selected.formatted_address);
    } else {
      this.props.updatePosterLocation(selected);
    }
  }

  render() {
    const { poster } = this.props;

    return (
      <Panel>
        <Label>Where do you want to see the sky from?</Label>
        <div style={{ marginTop: '10px' }} />
        <GeoLocator
          onSelect={this.updateLocation}
          placeholder={poster.textLocation || 'Choose your location'}
        />
      </Panel>
    );
  }
}

LocationSelector.propTypes = {
  updatePosterLocation: PropTypes.func.isRequired,
  updatePosterLattitude: PropTypes.func.isRequired,
  updatePosterLongitude: PropTypes.func.isRequired,
  updatePosterLocationText: PropTypes.func.isRequired,
  poster: PropTypes.object.isRequired,
};

export default LocationSelector;
