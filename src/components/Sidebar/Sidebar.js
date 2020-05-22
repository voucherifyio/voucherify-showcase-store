import React from "react";
import SidebarContent from "./SidebarContent";
import SidebarButton from "./SidebarButton";

export default function Sidebar({ sidebar, isSidebarOpen }) {
  return (
    <>
      <div className={isSidebarOpen ? "sidebar" : "sidebar msb-x"}>
        <div className="msb" id="msb">
          <div className="sidebar-button">
            <SidebarButton onClick={sidebar} />
          </div>
          <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <div className="brand-wrapper">
                <div className="brand-name-wrapper">
                  <p className="navbar-brand text-center">Control panel</p>
                </div>
              </div>
            </div>
            <SidebarContent />
          </nav>
        </div>
      </div>
    </>
  );
}
