import React, { useState } from 'react';
import API from '../api';

const BookingForm = ({ room, checkIn, checkOut, onComplete }) => {
  const [guestName, setGuestName] = useState('');

  const bookRoom = async () => {
    try {
      await API.post('/book', {
        guestName,
        roomId: room.id,
        checkIn,
        checkOut
      });
      alert('Booking successful!');
      onComplete(); // Clear form or refresh
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Book Room #{room.id} - {room.type}</h2>
      <p>From {checkIn} to {checkOut}</p>
      <input
        placeholder="Guest Name"
        value={guestName}
        onChange={e => setGuestName(e.target.value)}
      />
      <button onClick={bookRoom}>Confirm Booking</button>
    </div>
  );
};

export default BookingForm;
