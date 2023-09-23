import React from "react";
import LoginLeftCard from "./LoginLeftCard";

import "../../styles/Login.css";
import LoginRightCard from "./LoginRightCard";

function LoginBody() {
    return (
        <div className="flex even-steven">
            <div className="w-60">
                <LoginLeftCard/>
            </div>
            <div className="w-30 self-center">
                <LoginRightCard/>
            </div>
        </div>
    );
}

export default LoginBody;
