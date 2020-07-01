import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CampaignDetails = ({ campaign, code }) => {
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
      fontFamily: "Lato",
      fontSize: "0.875rem",
      backgroundColor: "#ff8b5c",
      borderRadius: "20em",
      padding: "5px 20px",
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
      key={campaign.name}
    >
      <div key={campaign.name}>
        <p className="campaign-description section-heading">
          Your discount voucher{" "}
          {campaign.voucher.discount.type === "PERCENT" && (
            <>{campaign.voucher.discount.percent_off}% off</>
          )}
          {campaign.voucher.discount.type === "AMOUNT" && (
            <>${(campaign.voucher.discount.amount_off / 100).toFixed(2)} off</>
          )}
          {campaign.metadata.demostoreBOGO &&
            ` for ${campaign.metadata.demostoreBOGO}`}
        </p>
        <p className="campaign-description">Click to copy</p>
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
        {campaign.metadata.demostoreSteps && (
          <>
            <p className="campaign-description section-heading redemption-rules">
              Redemption rules:
            </p>
            {campaign.metadata.demostoreSteps.split(";").map((step) => (
              <div
                key={step}
                className="campaign-step d-flex flex-row align-items-center"
              >
                <div className="campaign-step-icon">
                  <ArrowRightIcon />
                </div>
                <div className="campaign-step-description">
                  <p className="campaign-step-text">{step}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
