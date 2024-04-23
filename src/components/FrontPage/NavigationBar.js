import React from "react";
import "../../styles/firstpage.css";

function NavigationBar() {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/#Home">Home</a>
                </li>
                <li>
                    <a href="/#Service">Benefits</a>
                </li>
                <li>
                    <a href="/#About">About</a>
                </li>
                <li>
                    <a href="/#Contact">Contact</a>
                </li>
                <li>
                    <a href="/#Profile">Profile</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationBar;
