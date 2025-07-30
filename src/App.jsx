import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from './Login/Login';
import GetStarted from './Pages/GetStarted';
import AddItem from './Pages/AddItem';
import NewItem from './Pages/NewItem';
import OldItem from './Pages/OldItem';
import Dashboard from './Pages/Dashboard';
import OutItem from './Pages/OutItem';
import ProductUpdate from './Pages/ProductUpdate';
import ForgotPassword from './Login/ForgotPassword';
import ChangeUsername from './Login/ChangeUsername';


// ⏬ Helper component to conditionally show Chatbot
const AppRoutes = () => {
  

  return (
    <>
      

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/new-item" element={<NewItem />} />
        <Route path="/old-item" element={<OldItem />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/out-item" element={<OutItem />} />
        <Route path="/product-update" element={<ProductUpdate />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-username" element={<ChangeUsername />} />
      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

