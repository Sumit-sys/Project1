import React, { useState } from 'react';
import API from '../api';

const AvailableRooms = ({ onSelect }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState([]);

  const searchRooms = async () => {
    const res = await API.get('/rooms/available', {
      params: { checkIn, checkOut },
    });
    setRooms(res.data);
  };

  return (
    <div>
      <h2>Check Available Rooms</h2>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
      <button onClick={searchRooms}>Search</button>

      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            Room #{room.id} - {room.type}
            <button onClick={() => onSelect(room, checkIn, checkOut)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableRooms;
