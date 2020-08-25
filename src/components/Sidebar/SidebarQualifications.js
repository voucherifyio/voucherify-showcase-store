import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';

const SidebarQualifications = ({ qualifications, fetchingQualifications }) => {
  const qualificationsToolTip =
    'The qualification endpoint returns all promotions available to the given customer profile and orders that meet predefined validation rules such as total order value or the minimum number of items in the cart.';

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <p className="storeSidebar-heading my-1">Customer Qualifications</p>{' '}
        <Tooltip title={qualificationsToolTip}>
          <InfoIcon className="mr-4" />
        </Tooltip>
      </div>

      <div className="chips d-flex justify-content-start align-items-start">
        {fetchingQualifications ? (
          <div className="w-100 text-center my-3">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {!_.isEmpty(qualifications) && (
              <>
                {qualifications.map((qualification) => (
                  <Chip
                    key={`${qualification.name}`}
                    style={{ maxWidth: '100%' }}
                    label={
                      qualification.name ||
                      qualification.metadata.demostoreTierName ||
                      qualification.metadata.demostoreName
                    }
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchingQualifications: state.userReducer.fetchingQualifications,
    qualifications: state.userReducer.qualifications,
    vouchers: state.userReducer.vouchers,
    campaigns: state.userReducer.campaigns,
    availableCustomers: state.userReducer.availableCustomers,
    fetchingCustomers: state.userReducer.fetchingCustomers,
  };
};

export default connect(mapStateToProps)(SidebarQualifications);

SidebarQualifications.propTypes = {
  fetchingQualifications: PropTypes.bool,
  qualifications: PropTypes.array.isRequired,
};
