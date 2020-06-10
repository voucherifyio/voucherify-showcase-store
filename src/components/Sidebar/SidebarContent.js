import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import _ from "lodash";
import CampaignCard from "./CampaignCard";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

const SidebarContent = () => {
  const [select] = useState(localStorage.getItem("customer"));

  return (
    <div className="list-group list-group-flush">
      <CustomerConsumer>
        {(ctx) => {
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
                  <div className="sidebar-heading">
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
                          {customer.name}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  {!_.isEmpty(ctx.customer) && (
                    <>
                      <div className="sidebar-heading">
                        <pre
                          className="customer-data pre-scrollable"
                          style={{ fontSize: "10px" }}
                        >
                          <code>{JSON.stringify(ctx.customer, null, 1)}</code>
                        </pre>
                        {!_.isEmpty(ctx.customerRedemptions) && (
                          <>
                            <p>Code redemptions</p>
                            <pre
                              className="customer-data pre-scrollable"
                              style={{ fontSize: "10px" }}
                            >
                              <code>
                                {JSON.stringify(
                                  ctx.customerRedemptions,
                                  null,
                                  1
                                )}
                              </code>
                            </pre>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {!_.isEmpty(ctx.campaigns) && !_.isEmpty(ctx.customer) && (
                <>
                  <div className="sidebar-heading">Campaings </div>
                  <Accordion>
                    {ctx.campaigns.map((campaign) => (
                      <Card key={campaign.id}>
                        <Card.Header>
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={campaign.id}
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {campaign.name}
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={campaign.id}>
                          <CampaignCard
                            campaign={campaign}
                            code={ctx.getCode(campaign.name)}
                          />
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
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
