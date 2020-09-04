import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';

const VoucherifyStyledButton = withStyles(() => ({
  root: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: '0.875rem',
    backgroundColor: '#ff8b5c',
    borderRadius: '20em',
    padding: '5px 20px',
    marginTop: '15px',
    marginBottom: '15px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ff8b5c',
    },
  },
}))(Button);

const VoucherifyButton = ({ code, text }) => {
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
          <div>
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
              <VoucherifyStyledButton
                variant="contained"
                onClick={handleTooltipOpen}
              >
                {code}
              </VoucherifyStyledButton>
            </Tooltip>
          </div>
        </CopyToClipboard>
      </ClickAwayListener>
    );
  } else {
    return <VoucherifyButton variant="contained">{text}</VoucherifyButton>;
  }
};

export default VoucherifyButton;
