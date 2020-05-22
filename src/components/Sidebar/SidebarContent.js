import React, { useState } from "react";
import { CustomerConsumer } from "../CustomerContext";
import _ from "lodash";

export default function SidebarContent() {
  const [select] = useState(localStorage.getItem("customer"));

  return (
    <div className="side-menu-container">
      <CustomerConsumer>
        {(ctx) => {
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
}
