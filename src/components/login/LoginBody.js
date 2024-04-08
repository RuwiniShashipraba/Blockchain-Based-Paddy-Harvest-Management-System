import React from "react";
import LoginLeftCard from "./LoginLeftCard";

import "../../styles/Login.css";
import LoginRightCard from "./LoginRightCard";
import NavigationBar from "../FrontPage/NavigationBar";
import { Container } from "@material-ui/core";
import Footer from "../FrontPage/Footer";

function LoginBody() {
  return (
    <Container>
      <NavigationBar />
      <div className="flex even-steven">
        <div className="w-60">
          <LoginLeftCard />
        </div>
        <div className="w-30 self-center">
          <LoginRightCard />
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default LoginBody;
