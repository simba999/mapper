import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo-black.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  padding-left: 15px;
  padding-top: 15px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 15px;

  @media only screen and (max-width: 1280px) {
    justify-content: center;
  }
`;

const Title = styled.p`
  font-size: 3em;
  margin-top: 15px;
  color: #fff;

  @media only screen and (max-width: 1380px) {
    font-size: 1.5em;
  }
`;

const Text = styled.div`
  font-size: 1.2em;
  margin-top: -15px;
  color: whitesmoke;

  @media only screen and (max-width: 1280px) {
    display: none;
  }
`;

const Header = () => (
  <Container>
    <Left>
      <img src={logo} style={{ height: '80px', width: '80px' }} />
    </Left>
    <Right>
      <Title>Create Your Own Night Sky</Title>
      <Text>Never forget the night your heart skipped a beat.</Text>
    </Right>
  </Container>
);

export default Header;
