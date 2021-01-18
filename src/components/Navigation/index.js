import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './style.css';

const Navigation = () => {
	return (
		<Row noGutters className="navigation">
			<Col sm={12} md={3} className="navigationLogoWrapper">
				<Link to="/">
					<div className="navigationLogo">
						<img
							src="/logo.svg"
							alt="Hot Beans"
							className="navigationLogoImage"
						/>
					</div>
				</Link>
			</Col>
			<NavigationMenu />
		</Row>
	);
};

export default Navigation;
