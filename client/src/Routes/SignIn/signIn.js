import React, { useRef, useState, useEffect } from "react";
import "./signIn.css";

import backArrow from "../../Assets/backarrow.png";

const SignIn = () => {
  const signupRef = useRef();
  const signinRef = useRef();

  const [authText, setAuthText] = useState("Become a member");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [authRes, setAuthRes] = useState(null);
  const [signInMsg, setSignInMsg] = useState(null);

  const onAuthClick = (e) => {
    if (authText === "Become a member") {
      setAuthText("Sign in");
      signinRef.current.style.display = "none";
      signupRef.current.style.display = "block";
    } else {
      setAuthText("Become a member");
      signinRef.current.style.display = "block";
      signupRef.current.style.display = "none";
    }
  };

  const onUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPwInput = (e) => {
    setConfirmPw(e.target.value);
  };

  const onSignupSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPw) {
      try {
        let data = {
          username: username,
          password: password,
        };
        let fetchRes = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        let fetchJson = await fetchRes.json();
        setAuthRes(fetchJson);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Passwords don't match");
    }
  };

  const onSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      let fetchRes = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let fetchJson = await fetchRes.json();
      setSignInMsg(fetchJson["message"]);
    } catch (err) {
      setSignInMsg(err.message);
    }
  };

  useEffect(() => {
    signupRef.current.style.display = "none";
  }, []);

  useEffect(() => {
    if (authRes !== undefined && authRes !== null) {
      alert(authRes);
      window.location.href = "/signin";
    }
  }, [authRes]);

  useEffect(() => {
    if (signInMsg !== undefined && signInMsg !== null) {
      alert(signInMsg);
      window.location.href = "/";
    }
  }, [signInMsg]);

  return (
    <div className="Auth">
      <a className="Auth_Back_Container" href="/">
        <img className="Auth_Back" src={backArrow} alt="back"></img> HOME
      </a>
      <div className="Auth_Container">
        <div className="Signup" ref={signupRef}>
          <div className="Signup_Title"> Welcome. </div>
          <form className="Signup_form" onSubmit={onSignupSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={onUsernameInput}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordInput}
            ></input>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={onConfirmPwInput}
            ></input>
            <input type="submit" value="Join" id="submit"></input>
          </form>
        </div>
        <div className="SignIn" ref={signinRef}>
          <div className="SignIn_Title">Welcome back.</div>
          <form className="SignIn_form" onSubmit={onSigninSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={onUsernameInput}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordInput}
            ></input>
            <input type="submit" value="Sign in" id="submit"></input>
          </form>
        </div>
        <div className="Auth_Switch" onClick={onAuthClick}>
          {authText}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
