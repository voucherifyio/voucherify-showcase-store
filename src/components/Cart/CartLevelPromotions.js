import React from "react";
import Chip from '@material-ui/core/Chip';

import PropTypes from "prop-types";
import _ from 'lodash';


const CartLevelPromotions = ({ ctx }) => {
  return (
    <li className="list-group-item d-flex flex-row lh-condensed">
      <Chip
          size="small"
          variant="outlined"
          label="Check Cart Level Promotions"
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
      {!_.isEmpty(ctx.customerValidatedPromotions) && (
        <>
          {ctx.customerValidatedPromotions.map((promotion) => {
            return (
              <Chip
                    key={promotion.id}
                    size="small"
                    variant="outlined"
                    style={{ maxWidth: '100%' }}
                    label={promotion.metadata.name}
                    onClick={() => ctx.validatePromotion(promotion)}
                    className="mr-1"
                  />
             
            );
          })}
        </>
      )}
    </li>
  );
};

export default CartLevelPromotions;

CartLevelPromotions.propTypes = {
  ctx: PropTypes.object.isRequired,
};
