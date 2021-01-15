import React, { useEffect, useState } from "react";
import items from "./data";

const RoomContext = React.createContext();

function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  const formatData = (items) => {
    const tempItems = items.map((item) => {
      const id = item.sys.id;
      const images = item.fields.images.map((image) => image.fields.file.url);
      const room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  useEffect(() => {
    const rooms = formatData(items);
    const featuredRooms = rooms.filter((room) => room.featured === true);
    const maxPrice = Math.max(...rooms.map((room) => room.price));
    const minPrice = Math.min(...rooms.map((room) => room.price));
    const maxSize = Math.max(...rooms.map((room) => room.size));

    setRooms((current) => [...current, ...rooms]);
    setSortedRooms((current) => [...current, ...rooms]);
    setFeaturedRooms((current) => [...current, ...featuredRooms]);
    setFilter((current) => {
      return { ...current, maxPrice, maxSize, minPrice, price: maxPrice };
    });
    setLoading(false);
  }, []);

  const getRoom = (slug) => {
    return rooms.find((room) => room.slug === slug);
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    setFilter((current) => {
      return { ...current, [name]: value };
    });
  };

  useEffect(() => {
    let tempRooms = [...rooms];
    const capacity = parseInt(filter.capacity);
    const price = parseInt(filter.price);

    if (filter.type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === filter.type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    if (filter.breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    if (filter.pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    tempRooms = tempRooms.filter((room) => room.price <= price);
    tempRooms = tempRooms.filter(
      (room) => room.size >= filter.minSize && room.size <= filter.maxSize
    );

    setSortedRooms(tempRooms);
  }, [filter, rooms]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        featuredRooms,
        sortedRooms,
        loading,
        ...filter,
        getRoom,
        handleChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
