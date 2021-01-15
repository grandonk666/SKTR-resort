import React, { useContext } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";

function SingleRoom({ match }) {
  const slug = match.params.slug;

  const { getRoom } = useContext(RoomContext);
  const room = getRoom(slug);
  if (!room) {
    return (
      <div className="error">
        <h3>No Such room Could be Found...</h3>
        <Link to="/rooms" className="btn-primary">
          Back To Rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;

  const [mainImg, ...defaultImg] = images;

  const heroStyle = {
    minHeight: "60vh",
    background: `url(${mainImg || defaultBcg}) center/cover no-repeat`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <header style={heroStyle}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Back To Rooms
          </Link>
        </Banner>
      </header>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((image, index) => (
            <img src={image} alt={name} key={index} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :{" "}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <ul className="extras">
          {extras.map((extra, index) => (
            <li key={index}> - {extra}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default SingleRoom;
