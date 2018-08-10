import React from 'react';
import styled from 'styled-components';
import { TNS_BLUE, TNS_BACKGROUND } from '../../constants/colors';

const Loader = styled.div`
  border: 6px solid ${TNS_BACKGROUND};
  border-top: 6px solid ${TNS_BLUE};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => <Loader />;

export default Spinner;
