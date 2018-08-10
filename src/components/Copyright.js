/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { MAIN_BACKGROUND_COLOR } from '../constants/colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  color: white;

  @media screen and (max-width: 1040px) {
    margin-top: 40px;
    justify-content: center;
    margin-left: 0px;
  }
`;

const Copyright = () => (
  <Container>
    <span>&copy; {`${moment(moment()).format('YYYY')} The Night Sky`}</span>
  </Container>
);

export default Copyright;
