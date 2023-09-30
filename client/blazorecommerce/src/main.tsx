import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <BrowserRouter>
        <CookiesProvider>
            <PrimeReactProvider>
                <App />
            </PrimeReactProvider>
        </CookiesProvider>
    </BrowserRouter>
    // </React.StrictMode>
);
