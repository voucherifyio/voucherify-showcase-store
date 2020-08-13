import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const CartForm = ({ctx, card}) => {
  const [code, setCode] = useState('');
  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleValidate = (code) => {
    if (code !== '') {
      ctx.addPromotionToCart(code, card);
    }
  };

  return (
    <li className="list-group-item d-flex lh-condensed">
      <div className="d-flex my-auto col-4">Discount code</div>
      <div className="d-flex flex-column justify-content-center col-8">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Voucher"
              value={code}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <Button
                type="submit"
                variant="dark"
                disabled={code.replace(/^\s+/, '').replace(/\s+$/, '') === ''}
                onClick={() => {
                  handleValidate(code);
                }}
              >
                Validate
              </Button>
            </div>
          </div>
        </form>
      </div>
    </li>
  );
};
export default CartForm;

CartForm.propTypes = {
  ctx: PropTypes.object.isRequired,
};
