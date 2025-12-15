import "../styles/LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoText from "../components/logo";

const LoginPage = () => {
  const navigate = useNavigate();
  const validateForm = (fullName, email, phoneNumber) => {
    if (!fullName || !fullName.trim()) return "Full name is required";
    if (!email || !email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email format";
    if (!phoneNumber || !phoneNumber.trim()) return "Phone number is required";
    if (!/^\d{10,}$/.test(phoneNumber.replace(/\D/g, "")))
      return "Phone number must be at least 10 digits";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm(
      formData.fullName,
      formData.email,
      formData.phoneNumber,
    );
    setError(validationError || "");
    if (!validationError) {
      console.log("Form submitted:", formData);
      navigate("/dashboard");
    } else {
      console.log("validation erro:", validationError);
    }
  };
  return (
    <div className="login-container">
      <div className="form-container">
        <LogoText />

        <div className="main-form">
          <h1 className="">Hi there,...</h1>
          <p>Get Started with Appointments.</p>

          <form onSubmit={handleSubmit}>
            <label className="label " htmlFor="fullName">
              Full Name
              <div className="input-container rainbow-input">
                <img className="img" src="src/assets/nameIcon.png" alt="full name" />
                <input
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                />
              </div>
            </label>
            <label className="label " htmlFor="email">
              Email
              <div className="input-container">
                <img className="img" src="src/assets/emailIcon.png" alt="email" />
                <input
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </div>
            </label>

            <label className="label " htmlFor="phoneNumber">
              Phone Number
              <div className="input-container">
                <img className="img" src="src/assets/phoneIcon.png" alt="Phone Number" />
                <input
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                />
              </div>
            </label>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              Get Started
            </button>
          </form>
        </div>
        <p className="terms">@carepulse copyright</p>
      </div>
      <div className="banner-container"></div>
    </div>
  );
};

export default LoginPage;
