import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { Radio } from 'react-bootstrap';
import './addframe.scss';
import { WHITE, FRAME_NATURAL_TEXT } from '../../constants/colors';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

class AddFrame extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateFrameColor = this.updateFrameColor.bind(this);
    this.updateFrameSize = this.updateFrameSize.bind(this);

    this.state = {
      frames: [
        { color: 'natural', textColor: FRAME_NATURAL_TEXT },
        { color: 'white', textColor: WHITE },
        { color: 'black', textColor: 'white' },
      ],
      radios: false,
    };
  }

  updateFrameColor(frameColor) {
    this.props.actions.updateFrameColor(frameColor);
  }

  updateFrameSize(frameSize) {
    this.props.actions.updateFrameSize(frameSize);
  }

  toggle() {
    const frame = !this.props.poster.poster.frame;

    ReactGA.event({
      category: 'Add Frame',
      action: this.props.poster.poster.frame ? 'Collapse Panel' : 'Expand Panel',
      label: this.props.config.device,
      value: 1,
    });

    this.props.actions.toggleFramed(frame);
  }

  render() {
    const { poster } = this.props;
    return (
      <div className="addframe-component">
        <div className="panel">
          <div className="panel-heading no-border pointer">
            <label className="tns-panel-label">Add Frame</label>
            <ToggleSwitch
              poster={poster}
              checkbox={{
                checked: poster.poster.frame,
                onChange: this.toggle,
              }}
            />
          </div>
          {poster.poster.frame && (
            <div className="panel-body" style={{ padding: `${0}px` }}>
              <ul className="frames flex">
                {this.state.frames.map(frame => (
                  <li
                    key={frame.color}
                    className={
                      frame.color === poster.poster.frame_color
                        ? `selected frame ${frame.color} col-sm-4`
                        : `frame ${frame.color} col-sm-4`
                    }
                    onClick={() => {
                      this.updateFrameColor(frame.color);
                      // this.trackFrame(frame) // GA not set up yet
                    }}
                  >
                    <div className="image-wrap">
                      <img
                        src={require(`../assets/images/frames/${frame.color}preview.png`)}
                        alt=""
                      />
                    </div>
                    <p>{frame.color}</p>
                  </li>
                ))}
              </ul>

              {/* Radio Buttons */}
              {this.state.radios && (
                <ul className="radios">
                  <li>
                    <div className="panel-body flex label-radio">
                      <Radio
                        name="radioGroup"
                        value="18x24"
                        checked={poster.poster.layout.posterSize === '18x24'}
                        onChange={(e) => {
                          this.updateFrameSize(e.target.value);
                        }}
                      >
                        <span className="label">18" x 24"</span>
                        <span>(add. $14.99)</span>
                      </Radio>
                    </div>
                  </li>

                  <li>
                    <div className="panel-body flex label-radio">
                      <Radio
                        name="radioGroup"
                        value="50x70"
                        checked={poster.poster.layout.posterSize === '50x70'}
                        onChange={(e) => {
                          this.updateFrameSize(e.target.value);
                        }}
                      >
                        <span className="label">50" x 70"</span>
                        <span>(add. $17.99)</span>
                      </Radio>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

AddFrame.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    updateFrameSize: PropTypes.func.isRequired,
    updateFrameColor: PropTypes.func.isRequired,
    toggleFramed: PropTypes.func.isRequired,
  }),
};

export default AddFrame;
