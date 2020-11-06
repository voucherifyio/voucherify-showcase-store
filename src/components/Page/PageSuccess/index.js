import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const PageSuccess = () => {
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const redirectTimer = setTimeout(() => setRedirect(true), 3000);
		return () => {
			clearTimeout(redirectTimer);
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
								<h1 className="pageTitle">Order completed!</h1>
								<h6>You will be redirected to homepage shortly</h6>
								<Spinner animation="border" role="status">
									<span className="sr-only">Loading...</span>
								</Spinner>
							</div>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default PageSuccess;
