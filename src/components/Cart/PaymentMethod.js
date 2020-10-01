import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPaymentMethod } from '../../redux/actions/cartActions';
import Other from '../../assets/paymentMethods/Other.jpg';
import Visa from '../../assets/paymentMethods/Visa.jpg';
import Mastercard from '../../assets/paymentMethods/Mastercard.jpg';
import AmericanExpress from '../../assets/paymentMethods/American Express.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const PaymentMethodBadge = withStyles(() => ({
  badge: {
    backgroundColor: 'var(--voucherify-font-black)',
    color: 'var(--voucherify-font-white)',
    borderRadius: '50%',
    height: '25px',
    width: '25px',
    padding: '5px',
  },
}))(Badge);

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
                  ? 'paymentMethod'
                  : 'paymentMethod avaliablePaymentMethod'
              }
              onClick={() => dispatch(setPaymentMethod(payment.name))}
              disabled={paymentMethod === payment.name}
            >
              <Tooltip
                title={
                  paymentMethod === payment.name
                    ? 'Current payment method'
                    : `Select ${payment.name}`
                }
              >
                <PaymentMethodBadge
                  showZero={true}
                  invisible={paymentMethod !== payment.name}
                  badgeContent={
                    <CheckIcon className="paymentMethodBadgeIcon" />
                  }
                >
                  <img
                    className="paymentMethodLogo"
                    src={payment.logo}
                    alt={payment.name}
                  />
                </PaymentMethodBadge>
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
  paymentMethod: PropTypes.string,
};
