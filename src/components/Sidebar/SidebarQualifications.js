import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const SidebarQualifications = ({ ctx }) => {
  const qualificationsToolTip =
    'The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart.';

  return (
    <>
      <div className="chips d-flex justify-content-start align-items-start">
        {ctx.fetchingQualifications ? (
          <div className="w-100 text-center my-3">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {!_.isEmpty(ctx.customerQualifications) && (
              <>
                {ctx.customerQualifications.map((qualification) => (
                  <Chip
                    key={`${qualification.metadata.demostoreName}`}
                    style={{ maxWidth: '100%' }}
                    label={qualification.metadata.demostoreName}
                  />
                ))}
              </>
            )}
          </>
        )}
        <Tooltip title={qualificationsToolTip}>
          <Chip
            label="Check qualifications"
            style={{
              backgroundColor: '#ff8b5c',
              color: 'white',
              maxWidth: '100%',
            }}
            onClick={() => {
              ctx.getQualifications(
                ctx.customerSelectedCustomer,
                ctx.cartTotal,
                ctx.cartItems,
                ctx.customerPaymentMethod
              );
            }}
          />
        </Tooltip>
      </div>
    </>
  );
};
export default SidebarQualifications;

SidebarQualifications.propTypes = {
  ctx: PropTypes.object.isRequired,
};
