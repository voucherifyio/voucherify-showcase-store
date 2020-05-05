import React from "react";
import SidebarContent from './SidebarContent'

export default function Sidebar() {
  return (
    <div className="msb" id="msb">
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
  );
}
