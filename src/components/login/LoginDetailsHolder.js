import React, {useContext, useState} from "react";
import "../../styles/Login.css";
import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app"; // Import initializeApp from Firebase
import "firebase/auth";
import {MainContext} from "../../context/MainContext";

const useStyles = makeStyles((theme) => ({
    loginDetailsHolder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputContainer: {
        margin: theme.spacing(1),
        width: "100%",
    },
}));

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

function LoginDetailsHolder() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const {userId, userRole, setUserId, setUserRole} = useContext(MainContext);

    const loginWithEmailAndPassword = async () => {
        try {
            const {getAuth, signInWithEmailAndPassword} = require("firebase/auth");
            const auth = getAuth(app);
            const response = await signInWithEmailAndPassword(auth, email, password);

            console.log('response - ', response)
            setUserId(response.user.uid)

            // Login successful
            navigate("/optionSelection"); // Redirect to option selection page after login
        } catch (error) {
            // Handle errors here, for example, displaying error messages
            console.error("Error logging in:", error.message);
        }
    };

    return (
        <div className={classes.loginDetailsHolder}>
            <Typography variant="body1">
                Doesn't have an account ? <a href="/signup">Sign up</a>
            </Typography>

            <div className={classes.inputContainer}>
                <TextField
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
            </div>

            <div className={classes.inputContainer}>
                <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                className={classes.inputContainer}
                onClick={loginWithEmailAndPassword}
            >
                Login
            </Button>
        </div>
    );
}

export default LoginDetailsHolder;
