import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Auth/login";
import Dashboard from "./Pages/Dashboard";
import Success from "./Pages/success";
import "./styles/App.css";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>

    <Toaster 
        position="top-right" // Position where toasts will appear
        reverseOrder={false} 
      />
</>

  );
}

export default App;
