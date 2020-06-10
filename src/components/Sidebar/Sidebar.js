import React from "react";
import SidebarContent from "./SidebarContent";
const Sidebar = () => {
  return (
    <>
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Control panel </div>
        <SidebarContent />
      </div>
    </>
  );
};
export default Sidebar;
