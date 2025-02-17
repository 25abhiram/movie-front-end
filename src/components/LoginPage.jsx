import React, { useContext, useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

export const LoginPage = ({ setShowLogin }) => {
  const { setToken, setUserDetails } = useContext(StoreContext);
  // const [token,setToken]=useState("");
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const url = "http://localhost:8080";
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/auth/signin";
    } else {
      newUrl += "/api/auth/signup";
    }
    const response = await axios.post(newUrl, data);
    if (response.data) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      const user = {
        userId: response.data.id, // Store user ID
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
      };

      setUserDetails(user);
      localStorage.setItem("userDetails", JSON.stringify(user));

      setShowLogin(false);
      alert("Login successfull");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <i className="bi bi-x-circle" onClick={() => setShowLogin(false)}></i>
        </div>
        <div className="login-popup-inputs">
          <input
            name="username"
            onChange={onChangeHandler}
            value={data.username}
            type="text"
            placeholder="Your username"
            required
          />
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
          )}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currState === "Login" ? (
          <p>
            Creat a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
