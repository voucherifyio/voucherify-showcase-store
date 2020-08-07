import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import PropTypes from 'prop-types';

const SidebarQualifications = ({ ctx }) => {
  const VoucherifyButton = withStyles(() => ({
    root: {
      color: 'white',
      fontFamily: 'Lato',
      fontSize: '0.875rem',
      backgroundColor: '#ff8b5c',
      borderRadius: '20em',
      padding: '5px 20px',
      marginTop: '15px',
      marginBottom: '15px',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#ff8b5c',
      },
    },
  }))(Button);

  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <VoucherifyButton
            variant="contained"
            onClick={() => {
              ctx.getQualifications(
                ctx.customerSelectedCustomer,
                ctx.cartTotal,
                ctx.cartItems
              );
            }}
          >
            Check Qualifications
          </VoucherifyButton>
        </div>
      </div>

      {ctx.fetchingQualifications ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="chips">
          {!_.isEmpty(ctx.customerQualifications) && (
            <>
              {ctx.customerQualifications.map((qualification) => (
                <>
                  <Chip
                    // size="small"
                    // variant="outlined"
                    style={{'max-width': '100%'}}
                    label={qualification.metadata.demostoreName}
                  />
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
export default SidebarQualifications;

SidebarQualifications.propTypes = {
    ctx: PropTypes.object.isRequired,
  };