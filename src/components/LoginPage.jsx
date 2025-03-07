import React, { useContext, useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

export const LoginPage = ({ setShowLogin }) => {
  const { setToken, setUserDetails } = useContext(StoreContext);
  // const [token,setToken]=useState("");
  const [currState, setCurrState] = useState("Login");
  const [errorMessage, setErrorMessage] = useState(""); // Error for bad credentials
  const [errors, setErrors] = useState({}); // Validation errors
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
  };

  const validateInputs = () => {
    let newErrors = {};

    // Check if username is empty for both Login & Sign Up
    if (!data.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (
      currState === "Sign Up" &&
      !/^[a-zA-Z0-9]{3,}$/.test(data.username)
    ) {
      newErrors.username =
        "Username must be at least 3 characters (letters & numbers only).";
    }

    // Check if password is empty for both Login & Sign Up
    if (!data.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (
      currState === "Sign Up" &&
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(data.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include a letter and a number.";
    }

    // Additional validation for Sign Up only
    if (currState === "Sign Up") {
      if (!data.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const url = "http://localhost:8080";
  const onLogin = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/auth/signin";
    } else {
      newUrl += "/api/auth/signup";
    }
    try {
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
      }
    } catch (error) {
      setErrorMessage(
        currState === "Login"
          ? "Invalid username or password"
          : error.response?.data?.message || "Signup failed."
      );
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
            className={errors.username ? "error-input" : ""}
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="text"
                placeholder="Your email"
                className={errors.email ? "error-input" : ""}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </>
          )}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {errorMessage && (
          <div className="alert alert-danger py-2 mt-2 text-center">
            {errorMessage}
          </div>
        )}
        {currState === "Login" ? (
          <p>
            Creat a new account?{" "}
            <span
              onClick={() => {
                setCurrState("Sign Up");
                setErrorMessage("");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
                setErrorMessage("");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};
