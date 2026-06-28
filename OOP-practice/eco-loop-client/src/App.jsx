import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import UserPortal from "./UserPortal";
import NgoDashboard from "./NgoDashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="nav-link">User Portal</Link>
        <Link to="/ngo" className="nav-link">NGO Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserPortal />} />
        
        <Route path="/ngo" element={<NgoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;