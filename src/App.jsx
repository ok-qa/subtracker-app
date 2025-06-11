import { Route, Routes } from "react-router-dom";
import "./App.module.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SubscriptionSection />} />
      <Route path="/add" element={<AddSubscriptionPage />} />
      <Route path="/edit/:id" element={<EditSubscriptionPage />} />
    </Routes>
  );
}

export default App;
