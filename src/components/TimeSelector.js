import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { INPUT_TEXT_COLOR } from '../constants/colors';

const MINUTES = 60;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Select = styled.select`
  height: 55px;
  width: 70px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  text-indent: 15px;
  font-size: 16px;
  color: ${INPUT_TEXT_COLOR};
  margin-right: 10px;
`;

const TimeSelector = ({ hour, minute, period, updateHour, updateMinute, updatePeriod }) => {
  const renderHourOptions = () => {
    const temp = [...Array(13).keys()];
    if (hour < 12) {
      return [temp.map(i => <option value={`${i % 12}`}>{i}</option>)];
    }

    return temp.map((i) => {
      if (i !== 12) {
        return <option value={`${i + 12}`}>{i}</option>;
      }
      return <option value={`${i}`}>{i}</option>;
    });
  };

  const renderMinuteOptions = () => {
    const temp = [...Array(MINUTES).keys()];

    return temp.map((i) => {
      if (i < 10) {
        return <option value={i}>{`0${i}`}</option>;
      }
      return <option value={i}>{i}</option>;
    });
  };

  const handleChangeHour = (e) => {
    updateHour(e.target.value);
  };

  const handleChangeMinute = (e) => {
    updateMinute(e.target.value);
  };

  const handleUpdatePeriod = (e) => {
    updatePeriod(e.target.value);
  };

  return (
    <React.Fragment>
      <label>Exact Time</label>
      <Container>
        <Select value={hour} onChange={handleChangeHour}>
          {renderHourOptions()}
        </Select>
        <Select value={minute} onChange={handleChangeMinute}>
          {renderMinuteOptions()}
        </Select>
        <Select value={period} onChange={handleUpdatePeriod}>
          <option value={0}>AM</option>
          <option value={1}>PM</option>
        </Select>
      </Container>
    </React.Fragment>
  );
};

TimeSelector.propTypes = {
  hour: PropTypes.string.isRequired,
  minute: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  updateHour: PropTypes.func.isRequired,
  updateMinute: PropTypes.func.isRequired,
  updatePeriod: PropTypes.func.isRequired,
};

export default TimeSelector;
