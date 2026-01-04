import React from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate()
  const button = {
    backgroundColor: "#1c2023",
    cursor: "pointer",
    borderRadius: " 8px",
    padding: " 8px",
    border: " 1px solid #1a1d21",
    color: " #24ae7c",
    fontHeight: " 400",
    fontSize: " 14px",
    lineHeight: " 20px",
  };
  const minHeight = {
    minHeight: "100vh",
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={minHeight}
    >
      <h1>This route doesn't exist</h1>

      <button
      onClick={() => navigate('/dashboard')} 
      style={button}>Go back to dashboard</button>
    </div>
  );
};

export default NotFound;
