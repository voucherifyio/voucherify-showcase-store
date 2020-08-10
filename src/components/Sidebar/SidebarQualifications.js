import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import PropTypes from "prop-types";
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const SidebarQualifications = ({ ctx }) => {
  const VoucherifyButton = withStyles(() => ({
    root: {
      color: "white",
      fontFamily: "Lato",
      fontSize: "0.875rem",
      backgroundColor: "#ff8b5c",
      borderRadius: "20em",
      padding: "5px 20px",
      marginTop: "15px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#ff8b5c",
      },
    },
  }))(Button);

  const qualificationsToolTip = "The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart."

  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <VoucherifyButton
            variant="contained"
            onClick={() => {
              ctx.getQualifications(
                ctx.customerSelectedCustomer,
                ctx.cartTotal,
                ctx.cartItems
              );
            }}
          >
            Check Qualifications
          </VoucherifyButton>
          <div className="d-flex justify-content-center align-items-center">
            <p className="qualifications-description">Learn how qualification API works</p>
            <Tooltip title={qualificationsToolTip}>
            <IconButton>
              <InfoIcon style={{ fontSize: 14 }}  />
            </IconButton>
          </Tooltip>
        </div>
        </div>
      </div>

      {ctx.fetchingQualifications ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="chips">
          {!_.isEmpty(ctx.customerQualifications) && (
            <>
              {ctx.customerQualifications.map((qualification) => (
                <>
                  <Chip
                    // size="small"
                    // variant="outlined"
                    style={{ "max-width": "100%" }}
                    label={qualification.metadata.demostoreName}
                  />
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default SidebarQualifications;

SidebarQualifications.propTypes = {
  ctx: PropTypes.object.isRequired,
};