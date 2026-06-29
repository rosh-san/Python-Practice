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
    <div className='page-container'>
      <h2 style={{ color: '#1a4a38', marginBottom: '20px' }} >Green Earth Foundation: Active Requests</h2>
      
      {pickups.length === 0 ? (
        <p style={{ color: '#64748b' }}>No active pickups right now.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          
          {/* The Map: For every ticket in memory, generate this HTML block */}
          {pickups.map((ticket) => (
            <div key={ticket.id} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)'}}>
              
              <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>{ticket.user_name}</p>
              <p style={{ margin: '5px 0', color: '#475569' }}><strong>Item:</strong> {ticket.item_description}</p>
              <p style={{ margin: '5px 0', color: '#475569' }}><strong>Status:</strong> 
                <span style={{ 
                  color: ticket.status === 'Accepted by NGO' ? '#16a34a' : '#d97706',
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {ticket.status || 'Pending'}
                </span>
              </p>
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