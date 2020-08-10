import React from 'react';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
  return (
    <>
      <div className="bg-light" id="storeSidebar-wrapper">
        <div className="storeSidebar-selected">
          <p className="storeSidebar-heading">Control panel</p>
        </div>
        <SidebarContent />
      </div>
    </>
  );
};
export default Sidebar;
