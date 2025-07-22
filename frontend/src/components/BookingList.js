import React, { useEffect, useState } from 'react';
import API from '../api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/bookings').then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            {b.guest_name} booked a {b.room_type} from {b.check_in} to {b.check_out}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
