import React, { useEffect } from 'react';
import CustomersModal from '../CustomersModal';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import Ribbon from '../Ribbon';
import { getProducts } from '../../redux/actions/storeActions';
import { getTotals, getDiscount } from '../../redux/actions/cartActions';
import { checkVersion } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _has from 'lodash.has';
import _isEmpty from 'lodash.isempty';
import toastOptions from './ToastOptions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'voucherify.js';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { prepareMessages } from '../../redux/actions/webhookActions';
import { loadState } from '../../redux/localStorage';

window.Voucherify.initialize(
	process.env.REACT_APP_FRONTEND_APP_ID,
	process.env.REACT_APP_FRONTEND_KEY
);

if (Boolean(process.env.REACT_APP_API_ENDPOINT)) {
	window.Voucherify.setBaseUrl(process.env.REACT_APP_API_ENDPOINT);
}

const App = ({
	dispatch,
	items,
	discount,
	paymentMethod,
	currentCustomer,
	enableSidebar,
	customers,
}) => {
	const state = loadState();
	useEffect(() => {
		if (_isEmpty(state) || _isEmpty(state.storeReducer.products)) {
			const fetchProducts = async () => {
				await dispatch(getProducts());
			};

			fetchProducts();
		}
	}, [dispatch, state]);

	useEffect(() => {
		const startSession = async () => {
			await dispatch(checkVersion());
		};
		startSession();
	}, [dispatch]);

	useEffect(() => {
		if (!_isEmpty(customers)) {
			dispatch(prepareMessages(customers));
		}
	}, [dispatch, customers]);

	useEffect(() => {
		if (!_isEmpty(currentCustomer)) {
			dispatch(getTotals());
		}
	}, [currentCustomer, dispatch, discount, items]);

	useEffect(() => {
		if (!_isEmpty(discount) && _has(discount, 'code')) {
			dispatch(getDiscount(discount.code));
		}
		//eslint-disable-next-line
	}, [dispatch, items, paymentMethod]);

	if (currentCustomer === null) {
		return <CustomersModal />;
	} else {
		return (
			<div className={enableSidebar ? 'mainContent' : 'mainContent sidebar'}>
				<Ribbon />
				<Container>
					<Navigation />
					<Row noGutters className="pageContainer">
						<AppRoutes />
					</Row>
					<ToastContainer {...toastOptions} />
				</Container>
				<Sidebar />
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		products: state.storeReducer.products,
		items: state.cartReducer.items,
		currentCustomer: state.userReducer.currentCustomer,
		discount: state.cartReducer.discount,
		paymentMethod: state.userReducer.paymentMethod,
		enableSidebar: state.userReducer.enableSidebar,
		campaigns: state.userReducer.campaigns,
		customers: state.userReducer.customers,
	};
};

App.propTypes = {
	dispatch: PropTypes.func,
	items: PropTypes.array,
	currentCustomer: PropTypes.object,
	discount: PropTypes.object,
	paymentMethod: PropTypes.string,
	enableSidebar: PropTypes.bool,
	products: PropTypes.array,
};

export default connect(mapStateToProps)(App);
