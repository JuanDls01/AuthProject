import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";

// We will use this for the deploy:
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
axios.defaults.baseURL = baseURL;
// --------------------------------

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
