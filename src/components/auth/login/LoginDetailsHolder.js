import React, {useContext, useEffect, useState} from "react";
import "../../../styles/Login.css";
import {Button, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router-dom";
import {initializeApp} from "firebase/app";
import "firebase/auth";
import {MainContext} from "../../../context/MainContext";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {FIREBASE_CONFIG} from "../../../constants";

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

// Initialize Firebase app
const app = initializeApp(FIREBASE_CONFIG);

function LoginDetailsHolder() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const {setUserInfo, isUserLoggedIn, setIsLoading, setIsUserLoggedIn} = useContext(MainContext);

    useEffect(() => {
        console.log('isUserLoggedIn - ', isUserLoggedIn)
        if (isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);

    const loginWithEmailAndPassword = async () => {

        setIsLoading(true)
        try {
            const {getAuth, signInWithEmailAndPassword} = require("firebase/auth");
            const auth = getAuth(app);

            // Sign in user
            const response = await signInWithEmailAndPassword(auth, email, password);

            // Retrieve user information from Firestore
            const db = getFirestore(app);
            const userDocRef = doc(db, "users", response.user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserInfo({
                    userId: response.user.uid,
                    userRole: userData.role,
                    userFullName: userData.fullName,
                    userAddress: userData.address,
                });
                setIsUserLoggedIn(true)
                setIsLoading(false)
            } else {
                console.warn("No user data found");
            }

        } catch (error) {
            console.error("Error logging in:", error.message);

            // Specific handling for offline-related errors
            if (error.message.includes("client is offline")) {
                console.error("It seems you're offline. Check your internet connection.");
            }
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
