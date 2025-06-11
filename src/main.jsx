import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { SubscriptionProvider } from "./assets/context/SubscriptionContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </BrowserRouter>
);
