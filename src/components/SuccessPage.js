import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const [orderID, setOrderId] = useState("");
  const ID = () => {
    return "hot_beans_" + Math.random().toString(36).substr(2, 20);
  };

  useEffect(() => {
    setOrderId(ID());
  }, []);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col my-5">
          <div>
            <h1 className="text-center">Order completed</h1>
            <h2 className="text-center">Thank you for your order!</h2>
            <div className="text-center mb-5">ID: {orderID}</div>
            <Link to="/" className="inline-block btn btn-outline-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
