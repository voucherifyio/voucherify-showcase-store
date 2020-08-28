import React from 'react';

const AppMobile = () => {
  return (
    <div
      id="no-mobile"
      className="d-flex d-md-none align-content-center justify-content-center"
    >
      <div
        className="d-flex flex-column justify-content-center
          align-items-center mt-auto mb-auto"
      >
        <img className="mb-3" src="/logo.svg" width="150" alt="Hot Beans" />
        <h2 className="text-center">
          <a className="voucherify-link" href="https://voucherify.io">
            <b>Voucherify</b>
          </a>{' '}
          demostore is only avaliable on desktop
        </h2>
      </div>
    </div>
  );
};

export default AppMobile;