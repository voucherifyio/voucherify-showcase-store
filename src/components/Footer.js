import React from "react";
import { Link } from "react-router-dom";

const CurrentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="container py-5">
      <div className="row">
        <div className="col-12 col-md">
          <h5>Hot Beans</h5>
          <small className="d-block mb-3 text-muted">
            © 2017-{CurrentYear}
          </small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="/" className="text-muted">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="text-muted">
                Store
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
