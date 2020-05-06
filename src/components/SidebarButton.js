import React from "react";

export default function SidebarButton({ onClick }) {
  return (
    <div>
      <span className="sr-only">Toggle navigation</span>
      <svg
        className="bi bi-square-fill"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <rect width="16" height="16" rx="2" />
      </svg>
    </div>
  );
}
