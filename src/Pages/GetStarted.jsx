import React from 'react';
import './GetStarted.css';
import logo from '../assets/aai-logo.png';
import { useNavigate } from 'react-router-dom';

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="get-started-container">
      <div className="get-started-content">
        {/* Watermark logo */}
        <div className="watermark-logo">
          <img src={logo} alt="AAI Logo" />
        </div>

        {/* Main content box */}
        <div className="get-started-box">
          <h1>Welcome to AAI Stock Monitor</h1>
          <div className="button-group">
            <button onClick={() => navigate('/add-item')}>Add Item</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/out-item')}>Out Item</button>
            <button onClick={() => navigate('/product-update')}>Product Update</button> {/* ✅ New button */}
          </div>
        </div>
      </div>
    </div>
  );
}
