import React, { useState, Fragment, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Orbitals } from "react-spinners-css";

import SideBar from "./SideBar";

import logo from "../Assets/TechSphere.svg";
import preview from "../Assets/headphones-category.jpg";

const categories = [
  { category: "Category" },
  { category: "Laptop" },
  { category: "Headphones" },
  { category: "Peripherals" },
];

const condition = [
  { condition: "Condition" },
  { condition: "New" },
  { condition: "Used" },
];

const AdminHome = () => {
  const [laptopData, setLaptopData] = useState({
    name: "",
    model: "",
    price: "",
    quantity: "",
    description: "",
    specs: ["", "", "", ""],
    sku: "",
    images: [],
  });

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoFrames, setVideoFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    categories[0].category
  );
  const [selectedCondition, setSelectedCondition] = useState(
    condition[0].condition
  );

  const imgInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSpecsChange = (e, index) => {
    const newSpecs = [...laptopData.specs];
    newSpecs[index] = e.target.value;
    setLaptopData({
      ...laptopData,
      specs: newSpecs,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLaptopData({ ...laptopData, [name]: value });
  };

  const handleProductAdd = async (e) => {
    e.preventDefault();

    // Ensure that laptopData.images contains the selected images
    console.log("Selected Images:", laptopData.images);

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected image to the FormData object
    for (let i = 0; i < laptopData.images.length; i++) {
      formData.append("images", laptopData.images[i]);
    }

    // Add the other laptop data to the FormData object
    formData.append("name", laptopData.name);
    formData.append("model", laptopData.model);
    formData.append("price", laptopData.price);
    formData.append("quantity", laptopData.quantity);
    formData.append("description", laptopData.description);
    formData.append("specs", JSON.stringify(laptopData.specs));
    formData.append("sku", laptopData.sku);
    formData.append("category", selectedCategory);
    formData.append("condition", selectedCondition);
    formData.append("threeSixtyImages", JSON.stringify(videoFrames));

    // Check the state of the FormData object
    console.log("FormData:", formData);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/admin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(data.data);
    } catch (err) {
      console.log(err);
    }

    // setLaptopData({
    //   name: "",
    //   model: "",
    //   price: "",
    //   quantity: "",
    //   description: "",
    //   specs: ["", "", "", ""],
    //   sku: "",
    //   images: [],
    // });
    // setSelectedCategory(categories[0].category);
    // setSelectedCondition(condition[0].condition);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    const selectedImages = [...laptopData.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!selectedImages.some((image) => image.name === file.name)) {
        selectedImages.push(file); // Append the newly dropped file
      }
    }

    setLaptopData({
      ...laptopData,
      images: selectedImages,
    });
  };

  // Function to prevent default behavior for drop events
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [...laptopData.images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!selectedImages.some((image) => image.name === file.name)) {
        selectedImages.push(file); // Append the newly dropped file
      }
      // // Create a image preview using FileReader
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setLaptopData({
      //     ...laptopData,
      //     images: selectedImages,
      //   });
      // };
      // reader.readAsDataURL(file);
    }

    setLaptopData({
      ...laptopData,
      images: selectedImages,
    });
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleVideoDrop = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append("video_file", selectedVideo);
    console.log(formData);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/video-process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVideoFrames(response.data.frames);
      setIsLoading(false);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...laptopData.images];
    updatedImages.splice(index, 1); // Remove the image at the specified index
    setLaptopData({
      ...laptopData,
      images: updatedImages,
    });
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-transparent backdrop-blur-sm border-b-2 border-violet-300 z-10">
        <div className="">
          <img src={logo} alt="logo" className="h-9" />
        </div>

        <div>
          <h2>search bar</h2>
        </div>
        <div>
          <h2>icons and account</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div class="col-span-1">
          <SideBar />
        </div>

        <div className="grid col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto">
          <div className="grid w-full h-full items-start px-6">
          <h1 className="font-bold text-3xl py-2 text-black font-poppins uppercase">
            Add Product
          </h1>
          <div className="grid grid-cols-2 items-start w-full">
            <div className="flex flex-col items-start">
              <label className="py-1 pt-2 font-semibold text-black">
                Product Name
              </label>
              <input
                value={laptopData.name}
                className="input-field"
                type="text"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="py-1 pt-2 font-semibold text-black">
                Product Model
              </label>
              <input
                value={laptopData.model}
                className="input-field"
                type="text"
                name="model"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="py-1 pt-2 font-semibold text-black">
                Price
              </label>
              <input
                value={laptopData.price}
                className="input-field"
                type="number"
                name="price"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="py-1 pt-2 font-semibold text-black">
                Quantity
              </label>
              <input
                value={laptopData.quantity}
                className="input-field"
                type="number"
                name="quantity"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="py-1 pt-2 font-semibold text-black">SKU</label>
              <input
                value={laptopData.sku}
                className="input-field"
                type="text"
                name="sku"
                onChange={handleInputChange}
              />
            </div>
            <div className="inline-flex gap-4">
              <div className="flex flex-col items-start">
                <label className="py-1 pt-2 font-semibold text-black">
                  Category
                </label>
                <Listbox
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.category)}
                >
                  <div className="relative w-36">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selectedCategory}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg shadow-violet-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {categories.map((category, categoryIdx) => (
                          <Listbox.Option
                            key={categoryIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 ${
                                active
                                  ? "bg-violet-100 text-violet-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={category}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-semibold" : "font-normal"
                                  }`}
                                >
                                  {category.category}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="flex flex-col items-start">
                <label className="py-1 pt-2 font-semibold text-black">
                  Condition
                </label>
                <Listbox
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.condition)}
                >
                  <div className="relative w-32">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {selectedCondition}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg shadow-violet-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {condition.map((condition, conditionIdx) => (
                          <Listbox.Option
                            key={conditionIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 ${
                                active
                                  ? "bg-violet-100 text-violet-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={condition}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-semibold" : "font-normal"
                                  }`}
                                >
                                  {condition.condition}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-start">
              <label className="pt-4 font-semibold text-black">
                Top features
              </label>
              <p className="text-sm text-gray-500">
                *Enter four top features/specs of the product*
              </p>
              <div className="flex flex-col justify-center items-start">
                <div className="flex items-center mt-1">
                  <label className="font-bold text-black">1.</label>
                  <input
                    className="input-field mt-1 mx-2"
                    type="text"
                    name="feature1"
                    value={laptopData.specs[0]}
                    onChange={(e) => handleSpecsChange(e, 0)}
                  />
                </div>
                <div className="flex items-center mt-1">
                  <label className="font-bold text-black">2.</label>
                  <input
                    className="input-field mt-1 mx-2"
                    type="text"
                    name="feature2"
                    value={laptopData.specs[1]}
                    onChange={(e) => handleSpecsChange(e, 1)}
                  />
                </div>
                <div className="flex items-center mt-1">
                  <label className="font-bold text-black">3.</label>
                  <input
                    className="input-field mt-1 mx-2"
                    type="text"
                    name="feature3"
                    value={laptopData.specs[2]}
                    onChange={(e) => handleSpecsChange(e, 2)}
                  />
                </div>
                <div className="flex items-center mt-1">
                  <label className="font-bold text-black">4.</label>
                  <input
                    className="input-field mt-1 mx-2"
                    type="text"
                    name="feature4"
                    value={laptopData.specs[3]}
                    onChange={(e) => handleSpecsChange(e, 3)}
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="mt-4 font-semibold text-black">Description</label>
          <textarea
            className="p-1 my-2 rounded-lg h-32 w-[70%] outline-none focus:ring-2 focus:ring-violet-500 ease-in duration-200 transition"
            name="description"
            value={laptopData.description}
            onChange={handleInputChange}
          />
          <label className="mt-4 font-semibold text-black">Upload Images</label>
          <div className="flex flex-col my-2 w-[70%]">
            <div
              className="flex flex-col p-6 items-center justify-center bg-white rounded-lg h-32 border-2 border-dashed border-[#6441a5]/60 cursor-pointer"
              onClick={() => imgInputRef.current && imgInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h3 className="text-lg font-semibold text-gray-400">
                Drag & drop images here <br /> or <br /> Click to Browse
              </h3>
              <form>
                <input
                  className="hidden"
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  ref={imgInputRef}
                />
              </form>
            </div>
            <div className="grid grid-cols-4 gap-2 my-3">
              {laptopData.images.map((image, index) => (
                <div
                  key={index}
                  className="flex flex-col h-28 overflow-hidden relative"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected preview ${index + 1}`}
                    className="aspect-square rounded-lg object-cover h-full w-full"
                  />
                  <div
                    className="cursor-pointer bg-black/60 rounded-full absolute top-1 right-1 flex justify-center items-center w-4 h-4 p-0"
                    onClick={() => deleteImage(index)}
                  >
                    <span className="text-white text-xl text-center relative -top-1 w-full h-full leading-none">
                      &times;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <label className="mt-4 font-semibold text-black">Upload Video</label>
          <p className="text-sm text-gray-500">
            *Upload video in case you want to create a 360° view of your
            product*
          </p>
          <div className="w-full rounded-lg">
            <div className="flex flex-col my-1 w-[70%]">
              <div
                className="flex flex-col p-6 items-center justify-center bg-white rounded-lg h-32 border-2 border-dashed border-[#6441a5]/60 cursor-pointer"
                onClick={() =>
                  videoInputRef.current && videoInputRef.current.click()
                }
                onDrop={handleVideoDrop}
                onDragOver={handleDragOver}
              >
                {isLoading ? (
                  <Orbitals color="#8359d1" size={40} />
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-400">
                      Drag & drop video here <br /> or <br /> Click to Browse
                    </h3>
                    <form>
                      <input
                        className="hidden"
                        type="file"
                        accept="video/*"
                        name="video"
                        onChange={handleVideoChange}
                        ref={videoInputRef}
                      />
                    </form>
                  </>
                )}
              </div>
              <div>
                {selectedVideo && (
                  <h3 className="text-gray-600 font-semibold py-1">
                    Selected video:{" "}
                    <span className="text-red-800 font-semibold italic">
                      {selectedVideo.name}
                    </span>
                  </h3>
                )}
              </div>
            </div>
            <div className="flex items-center py-2 w-full">
              <button
                disabled={isLoading}
                onClick={handleVideoUpload}
                className={`px-6 py-2 rounded-lg outline-none ${
                  isLoading ? "bg-[#b5a0dd]" : "bg-[#8359d1]"
                } text-lg text-white font-medium ${
                  isLoading ? "" : "hover:bg-[#6441A5]"
                } ease-in duration-100 ${isLoading ? "" : "active:scale-95"}`}
              >
                Generate 360° view
              </button>
            </div>
          </div>
          <div className="flex items-center py-10 w-full">
            <button
              disabled={isLoading}
              onClick={handleProductAdd}
              className={`h-10 w-36 rounded-lg outline-none ${
                isLoading ? "bg-[#b5a0dd]" : "bg-[#8359d1]"
              } text-lg text-white font-semibold ${
                isLoading ? "" : "hover:bg-[#6441A5]"
              } ease-in duration-100 ${isLoading ? "" : "active:scale-95"}`}
            >
              Add
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
