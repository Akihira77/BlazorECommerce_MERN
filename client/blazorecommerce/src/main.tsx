import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme appearance="light">
        <App />
      </Theme>
    </BrowserRouter>
  </React.StrictMode>
);
