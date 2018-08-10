/* global window */
/* eslint-disable react/no-string-refs */
// NOTE: disabling the above because poster generator won't work with proper react refs.

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PosterGenerator } from 'thenightsky-poster';
import DimensionsBar from './DimensionsBar';
import { SHADOW_COLOR, PANEL_COLOR_MED } from '../constants/colors';

const getPosterWidth = (posterSize) => {
  if (posterSize === '18x24') {
    return '90%';
  }

  return '100%';
};

const getPosterheight = (posterSize) => {
  if (posterSize === '18x24') {
    return '85%';
  }

  return '100%';
};

const PosterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  z-index: 3;
  width: ${p => p.width};
  height: ${p => p.height};
  position: relative;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 0 50px ${SHADOW_COLOR};
  background-color: ${PANEL_COLOR_MED};
  margin-bottom: 5px;

  canvas {
    width: 100%;
    height: 100%;
    z-index: 6;
  }
`;

const Frame = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 8;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 50px ${SHADOW_COLOR};
`;

// poster.layout.posterSize = 18x24 or 50x70

class Poster extends React.Component {
  state = {
    frontEnd: true,
    lightboxVisible: false,
    loaded: false,
    height: 0,
    width: 0,
  };

  componentDidMount() {
    this.refs.canvas.getContext('2d').scale(1, 1);
    this.refs.starCanvas.getContext('2d').scale(1, 1);
    this.refs.moonCanvas.getContext('2d').scale(1, 1);
    const properties = { ...this.state, ...this.props.poster, ...this.props.poster.theme.display };
    window.mainCanvas = this.refs.canvas;
    window.starCanvas = this.refs.starCanvas;
    window.moonCanvas = this.refs.moonCanvas;

    properties.layout.previewWatermark = false;
    PosterGenerator.render(
      this.refs.canvas,
      this.refs.starCanvas,
      this.refs.moonCanvas,
      properties,
    );
  }

  componentWillReceiveProps(nextProps) {
    const properties = { ...this.state, ...nextProps.poster, ...nextProps.poster.theme.display };
    properties.layout.previewWatermark = false;
    PosterGenerator.render(
      this.refs.canvas,
      this.refs.starCanvas,
      this.refs.moonCanvas,
      properties,
    );
  }

  render() {
    const { poster, config } = this.props;

    const dimensionsUnits = poster.units || config.config.default_units;
    const dimensionsDetails = `${poster.widthLabel}${dimensionsUnits} x ${
      poster.heightLabel
    }${dimensionsUnits}`;

    // TODO: frames are gonna look weird with no border
    // Maybe we should change the background color to something lighter?

    const height = getPosterheight(poster.layout.posterSize);
    const width = getPosterWidth(poster.layout.posterSize);

    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    return (
      <React.Fragment>
        <PosterContainer frame={poster.frame} height={height} width={width}>
          {poster.frame && (
            <Frame
              src={require(`../assets/images/frames/${poster.layout.posterSize}${
                poster.frame_color
              }.png`)}
            />
          )}

          <canvas
            id="canvas"
            ref="canvas"
            width={poster.posterWidth}
            height={poster.posterHeight}
          />
          <canvas
            ref="starCanvas"
            width={poster.chartDiameter}
            height={poster.chartDiameter}
            style={{ display: 'none' }}
          />
          <canvas
            ref="moonCanvas"
            width={poster.chartDiameter}
            height={poster.chartDiameter}
            style={{ display: 'none' }}
          />
          {/* NOTE: this will need to be moved if we add frames. */}
          <DimensionsBar details={dimensionsDetails} />
        </PosterContainer>
      </React.Fragment>
    );
  }
}

Poster.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default Poster;
