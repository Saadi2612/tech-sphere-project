import { imageListItemClasses } from "@mui/material";
import "./LaptopDetailPageStyles.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useCartContext } from "./Cart_context";
import Header from "./Header";
import CartAmountToggle from "./CartAmountToggle";
import Footer from "./Footer";

function LaptopDetailPage() {
  const { _id } = useParams();

  const { addToCart } = useCartContext();
  const [products, setproduct] = useState();
  const [videoFrames, setVideoFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState("");
  const [frameIndex, setFrameIndex] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/laptops")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const newproduct = data.find((item) => item._id == _id);
        console.log(newproduct);
        setproduct(newproduct);
        setVideoFrames(newproduct.threeSixtyImages);
        setCurrentFrame(videoFrames[0]);
      });
  }, []);

  const [MainImg, setMainImg] = useState(products?.images[0]);

  const [counter, setCounter] = useState(1);

  const Increment = () => {
    setCounter(counter + 1);
  };

  const Decerement = () => {
    counter > 1 ? setCounter(counter - 1) : setCounter(1);
  };

  /*price calculation using counter and original price*/
  let total;
  let t_price;
  t_price = products?.price;
  total = t_price * counter;

  const handleNextImage = () => {
    if (frameIndex < 59) {
      setFrameIndex((prev) => prev + 1);
      setCurrentFrame(videoFrames[frameIndex]);
      console.log(currentFrame);
    } else {
      setFrameIndex(1);
      setCurrentFrame(videoFrames[frameIndex]);
    }
  };
  const handlePreviousImage = () => {
    if (frameIndex < 1) {
      setFrameIndex(59);
      setCurrentFrame(videoFrames[frameIndex]);
      console.log(currentFrame);
    } else {
      setFrameIndex((prev) => prev - 1);
      setCurrentFrame(videoFrames[frameIndex]);
    }
  };

  return (
    <div className="containerpd">
      <div>
        <Header />
      </div>
      <div class="emptydetaildiv"></div>

      <div className="tracking"></div>
      <div className="griddiv">
        <div>
          <div className="mainimagediv">
            <img className=" mainimage" src={products?.images[0]} />
          </div>

          <div className="grid_column">
            {products?.images.map((data, i) => (
              <div className="thumbnail" key={i}>
                <img className="smallimages" src={data} alt="/" />
              </div>
            ))}
          </div>
        </div>{" "}
        {/* pictures div*/}
        <div>
          <text className="titleofproduct">{products?.name}</text>
          <br></br>
          <text className="priceofproduct">
            Rs.{(t_price = products?.price)}
          </text>
          <br></br>
          <li className="specsofproduct"> {products?.specs[0]}</li>
          <br></br>
          <li className="specsofproduct">{products?.specs[1]}</li>
          <br></br>
          <li className="specsofproduct"> {products?.specs[2]}</li>
          <br></br>
          <li className="specsofproduct"> {products?.specs[3]}</li>
          <br></br>

          <text>Quantity </text>

          <CartAmountToggle
            counter={counter}
            Decerement={Decerement}
            Increment={Increment}
          />

          <br></br>
          <br></br>
          <Link
            to={"/CartPage"}
            onClick={() => addToCart(_id, counter, products, total)}
          >
            <button class="design"> Add To Cart </button>
          </Link>
          <hr className="hrline"></hr>
          <text> SKU : {products?.sku}</text>
          <br></br>
          <text> Category : {products?.category}</text>
        </div>{" "}
        {/*details div*/}
      </div>
      <br></br>
      <br></br>
      <hr></hr>
      <div className="descriptiondiv">
        <text className="dexscriptiontag">Description:</text>
        <br></br>
        <div className="descriptiondivide">
          <div></div>

          <div className="descriptiontext">
            <text>{products?.description}</text>
          </div>

          <div></div>
        </div>
        <br></br>
        <br></br>

        <div className="griddiv1">
          <div></div>
          <div>
            {" "}
            <img className=" descriptionimage" src={products?.images[1]} />{" "}
          </div>
          <div>
            {" "}
            <img className=" descriptionimage" src={products?.images[1]} />{" "}
          </div>

          <div></div>
        </div>
      </div>
      <br></br>
      <br></br>

      <div class="emptydetaildivlast"></div>

      <div>
        <img src={`data:image/jpeg;base64,${currentFrame}`} alt="/" />
        <button onClick={handleNextImage}>Next </button>
        <button onClick={handlePreviousImage}> previous</button>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LaptopDetailPage;
