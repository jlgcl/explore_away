import React, { useEffect, useState } from "react";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [renderContent, setRenderContent] = useState(
    <a href="/signin">Sign In</a>
  );

  const fetchUser = async () => {
    let fetchRes = await fetch("/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });
    let fetchJson = await fetchRes.json();
    if (fetchJson !== undefined) setUser(fetchJson["username"]);
  };

  const onSignout = async () => {
    await fetch("/signout", { method: "GET" });
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
          <a href="/" onClick={onSignout}>
            Sign Out
          </a>
        </>
      );
    }
  }, [user]);

  return (
    <div className="Topbar">
      <div className="logo" />
      <div className="Navlinks">
        <a href="/">Home</a>
        <a href="/daily_itinerary">Daily Itinerary</a>
        <a href="/search">Search</a>
        {renderContent}
      </div>
    </div>
  );
};

export default Topbar;
