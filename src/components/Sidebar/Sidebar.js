import React from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = ({ sidebar, isSidebarOpen }) => {
  return (
    <>
      <div className={isSidebarOpen ? "sidebar" : "sidebar msb-x"}>
        <div className="msb" id="msb">
          <nav className="navbar navbar-default" role="navigation">
            <div className="sidebarHeader">
              <span className="font-weight-bold">Control Panel</span>
              <span onClick={sidebar} className="btn" type="button">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <SidebarContent />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
