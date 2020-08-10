import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
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
                    size="small"
                    variant="outlined"
                    style={{ maxWidth: '100%' }}
                    label={qualification.metadata.demostoreName}
                  />
                ))}
              </>
            )}
          </>
        )}
        <Chip
          size="small"
          variant="outlined"
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
              ctx.cartItems
            );
          }}
        />
        <div className="d-flex justify-content-center align-items-center">
          <p className="qualifications-description">
            Learn how qualification API works
          </p>
          <Tooltip title={qualificationsToolTip}>
            <IconButton>
              <InfoIcon style={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default SidebarQualifications;

SidebarQualifications.propTypes = {
  ctx: PropTypes.object.isRequired,
};
