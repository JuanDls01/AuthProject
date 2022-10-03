import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context";
import { Provider } from "react-redux";
import store from "./redux/store";

// We will use this for the deploy:
import axios from "axios";
import PersistAccess2 from "./utilities/PersistAccess2";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
axios.defaults.baseURL = baseURL;
// --------------------------------

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
