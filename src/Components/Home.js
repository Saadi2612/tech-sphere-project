import React from "react";
import Header from "./Header";
import "./HomeStyle.css";
import miLaptop from "../Assets/mi-laptop.png";
import headPhones from "../Assets/headphones.png";
import wirelessEarbuds from "../Assets/Earbuds-Wireless.png";
import Footer from "./Footer";
import blackHeadphones from "../Assets/headphones-category.jpg";
import laptops from "../Assets/laptop-category.jpg";
import peripherals from "../Assets/peripheral-category.jpg";

import { Link, useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Headphones",
    path: "/headphones",
    image: blackHeadphones,
  },
  {
    title: "Laptops",
    path: "/LaptopPage",
    image: laptops,
  },
  {
    title: "Peripherals",
    path: "/peripherals",
    image: peripherals,
  },
];
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Header />

      <div className="home-hero">
        {/* <img className="hero-img" alt="Hero pic" src="" /> */}

        <div className="hero-bg">
          <div className="side-text">
            <h5>
              Swift & Immersive <br /> Revolutionizing Online Shopping
            </h5>
            <div className="explore-btn">
              <p>Explore Now</p>

              <i className="fa-solid fa-arrow-right fa-lg"></i>
            </div>
          </div>
          <div className="side-img">
            <img className="mi-laptop" alt="Hero pic" src={miLaptop} />

            <img
              className="wireless-earbuds"
              alt="Hero pic"
              src={wirelessEarbuds}
            />
            <img className="headphones" alt="Hero pic" src={headPhones} />
          </div>
        </div>
      </div>

      <div className="category">
        <div className="category-text">
          <p>{"Shop by category".toUpperCase()}</p>
          <hr className="divider" />
        </div>

        <div className="category-cards">
          {categories.map((category, index) => (
            <div
              className="card-container"
              key={index}
              onClick={() => navigate(category.path)}
            >
              <img src={category.image} alt="card pic" className="card-pic" />
              <div class="overlay overlayBottom"></div>
              <p>{category.title}</p>

              {/* <div className="card-title">
                <p>{category.title}</p>
                <i className="fa-solid fa-arrow-right"></i>
              </div> */}
            </div>
          ))}
        </div>
      </div>
   

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
