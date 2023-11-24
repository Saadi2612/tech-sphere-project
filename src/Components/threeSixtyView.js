import React, { useEffect, useRef, useState } from "react";
import ThreeSixty from "@mladenilic/threesixty.js";
import { MapInteractionCSS } from "react-map-interaction";

import { FiSearch } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ThreeSixtyView = (props) => {
  const threesixtyContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const swipeRef = useRef(null);
  const threeSixtyInstance = useRef(null);

  const [photos, setPhotos] = useState([]);

  const [currentFrame, setCurrentFrame] = useState("");
  const [frameIndex, setFrameIndex] = useState(1);
  const [isZoom, setIsZoom] = useState(false);

  const getIimagePaths = () => {
    const images = [];
    // console.log(props.images);
    //console.log(props.width);

    for (let i = 0; i < props.images.length; i++) {
      const image = `data:image/jpeg;base64,${props.images[i]}`;
      images.push(image);
      //console.log(images);
    }

    setPhotos(images);
    return images;
  };

  useEffect(() => {
    const initializeThreeSixty = () => {
      const images = getIimagePaths();
      //   console.log(images);
      threeSixtyInstance.current = new ThreeSixty(
        threesixtyContainerRef.current,
        {
          image: images,
          width: props.width,
          height: props.height,
          speed: 300,
          prev: prevButtonRef.current,
          next: nextButtonRef.current,
          draggable: true, // Rotate image by dragging. Default: true
          swipeable: true, // Rotate image by swiping on mobile screens. Default: true
          dragTolerance: 30, // Rotation speed when dragging. Default: 10
          swipeTolerance: 20,
          swipeTarget: swipeRef.current,
        }
      );

      //threesixty.play();
    };

    initializeThreeSixty();
  }, []);

  const handleOpenZoom = () => {
    if (threeSixtyInstance.current) {
      setCurrentFrame(photos[threeSixtyInstance.current.index]);
      setIsZoom(true);
    }
    return null; // or handle accordingly if the instance is not available
  };

  return (
    <>
      <div
        className="wrapper z-10 flex items-center justify-center flex-col gap-4"
        ref={swipeRef}
      >
        {/* <h1>ThreeSixty.js</h1>
      <p>
        Drag, use keyboard arrows (&larr; & &rarr;) or click to rotate image.
      </p> */}
        <div
          className="view rounded-lg"
          id="threesixty"
          ref={threesixtyContainerRef}
        ></div>
        <div className="buttons-wrapper flex justify-center items-center flex-wrap py-2 px-3 gap-4">
          <button
            className="px-6 py-2 bg-[#6441a5] text-gray-50 rounded-lg"
            id="prev"
            ref={prevButtonRef}
          >
            Prev
          </button>

          <button
            className="px-6 py-2 bg-[#6441a5] text-gray-50 rounded-lg"
            id="next"
            ref={nextButtonRef}
          >
            Next
          </button>

          <span
            onClick={handleOpenZoom}
            className="border-2 border-[#6441a5] rounded-full p-2 cursor-pointer"
          >
            <FiSearch size={20} color="#6441a5" />
          </span>
        </div>
      </div>

      {isZoom && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-8 overflow-hidden z-10">
          <div className="w-screen h-full flex items-center justify-center bg-slate-300 rounded-lg relative p-8">
            <span
              onClick={() => setIsZoom(false)}
              className="absolute -top-3 -right-3 shadow-md rounded-full p-1 bg-white cursor-pointer"
            >
              <AiOutlineCloseCircle size={25} />
            </span>

            <MapInteractionCSS minScale={1} maxScale={4}>
              <img className="object-cover" src={currentFrame} alt="/" />
            </MapInteractionCSS>
          </div>
        </div>
      )}
    </>
  );
};

export default ThreeSixtyView;
