import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const VoucherifyButton = ({ code, text, onClickFunction }) => {
  if (code) {
    return (
      <Tooltip title="Click to copy">
        <Button
          className="voucherifyButton"
          variant="contained"
          onClick={() => navigator.clipboard.writeText(code)}
        >
          {!text ? `${code}` : `${text}`}
        </Button>
      </Tooltip>
    );
  } else if (onClickFunction) {
    return (
      <Button
        className="voucherifyButton"
        onClick={onClickFunction}
        variant="contained"
      >
        {text}
      </Button>
    );
  } else {
    return (
      <Button className="voucherifyButton" variant="contained">
        {text}
      </Button>
    );
  }
};

export default VoucherifyButton;

VoucherifyButton.propTypes = {
  code: PropTypes.string,
  text: PropTypes.string,
  onClickFunction: PropTypes.func,
};
