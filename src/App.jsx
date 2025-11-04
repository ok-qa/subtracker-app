import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage/AddSubscriptionPage";
import EditSubscriptionPage from "./pages/EditSubscriptionPage/EditSubscriptionPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { api } from "../src/api";

import styles from "./App.module.css";

function App() {
  const { token } = useSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.setAuthHeader(token);
    } else {
      navigate("/signin");
    }
  }, [token, navigate]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddSubscriptionPage />} />
        <Route path="/edit/:id" element={<EditSubscriptionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
