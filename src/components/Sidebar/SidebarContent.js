import React from "react";
// import { storeCustomers } from "../data";
import { CustomerConsumer } from "../CustomerContext";

export default function SidebarContent() {
  return (
    <div className="side-menu-container">
      <CustomerConsumer>
        {(ctx) => {
          return (
            <>
              <select
                id="storeCustomers"
                onChange={(e) => ctx.setCustomer(e.target.value)}
                value={(Object(ctx.customer) || {}).id || "DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select customer
                </option>
                {ctx.customers.map((customer) => (
                  <option key={customer.name} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {ctx.fetchingCustomer ? (
                <>
                  <div>
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
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
                </>
              )}
            </>
          );
        }}
      </CustomerConsumer>
    </div>
  );
}
