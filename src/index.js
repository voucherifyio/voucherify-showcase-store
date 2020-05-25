import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { ProductProvider } from "./components/Context";
import { CustomerProvider } from "./components/CustomerContext";
import Sidebar from "./components/Sidebar";

const Demostore = () => {
  const [sidebar, setSidebar] = useState(true);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <Sidebar sidebar={handleSidebar} isSidebarOpen={sidebar}  />
      <App sidebar={handleSidebar} isSidebarOpen={sidebar}  />
    </>
  );
};

ReactDOM.render(
  <CustomerProvider>
    <ProductProvider>
      <Router>
        <React.StrictMode>
          <Demostore />
        </React.StrictMode>
      </Router>
    </ProductProvider>
  </CustomerProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
