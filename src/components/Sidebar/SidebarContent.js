import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import _ from "lodash";
import CampaignDetails from "./CampaignDetails";
import VoucherDetails from "./VoucherDetails";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(() => ({
  root: {
    padding: 20,
  },
}))(MuiExpansionPanelDetails);

const SidebarContent = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const sortData = (a, b) => {
    if (a.metadata.demostoreOrder < b.metadata.demostoreOrder) {
      return -1;
    } else if (a.metadata.demostoreOrder > b.metadata.demostoreOrder) {
      return 1;
    } else {
      return 0;
    }
  };

  const [select] = useState(localStorage.getItem("customer"));
  return (
    <div className="list-group list-group-flush">
      <CustomerConsumer>
        {(ctx) => {
          let customerDate = "";
          let downloadCustomerData = "";
          if (ctx.customer) {
            customerDate = new Date(
              ctx.customer.summary.orders.last_order_date
            );
            downloadCustomerData =
              "data: text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(ctx.customer));
          }

          return (
            <>
              {ctx.fetchingCustomer ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <div className="sidebar-select-customer">
                    <Form.Control
                      as="select"
                      id="storeCustomers"
                      onChange={(e) => ctx.setCustomer(e.target.value)}
                      value={
                        (ctx.customer || {}).source_id || select || "DEFAULT"
                      }
                      className=""
                    >
                      <option value="DEFAULT" disabled>
                        Select customer
                      </option>
                      {ctx.customers.map((customer) => (
                        <option key={customer.name} value={customer.source_id}>
                          {customer.name} ({customer.metadata.country})
                        </option>
                      ))}
                    </Form.Control>
                    <a href={downloadCustomerData} download="customerData.json">
                      <Tooltip title="Download data">
                        <IconButton>
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </a>
                  </div>
                  {!_.isEmpty(ctx.customer) && (
                    <>
                      <div className="sidebar-content">
                        <p>
                          Location:{" "}
                          <span className="sidebar-content-data">
                            {ctx.customer.address.country}
                          </span>
                        </p>
                        <p>
                          Total amount spent:{" "}
                          <span className="sidebar-content-data">
                            $
                            {(
                              ctx.customer.summary.orders.total_amount / 100
                            ).toFixed(2)}
                          </span>
                        </p>
                        <p>
                          Last order date:{" "}
                          <span className="sidebar-content-data">
                            {("0" + customerDate.getDate()).slice(-2)}.
                            {("0" + (customerDate.getMonth() + 1)).slice(-2)}.
                            {customerDate.getFullYear()} @{" "}
                            {("0" + customerDate.getHours()).slice(-2)}:
                            {("0" + customerDate.getMinutes()).slice(-2)}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              {!_.isEmpty(ctx.campaigns) &&
                !_.isEmpty(ctx.vouchers) &&
                !_.isEmpty(ctx.customer) && (
                  <>
                    <div className="sidebar-heading">
                      <b>Vouchers</b> ({ctx.vouchers.length})
                    </div>
                    {ctx.fetchingCampaigns ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <div>
                        {ctx.vouchers.sort(sortData).map((voucher) => (
                          <ExpansionPanel
                            square
                            key={voucher.metadata.demostoreName}
                            expanded={
                              expanded === `${voucher.metadata.demostoreName}`
                            }
                            onChange={handleChange(
                              `${voucher.metadata.demostoreName}`
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${voucher.metadata.demostoreName}-content`}
                              id={`${voucher.metadata.demostoreName}-header`}
                            >
                              <Typography>
                                {voucher.metadata.demostoreName}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <VoucherDetails
                                voucher={voucher}
                                code={voucher.code}
                              />
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        ))}
                      </div>
                    )}
                    <div className="sidebar-heading">
                      <b>Campaigns</b> ({ctx.campaigns.length}){" "}
                    </div>
                    {ctx.fetchingCampaigns ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <div>
                        {ctx.campaigns.sort(sortData).map((campaign) => (
                          <ExpansionPanel
                            square
                            key={campaign.name}
                            expanded={expanded === `${campaign.name}`}
                            onChange={handleChange(`${campaign.name}`)}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`${campaign.metadata.demostoreName}-content`}
                              id={`${campaign.metadata.demostoreName}-header`}
                            >
                              <Typography>
                                {campaign.metadata.demostoreName}
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <CampaignDetails
                                campaign={campaign}
                                code={ctx.getCode(campaign.name)}
                              />
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        ))}
                      </div>
                    )}
                  </>
                )}
            </>
          );
        }}
      </CustomerConsumer>
    </div>
  );
};

export default SidebarContent;
