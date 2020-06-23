import React from "react";

const CustomerAddress = ({ customer }) => {
  return (
    <div className="col-md-12 col-lg-3 order-1">
      <h4 className="mb-3">Address</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <div className="d-block justify-content-center col-12 text-truncate">
            {customer.customer.name.split(" ")[0]}{" "}
            {customer.customer.name.split(" ")[1]}{" "}
            <p className="mb-0 text-truncate">{customer.customer.email}</p>
            <p className="mb-0 text-truncate">
              {customer.customer.address.line_1}
            </p>
            <p className="mb-0 text-truncate">
              {customer.customer.address.postal_code}{" "}
              {customer.customer.address.city}
            </p>
            <p className="mb-0 text-truncate">
              {customer.customer.address.state},{" "}
              {customer.customer.address.country}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CustomerAddress;
