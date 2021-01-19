import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './style.css';
import joinUs from '../../../assets/join.jpg';
import mail from '../../../assets/mail.jpg';
import CloseIcon from '@material-ui/icons/Close';

const AppModal = ({ show, onHide, children, join }) => {
	return (
		<Modal
			onHide={onHide}
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="signUpModalWrapper"
		>
			<div className="modalHeaderImage" style={{ position: 'relative' }}>
				<img src={join ? joinUs : mail} alt="" />
				<CloseIcon
					fontSize="large"
					onClick={onHide}
					style={{
						position: 'absolute',
						top: '5px',
						right: '5px',
						cursor: 'pointer',
						color: !join && 'white',
					}}
				/>
			</div>
			<Modal.Body className="modalBody">{children}</Modal.Body>
		</Modal>
	);
};

export default AppModal;

AppModal.propTypes = {
	onHide: PropTypes.func,
	show: PropTypes.bool,
	children: PropTypes.array,
	join: PropTypes.bool,
};
