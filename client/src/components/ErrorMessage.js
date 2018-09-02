import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => {
  return (
    <React.Fragment>
      <div className="alert alert-danger" role="alert">
        Something went wrong
      </div>
      <pre>{error.toString()}</pre>
    </React.Fragment>
  );
};
ErrorMessage.defaultProps = {
  error: {}
};
ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired
};
export default ErrorMessage;
