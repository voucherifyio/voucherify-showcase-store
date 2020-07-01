import React from "react";

const Footer = () => {
  return (
    <footer className="container py-5">
      <div className="row">
        <div className="col-4">
          <p>
            Hot Beans is a demo E-shop powered by Voucherify. It is not
            a real E-shop. The E-shop aims to showcase the functions of
            Voucherify.
          </p>
          <small className="d-block mb-3 text-muted">
            © 2017-{new Date().getFullYear()}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
