import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PANEL_COLOR } from '../../constants/colors';
import { Label } from '../../resources/styles';
import Panel from '../../components/common/Panel';

const PanelHeader = styled.div`
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${PANEL_COLOR};
  margin: -15px;
  padding: 15px;
  border-radius: ${p => (p.isOpen ? '0px' : '5px')};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const CollapsiblePanel = ({ headerText, children, headerOnClick, isOpen, headerNode }) => (
  <Panel>
    <PanelHeader>
      <TopHeader>
        <HeaderContainer onClick={headerOnClick}>
          <Label>{headerText}</Label>
          <div>{isOpen ? '▲' : '▼'}</div>
        </HeaderContainer>
        {headerNode}
      </TopHeader>
    </PanelHeader>
    {isOpen && children}
  </Panel>
);

CollapsiblePanel.propTypes = {
  headerText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  headerOnClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  headerNode: PropTypes.node,
};

export default CollapsiblePanel;
