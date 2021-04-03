import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [renderContent, setRenderContent] = useState(
    <a href="/signin">Sign In</a>
  );

  const fetchUser = async () => {
    let fetchRes = await fetch("/loginstatus", { method: "GET" });
    let fetchJson = await fetchRes.json();
    setUser(fetchJson["username"]);
  };

  const onSignout = async () => {
    await fetch("/signout", { method: "POST" });
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null) {
      setRenderContent(<a href="/signin">Sign In</a>);
    } else {
      setRenderContent(
        <>
          <a href="/#">
            <b>{user}</b>
          </a>
          <a href="/#" onClick={onSignout}>
            Sign Out
          </a>
        </>
      );
    }
  }, [user]);

  return (
    <div className="Topbar">
      <div className="toggleBars">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
      <div className="logo" />
      <div className="Navlinks">
        <a href="/#">Home</a>
        <a href="/#">Travel Plan</a>
        <a href="/#">Daily Itinerary</a>
        <a href="/search">Search</a>
        <a href="/#">About</a>
        <a href="/#">Contact</a>
        {renderContent}
      </div>
    </div>
  );
};

export default Topbar;
