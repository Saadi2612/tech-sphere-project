import React from "react";
import "./HeroSection.css";

const HeroSection = (props) => {
  return (
      <div className="hero">
        <img className="hero-img" alt="Hero pic" src={props.image} />

        <div className="hero-text">
          <h1>{props.text?.toUpperCase()}</h1>
          <div className="hero-breadcrumb">
            <p>Breadcrumbs</p>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
