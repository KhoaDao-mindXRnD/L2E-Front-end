import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import {data2} from "./test_pull.cjs"
console.log(data2)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
