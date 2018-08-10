import React from 'react';
import PropTypes from 'prop-types';
import './parallaxtop.scss';

const ParallaxTop = ({ logo, title, message, step }) => (
  <div className="parallaxtop-component">
    {!step && <img src={logo} alt="" />}
    <div className="text">
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  </div>
);

ParallaxTop.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  step: PropTypes.string,
};

export default ParallaxTop;
