import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const rooms = [
    { type: 'Single', price: 2000 },
    { type: 'Double', price: 3000 },
    { type: 'Suite', price: 5000 }
  ];

  const handleRoomClick = (room) => {
    localStorage.setItem('roomType', room.type);
    localStorage.setItem('amount', room.price);
    navigate('/login'); // or '/payment' if already logged in
  };

  // 🔶 Internal CSS styles
  const styles = {
    container: {
      padding: '40px 20px',
      fontFamily: 'Georgia, serif',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    title: {
      fontSize: '32px',
      marginBottom: '30px',
      color: '#333'
    },
    galleryGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap'
    },
    roomCard: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      padding: '15px',
      width: '220px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    roomCardHover: {
      transform: 'scale(1.03)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
    },
    image: {
      width: '100%',
      borderRadius: '8px'
    },
    roomText: {
      marginTop: '10px',
      fontSize: '18px',
      color: '#555'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Our Hotel ITC</h2>
      <div style={styles.galleryGrid}>
        {rooms.map((room, index) => (
          <div
            key={index}
            style={styles.roomCard}
            onClick={() => handleRoomClick(room)}
            onMouseOver={e => {
              e.currentTarget.style.transform = styles.roomCardHover.transform;
              e.currentTarget.style.boxShadow = styles.roomCardHover.boxShadow;
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = styles.roomCard.boxShadow;
            }}
          >
            <img
              src={room.type + '.jpg'}
              alt={room.type}
              style={styles.image}
            />
            <p style={styles.roomText}>
              {room.type} Room - ₹{room.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
