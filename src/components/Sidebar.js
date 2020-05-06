import React, { useState } from "react";
import SidebarContent from "./SidebarContent";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className={sidebarOpen ? "" : "msb-x"}>
        <div className="msb" id="msb">
          <div className="sidebar-button">
          <SidebarButton onClick={() => setSidebarOpen(!sidebarOpen)} />
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
