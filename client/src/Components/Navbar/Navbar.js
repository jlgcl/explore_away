import "./Navbar.css";
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar";

const Navbar = () => {
  let expandState = useState(false);

  let sidebarRender;

  if (expandState === true) sidebarRender = <Sidebar />;
  else sidebarRender = <Topbar />;

  return <div className="Navbar">{sidebarRender}</div>;
};

export default Navbar;
