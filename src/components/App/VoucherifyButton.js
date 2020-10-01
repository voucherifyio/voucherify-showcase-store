import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const VoucherifyButton = ({ code, text, onClickFunction }) => {
  const [tooltipTitle, setTitle] = useState('Click to copy');

  const handleCopy = () => {
    setTitle('Copied!');
    setTimeout(() => {
      setTitle('Click to copy');
    }, 400);
  };
  if (code) {
    return (
      <Tooltip title={tooltipTitle}>
        <Button
          className="voucherifyButtonOrange"
          onClick={() => {
            navigator.clipboard.writeText(code);
            handleCopy();
          }}
        >
          {!text ? `${code}` : `${text}`}
        </Button>
      </Tooltip>
    );
  } else if (onClickFunction) {
    return (
      <Button className="voucherifyButtonOrange" onClick={onClickFunction}>
        {text}
      </Button>
    );
  } else {
    return (
      <Button className="voucherifyButtonOrange" variant="contained">
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
