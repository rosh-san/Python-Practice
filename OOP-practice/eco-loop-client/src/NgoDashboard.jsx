import React, { useState, useEffect } from 'react';

function NgoDashboard() {
  // State to hold the array of tickets from PostgreSQL
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []); // The empty brackets mean "only run this once"

  // Read the database
  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/view-pickups');
      const data = await response.json();
      setPickups(data.activePickups); // Save the DB rows into React memory.
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  };

  // The PATCH Route: Accept a ticket.
  const acceptPickup = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/accept-pickup/${id}`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        // If successful, instantly re-fetch the tickets to update the screen
        fetchTickets(); 
      }
    } catch (error) {
      console.error("Failed to accept ticket:", error);
    }
  };

  // The UI.
  return (
    <div style={{ marginTop: '40px', padding: '20px', borderTop: '2px solid #333' }}>
      <h2>Green Earth Foundation: Active Requests</h2>
      
      {pickups.length === 0 ? (
        <p>No active pickups right now.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
          
          {/* The Map: For every ticket in memory, generate this HTML block */}
          {pickups.map((ticket) => (
            <div key={ticket.id} style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
              <p style={{ margin: '5px 0' }}><strong>User:</strong> {ticket.user_name}</p>
              <p style={{ margin: '5px 0' }}><strong>Item:</strong> {ticket.item_description}</p>
              <p style={{ margin: '5px 0' }}><strong>Status:</strong> {ticket.status || 'Pending'}</p>
              
              {/* Only show the button if it hasn't been accepted yet */}
              {ticket.status !== 'Accepted by NGO' && (
                <button onClick={() => acceptPickup(ticket.id)} style={{ marginTop: '10px' }}>
                  Accept Pickup
                </button>
              )}
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
}

export default NgoDashboard;