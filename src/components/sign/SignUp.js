import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { initializeApp } from "firebase/app"; // Import initializeApp from Firebase
import "firebase/auth"; // Import Firebase authentication module
import "../../styles/sign.css";
import Footer from "../FrontPage/Footer";
import NavigationBar from "../FrontPage/NavigationBar";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJKSTqjn9C5go9ANiptLZ_BwkUpaCnUDA",
  authDomain: "fyp-blockchain-36876.firebaseapp.com",
  projectId: "fyp-blockchain-36876",
  storageBucket: "fyp-blockchain-36876.appspot.com",
  messagingSenderId: "229064253194",
  appId: "1:229064253194:web:32a9bc5a1626cc5f6724f3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [uaddress, setuAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Initialize as false
  const [selectedRole, setSelectedRole] = useState("");
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    // Simple email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Check email validity and set error message accordingly
    if (!isValidEmail(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const signUpWithEmailAndPassword = async () => {
    try {
      // Import auth from the initialized app
      const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      // Sign up successful
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      // Handle errors here, for example, displaying error messages
      console.error("Error signing up:", error.message);
    }
  };

  const isFormValid = () => {
    return (
      fullName.trim() !== "" &&
      uaddress.trim() !== "" &&
      isValidEmail(email) &&
      password.length >= 4 &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword &&
      selectedRole.trim() !== "" &&
      check
    );
  };

  const navigateToNext = () => {
    if (isFormValid()) {
      signUpWithEmailAndPassword();
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="image">
          <img />
        </div>
        <div className="form-container">
          <form>
            <div className="formdetails">
              <div className="form-group">
                <div className="form-header">
                  <h2>Let's Create an Account</h2>
                </div>
                <input
                  type="text"
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="input"
                  value={uaddress}
                  onChange={(e) => setuAddress(e.target.value)}
                  required
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Email"
                />
                {emailError && <div className="error">{emailError}</div>}
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                {password.length > 0 && password.length < 4 && (
                  <div className="error">
                    Password must be at least 4 characters
                  </div>
                )}
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }} // Toggle the showPassword state
                >
                  {showPassword ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
                </span>
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
                {confirmPassword !== password && (
                  <div className="error">Passwords do not match</div>
                )}
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                  }} // Toggle the showPassword state
                >
                  {showPassword ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
                </span>
              </div>
              <legend>Are you a</legend>
              <div className="position">
                <label>
                  <input
                    type="radio"
                    name="topping"
                    value="farmer"
                    onChange={() => setSelectedRole("farmer")}
                    checked={selectedRole === "farmer"}
                  />
                  <span>Farmer</span>
                </label>
              </div>
              <div className="position">
                <label>
                  <input
                    type="radio"
                    name="topping"
                    value="miller"
                    onChange={() => setSelectedRole("miller")}
                    checked={selectedRole === "miller"}
                  />
                  <span>Miller</span>
                </label>
              </div>
              <div className="position">
                <label>
                  <input
                    type="radio"
                    name="topping"
                    value="seller"
                    onChange={() => setSelectedRole("seller")}
                    checked={selectedRole === "seller"}
                  />
                  <span>Seller</span>
                </label>
              </div>
              <div className="position">
                <label>
                  <input
                    type="radio"
                    name="topping"
                    value="Customer"
                    onChange={() => setSelectedRole("customer")}
                    checked={selectedRole === "customer"}
                  />
                  <span>Customer</span>
                </label>
              </div>
              <input
                type="checkbox"
                checked={check}
                onChange={() => setCheck(!check)}
              />{" "}
              I accept the terms of the offer of privacy policy.
              <div className="sub but">
                <Button
                  variant="contained"
                  onClick={navigateToNext}
                  disabled={!isFormValid()}
                >
                  {" "}
                  SIGN UP
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
