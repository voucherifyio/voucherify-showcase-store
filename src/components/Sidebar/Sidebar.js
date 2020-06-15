import React from "react";
import SidebarContent from "./SidebarContent";
const Sidebar = (sidebar) => {
  return (
    <>
      <div className="sidebar-absolute">
        <div className="bg-light border-right selected" id="sidebar-wrapper">
          <div
            className={
              sidebar.sidebar
                ? "sidebar-title sidebarSelected"
                : "sidebar-title"
            }
          >
            Control panel{" "}
          </div>
          <SidebarContent />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
