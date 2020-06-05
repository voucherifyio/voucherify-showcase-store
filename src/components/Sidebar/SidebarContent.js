import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import _ from "lodash";

const SidebarContent = () => {
  const [select] = useState(localStorage.getItem("customer"));
  
  return (
    <div className="side-menu-container">
      <CustomerConsumer>
        {(ctx) => {
          const getCode = (camp_name) => {
            let customer = ctx.customer.source_id;
            let campaing = camp_name;
        
            let customerVouchers = ctx.publishedVouchers.find(
              (voucher) => voucher.customer === customer
            );
        
            let customerCampaigns = customerVouchers.campaings.find(
              (camp) => camp.campaign === campaing
            );
        
            return customerCampaigns.code;
          };
          return (
            <>
              {ctx.fetchingCustomer ? (
                <>
                  <div>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <select
                    id="storeCustomers"
                    onChange={(e) => ctx.setCustomer(e.target.value)}
                    value={(ctx.customer || {}).source_id || "DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select customer
                    </option>
                    {ctx.customers.map((customer) => (
                      <option key={customer.name} value={customer.source_id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>

                  {!_.isEmpty(ctx.customer) && (
                    <div>
                      <pre
                        className="customer-data pre-scrollable"
                        style={{ fontSize: "10px" }}
                      >
                        <code>{JSON.stringify(ctx.customer, null, 1)}</code>
                      </pre>
                      {ctx.customerRedemptions && (
                        <pre
                          className="customer-data pre-scrollable"
                          style={{ fontSize: "10px" }}
                        >
                          <code>
                            {JSON.stringify(ctx.customerRedemptions, null, 1)}
                          </code>
                        </pre>
                      )}
                      <h5>Cart Campaign</h5>
                      <p>Your cart must be valued $55 or more</p>
                      <div>Campaign voucher: {getCode("More-than-$55-in-Cart")} </div>
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
