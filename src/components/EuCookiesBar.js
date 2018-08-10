import React from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { COOKIE_AGE, COOKIE_DOMAIN } from '../constants/variables';

const Container = styled.div`
  background-color: #fff;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  font-size: 12px;
`;

const Button = styled.button`
  background-color: #2f4569;
  color: #fff;
  font-size: 12px;
  padding: 6px 13px;
  border-radius: 5px;
  margin-left: 10px;
`;

class EuCookiesBar extends React.Component {
  constructor() {
    super();

    const cookies = new Cookies();

    if (cookies.get('eu_cookies')) {
      this.state = {
        open: false,
      };
    } else {
      this.state = { open: true };
    }
  }

  render() {
    const cookies = new Cookies();

    const saveCookie = () => {
      cookies.set('eu_cookies', 'true', {
        path: '/',
        domain: COOKIE_DOMAIN,
        maxAge: COOKIE_AGE,
      });

      this.setState({ open: false });
    };

    if (this.state.open) {
      return (
        <Container>
          We use cookies to ensure that we give you the best experience on our website.
          <Button onClick={saveCookie}>Got it!</Button>
        </Container>
      );
    }

    return null;
  }
}
export default EuCookiesBar;
