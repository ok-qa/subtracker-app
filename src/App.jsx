import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage/AddSubscriptionPage";
import EditSubscriptionPage from "./pages/EditSubscriptionPage/EditSubscriptionPage";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddSubscriptionPage />} />
        <Route path="/edit/:id" element={<EditSubscriptionPage />} />
      </Routes>
    </div>
  );
}

export default App;
