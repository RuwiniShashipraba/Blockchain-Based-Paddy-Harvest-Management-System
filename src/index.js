import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MainProvider from "./context/MainContext";

ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById("root")
);
