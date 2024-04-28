import React from "react";
import LoginLeftCard from "../../components/auth/login/LoginLeftCard";
import "../../styles/Login.css";
import LoginRightCard from "../../components/auth/login/LoginRightCard";
import NavigationBar from "../../components/frontPage/NavigationBar";
import {Container} from "@material-ui/core";
import Footer from "../../components/frontPage/Footer";

function Login() {
    return (
        <Container>
            <NavigationBar/>
            <div className="flex even-steven">
                <div className="w-60">
                    <LoginLeftCard/>
                </div>
                <div className="w-30 self-center">
                    <LoginRightCard/>
                </div>
            </div>
            <Footer/>
        </Container>
    );
}

export default Login;
