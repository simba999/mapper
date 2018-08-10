import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';

import { INPUT_TEXT_COLOR, TNS_TEXT_FADE, TNS_TEXT } from '../constants/colors';

const MIN_YEAR = 1000;
const MAX_YEAR = 3001;
const NUM_YEARS = MAX_YEAR - MIN_YEAR;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  height: 55px;
  width: 150px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  text-indent: 15px;
  font-size: 16px;
  color: ${INPUT_TEXT_COLOR};
  margin-right: 10px;
`;

const DateButton = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  width: 150px;
  border-radius: 5px;
  border: none;
  text-indent: 15px;
  font-size: 16px;
  color: ${INPUT_TEXT_COLOR};
  margin-right: 10px;
  background-color: #f8f8f8;
  cursor: pointer;
  padding-bottom: 1px;
`;

const Calendar = styled.div`
  .react-datepicker {
    width: 100%;
    border: none;
    background-color: transparent;
    .react-datepicker__navigation {
      /* // Hide month selection arrows */
      display: none;
    }
    .react-datepicker__month-container {
      width: 100%;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      .react-datepicker__header {
        padding-top: 15px;
        background-color: transparent;
        border-bottom: none;
        padding: 0;
        .react-datepicker__header__dropdown,
        .react-datepicker__header__dropdown--select {
          display: flex;
          width: calc(100% - 100px);
          transform: translateX(100px);
          .react-datepicker__month-dropdown-container,
          .react-datepicker__month-dropdown-container--select {
            position: relative;
            background-color: white;
            border-radius: $tns-panel-input-border-radius;
            box-shadow: $tns-panel-input-box-shadow;
            flex: 2;
            padding: 0 10px;
            -webkit-appearance: none !important;
          }
          .react-datepicker__year-dropdown-container,
          .react-datepicker__year-dropdown-container--select {
            position: relative;
            background-color: white;
            border-radius: $tns-panel-input-border-radius;
            box-shadow: $tns-panel-input-box-shadow;
            flex: 1;
            padding: 0 10px;
            -webkit-appearance: none !important;
          }
          select {
            padding: 5px 0;
            background: transparent;
            position: relative;
            font-size: 16px;
            border: 0;
            height: 55px;
            width: 100%;
            -webkit-appearance: none !important;
            -moz-appearance: none;
            outline: none;
            color: ${TNS_TEXT_FADE};
          }
          .react-datepicker__month-dropdown-container {
            margin: 0;
            margin-right: 7.5px;
          }
          .react-datepicker__year-dropdown-container {
            margin: 0;
            margin-left: 7.5px;
          }
        }
        .react-datepicker__current-month,
        .react-datepicker-time__header {
          /* Remove month header text */
          display: none;
        }
        .react-datepicker__day-names {
          margin: 0 -15px;
          padding: 0 15px;
        }
        .react-datepicker__day-names,
        .react-datepicker__week,
        .react-datepicker__month {
          .react-datepicker__day-name,
          .react-datepicker__day,
          .react-datepicker__time-name {
            width: 14.285%;
            font-size: 12px;
            margin: 0;
            padding: 15px;
            color: ${TNS_TEXT};
          }
        }
      }
      .react-datepicker__month {
        margin: 0;
        background-color: rgba(256, 256, 256, 0.5);
        margin: 0 -15px -5px -15px;
        padding: 7.5px 15px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        .react-datepicker__day-name,
        .react-datepicker__day,
        .react-datepicker__time-name {
          width: 14.285%;
          font-size: 12px;
          margin: 0;
          padding: 15px;
          color: ${TNS_TEXT};
        }
      }
    }
  }
`;

class DatePicker extends React.Component {
  state = {
    open: false,
  };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  renderYearOptions = () => {
    const temp = [...Array(NUM_YEARS).keys()].map(i => i + MIN_YEAR);

    return temp.map(i => <option value={i}>{i}</option>);
  };

  render() {
    const { updateDay, fullDate, date, year, month, options, updateYear, updateMonth } = this.props;
    const today = new Date();
    return (
      <OuterContainer>
        <TopContainer>
          <Select
            value={year}
            onChange={(input) => {
              updateYear(input.target.value);
            }}
          >
            {this.renderYearOptions()}
          </Select>

          <Select
            style={{ flex: 1 }}
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
          </Select>

          <DateButton onClick={this.toggleOpen}>{date}</DateButton>
        </TopContainer>

        {this.state.open && (
          <Calendar>
            <ReactDatePicker
              inline
              selected={fullDate || today}
              onChange={updateDay}
              onSelect={this.toggleOpen}
              ref={r => r && r.setOpen(false)}
              {...options}
            />
          </Calendar>
        )}
      </OuterContainer>
    );
  }
}

DatePicker.propTypes = {
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
  isPm: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
  updatePm: PropTypes.func.isRequired,
};

export default DatePicker;
