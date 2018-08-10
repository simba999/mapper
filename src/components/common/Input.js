// TODO: fix input focus border highlighting
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { INPUT_TEXT_COLOR } from '../../constants/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Inputt = styled.input`
  height: 55px;
  width: 100%;
  border-radius: 5px;
  border: none;
  text-indent: 15px;
  font-size: 16px;
  color: ${INPUT_TEXT_COLOR};
`;

const Input = ({ label, value, type, placeholder, onChange }) => (
  <Container>
    <Label>{label}</Label>
    <Inputt value={value} type={type} onChange={onChange} placeholder={placeholder} />
  </Container>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
