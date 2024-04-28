import React, {useContext} from "react";
import "../../styles/firstpage.css";
import {MainContext} from "../../context/MainContext";

function NavigationBar() {
    const {logout, isUserLoggedIn} = useContext(MainContext);

    return (
        <nav>

            {isUserLoggedIn ? (
                <>
                    <ul style={{justifyContent: "flex-end"}}>
                        <li>
                            <a href={"/"} style={{textDecoration: "none", color: "white"}}>
                                <i className="fa fa-home-alt" style={{marginRight: "8px", marginLeft: "18px"}}/>
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <i className="fa fa-sign-out-alt" style={{marginRight: "8px", marginLeft: "8px"}}/>
                            </a>
                        </li>
                    </ul>
                </>

            ) : (
                <>
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
                    </ul>
                </>
            )}
        </nav>
    );
}

export default NavigationBar;
