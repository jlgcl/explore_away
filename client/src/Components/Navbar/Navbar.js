import "./Navbar.css";
import React, { useState } from "react";
import Sidebar from "./sidebar";

const Navbar = () => {
  const expandState = useState(false);

  let sidebarRender;

  if (expandState) sidebarRender = <Sidebar />;
  else sidebarRender = <div className="toggleBars"></div>;

  return <div className="Navbar">{sidebarRender}</div>;
};

export default Navbar;
