import React, { useState } from 'react';
import NgoDashboard from './NgoDashboard';

function App() {
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [item, setItem] = useState('');

  const submitRequest = async (e) => {
    e.preventDefault(); // Stops the page from automatically refreshing

    // Pack the data exactly how the backend expects it in req.body
    const ticketData = {
      user: userName,
      address: address,
      item: item
    };

    try {
      // Send the POST request across the bridge to Port 3000
      const response = await fetch('http://localhost:3000/api/request-pickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData)
      });

      const result = await response.json();
      console.log("Success:", result);
      alert("Pickup Requested Successfully!"); // A simple popup for the user
      
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  // THE UI
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Eco-Loop: Schedule a Pickup</h1>
      
      {/* When the form submits, it runs the Engine function above */}
      <form onSubmit={submitRequest} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        
        <input 
          type="text" 
          placeholder="Your Full Name" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="Pickup Address" 
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="What are you recycling?" 
          value={item}
          onChange={(e) => setItem(e.target.value)} 
          required 
        />
        
        <button type="submit">Submit Request</button>
      </form>
      <NgoDashboard />
    </div>
  );
}

export default App;