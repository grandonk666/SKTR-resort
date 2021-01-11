import React from "react";
import Room from './Room';

function RoomsList({rooms}) {
  if (rooms.length < 1) {
    return (
      <div className="empty-search">
        <h3>No rooms match with your search parameters</h3>
      </div>
    )
  }

  return <section className="roomslist">
    <div className="roomslist-center">
      {rooms.map(room => (
        <Room key={room.id} room={room} />
      ))}
    </div>
  </section>;
}

export default RoomsList;
