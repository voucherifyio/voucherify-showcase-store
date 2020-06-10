import React, { useState, useRef } from "react";
import { CustomerConsumer } from "../CustomerContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
const CampaignCard = ({ campaign, code }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <CustomerConsumer>
        {(ctx) => {
          return (
            <>
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "scroll",
                  whiteSpace: "pre-wrap",
                  "transition:": "all .5s ease-in-out",
                }}
              >
                <Card.Body>
                  <Button
                    variant="primary"
                    ref={target}
                    onClick={() => {
                      ctx.getCopiedCode(code);
                      setShow(true);
                    }}
                    onMouseLeave={() => {
                      setShow(false);
                    }}
                  >
                    {code}
                  </Button>
                  <Overlay
                    target={target.current}
                    show={show}
                    placement="right"
                  >
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Voucher copied!
                      </Tooltip>
                    )}
                  </Overlay>
                  <Card.Text>
                    {campaign.metadata.demostoreDescription}
                  </Card.Text>
                </Card.Body>
                <Card
                  style={{
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                    "transition:": "all .5s ease-in-out",
                  }}
                >
                  <Card.Header>Details</Card.Header>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Type: {campaign.campaign_type}
                    </ListGroupItem>
                    {campaign.start_date && (
                      <ListGroupItem>
                        Start: {campaign.start_date}
                      </ListGroupItem>
                    )}
                    {campaign.expiration_date && (
                      <ListGroupItem>
                        End: {campaign.expiration_date}
                      </ListGroupItem>
                    )}
                    {campaign.activity_duration_after_publishing && (
                      <ListGroupItem>
                        Duration: {campaign.activity_duration_after_publishing}
                      </ListGroupItem>
                    )}
                    {campaign.validity_timeframe && (
                      <ListGroupItem>
                        Validity timeframe: {campaign.validity_timeframe}
                      </ListGroupItem>
                    )}
                    {campaign.validity_day_of_week && (
                      <ListGroupItem>
                        Validity day: {campaign.validity_day_of_week}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Card>
                <Card
                  style={{
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <Card.Header>Voucher details</Card.Header>
                  <ListGroup className="list-group-flush">
                    {campaign.vouchers_count && (
                      <ListGroupItem>
                        Vouchers count: {campaign.vouchers_count}
                      </ListGroupItem>
                    )}
                    {campaign.voucher.discount.type === "PERCENT" && (
                      <ListGroupItem>
                        Voucher discount:{" "}
                        {campaign.voucher.discount.percent_off}%
                      </ListGroupItem>
                    )}
                    {campaign.voucher.discount.type === "AMOUNT" && (
                      <ListGroupItem>
                        Voucher discount: $
                        {(campaign.voucher.discount.amount_off / 100).toFixed(
                          2
                        )}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                  <Card.Header>Workflow</Card.Header>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      {campaign.metadata.demostoreSteps.step1}
                    </ListGroupItem>
                    {campaign.metadata.demostoreSteps.step2 && (
                      <ListGroupItem>
                        {campaign.metadata.demostoreSteps.step2}
                      </ListGroupItem>
                    )}
                    {campaign.metadata.demostoreSteps.step3 && (
                      <ListGroupItem>
                        {campaign.metadata.demostoreSteps.step3}
                      </ListGroupItem>
                    )}
                    {campaign.metadata.demostoreSteps.step4 && (
                      <ListGroupItem>
                        {campaign.metadata.demostoreSteps.step4}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Card>
              </div>
            </>
          );
        }}
      </CustomerConsumer>
    </>
  );
};

export default CampaignCard;
