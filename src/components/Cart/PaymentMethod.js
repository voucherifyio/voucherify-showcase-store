import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPaymentMethod } from '../../redux/actions/cartActions';
import Other from '../../assets/Other.svg';
import Visa from '../../assets/Visa.svg';
import Mastercard from '../../assets/Mastercard.svg';
import AmericanExpress from '../../assets/American Express.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const PaymentMethod = ({ paymentMethod, dispatch }) => {
  const paymentMethods = [
    {
      name: 'Visa',
      logo: Visa,
    },
    {
      name: 'Mastercard',
      logo: Mastercard,
    },
    {
      name: 'American Express',
      logo: AmericanExpress,
    },
    {
      name: 'Other',
      logo: Other,
    },
  ];

  return (
    <Row className="paymentMethodSection" noGutters={true}>
      <Col sm={4} className="sectionTitle">
        Payment method:{' '}
        <span className="selectedPaymentMethod">{paymentMethod}</span>
      </Col>
      <Col sm={8}>
        <div className="paymentMethodsWrapper">
          {paymentMethods.map((payment) => (
            <div
              key={payment.name}
              className={
                paymentMethod === payment.name
                  ? 'paymentMethod '
                  : 'paymentMethod avaliablePaymentMethod'
              }
              disabled={paymentMethod === payment.name}
            >
              <Tooltip
                title={
                  paymentMethod === payment.name
                    ? 'Current payment method'
                    : `Select ${payment.name}`
                }
              >
                <IconButton
                  onClick={() => dispatch(setPaymentMethod(payment.name))}
                >
                  <img
                    className="paymentMethodLogo"
                    src={payment.logo}
                    alt={payment.name}
                  />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    paymentMethod: state.userReducer.paymentMethod,
  };
};

export default connect(mapStateToProps)(PaymentMethod);

PaymentMethod.propTypes = {
  dispatch: PropTypes.func,
};
