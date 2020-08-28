import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import ProductList from '../Product/ProductList';
import ProductDetails from '../Product/ProductDetails';
import Cart from '../Cart/Cart';
import PageMain from '../Page/PageMain';
import PageSuccess from '../Page/PageSuccess';
import PageError from '../Page/PageError';
import AppMobile from './AppMobile';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../Sidebar/Sidebar';
import { getProducts } from '../../redux/actions/storeActions';
import { getTotals, getDiscount } from '../../redux/actions/cartActions';
import { startUserSession, getQualifications } from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'voucherify.js';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty } from '../../redux/utils';
import has from 'lodash';

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName:
    'text-xl text-white bg-dark text-center p-3 shadow-none capitalize',
  progressClassName: 'bg-white opacity-25',
  closeButton: false,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
};

window.Voucherify.initialize(
  process.env.REACT_APP_FRONTEND_APP_ID,
  process.env.REACT_APP_FRONTEND_KEY
);

const App = ({
  dispatch,
  items,
  discount,
  paymentMethod,
  selectedCustomer,
}) => {
  const [storeSidebar, setSidebar] = useState(true);
  const toggleSidebar = () => {
    setSidebar(!storeSidebar);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(startUserSession());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, discount, items]);

  useEffect(() => {
    if (!isEmpty(discount) && has(discount, 'code')) {
      dispatch(getDiscount(discount.code));
    }
  }, [dispatch, items, paymentMethod, discount]);

  useEffect(() => {
    if (!isEmpty(selectedCustomer)) {
      dispatch(getQualifications());
    }
  }, [dispatch, selectedCustomer, paymentMethod, items]);

  return (
    <>
      <div className="d-none d-md-block">
        <div
          className={storeSidebar ? 'd-flex' : 'd-flex toggled'}
          id="wrapper"
        >
          <div id="page-content-wrapper">
            <div className="mainContent">
              <Navigation
                storeSidebar={storeSidebar}
                toggleSidebar={toggleSidebar}
              />
              <Switch>
                <Route exact path="/" component={PageMain} />
                <Route path="/store" component={ProductList} />
                <Route path="/details/:productId" component={ProductDetails} />
                <Route path="/cart" component={Cart} />
                <Route path="/success" component={PageSuccess} />
                <Route component={PageError} />
              </Switch>
              <Footer />
              <ToastContainer {...toastOptions} />
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
      <AppMobile />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.storeReducer.products,
    items: state.cartReducer.items,
    selectedCustomer: state.userReducer.selectedCustomer,
    discount: state.cartReducer.discount,
    paymentMethod: state.userReducer.paymentMethod,
  };
};

App.propTypes = {
  dispatch: PropTypes.func,
  items: PropTypes.array,
  selectedCustomer: PropTypes.object,
  discount: PropTypes.object,
  paymentMethod: PropTypes.string,
};

export default connect(mapStateToProps)(App);
