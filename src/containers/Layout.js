import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Spinner from '../components/common/Spinner';
import Header from '../components/Header';
import Copyright from '../components/Copyright';
import { MAIN_BACKGROUND_COLOR } from '../constants/colors';

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  background: ${MAIN_BACKGROUND_COLOR};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1040px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media only screen and (min-width: 1040px) {
    max-width: 30%;
    top: 0;
    left: 0;
    margin-left: 20px;
  }
`;

const CopyrightContainerLeft = styled.div`
  width: 100%;
  @media only screen and (max-width: 1040px) {
    display: none;
  }
`;

const CopyrightContainerRight = styled.div`
  width: 100%;
  @media only screen and (min-width: 1040px) {
    display: none;
  }
`;

const Right = styled.div`
  width: 70vh;
  height: 95vh;

  @media only screen and (min-width: 1040px) {
    position: fixed;
    top: 50%;
    transform: translate(-0%, -50%);
    right: 8vw;
    margin-right: 20px;
  }

  @media only screen and (max-width: 1300px) {
    width: 60vh;
    height: 85vh;
    right: 1vw;
  }

  /* NOTE: use 1039 here to fix flashing effect. */
  @media only screen and (max-width: 1039px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

const SpinContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children, posterLoading }) => (
  <Outer>
    <Container>
      <Header />
      <InnerContainer>
        <Left>
          {children[0]}
          <CopyrightContainerLeft>
            <Copyright />
          </CopyrightContainerLeft>
        </Left>
        <Right>
          {posterLoading && (
            <SpinContainer>
              <Spinner size="large" />
            </SpinContainer>
          )}
          {children[1]}
          <CopyrightContainerRight>
            <Copyright />
          </CopyrightContainerRight>
        </Right>
      </InnerContainer>
    </Container>
  </Outer>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  posterLoading: PropTypes.bool.isRequired,
};

export default Layout;
