import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const VoucherifyButton = ({ code, text, title = 'none', onClickFunction }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  if (code) {
    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <CopyToClipboard text={code}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied"
          >
            <Button
              className="voucherifyButton"
              variant="contained"
              onClick={handleTooltipOpen}
            >
              {!text ? `${code}` : `${text}`}
            </Button>
          </Tooltip>
        </CopyToClipboard>
      </ClickAwayListener>
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
  handleDiscounts: PropTypes.func,
};
