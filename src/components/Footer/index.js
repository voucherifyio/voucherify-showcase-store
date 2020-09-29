import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import footerStyles from './style.css';
import AppStyles from '../App/style.css';

const Footer = () => {
  return (
    <Container className="footer">
      <Col xs={9}>
        <p className="footerDescription">
          This demo store aims to showcase the functions of{' '}
          <a className="voucherifyLink" href="https://voucherify.io">
            Voucherify
          </a>
          .
        </p>
      </Col>
      <Col xs={3} className="footerCopyright">
        <small>© {new Date().getFullYear()} rspective</small>
      </Col>
    </Container>
  );
};

export default Footer;
