import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';

const PageError = () => {
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const errorTimer = setTimeout(() => setRedirect(true), 3000);
		return () => {
			clearTimeout(errorTimer);
		};
	}, []);

	return (
		<>
			{redirect ? (
				<Redirect to="/" />
			) : (
				<div className="page">
					<Row>
						<Col>
							<div className="centeredContent">
								<h1 className="pageTitle">Oops!</h1>
								<h6>Sorry, an error has occured - going back to homepage</h6>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};
export default PageError;
