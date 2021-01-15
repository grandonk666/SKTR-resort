import React, { useContext, useState } from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import { RoomContext } from "../Context";
import Loading from "./Loading";

function RoomsContainer() {
  const { loading, sortedRooms, rooms } = useContext(RoomContext);

  const [openFilter, setOpenFilter] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="filter-toggle">
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="btn-primary filter-toggle"
        >
          {openFilter ? "Close Filter" : "Open Filter"}
        </button>
      </div>
      {openFilter && <RoomsFilter rooms={rooms} />}
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default RoomsContainer;
