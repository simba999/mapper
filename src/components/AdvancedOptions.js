/* eslint-disable eqeqeq */
// TODO: update equalities to work properly, stop comparing e.g. '1' to 1.
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import moment from 'moment';
import Input from './common/Input';
import CollapsiblePanel from './common/CollapsiblePanel';
import LatitudeInput from './LatitudeInput';
import LongitudeInput from './LongitudeInput';
import TimeSelector from './TimeSelector';

const LatLngContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class AdvancedOptions extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateLocationText = this.updateLocationText.bind(this);
    this.updateLattitude = this.updateLattitude.bind(this);
    this.updateLongitude = this.updateLongitude.bind(this);
    this.updateNorthSouth = this.updateNorthSouth.bind(this);
    this.updateEastWest = this.updateEastWest.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateHour = this.updateHour.bind(this);
    this.updateMinute = this.updateMinute.bind(this);
    this.updatePeriod = this.updatePeriod.bind(this);
    this.updateTextDate = this.updateTextDate.bind(this);

    this.yearList = [];
    this.minuteList = [];

    for (let i = 1000; i < 3001; i += 1) {
      this.yearList.push(i);
    }

    for (let i = 0; i < 60; i += 1) {
      let minute = i;
      if (i < 10) {
        minute = `${i}`;
      }
      this.minuteList.push(minute);
    }

    this.state = {
      open: false,
      northSouth: 'N',
      absLattitude: '',
      eastWest: 'E',
      absLongitude: '',
      titleChange: false,
      locationChange: false,
      longitudeChange: false,
      lattitudeChange: false,
    };
  }

  componentWillMount() {
    if (this.props.poster.longitude < 0) {
      const absLongitude = this.props.poster.longitude * -1;
      this.setState({ absLongitude, eastWest: -1 });
    } else {
      const absLongitude = this.props.poster.longitude;
      this.setState({ absLongitude, eastWest: 1 });
    }

    if (this.props.poster.latitude < 0) {
      const absLattitude = this.props.poster.latitude * -1;
      this.setState({ absLattitude, northSouth: -1 });
    } else {
      const absLattitude = this.props.poster.latitude;
      this.setState({ absLattitude, northSouth: 1 });
    }

    const dateTimeProps = this.destructureTimeObject(this.props.poster.time);
    this.setState({ ...dateTimeProps });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.poster.longitude < 0) {
      const absLongitude = nextProps.poster.longitude * -1;
      this.setState({ absLongitude, eastWest: '-1' });
    } else {
      const absLongitude = nextProps.poster.longitude;
      this.setState({ absLongitude, eastWest: '1' });
    }

    if (nextProps.poster.latitude < 0) {
      const absLattitude = nextProps.poster.latitude * -1;
      this.setState({ absLattitude, northSouth: '-1' });
    } else {
      const absLattitude = nextProps.poster.latitude;
      this.setState({ absLattitude, northSouth: '1' });
    }

    const dateTimeProps = this.destructureTimeObject(nextProps.poster.time);
    this.setState({ ...dateTimeProps });
  }

  updateTextDate(text) {
    this.props.updateTextDate(text);
  }

  toggle() {
    const open = !this.state.open;

    ReactGA.event({
      category: 'Advanced Options',
      action: this.state.open ? 'Collapse Panel' : 'Expand Panel',
      label: this.props.config.device,
      value: 1,
    });

    this.setState({ open });
  }

  updateTitle(input) {
    const val = input.target.value;
    this.props.updatePosterTitle(val);

    // Only Count First Title Change
    if (!this.state.titleChange) {
      this.state.titleChange = true;
      ReactGA.event({
        category: 'Advanced Options',
        action: 'Edit Title',
        label: this.props.config.device,
        value: 1,
      });
    }
  }

  updateLocationText(input) {
    const val = input.target.value;
    this.props.updatePosterLocationText(val);

    // Only Count First Location Change
    if (!this.state.locationChange) {
      this.state.locationChange = true;
      ReactGA.event({
        category: 'Advanced Options',
        action: 'Edit Location',
        label: this.props.config.device,
        value: 1,
      });
    }
  }

  updateLattitude(absVal, northSouth = this.state.northSouth) {
    const val = absVal * northSouth;
    this.props.updatePosterLattitude(val);
    this.setState({ absLattitude: absVal });

    // Only Count First Lattitude Change
    if (!this.state.lattitudeChange) {
      this.state.lattitudeChange = true;
      ReactGA.event({
        category: 'Advanced Options',
        action: 'Edit Lattitude',
        label: this.props.config.device,
        value: 1,
      });
    }
  }

  updateLongitude(absVal, eastWest = this.state.eastWest) {
    const val = absVal * eastWest;
    this.props.updatePosterLongitude(val);
    this.setState({ absLongitude: absVal });

    // Only Count First Location Change
    if (!this.state.longitudeChange) {
      this.state.longitudeChange = true;
      ReactGA.event({
        category: 'Advanced Options',
        action: 'Edit Longitude',
        label: this.props.config.device,
        value: 1,
      });
    }
  }

  updateNorthSouth(val) {
    this.setState({ northSouth: val });
    this.updateLattitude(this.state.absLattitude, val);

    ReactGA.event({
      category: 'Advanced Options',
      action: 'Update N/S',
      label: this.props.config.device,
      value: 1,
    });
  }

  updateEastWest(val) {
    this.setState({ eastWest: val });
    this.updateLongitude(this.state.absLongitude, val);

    ReactGA.event({
      category: 'Advanced Options',
      action: 'Update E/W',
      label: this.props.config.device,
      value: 1,
    });
  }

  handleDateChange(dateTimeProps, update = false) {
    const part1 = moment.utc(dateTimeProps.fullDate).format('Do');
    const part2 = moment
      .utc(dateTimeProps.fullDate)
      .format('MMMM YYYY')
      .toUpperCase();
    let textDate = `${part1} ${part2}`;

    if (this.props.poster.showTime) {
      let timeFactor = 'AM';
      let regHour = dateTimeProps.hour;
      const minute =
        dateTimeProps.minute < 10 ? `0${dateTimeProps.minute}` : `${dateTimeProps.minute}`;
      if (dateTimeProps.period) {
        timeFactor = 'PM';
        // eslint-disable-next-line
        regHour = parseInt(dateTimeProps.hour) - 12;
        if (regHour == 0) regHour = 12;
      } else {
        if (regHour[0] == '0') {
          // eslint-disable-next-line
          regHour = regHour[1];
        }
        if (regHour == 0) {
          regHour = '00';
        }
      }
      textDate = `${textDate} at ${regHour}:${minute} ${timeFactor}`;
    }

    const time = {
      year: dateTimeProps.year,
      month: dateTimeProps.month,
      date: dateTimeProps.date,
      hour: dateTimeProps.hour,
      minute: dateTimeProps.minute,
      second: dateTimeProps.second,
      useTime: true, // enabled time in poster rendering; implemented until ongoing orders complete
    };

    this.setState({
      hour: dateTimeProps.hour,
      minute: dateTimeProps.minute,
      period: dateTimeProps.period,
    });

    if (update) {
      this.props.updatePosterDate({
        fullDate: dateTimeProps.fullDate,
        textDate,
        time,
      });
    }
  }

  destructureTimeObject(time) {
    const dateString = `${this.props.poster.time.year}-${this.props.poster.time.month}-${
      this.props.poster.time.date
    } ${this.props.poster.time.hour}:${this.props.poster.time.minute}:${
      this.props.poster.time.second
    } Z`;
    let fullDate = moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss Z');

    if (!fullDate.isValid()) {
      // eslint-disable-next-line
      time.date = 1;
      const dateString = `${this.props.poster.time.year}-${this.props.poster.time.month}-${
        this.props.poster.time.date
      } ${this.props.poster.time.hour}:${this.props.poster.time.minute}:${
        this.props.poster.time.second
      } Z`;
      fullDate = moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss Z');
    }

    return {
      ...time,
      fullDate,
      period: time.hour >= 12 ? 1 : 0,
    };
  }

  updateHour(hour) {
    const props = this.props.poster.time;
    props.hour = hour;
    this.props.updateShowTime(true);
    this.handleDateChange(this.destructureTimeObject(props), true);
  }

  updateMinute(minute) {
    const props = this.props.poster.time;
    props.minute = minute;
    this.props.updateShowTime(true);
    this.handleDateChange(this.destructureTimeObject(props), true);
  }

  updatePeriod(period) {
    const props = this.props.poster.time;
    let newHour = props.hour;
    // eslint-disable-next-line
    if (period == 1 && props.hour < 12) {
      newHour = parseInt(props.hour, 10) + 12;
      // eslint-disable-next-line
    } else if (period == 0 && props.hour >= 12) {
      newHour = parseInt(props.hour, 10) - 12;
    }
    props.hour = newHour;
    this.props.updateShowTime(true);
    this.handleDateChange(this.destructureTimeObject(props), true);
  }

  renderTitleInput(poster) {
    return (
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <Input label="Title" value={poster.textTitle} type="text" onChange={this.updateTitle} />
      </div>
    );
  }

  renderLocationInput(poster) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <Input
          label="Location Text"
          value={poster.textLocation}
          type="text"
          onChange={this.updateLocationText}
        />
      </div>
    );
  }

  renderLatLngInputs() {
    return (
      <LatLngContainer>
        <div style={{ marginRight: '40px' }}>
          <LatitudeInput
            value={this.state.absLattitude}
            onChange={this.updateLattitude}
            northSouth={this.state.northSouth}
            onSelect={this.updateNorthSouth}
          />
        </div>
        <div style={{ marginBottom: '5px', marginRight: '40px' }}>
          <LongitudeInput
            value={this.state.absLongitude}
            onChange={this.updateLongitude}
            eastWest={this.state.eastWest}
            onSelect={this.updateEastWest}
          />
        </div>
      </LatLngContainer>
    );
  }

  renderTimeSelector() {
    return (
      <React.Fragment>
        <TimeSelector
          hour={this.state.hour}
          minute={this.state.minute}
          period={this.state.period}
          updateHour={this.updateHour}
          updateMinute={this.updateMinute}
          updatePeriod={this.updatePeriod}
        />
      </React.Fragment>
    );
  }

  renderOptions() {
    const { poster } = this.props;
    return (
      <React.Fragment>
        {this.renderTitleInput(poster)}
        {this.renderLocationInput(poster)}
        {this.renderLatLngInputs()}
        {this.renderTimeSelector()}
      </React.Fragment>
    );
  }

  render() {
    return (
      <CollapsiblePanel
        headerText="Advanced Options"
        headerOnClick={this.toggle}
        isOpen={this.state.open}
      >
        {this.state.open == true ? this.renderOptions() : null}
      </CollapsiblePanel>
    );
  }
}

AdvancedOptions.propTypes = {
  updateTextDate: PropTypes.func.isRequired,
  updatePosterTitle: PropTypes.func.isRequired,
  updatePosterLattitude: PropTypes.func.isRequired,
  updatePosterLongitude: PropTypes.func.isRequired,
  updatePosterLocationText: PropTypes.func.isRequired,
  updatePosterDate: PropTypes.func.isRequired,
  updateShowTime: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  poster: PropTypes.object.isRequired,
};

export default AdvancedOptions;
