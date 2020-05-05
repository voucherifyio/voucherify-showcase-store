import React from "react";
import { Link } from "react-router-dom";
import { storeCustomers } from "../data";
import { CustomerConsumer } from "./CustomerContext";

export default function SidebarContent() {
  const updateCustomer = (ctx) => {
    return (e) => {
      ctx.setCustomer(e.target.value);
    };
  };
  return (
    <CustomerConsumer>
      {(ctx) => {
        return (
          <div className="side-menu-container">
            <select
              id="storeCustomers"
              onChange={updateCustomer(ctx)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select customer
              </option>

              {storeCustomers.map((customer) => {
                return (
                  <option key={customer.name} value={customer.name}>
                    {customer.name}
                  </option>
                );
              })}
            </select>
            <ul className="nav navbar-nav">
              <li className="panel panel-default" id="dropdown">
                <a data-toggle="collapse" href="#dropdown-lvl1">
                  <i className="fa fa-diamond"></i> Dropdown
                  <span className="caret"></span>
                </a>
                <div id="dropdown-lvl1" className="panel-collapse collapse">
                  <div className="panel-body">
                    <ul className="nav navbar-nav">
                      <li>
                        <Link to="#">Mail</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      }}
    </CustomerConsumer>
  );
}
