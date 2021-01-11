import React, { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "../components/Title";

const getUniqe = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

function RoomsFilter({rooms}) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  const uniqueTypes = ["all", ...getUniqe(rooms, "type")];
  const types = uniqueTypes.map((item, index) => (
    <option value={item} key={index} >
      {item}
    </option>
  ))

  const uniqueCapacity = getUniqe(rooms, "capacity")
  const guest = uniqueCapacity.map((item, index) => (
    <option value={item} key={index} >
      {item}
    </option>
  ))

  return (
    <section className="filter-container">
      <Title title="Search Rooms" />
      <form className="filter-form">

        <div className="form-group">
          <label htmlFor="type">Room Type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Guest</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {guest}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">
            Room Price ${price}
          </label>
          <input
            className="form-control"
            type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="size">Room Size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              className="size-input"
              value={minSize}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              className="size-input"
              value={maxSize}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">Breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">Pets</label>
          </div>
        </div>

      </form>
    </section>
  );
}

export default RoomsFilter;
