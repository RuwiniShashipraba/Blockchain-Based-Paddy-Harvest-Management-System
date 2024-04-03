import React from "react";
import "../../styles/firstpage.css";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import frontpageAnimation from "../../img/frontpage.json";

function MainSection() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: frontpageAnimation,
  };

  return (
    <main>
      <div className="main-content" id="Home">
        <div className="text-content">
          <h1>Welcome to RICE TRACK</h1>
          <h2>
            Empowering Sri Lanka's rice industry with blockchain innovation
          </h2>
          {/* <h3>from farm to table</h3> */}
          {/* <h4>a journey of transparency, trust, and quality.</h4> */}
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
        <div className="image-content">
          <Lottie options={defaultOptions} height={600} width={600} />
        </div>
      </div>
    </main>
  );
}

export default MainSection;
