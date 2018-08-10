import React from 'react';
import PropTypes from 'prop-types';
import './toggleswitch.scss';

class ToggleSwitch extends React.Component {
  state = {
    checked: false,
  };

  componentWillMount() {
    this.setState({
      checked: this.props.checkbox.checked,
    });
  }

  updateToggle = () => {
    let { checked } = this.state;
    checked = !checked;
    this.setState({ checked });

    // Update
    this.props.checkbox.onChange(checked);
  };

  render() {
    const { poster } = this.props;

    return (
      <div className="toggleswitch-component">
        <label className={`${poster.theme} switch`}>
          <input type="checkbox" checked={this.state.checked} onChange={this.updateToggle} />
          <span className="slider round" />
        </label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  poster: PropTypes.object.isRequired,
  checkbox: PropTypes.object.isRequired,
};

export default ToggleSwitch;
