import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UsersView } from "./UsersView.tsx";
import { dataStorageInstance } from "./dataStorage.ts";

ReactDOM.render(
  <React.StrictMode>
    <UsersView dataStorage={dataStorageInstance} />
  </React.StrictMode>,
  document.getElementById("root")
);
