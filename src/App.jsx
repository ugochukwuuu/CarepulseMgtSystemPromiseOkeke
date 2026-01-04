import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Auth/login";
import Dashboard from "./Pages/Dashboard";
import Success from "./Pages/success";
import NotFound from "./Pages/NotFound";
import "./styles/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path ="/" element={<Navigate to ="/login" replace/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
