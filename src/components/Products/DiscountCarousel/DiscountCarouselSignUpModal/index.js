import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DiscountCarouselSignUpModalForm from './DiscountCarouselSignUpModalForm';
import PropTypes from 'prop-types';
import './style.css';

const DiscountCarouselSignUpModal = ({ campaign, show, onHide }) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="signUpModalWrapper"
    >
      <Modal.Body>
        <h4 className="signUpModalTitle">{campaign.name}</h4>
        <DiscountCarouselSignUpModalForm onHide={onHide} campaign={campaign} />
      </Modal.Body>
    </Modal>
  );
};

export default DiscountCarouselSignUpModal;

DiscountCarouselSignUpModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  campaign: PropTypes.object,
};
