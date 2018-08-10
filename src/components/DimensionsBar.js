import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TNS_TEXT_MUTED } from '../constants/colors';

/* Has no background color, so we can superimpose on the poster. */
const Dimensions = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  font-size: 1.2em;

  color: darken(${TNS_TEXT_MUTED}, 20%);

  @media screen and (max-width: 1040px) {
    margin-top: 10px;
  }
`;

const DimensionsBar = ({ details }) => <Dimensions>{details}</Dimensions>;

DimensionsBar.propTypes = {
  details: PropTypes.string.isRequired,
};

export default DimensionsBar;
