import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStarted.css';
import logo from '../assets/aai-logo.png';

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="get-started-container">
      <div className="watermark-logo">
        <img src={logo} alt="AAI Logo" />
      </div>
      <div className="get-started-content">
        <h1>Welcome to AAI Stock Monitor</h1>
        <div className="button-group">
          <button onClick={() => navigate('/add-item')}>Add Item</button>
          <button onClick={() => alert('Dashboard coming soon')}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}
