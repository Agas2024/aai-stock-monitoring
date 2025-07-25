// src/Pages/AddItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddItem.css';
import logo from '../assets/aai-logo.png';

export default function AddItem() {
  const navigate = useNavigate();

  return (
    <div className="add-item-container">
      <div className="watermark">
        <img src={logo} alt="AAI Logo" />
      </div>
      <div className="add-item-content">
        <h1>Select Item Type</h1>
        <div className="button-group">
          <button onClick={() => navigate('/new-item')}>New Item</button>
          <button onClick={() => navigate('/old-item')}>Old Item</button>
        </div>
      </div>
    </div>
  );
}