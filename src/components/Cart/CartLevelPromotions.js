import React from 'react';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';


const CartLevelPromotions = ({ ctx }) => {
  return (
    <li className="list-group-item d-flex flex-row lh-condensed">
      <Chip
          label="Get Cart Level Promotions"
          style={{
            backgroundColor: '#ff8b5c',
            color: 'white',
            maxWidth: '100%',
          }}
          className="mr-1"
          onClick={() => {
            ctx.getCartLevelPromotions()
          }}
        />
    </li>
  );
};

export default CartLevelPromotions;

CartLevelPromotions.propTypes = {
  ctx: PropTypes.object.isRequired,
};
