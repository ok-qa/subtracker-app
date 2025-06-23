import { Route, Routes } from "react-router-dom";
import "./App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage/AddSubscriptionPage";
import EditSubscriptionPage from "./pages/EditSubscriptionPage/EditSubscriptionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddSubscriptionPage />} />
      <Route path="/edit/:id" element={<EditSubscriptionPage />} />
    </Routes>
  );
}

export default App;
