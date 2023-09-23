import React from "react";
import "../../styles/Login.css";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

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
  verticalLine: {
    width: "100%",
  },
}));

function LoginDetailsHolder() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.loginDetailsHolder}>
      <Typography variant="body1">
        Doesn't have an account ? <a href="/">Sign up</a>
      </Typography>

      <div className={classes.inputContainer}>
        <TextField
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          fullWidth
        />
      </div>

      <div className={classes.inputContainer}>
        <TextField
          type="password"
          label="Password"
          placeholder="Enter your password"
          fullWidth
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        className={classes.inputContainer}
        onClick={() => navigate("/card")}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginDetailsHolder;
