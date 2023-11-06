import React, { useEffect, useRef, useState } from "react";
import ThreeSixty from "@mladenilic/threesixty.js";

const ThreeSixtyView = (props) => {
  const threesixtyContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const swipeRef = useRef(null);

  const [photos, setPhotos] = useState([]);

  const getIimagePaths = () => {
    const images = [];
    console.log(props.images);

    for (let i = 0; i < 30; i++) {
      const image = `data:image/jpeg;base64,${props.images[i]}`;
      images.push(image);
      //console.log(images);
    }

    // setPhotos(images)
    return images;
  };

  useEffect(() => {
    const initializeThreeSixty = () => {
      const images = getIimagePaths();
      console.log(images);
      const threesixty = new ThreeSixty(threesixtyContainerRef.current, {
        image: images,
        width: 300,
        height: 500,
        speed: 300,
        prev: prevButtonRef.current,
        next: nextButtonRef.current,
        draggable: true, // Rotate image by dragging. Default: true
        swipeable: true, // Rotate image by swiping on mobile screens. Default: true
        dragTolerance: 20, // Rotation speed when dragging. Default: 10
        swipeTolerance: 20,
        swipeTarget: swipeRef.current,
      });

      //threesixty.play();
    };

    initializeThreeSixty();
  }, []);

  return (
    <div className="wrapper z-10" ref={swipeRef}>
      <h1>ThreeSixty.js</h1>
      <p>
        Drag, use keyboard arrows (&larr; & &rarr;) or click to rotate image.
      </p>
      <div className="view" id="threesixty" ref={threesixtyContainerRef}></div>
      <div className="buttons-wrapper">
        <button
          className="px-6 py-2 bg-gray-600 text-white"
          id="prev"
          ref={prevButtonRef}
        >
          Prev
        </button>
        spin
        <button
          className="px-6 py-2 bg-gray-600 text-white"
          id="next"
          ref={nextButtonRef}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ThreeSixtyView;
