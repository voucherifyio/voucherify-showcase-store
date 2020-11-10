import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './style.css';

const AppModal = ({ show, onHide, children }) => {
	return (
		<Modal
			onHide={onHide}
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="signUpModalWrapper"
		>
			<Modal.Header closeButton className="modalHeader">
				{children[0]}
			</Modal.Header>
			<Modal.Body>{children.slice(1)}</Modal.Body>
		</Modal>
	);
};

export default AppModal;

AppModal.propTypes = {
	onHide: PropTypes.func,
	show: PropTypes.bool,
	children: PropTypes.array,
};
