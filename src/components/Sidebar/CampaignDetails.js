import React from "react";
import { CustomerConsumer } from "../CustomerContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const CampaignDetails = ({ campaign, code }) => {
  const VoucherifyButton = withStyles(() => ({
    root: {
      color: "white",
      backgroundColor: "#3bb8c3",
    },
  }))(Button);

  return (
    <>
      <CustomerConsumer>
        {(ctx) => {
          return (
            <>
              <div
                style={{
                  maxHeight: "250px",
                  overflowY: "scroll",
                  whiteSpace: "pre-wrap",
                  width: "100%",
                  "transition:": "all .5s ease-in-out",
                }}
              >
                <List dense={true}>
                  {code && (
                    <ListItem>
                      <ListItemIcon>
                        <FileCopyIcon />
                      </ListItemIcon>
                      <Tooltip title="Copy">
                        <VoucherifyButton
                          variant="contained"
                          onClick={() => {
                            ctx.getCopiedCode(code);
                          }}
                        >
                          {code}
                        </VoucherifyButton>
                      </Tooltip>
                    </ListItem>
                  )}
                  {campaign.metadata.demostoreDescription && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Description`}
                        secondary={`${campaign.metadata.demostoreDescription}`}
                      />
                    </ListItem>
                  )}
                  {campaign.campaign_type && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Type`}
                        secondary={`${campaign.campaign_type}`}
                      />
                    </ListItem>
                  )}

                  {campaign.start_date && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Start date`}
                        secondary={`${campaign.start_date}`}
                      />
                    </ListItem>
                  )}

                  {campaign.start_date && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Start date`}
                        secondary={`${campaign.start_date}`}
                      />
                    </ListItem>
                  )}

                  {campaign.expiration_date && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`End date`}
                        secondary={`${campaign.expiration_date}`}
                      />
                    </ListItem>
                  )}

                  {campaign.activity_duration_after_publishing && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Duration`}
                        secondary={`${campaign.activity_duration_after_publishing}`}
                      />
                    </ListItem>
                  )}

                  {campaign.validity_timeframe && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Validity timeframe`}
                        secondary={`${campaign.validity_timeframe}`}
                      />
                    </ListItem>
                  )}

                  {campaign.validity_day_of_week && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Validity day of the week`}
                        secondary={`${campaign.validity_day_of_week}`}
                      />
                    </ListItem>
                  )}

                  {campaign.vouchers_count && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Vouchers count`}
                        secondary={`${campaign.vouchers_count}`}
                      />
                    </ListItem>
                  )}

                  {campaign.voucher.discount.type === "PERCENT" && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Voucher discount`}
                        secondary={`${campaign.voucher.discount.percent_off}%`}
                      />
                    </ListItem>
                  )}

                  {campaign.voucher.discount.type === "AMOUNT" && (
                    <ListItem>
                      <ListItemIcon>
                        <HelpOutlineIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Voucher discount`}
                        secondary={`$${(
                          campaign.voucher.discount.amount_off / 100
                        ).toFixed(2)}`}
                      />
                    </ListItem>
                  )}
                </List>
                <List dense={true}>
                  {campaign.metadata.demostoreSteps.step1 && (
                    <ListItem>
                      <ListItemText
                        primary={`Step 1`}
                        secondary={`${campaign.metadata.demostoreSteps.step1}`}
                      />
                    </ListItem>
                  )}
                  {campaign.metadata.demostoreSteps.step2 && (
                    <ListItem>
                      <ListItemText
                        primary={`Step 2`}
                        secondary={`${campaign.metadata.demostoreSteps.step2}`}
                      />
                    </ListItem>
                  )}
                  {campaign.metadata.demostoreSteps.step3 && (
                    <ListItem>
                      <ListItemText
                        primary={`Step 3`}
                        secondary={`${campaign.metadata.demostoreSteps.step3}`}
                      />
                    </ListItem>
                  )}
                  {campaign.metadata.demostoreSteps.step4 && (
                    <ListItem>
                      <ListItemText
                        primary={`Step 4`}
                        secondary={`${campaign.metadata.demostoreSteps.step4}`}
                      />
                    </ListItem>
                  )}
                </List>
              </div>
            </>
          );
        }}
      </CustomerConsumer>
    </>
  );
};

export default CampaignDetails;
