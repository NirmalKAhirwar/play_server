import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To redirect the user after login
import axios from "axios";
import "./Login.css"; // Import CSS file for styling

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { emailOrUsername, password };

    try {
      // Send POST request to backend for login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      if (response.status === 200) {
        // Save the JWT token to localStorage
        localStorage.setItem("token", response.data.token);
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed"); // Display error message
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email or Username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              placeholder="Enter your email or username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
