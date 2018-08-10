import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import './GeoLocator.scss';
import { GEOLOCATOR_HIGHLIGHT, GEOLOCATOR_BACKGROUND } from '../../constants/colors';
import Loading from '../Loading';

import { TNS_API_AUTHORIZATION } from '../../constants/variables';

const styles = {
  item: {
    color: GEOLOCATOR_HIGHLIGHT,
    cursor: 'default',
    fontSize: `${13}px`,
    textTransform: 'uppercase',
    paddingLeft: '20px',
  },

  highlightedItem: {
    background: GEOLOCATOR_BACKGROUND,
    fontSize: `${13}px`,
    color: GEOLOCATOR_HIGHLIGHT,
    cursor: 'default',
    textTransform: 'uppercase',
    paddingLeft: '20px',
  },
};

class GeoLocator extends Component {
  /**
   * class constructor
   * @param  {Object} props
   */
  constructor(props) {
    super(props);
    this.placeholder = props.placeholder || 'Choose your location';
    this.handleFocus = this.handleFocus.bind(this);

    this.state = {
      query: props.value || '',
      suggestions: [],
      location: {},
      loading: false,
      prevQueryLength: 0,
    };
  }

  componentWillMount() {
    if (this.props.presetLocation) {
      this.setQuery(this.props.presetLocation);
    }
  }

  /**
   * Saves search query into the state
   * @param {[type]} query [description]
   */
  setQuery(query) {
    this.setState({ query });
  }

  /**
   * geo locator search
   * @param  {string} query
   * @return {Promise}
   */
  fetchData(query) {
    /* eslint-disable */
    axios.defaults.headers.common.AUTHORIZATION = TNS_API_AUTHORIZATION;

    /* eslint-enable */
    const url = `geo/search?address=${query}`;
    return axios.get(url).then(
      (resp) => {
        // found the suggestions
        this.setState({ suggestions: resp.data.results, loading: false });
      },
      err => console.warn(err),
    );
  }

  // eslint-disable-next-line
  handleFocus(event) {
    event.target.select();
  }

  /**
   * Main render method
   */
  render() {
    return (
      <div className="form-input-container">
        <div className="GeoLocator">
          <i className="ion-earth" style={this.props.style} />
          <Autocomplete
            inputProps={{
              name: 'geo',
              id: 'geo-location-suggestions',
              placeholder: this.props.placeholder,
              onFocus: this.handleFocus,
            }}
            ref={(c) => {
              this.autoComplete = c;
            }}
            value={this.state.query}
            items={this.state.suggestions}
            getItemValue={item => item.formatted_address}
            menuStyle={this.props.menuStyle}
            onSelect={(value, selected) => {
              // set selected to the state
              this.setState({
                selected,
                location: selected.geometry.location,
                query: selected.formatted_address.toUpperCase(),
              });

              this.props.onSelect(selected);
            }}
            onChange={(event, query) => {
              if (query.length <= 2 && query.length > this.state.prevQueryLength) {
                this.setState({ query });
                // Only check strings with > 2 characters, unless deleting (last query length)
                return true;
              }

              this.setState({ query, loading: true, prevQueryLength: query.length });

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                this.fetchData(query);
              }, 800);
              return null;
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.formatted_address}
                id={item.formatted_address}
              >
                {item.formatted_address}
              </div>
            )}
          />
          <i className="ion-earth" />
          {this.state.loading ? (
            <Loading
              style={{ position: 'absolute', top: '20px', right: '.5em', fontSize: '13px' }}
              size={18}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

GeoLocator.propTypes = {
  placeholder: PropTypes.string,
  presetLocation: PropTypes.string.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  menuStyle: PropTypes.string,
};

export default GeoLocator;
