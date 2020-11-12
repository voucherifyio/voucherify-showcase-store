import React from 'react';
import './style.css';
import VoucherifyLogoSquare from '../../../assets/VoucherifyLogoSquare.png';

const VoucherifyInformation = ({ children }) => {
	return (
		<div className="voucherifyInformation">
			<div className="voucherifyInformationLogo">
				<div className="voucherifyInformationLogoWrapper">
					<img src={VoucherifyLogoSquare} alt="" />
				</div>
			</div>
			<div className="voucherifyInformationText">{children}</div>
		</div>
	);
};

export default VoucherifyInformation;
