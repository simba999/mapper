import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import './sweeterror.scss';

class SweetError extends React.Component {
  constructor(props) {
    super(props);

    this.hideError = this.hideError.bind(this);
  }

  hideError() {
    this.props.actions.hideError();
  }

  render() {
    const { error } = this.props;
    if (error.showError) {
      return (
        <div className="sweeterror-component">
          <SweetAlert
            type={error.errorType || 'error'}
            confirmBtnText={error.confirmText || 'OK'}
            confirmBtnBsStyle="primary"
            title={error.errorTitle}
            onConfirm={() => {
              this.hideError();
            }}
            className={!error.showError ? 'hidden' : ''}
          >
            {error.errorText}
          </SweetAlert>
        </div>
      );
    }
    return <div className="hidden" />;
  }
}

SweetError.propTypes = {
  error: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    hideError: PropTypes.func.isRequired,
  }),
};
export default SweetError;
