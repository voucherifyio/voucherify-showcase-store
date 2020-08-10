import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProductList from './components/Product/ProductList';
import ProductDetails from './components/Product/ProductDetails';
import Cart from './components/Cart/Cart';
import PageMain from './components/Page/PageMain';
import PageSuccess from './components/Page/PageSuccess';
import PageError from './components/Page/PageError';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar/Sidebar';
import 'voucherify.js';

const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl text-white bg-dark text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
};

window.Voucherify.initialize(
    process.env.REACT_APP_FRONTEND_APPLICATION_ID,
    process.env.REACT_APP_FRONTEND_CLIENT_SECRET_KEY);

const App = () => {
  const [storeSidebar, setSidebar] = useState(true);
  const toggleSidebar = () => {
    setSidebar(!storeSidebar);
  };

  return (
    <>
      <div className="d-none d-md-block">
        <div className={storeSidebar ? 'd-flex' : 'd-flex toggled'} id="wrapper">
          <div id="page-content-wrapper">
            <React.Fragment>
              <div className="mainContent">
                <Navigation storeSidebar={storeSidebar} toggleSidebar={toggleSidebar} />
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
            </React.Fragment>
          </div>
          <Sidebar />
        </div>
      </div>
      <div
        id="no-mobile"
        className="d-flex d-md-none align-content-center justify-content-center"
      >
        <div className="d-flex flex-column justify-content-center
          align-items-center mt-auto mb-auto">
          <img className="mb-3" src="/logo.svg" width="150" alt="Hot Beans" />
          <h2 className="text-center">
            <a className="voucherify-link" href="https://voucherify.io">
              <b>Voucherify</b>
            </a>{' '}
            demostore is only avaliable on desktop
          </h2>
        </div>
      </div>
    </>
  );
};

export default App;
