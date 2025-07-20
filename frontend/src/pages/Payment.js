
import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [room, setRoom] = useState('');
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    await axios.post('http://localhost:8081/api/booking/pay', {
      user_id: user.id,
      room_type: room,
      amount
    });
    alert('Payment Successful');
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <input placeholder="Room Type" onChange={e => setRoom(e.target.value)} />
      <input placeholder="Amount" type="number" onChange={e => setAmount(e.target.value)} />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
