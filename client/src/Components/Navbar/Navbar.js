import "./Navbar.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar";

const Navbar = () => {
  let expandState = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);

  let sidebarRender;

  if (expandState === true) sidebarRender = <Sidebar />;
  else sidebarRender = <Topbar />;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    var currentScrollPos = window.pageYOffset; // obtain current y-offset
    // visible cut-off per Navbar height
    setVisible(
      (currentScrollPos > prevScrollPos &&
        currentScrollPos - prevScrollPos > 70) ||
        currentScrollPos > 10
    );
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div className="Navbar" style={{ top: visible ? "0" : "-60px" }}>
      {sidebarRender}
    </div>
  );
};

export default Navbar;
