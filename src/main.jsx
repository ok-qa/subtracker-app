import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import AppTheme from "./theme/AppTheme.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SubscriptionProvider>
        <ThemeContextProvider>
          <AppTheme>
            <App />
          </AppTheme>
        </ThemeContextProvider>
      </SubscriptionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
