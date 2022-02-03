import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UsersView } from "./UsersView.tsx";
import { dataStorageInstance } from "./dataStorage.ts";

ReactDOM.render(
  <React.StrictMode>
    <h1 style={{textAlign: "center"}}>Welcome to users!</h1>
    <UsersView dataStorage={dataStorageInstance} />
  </React.StrictMode>,
  document.getElementById("root")
);
