import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Auth/login";
import Dashboard from "./Pages/Dashboard";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
