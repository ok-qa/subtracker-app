import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { api } from "../src/api";
import HomePage from "./pages/HomePage/HomePage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage/AddSubscriptionPage";
import EditSubscriptionPage from "./pages/EditSubscriptionPage/EditSubscriptionPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

import styles from "./App.module.css";

function App() {
  const { token } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      api.setAuthHeader(token);
    } else if (
      location.pathname !== "/reset-password" &&
      location.pathname !== "/forgot-password"
    ) {
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
