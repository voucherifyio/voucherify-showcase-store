import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { CopyToClipboard } from "react-copy-to-clipboard";

const VoucherDetails = ({ voucher, code }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const VoucherifyButton = withStyles(() => ({
    root: {
      color: "white",
      backgroundColor: "#ff8b5c",
      borderRadius: "20em",
      padding: "1em 3em",
      marginTop: "15px",
      marginBottom: "15px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#ff8b5c",
      },
    },
  }))(Button);

  return (
    <div
      style={{
        width: "100%",
        "transition:": "all .5s ease-in-out",
      }}
      key={voucher.code}
    >
      <div key={voucher.code}>
        <Typography>
          <b>
            Your discount voucher{" "}
            {voucher.discount.type === "PERCENT" && (
              <>{voucher.discount.percent_off}% off</>
            )}
            {voucher.discount.type === "AMOUNT" && (
              <>${(voucher.discount.amount_off / 100).toFixed(2)} off</>
            )}
          </b>
        </Typography>
        <Typography>Click to copy</Typography>
        <div className="d-flex justify-content-center">
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
                  <VoucherifyButton
                    variant="contained"
                    onClick={handleTooltipOpen}
                  >
                    {code}
                  </VoucherifyButton>
                </Tooltip>
              </div>
            </CopyToClipboard>
          </ClickAwayListener>
        </div>
        <Typography>
          Current redemptions: {voucher.redemption.redeemed_quantity}
        </Typography>

        {voucher.metadata.demostoreSteps && (
          <>
            <Typography>Rules</Typography>
            <List>
              {voucher.metadata.demostoreSteps.split(";").map((step) => (
                <ListItem key={step}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </div>
    </div>
  );
};

export default VoucherDetails;
