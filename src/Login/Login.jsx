import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../assets/aai-logo.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        'https://aai-stock-backend.onrender.com/api/login',
        { username, password },
        { timeout: 10000 }
      );

      if (res.status === 200) {
        navigate('/get-started');
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        alert("Login request timed out. Please try again.");
      } else if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else {
        alert("Server not responding. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Trigger login on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <img src={logo} alt="AAI Logo" className="aai-logo" />
        <h1>AIRPORTS AUTHORITY OF INDIA</h1>
        <div className="subheading-box">
          <h2>STOCKS (IN & OUT) MONITORING</h2>
        </div>
      </div>

      <div className="login-box">
        <h3>Employee Login</h3>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/forgot-password')}
            style={{
              background: 'transparent',
              color: 'navy',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate('/change-username')}
            style={{
              background: 'transparent',
              color: 'navy',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            Change Username
          </button>
        </div>
      </div>
    </div>
  );
}
