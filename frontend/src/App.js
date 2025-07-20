import React, { useState } from 'react';
import AvailableRooms from './components/AvailableRooms';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      <h1>Hotel Booking App</h1>
      {!selected && <AvailableRooms onSelect={(room, checkIn, checkOut) => setSelected({ room, checkIn, checkOut })} />}
      {selected && (
        <BookingForm
          room={selected.room}
          checkIn={selected.checkIn}
          checkOut={selected.checkOut}
          onComplete={() => setSelected(null)}
        />
      )}
      <hr />
      <BookingList />
    </div>
  );
}

export default App;
