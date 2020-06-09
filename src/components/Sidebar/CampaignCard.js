import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";

const CampaignCard = ({ campaign, code }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="campaign_card">
        <a
          href={`#${campaign.name}`}
          className="campaign_title"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {campaign.name}
        </a>

        <div
          className="expandable"
          id={campaign.name}
          style={expand ? { height: "auto" } : { height: "0px" }}
        >
          <CustomerConsumer>
            {(ctx) => {
              return (
                <div
                  className="campaign_code"
                  onClick={() => ctx.getCopiedCode(code)}
                >
                  {code}
                  <p>
                    Redemptions:{" "}
                    {campaign.voucher.redemption.quantity === null
                      ? "Unlimited"
                      : campaign.voucher.redemption.quantity}
                  </p>
                </div>
              );
            }}
          </CustomerConsumer>
          <p className="campaign_description">Campaign Details</p>
          <ul>
            <li>Campaign {campaign.active ? "active" : "inactive"}</li>
            <li>Description: {campaign.metadata.demostore_description}</li>
            <li>Type: {campaign.campaign_type}</li>
            {campaign.start_date && <li>Start: {campaign.start_date}</li>}
            {campaign.expiration_date && (
              <li>End: {campaign.expiration_date}</li>
            )}
            {campaign.activity_duration_after_publishing && (
              <li>
                Activity duration: {campaign.activity_duration_after_publishing}
              </li>
            )}
            {campaign.validity_timeframe && (
              <li>Validity timeframe: {campaign.validity_timeframe}</li>
            )}
            {campaign.validity_day_of_week && (
              <li>Validity day of the week: {campaign.validity_day_of_week}</li>
            )}
            <li>Vouchers count:{campaign.vouchers_count}</li>
            {campaign.voucher.discount.type === "PERCENT" && (
              <li>
                Voucher discount: {campaign.voucher.discount.percent_off}%
              </li>
            )}
            {campaign.voucher.discount.type === "AMOUNT" && (
              <li>Voucher discount: ${campaign.voucher.discount.amount_off}</li>
            )}
          </ul>

          <p className="campaign_description">Campaign workflow</p>
          <ul>
            <li>{campaign.metadata.demostore_steps.step1}</li>
            {campaign.metadata.demostore_steps.step2 && (
              <li>{campaign.metadata.demostore_steps.step2}</li>
            )}
            {campaign.metadata.demostore_steps.step3 && (
              <li>{campaign.metadata.demostore_steps.step3}</li>
            )}
            {campaign.metadata.demostore_steps.step4 && (
              <li>{campaign.metadata.demostore_steps.step4}</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
