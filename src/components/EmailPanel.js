/* global alert */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from './common/Panel';
import Input from './common/Input';
import { isValidEmail } from '../resources/utils';

import { TNS_BLUE, PANEL_COLOR } from '../constants/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
`;

const Button = styled.button`
  flex: 1;
  background-color: ${TNS_BLUE};
  color: ${PANEL_COLOR};
  border-radius: 3px;
  border: 2px solid ${TNS_BLUE};
  text-transform: uppercase;
  padding: 10px;
  font-weight: 500;
  width: 100%;
`;

class EmailPanel extends React.Component {
  state = {
    email: '',
  };

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };

  handleContinue = () => {
    if (!isValidEmail(this.state.email, true)) {
      return alert('Please enter a valid email.');
    }

    this.props.goToCheckout(this.state.email);
    return null;
  };

  render() {
    return (
      <React.Fragment>
        <Panel>
          <Input onChange={this.onEmailChange} placeholder="Enter your email" />
          <Container>
            <p>
              By entering your email you will receive a digital copy of your Night Sky that you can
              edit or purchase later.
            </p>
            <Button onClick={this.handleContinue}>Continue</Button>
          </Container>
        </Panel>
      </React.Fragment>
    );
  }
}

EmailPanel.propTypes = {
  goToCheckout: PropTypes.func.isRequired,
};

export default EmailPanel;
