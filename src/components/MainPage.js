import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
      <div className="col-md-5 p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal">Hot Beans</h1>
        <p className="lead font-weight-normal">
          Jumpstart your marketing efforts with this example based on Apple's
          marketing pages.
        </p>
        <Link to="/store" className="btn btn-outline-secondary">
          Store
        </Link>
      </div>
      <div className="product-device box-shadow d-none d-md-block"></div>
      <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
    </div>
  );
};

export default MainPage;
