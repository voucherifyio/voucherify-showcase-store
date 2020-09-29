import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DiscountCarouselSignUpModalForm from './DiscountCarouselSignUpModalForm';
import Button from 'react-bootstrap/Button';

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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="signUpModalTitle">{campaign.name}</h4>
        <DiscountCarouselSignUpModalForm onHide={onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiscountCarouselSignUpModal;
