import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';

import DatePicker from '../DatePicker';
import Panel from '../common/Panel';
import { Label } from '../../resources/styles';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.destructureTimeObject = this.destructureTimeObject.bind(this);
    this.updateDay = this.updateDay.bind(this);
    this.updateMonth = this.updateMonth.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.updateHour = this.updateHour.bind(this);
    this.updateMinute = this.updateMinute.bind(this);
    this.updatePm = this.updatePm.bind(this);
  }

  componentWillMount() {
    const dateTimeProps = this.destructureTimeObject(this.props.poster.time);
    this.setState({ ...dateTimeProps });
  }

  componentWillReceiveProps(nextProps) {
    const dateTimeProps = this.destructureTimeObject(nextProps.poster.time);
    if (dateTimeProps.fullDate !== this.state.fullDate) {
      this.setState({ ...dateTimeProps });
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

  handleChange(dateTimeProps) {
    const part1 = moment.utc(dateTimeProps.fullDate).format('Do');
    const part2 = moment
      .utc(dateTimeProps.fullDate)
      .format('MMMM YYYY')
      .toUpperCase();
    const textDate = `${part1} ${part2}`;

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
      year: dateTimeProps.year,
      month: dateTimeProps.month,
      date: dateTimeProps.date,
      hour: dateTimeProps.hour,
      minute: dateTimeProps.minute,
      second: dateTimeProps.second,
      period: dateTimeProps.period,
      fullDate: dateTimeProps.fullDate,
      textDate,
      time,
    });

    this.props.updatePosterDate({
      fullDate: dateTimeProps.fullDate,
      textDate,
      time,
    });
  }

  updateYear(year) {
    const props = this.props.poster.time;
    props.year = year;
    this.handleChange(this.destructureTimeObject(props));
  }

  updateMonth(month) {
    const props = this.props.poster.time;
    props.month = month;
    this.handleChange(this.destructureTimeObject(props));
  }

  updateDay(date) {
    const day = moment(date).format('D');
    const props = this.props.poster.time;
    props.date = day;
    this.handleChange(this.destructureTimeObject(props));
  }

  updateHour(hour) {
    const props = this.props.poster.time;
    props.hour = hour;
    this.handleChange(this.destructureTimeObject(props));
  }

  updateMinute(minute) {
    const props = this.props.poster.time;
    props.minute = minute;
    this.handleChange(this.destructureTimeObject(props));
  }

  updatePm(period) {
    const props = this.props.poster.time;
    let newHour = props.hour;
    if (period === 1 && props.hour < 12) {
      newHour = parseInt(props.hour, 10) + 12;
    } else if (period === 0 && props.hour >= 12) {
      newHour = parseInt(props.hour, 10) - 12;
    }
    props.hour = newHour;
    this.handleChange(this.destructureTimeObject(props));
  }

  render() {
    const { poster } = this.props;
    return (
      <Panel>
        <Label>When was your special occasion?</Label>
        <div style={{ marginTop: '10px' }} />
        <DatePicker
          updateHour={this.updateHour}
          updateMinute={this.updateMinute}
          updateYear={this.updateYear}
          updateMonth={this.updateMonth}
          updatePm={this.updatePm}
          updateDay={this.updateDay}
          theme={poster.theme}
          {...this.state}
          options={{}}
        />
      </Panel>
    );
  }
}

DateSelector.propTypes = {
  poster: PropTypes.object.isRequired,
  updatePosterDate: PropTypes.func.isRequired,
};

export default DateSelector;
