

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const rooms = ['Single', 'Double', 'Suite'];

  return (
    <div>
      <h2>Room Gallery</h2>
      {rooms.map((room, index) => (
        <div key={index} onClick={() => navigate('/login')}>
          <img src={room+'.jpg'} alt={room} width="200" />
          <p>{room} Room</p>
        </div>
      ))}
    </div>
  );
};
export default Gallery;
