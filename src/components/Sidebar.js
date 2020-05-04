import React from "react";
import { Link } from "react-router-dom";
import { storeCustomers } from "../data";
import { CustomerConsumer } from "./CustomerContext";

export default function Sidebar() {
  return (
    <CustomerConsumer>
      {(ctx) => {
        function getSelectedCustomer() {
         let selectedCustomer = document.getElementById("storeCustomers")
         ctx.setCustomer(selectedCustomer.value)
        }
        return (
          <div className="msb" id="msb">
            <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <div className="brand-wrapper">
                  <div className="brand-name-wrapper">
                    <p className="navbar-brand text-center">Control panel</p>
                  </div>
                </div>
              </div>
              <div className="side-menu-container">
                <select id="storeCustomers" onChange={() => {getSelectedCustomer()}}>
                <option disabled selected value> -- select an option -- </option>

                  {storeCustomers.map((customer) => {
                    return (
                      <option
                        key={customer.name}
                        value={customer.name}
                      >
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
            </nav>
          </div>
        );
      }}
    </CustomerConsumer>
  );
}
