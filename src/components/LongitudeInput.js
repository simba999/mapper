/* eslint-disable */
/* eslint-disable eqeqeq */
// TODO: fix width of labels, make responsive for two cols
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { INPUT_TEXT_COLOR } from '../constants/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  height: 55px;
`;

const Input = styled.input`
  height: 55px;
  width: 70%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  text-indent: 15px;
  font-size: 16px;
  color: ${INPUT_TEXT_COLOR};
`;

const LongitudeInput = ({ value, onChange, eastWest, onSelect }) => (
  <Container>
    <label>Longitude</label>
    <FormGroup>
      <InnerContainer>
        <Input
          value={value}
          min="0"
          max="180"
          type="number"
          step="0.0001"
          onChange={input => onChange(input.target.value)}
        />
        <DropdownButton
          componentClass={InputGroup.Button}
          title={eastWest == 1 ? 'E' : 'W'}
          onSelect={e => {
            onSelect(e);
          }}
          style={{ height: '55px', border: 'none' }}
        >
          <MenuItem eventKey="1">E</MenuItem>
          <MenuItem eventKey="-1">W</MenuItem>
        </DropdownButton>
      </InnerContainer>
    </FormGroup>
  </Container>
);

LongitudeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  eastWest: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LongitudeInput;
