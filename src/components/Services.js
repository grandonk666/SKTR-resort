import React from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from "./Title";

function Services() {
  const services = [
    {
      icon: <FaCocktail />,
      title: "Free Cocktail",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, obcaecati!",
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, obcaecati!",
    },
    {
      icon: <FaShuttleVan />,
      title: "Free Shuttle",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, obcaecati!",
    },
    {
      icon: <FaBeer />,
      title: "Strongest Beer",
      info:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, obcaecati!",
    },
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((service, index) => (
          <article key={index} className="service">
            <span>{service.icon}</span>
            <h6>{service.title}</h6>
            <p>{service.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
