import React from "react";

const CurrentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="container py-5">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src="/logo.svg" width="150" alt="Hot Beans" />

          <small className="d-block mb-3 text-muted">
            © 2017-{CurrentYear}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
