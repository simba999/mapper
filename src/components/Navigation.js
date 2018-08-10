import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TNS_BLUE, PANEL_COLOR } from '../constants/colors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  font-size: 1.4em;
  padding: 10px;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  flex: 1;
  color: ${TNS_BLUE};
  background-color: ${PANEL_COLOR};
  border-radius: 3px;
  border: 2px solid ${TNS_BLUE};
  text-transform: uppercase;
  padding: 10px;
  font-weight: 500;
  margin-right: 10px;
`;

const CheckoutButton = styled.button`
  flex: 1;
  background-color: ${TNS_BLUE};
  color: ${PANEL_COLOR};
  border-radius: 3px;
  border: 2px solid ${TNS_BLUE};
  text-transform: uppercase;
  padding: 10px;
  font-weight: 500;
`;

const Navigation = ({ prevBtn, nextBtn }) => (
  <div className="panel">
    <Container>
      <SaveButton onClick={prevBtn.click}>{prevBtn.text}</SaveButton>
      <CheckoutButton onClick={nextBtn.click}>{nextBtn.text}</CheckoutButton>
    </Container>
  </div>
);

Navigation.propTypes = {
  prevBtn: PropTypes.object,
  nextBtn: PropTypes.object,
};

export default Navigation;
