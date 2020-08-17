import React from 'react';
import CartItem from './CartItem';
import _ from 'lodash';
import CartForm from './CartForm';
import CartLevelPromotions from './CartLevelPromotions'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';

const CartList = ({ ctx }) => {
  // const [card, setCard] = useState('Other')

  return (
    <div className="col-md-12 col-lg-9 order-2">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span>Your cart</span>
      </h4>
      <ul className="list-group mb-3">
        {ctx.cartItems.map((item) => {
          return <CartItem key={item.id} item={item} ctx={ctx} />;
        })}
        <li className="list-group-item d-flex lh-condensed">
            <div className="my-auto col-4">Payment method: <strong>{ctx.customerPaymentMethod}</strong></div>
            <div className="d-flex my-auto col-4">
              <Chip className="mr-1" onClick={() => ctx.setCard('Visa')} label="Visa"></Chip>
              <Chip className="mr-1"  onClick={() => ctx.setCard('MasterCard')} label="MasterCard"></Chip>
            </div>
        </li>
        {!_.isEmpty(ctx.cartSelectedVoucher) || !_.isEmpty(ctx.cartSelectedPromotion) ? (
          <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
            {!_.isEmpty(ctx.cartSelectedVoucher) && ctx.cartSelectedVoucher.hasOwnProperty('code') && 
              (
              <>
                <div className="d-inline my-auto col-4">
                  Discount code{' '}
                  <span className="text-success">
                    {ctx.cartSelectedVoucher.code}
                  </span>
                </div>
              </>
            )
          }
          {!_.isEmpty(ctx.cartSelectedVoucher) && ctx.cartSelectedVoucher.hasOwnProperty('banner') &&
              (
              <>
                <div className="d-inline my-auto col-4">
                Active Promotion{' '}
                  <span className="text-success">
                    {ctx.cartSelectedVoucher.metadata.demostoreName }
                  </span>
                </div>
              </>
            )
          }
            
            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div className="d-none d-lg-block my-auto mx-auto col-2"></div>
            <div
              className="d-flex flex-column justify-content-center
              my-auto mx-auto align-items-center col-2"
            >
              <small className="text-success">Discount</small>
              <span className="text-success">
                -${(ctx.cartDiscountedAmount / 100).toFixed(2)}
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
            <IconButton
                className="mx-2"
                onClick={() => ctx.removePromotionFromCart('promotion')}
              >
                <DeleteIcon />
              </IconButton>  
            </div>
          </li>
        ) : (
          <>
            <CartForm ctx={ctx}/>
            <CartLevelPromotions ctx={ctx} />
          </>
        )}
        <li className="list-group-item d-flex flex-row justify-content-between lh-condensed">
          <Tooltip title="Clear cart">
            <IconButton className="mx-2" onClick={() => ctx.clearCart()}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <div
            className="d-flex flex-column justify-content-center
            my-auto ml-auto align-items-center col-4"
          >
            <h4 className="mb-0">
              ${(ctx.cartTotalAfterPromotion / 100).toFixed(2)}
            </h4>
          </div>
        </li>
      </ul>
      <>
        {ctx.customerSelectedCustomer ? (
          <Link
            to="/success"
            className="link-unstyled"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="dark"
              onClick={() => {
                ctx.checkoutCart(ctx.customerSelectedCustomer, ctx.customerPaymentMethod);
                ctx.updateCustomerData(ctx.customerSelectedCustomer.source_id);
              }}
              className="w-100 p-2"
            >
              Proceed to checkout
            </Button>
          </Link>
        ) : (
          <Alert variant="dark">Select customer first!</Alert>
        )}
      </>
    </div>
  );
};

export default CartList;

CartList.propTypes = {
  ctx: PropTypes.object.isRequired,
};
