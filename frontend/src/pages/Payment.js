import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [room, setRoom] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const selectedRoom = localStorage.getItem('roomType');
    const price = localStorage.getItem('amount');
    setRoom(selectedRoom || '');
    setAmount(price || '');
  }, []);

  const handlePayment = async () => {
    try {
      await axios.post('http://localhost:8081/api/booking/pay', {
        user_id: user.id,
        room_type: room,
        amount
      });
      alert('Payment Successful');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // 🔶 Internal CSS styles
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    },
    input: {
      width: '90%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      backgroundColor: '#f9f9f9'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2>Payment Page</h2>
      <input style={styles.input} value={room} readOnly />
      <input style={styles.input} value={amount} readOnly type="number" />
      <button style={styles.button} onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
