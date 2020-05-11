import React from "react";
// import { storeCustomers } from "../data";
import { CustomerConsumer } from "./CustomerContext";

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
                value={ctx.customer || "DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select customer
                </option>
                {ctx.customers.map((customer) => (
                  <option key={customer.name} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {ctx.customer && (
                <div>
                  <pre
                    className="customer-data pre-scrollable"
                    style={{ fontSize: "10px" }}
                  >
                    <code>{JSON.stringify(ctx.getCustomer(), null, 1)}</code>
                  </pre>
                </div>
              )}
            </>
          );
        }}
      </CustomerConsumer>
    </div>
  );
}
