import React from "react";
import LoginDetailsHolder from "./LoginDetailsHolder";
import "../../styles/Login.css";

function LoginRightCard() {
    return (
        <div className="card-styles p-10">
            <h2 className="center-text">Login</h2>
            <LoginDetailsHolder/>
        </div>
    );
}

export default LoginRightCard;
