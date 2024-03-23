import React from "react";
import office from "../../img/office.png";
import "../../styles/Login.css";

function LoginLeftCard() {
    return (
        <div className="card-styles center-text">
            <h1>Welcome to <br/>Smart Paddy</h1>
            <img src={office} alt="officeImage" id="officeImage"/>
        </div>
    );
}

export default LoginLeftCard;
