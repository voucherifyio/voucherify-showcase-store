import React from "react";
import SidebarContent from "./SidebarContent";
const Sidebar = () => {
  return (
    <>
      <div className="bg-light" id="sidebar-wrapper">
        <div className="sidebar-selected">
          <p className="sidebar-heading">Control panel</p>
        </div>
        <SidebarContent />
      </div>
    </>
  );
};
export default Sidebar;
