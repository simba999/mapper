/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';
import './dimensions.scss';
import CollapsiblePanel from '../common/CollapsiblePanel';

class Dimensions extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      open: false,
    };
  }

  toggle() {
    const open = !this.state.open;

    this.setState({ open });
  }

  updateSize(size, units) {
    const str = size;
    const width = str.slice(0, 2);
    const height = str.slice(3, 5);
    const data = {
      posterSize: str,
      width,
      height,
      units,
    };

    this.props.updateDimensions(data);

    // Update SKU when dimension changes
    this.props.updateVariantId({
      theme: this.props.poster.theme,
      framed: this.props.poster.framed || false,
      size,
    });
  }

  renderOptions() {
    const { config } = this.props;

    return (
      <React.Fragment>
        <br />
        <div className="dimensions-component">
          <div className="panel-body" style={{ padding: `${0}px` }}>
            <div className="form-background">
              <div className="dimensions-wrapper row">
                {config.config.available_sizes.map(size => (
                  <div className="dimensions-col col-xs-12 col-sm-6" key={size.id}>
                    <div
                      style={{ marginTop: '10px' }}
                      onClick={() => {
                        this.updateSize(size.size, size.units);
                      }}
                      className={
                        size.size === this.props.poster.layout.posterSize
                          ? 'dimension active'
                          : 'dimension'
                      }
                    >
                      <strong>{size.size.slice(0, 2)}</strong>
                      {size.units} x <strong>{size.size.slice(3, 5)}</strong>
                      {size.units}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <CollapsiblePanel
        headerText="Poster Size"
        headerOnClick={this.toggle}
        isOpen={this.state.open}
      >
        {this.state.open == true ? this.renderOptions() : null}
      </CollapsiblePanel>
    );
  }
}

Dimensions.propTypes = {
  poster: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  updateDimensions: PropTypes.func.isRequired,
  updateVariantId: PropTypes.func.isRequired,
};

export default Dimensions;
