import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Guard } from "./Guard";

ReactDOM.render(
  <React.StrictMode>
    <Guard />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
