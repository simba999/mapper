/* global window, location */
// TODO: clean up this whole file
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './redirectbar.scss';

class RedirectBar extends React.Component {
  componentWillMount() {
    // TODO: wat
    // eslint-disable-next-line
    let pageHost = '';
    if (this.props && this.props.route) {
      if (this.props.route.pageHost) {
        pageHost = this.props.route.pageHost;
      }
    }

    // if country has been previously selected:
    const cookies = new Cookies();
    const selectedStoreCountry = cookies.get('selected_store') || null;
    this.setState({
      showBar: false,
      geoMessageText:
        'You were redirected to the site for your country. Continue or choose a store:',
      selectedStoreCountry: selectedStoreCountry,
    });

    // console.log('Selected Store Country: ', selectedStoreCountry);
  }

  componentDidMount() {
    this.processRedirect();
  }

  // Get Parameter from QueryString
  getParameterByName(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  processRedirect() {
    const url = window.location.href;
    const host = window.top.location.host;

    const storeName = this.getParameterByName('sn');
    const setCountryParam = this.getParameterByName('sc');
    const detectedCountryParam = this.getParameterByName('dc');
    const redirectReasonParam = this.getParameterByName('rr');
    const geoRedirectParam = this.getParameterByName('georedirect');

    if (setCountryParam) {
      // A specific country was selected: set a cookie
      const cookies = new Cookies();
      cookies.set('selected_store', setCountryParam, {
        path: '/',
        domain: 'thenightsky.com',
        maxAge: 7 * 24 * 60 * 60,
      });
    } else {
      // We were redirected here
      if (geoRedirectParam) {
        let geomessage = `You appear to be in ${detectedCountryParam} and were redirected to the ${storeName} site. Select here to ship to another location:`;

        if (redirectReasonParam === 'store_chosen') {
          geomessage = `Continue on this store for ${storeName} shipping, or select one of our international sites:`;
        }

        this.setState({ geoMessageText: geomessage });
        this.setState({ showBar: true });
        this.props.redirectShow(true);
      } else {
        // if (!geoRedirectParam && !setCountryParam) {
        // Test if redirect required:

        axios
          .post('/geo/redirect', {
            host,
            country: this.state.selectedStoreCountry,
          })
          .then(data => {
            const response = data.data;
            if (response.status === 'redirect') {
              let newUrl = url.replace(host, response.redirect_to);
              if (newUrl.indexOf('?') >= 0) {
                newUrl += '&';
              } else {
                newUrl += '?';
              }

              newUrl += `georedirect=true&rr=${response.redirect_reason}`;
              newUrl += `&sn=${response.store_name}&dc=${response.country_name}`;

              // redirect:
              if (host.indexOf('create') < 0) {
                // Don't process Admin/Backend sites (anything without create... in the url)
                console.log(`Not core site; cancel redirect to: ${newUrl}`);
                return;
              }

              // Don't process Admin/Backend sites
              console.log(`Redirect to: ${newUrl}`);
              window.top.location.href = newUrl;
            }
          })
          .catch(e => {
            axios.defaults.baseURL = process.env.TNS_BASE_API_URL;
            axios.defaults.headers.common.AUTHORIZATION = process.env.TNS_API_AUTHORIZATION;
          });
      }
    }
  }

  // Country Select Box Handler
  selectCountry(event) {
    window.top.location.href = event.target.value;
  }

  // Close Handler
  closeRedirect() {
    this.setState({ showBar: false });
    this.props.redirectShow(false);
  }

  render() {
    if (!this.state.showBar) {
      return <div style={{ display: 'none' }} />;
    }
    return (
      <div className="redirectbar-component">
        <div id="geobar">
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span id="geobar_message">
              <span id="geobar_messagetext">{this.state.geoMessageText}</span>
              <span id="geoselect">
                <select id="geocountries" className="form-control" onChange={this.selectCountry}>
                  <option value="">Country</option>
                  <option value="https://create-us.thenightsky.com?sc=us">
                    US, Canada &amp; Mexico
                  </option>
                  <option value="https://create-uk.thenightsky.com?sc=uk">UK</option>
                  <option value="https://create-au.thenightsky.com?sc=au">
                    Australia &amp; New Zealand
                  </option>
                  <option value="https://create-eu.thenightsky.com?sc=eu">Worldwide</option>
                </select>
              </span>
            </span>
          </div>
          <div>
            <span id="geoclose" onClick={this.closeRedirect.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

RedirectBar.propTypes = {
  route: PropTypes.string,
  redirectShow: PropTypes.func.isRequired,
};

export default RedirectBar;
