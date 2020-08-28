import React from 'react';

const Footer = () => {
  return (
    <footer className="container py-5">
      <div className="row">
        <div className="col-4">
          <p>
            This demo store aims to showcase the functions of{' '}
            <a className="voucherify-link" href="https://voucherify.io">
              Voucherify
            </a>
            .
          </p>
          <small className="d-block mb-3 text-muted">
            © 2019-{new Date().getFullYear()}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
