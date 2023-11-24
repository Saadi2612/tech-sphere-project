import { imageListItemClasses } from "@mui/material";
import "./LaptopDetailPageStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useCartContext } from "./Cart_context";
import Header from "./Header";
import CartAmountToggle from "./CartAmountToggle";
import Footer from "./Footer";
import ThreeSixtyView from "./threeSixtyView";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAuth } from "./ContextAuth/Auth";
import axios from "axios";
import Star from "./Star";
function LaptopDetailPage() {
  const { _id } = useParams();

  const { addToCart } = useCartContext();
  const [products, setproduct] = useState();
  const [videoFrames, setVideoFrames] = useState([]);
  const [currentFrame, setCurrentFrame] = useState("");
  const [frameIndex, setFrameIndex] = useState(1);
  const [is360Visible, setIs360Visible] = useState(false);
  const [frameDimensions, setFrameDimensions] = useState({
    x: "",
    y: "",
  });
  const [auth] = useAuth();
  // States for 360-degree view
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/laptops")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const newproduct = data.find((item) => item._id == _id);
        //console.log(newproduct);
        setproduct(newproduct);
        setVideoFrames(newproduct.threeSixtyImages);
        //console.log(videoFrames);
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

  // const handleNextImage = () => {
  //   if (frameIndex < videoFrames.length - 1) {
  //     setFrameIndex((prev) => prev + 1);
  //     setCurrentFrame(videoFrames[frameIndex + 1]);
  //   } else {
  //     setFrameIndex(0);
  //     setCurrentFrame(videoFrames[0]);
  //   }
  // };

  // const handlePreviousImage = () => {
  //   if (frameIndex > 0) {
  //     setFrameIndex((prev) => prev - 1);
  //     setCurrentFrame(videoFrames[frameIndex - 1]);
  //   } else {
  //     setFrameIndex(videoFrames.length - 1);
  //     setCurrentFrame(videoFrames[videoFrames.length - 1]);
  //   }
  // };

  function calculateImageDimensions(imageData) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Set crossOrigin attribute if needed

      img.onload = () => {
        const dimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
        resolve(dimensions);
      };

      img.onerror = () => {
        reject(new Error("Failed to load the image"));
      };

      // Check if imageData is a URL or base64 data
      if (imageData.startsWith("http") || imageData.startsWith("data:image")) {
        img.src = imageData;
      } else {
        reject(new Error("Invalid image data"));
      }
    });
  }

  // reviews component
  const [rating, setrating] = useState("");
  const handlereviewChange = (e) => {
    setrating(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(rating);
    try {
      const { data } = await axios.post("http://localhost:5000/reviewpage", {
        rating,
        customerdata: auth.user?.name || "user",
        productid: _id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //get reviews on this page of product
  const [customerrating, getcustomerrating] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const productrating = data.filter(
          (customerreview) => customerreview.productid === _id
        );
        console.log(productrating);
        getcustomerrating(productrating);
      });
  }, []);

  return (
    <div className="containerpd">
      <div>
        <Header />
      </div>
      <div className="emptydetaildiv"></div>

      <div className="tracking"></div>
      <div className="griddiv">
        <div>
          <div className="mainimagediv">
            <img className=" mainimage" src={products?.images[0]} alt="/" />
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
          <p className="titleofproduct">{products?.name}</p>
          <br></br>
          <p> Seller: {products?.SellerName}</p>

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
          <p> SKU : {products?.sku}</p>
          <br></br>
          <p> Category : {products?.category}</p>
          <br></br>
          <p> Condition : {products?.condition}</p>
        </div>
        {/*details div*/}
      </div>
      <hr></hr>
      <div className="flex flex-col justify-center items-center gap-4 w-full py-16">
        <div className="flex flex-col items-center justify-center">
          <h2 className="dexscriptiontag text-lg font-bold text-gray-700">
            Description:
          </h2>

          <p className="text-base text-gray-700 px-10">
            {products?.description}
          </p>
        </div>

        <div className="flex justify-center items-center gap-8 px-8 py-16 w-full ">
          <div className="w-auto h-[50vh] aspect-square rounded-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={products?.images[1]}
              alt="/"
            />
          </div>
          <div className="w-auto h-[50vh] aspect-square rounded-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={products?.images[2]}
              alt="/"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[70vh] flex flex-col justify-center items-center p-8 bg-sky-200">
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => {
              setIs360Visible(true);
              // Replace with the URL or base64 data of your image from the state
              const imageFromState = "data:image/jpeg;base64," + videoFrames[0];
              // console.log(videoFrames[0]);
              calculateImageDimensions(imageFromState)
                .then((dimensions) => {
                  setFrameDimensions((prev) => ({
                    ...prev,
                    x: dimensions.width,
                  }));
                  setFrameDimensions((prev) => ({
                    ...prev,
                    y: dimensions.height,
                  }));
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            className="px-6 py-2 bg-teal-600 rounded-lg text-white"
          >
            Open 360-degree View
          </button>
        </div>
        {/* <img src={`data:image/jpeg;base64,${currentFrame}`} alt="/" />
        <button onClick={handleNextImage}>Next </button>
        <button onClick={handlePreviousImage}> previous</button> */}
        {is360Visible && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="w-screen h-screen flex items-center justify-center p-8">
              <div className="flex flex-col justify-center items-center bg-slate-300 rounded-xl shadow-lg shadow-black/20 p-4 max-w-2xl h-full relative">
                <span
                  onClick={() => setIs360Visible(false)}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-1 cursor-pointer"
                >
                  <AiOutlineCloseCircle size={22} />
                </span>
                <ThreeSixtyView
                  images={videoFrames}
                  height={frameDimensions.y}
                  width={frameDimensions.x}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="emptydetaildivlast"></div>
      {/* review section start */}
      <div class="reviews">
        <div class="reviewsheading">
          <h1>Rating Our product</h1>
        </div>

        <div class="reviewsform">
          <form onSubmit={handleSubmit}>
            <ul className="items-center max-w-md  text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-purple-100 dark:border-purple-600 dark:text-black">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      checked={rating === "1"}
                      onChange={handlereviewChange}
                    />
                    Excellent
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      checked={rating === "2"}
                      onChange={handlereviewChange}
                    />
                    Good
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      checked={rating === "3"}
                      onChange={handlereviewChange}
                    />
                    Ok
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      checked={rating === "4"}
                      onChange={handlereviewChange}
                    />
                    Normal
                  </label>
                </div>
              </li>

              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      checked={rating === "5"}
                      onChange={handlereviewChange}
                    />
                    Bad
                  </label>
                </div>
              </li>
            </ul>

            <button class="reviewdesign">Submit</button>
          </form>
        </div>
      </div>

      {/* end of form */}

      <div class="emptydetaildivlast"></div>

      {/* review print in ths section */}
      <div class="reviewsprint">
        {customerrating.map((item) => (
          // Use the map function to create list items
          <div>
            <div>
              <h1>{item.customerdata} </h1>
            </div>
            <div>
              <Star stars={item.rating} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LaptopDetailPage;
