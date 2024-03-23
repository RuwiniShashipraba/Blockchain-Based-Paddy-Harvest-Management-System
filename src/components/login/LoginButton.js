// LoginButton.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "../../styles/Login.css";

function LoginButton() {
    return (
        <Link to="/optionSelection" className="loginButton">
            Login
        </Link>
    );
}

export default LoginButton;

