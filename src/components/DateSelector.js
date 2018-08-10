import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Label } from '../resources/styles';

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: '',
      showTime: false,
    };

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

    this.toggleDay = this.toggleDay.bind(this);
  }

  toggleDay() {
    if (this.state.open) {
      this.setState({ open: '' });
    } else {
      this.setState({ open: 'open' });
    }
  }

  render() {
    const {
      theme,
      updateDay,
      fullDate,
      date,
      year,
      hour,
      minute,
      month,
      options,
      updateYear,
      updateMonth,
      period,
      updateHour,
      updateMinute,
      updatePm,
    } = this.props;
    const today = new Date();
    return (
      <div className={`DateSelector-component ${theme} ${this.state.open}`}>
        <div className="date controls">
          <div className="year">
            <select
              value={year}
              onChange={(input) => {
                updateYear(input.target.value);
              }}
            >
              {this.yearList.map((listYear, index) => (
                // eslint-disable-next-line
                <option key={index} value={listYear}>
                  {listYear}
                </option>
              ))}
            </select>
          </div>
          <div className="month">
            <select
              value={month}
              onChange={(input) => {
                updateMonth(input.target.value);
              }}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div
            className="day-input"
            onClick={() => {
              this.toggleDay();
            }}
          >
            <span>{date}</span>
            <i
              className={
                !this.state.open ? 'ion-android-arrow-dropdown' : 'ion-android-arrow-dropup'
              }
            />
          </div>
        </div>

        {!this.state.showTime && this.state.open && <div className="time-padding" />}
        {this.state.open &&
          this.state.showTime && (
            <div className="controls time">
              <div className="center">
                {hour < 12 && (
                  <select
                    className="hour"
                    value={hour}
                    onChange={(input) => {
                      updateHour(input.target.value);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="0">12</option>
                  </select>
                )}
                {hour >= 12 && (
                  <select
                    className="hour"
                    value={hour}
                    onChange={(input) => {
                      updateHour(input.target.value);
                    }}
                  >
                    <option value="13">1</option>
                    <option value="14">2</option>
                    <option value="15">3</option>
                    <option value="16">4</option>
                    <option value="17">5</option>
                    <option value="18">6</option>
                    <option value="19">7</option>
                    <option value="20">8</option>
                    <option value="21">9</option>
                    <option value="22">10</option>
                    <option value="24">11</option>
                    <option value="12">12</option>
                  </select>
                )}
                <span className="time-divider">:</span>
                <select
                  className="minute"
                  value={minute}
                  onChange={(input) => {
                    updateMinute(input.target.value);
                  }}
                >
                  {this.minuteList.map((listMinute, index) => (
                    // eslint-disable-next-line
                    <option key={index} value={listMinute}>
                      {listMinute}
                    </option>
                  ))}
                </select>
                <select
                  className="am-pm"
                  value={period}
                  onChange={(input) => {
                    updatePm(input.target.value);
                  }}
                >
                  <option value={0}>AM</option>
                  <option value={1}>PM</option>
                </select>
                <i className="ion-arrow-down-b" />
              </div>
            </div>
          )}

        <DatePicker
          inline
          selected={fullDate || today}
          onChange={updateDay}
          onSelect={this.toggleDay}
          ref={r => r && r.setOpen(false)}
          {...options}
        />
      </div>
    );
  }
}

DateSelector.propTypes = {
  theme: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  fullDate: PropTypes.object.isRequired,
  minute: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  updateMinute: PropTypes.func.isRequired,
  updateHour: PropTypes.func.isRequired,
  updateDay: PropTypes.func.isRequired,
  updateMonth: PropTypes.func.isRequired,
  updateYear: PropTypes.func.isRequired,
  period: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  updatePm: PropTypes.func.isRequired,
};

export default DateSelector;
