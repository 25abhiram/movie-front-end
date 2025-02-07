import React, { useState } from 'react'
import './LoginPage.css'

export const LoginPage = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up")
    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <i class="bi bi-x-circle" onClick={() => setShowLogin(false)}></i>
                </div>
                <div className="login-popup-inputs">
                    <input type="text" placeholder='Your username' required />
                    {currState === "Login" ? <></> : <input type="email" placeholder='Your email' required />}
                    <input type="password" placeholder='Your password' required />
                </div>
                <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                {currState === "Login" ?
                    <p>Creat a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }

            </form>
        </div>
    )
}
