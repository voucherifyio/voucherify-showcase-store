import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import _ from "lodash";
import CampaignDetails from "./CampaignDetails";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";

const SidebarContent = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [select] = useState(localStorage.getItem("customer"));
  return (
    <div className="list-group list-group-flush">
      <CustomerConsumer>
        {(ctx) => {
          let customerDate = "";
          let downloadCustomerData = "";
          console.log(ctx.customers);
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
                            {customerDate.getFullYear()} at{" "}
                            {customerDate.getHours()}:
                            {customerDate.getMinutes()}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
              {!_.isEmpty(ctx.campaigns) && !_.isEmpty(ctx.customer) && (
                <>
                  <div className="sidebar-heading">
                    Campaings ({ctx.campaigns.length}){" "}
                  </div>
                  {ctx.campaigns.map((campaign) => (
                    <ExpansionPanel
                      square
                      key={campaign.name}
                      expanded={expanded === `${campaign.name}`}
                      onChange={handleChange(`${campaign.name}`)}
                    >
                      <ExpansionPanelSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <Typography>{campaign.name}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <CampaignDetails
                          campaign={campaign}
                          code={ctx.getCode(campaign.name)}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))}
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
