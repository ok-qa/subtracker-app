import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";
import AppTheme from "./theme/AppTheme.jsx";
import { store } from "./store/index.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SubscriptionProvider>
          <ThemeContextProvider>
            <AppTheme>
              <App />
            </AppTheme>
          </ThemeContextProvider>
        </SubscriptionProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
