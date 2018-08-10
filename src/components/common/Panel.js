import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PANEL_COLOR_MED, SHADOW_COLOR } from '../../constants/colors';

const Panell = styled.div`
  background-color: ${PANEL_COLOR_MED};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 0 30px ${SHADOW_COLOR};
  margin-bottom: 20px;
`;

const Panel = ({ children }) => <Panell>{children}</Panell>;

Panel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Panel;
