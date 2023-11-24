import React, { useState, Fragment, useRef, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import { useSellerAuth } from "../Components/ContextAuth/Sellerauthcontext";

import axios from "axios";
import { Orbitals } from "react-spinners-css";

import SellerSideBar from "./SellerSideBar";

import logo from "../Assets/TechSphere.svg";
import preview from "../Assets/headphones-category.jpg";

const SellerProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [sellerauth, setsellerAuth] = useSellerAuth();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    const SellerAuth = sellerauth?.seller?._id;

    try {
      const products = await axios.get(
        "http://localhost:5000/adminHome/products"
      );

      setAllProducts(() =>
        products.data.filter((product) => product.SellerAuth === SellerAuth)
      );
      console.log(products.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeletePrompt = (id) => {
    setDeletePrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleUpdateModal = (product) => {
    setUpdateModal(true);
    setSelectedProduct({ ...product });
  };

  const handleSpecsChange = (e, index) => {
    const newSpecs = [...selectedProduct.specs];
    newSpecs[index] = e.target.value;
    setSelectedProduct({
      ...selectedProduct,
      specs: newSpecs,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedProduct({ ...selectedProduct, [name]: value });

    console.log(selectedProduct);
  };

  const handleProductDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/adminHome/products/${selectedId}`
      );

      setDeletePrompt(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductUpdate = async (e) => {
    const formData = new FormData();

    formData.append("name", selectedProduct.name);
    formData.append("model", selectedProduct.model);
    formData.append("price", selectedProduct.price);
    formData.append("quantity", selectedProduct.quantity);
    formData.append("description", selectedProduct.description);
    formData.append("specs", JSON.stringify(selectedProduct.specs));

    try {
      const { data } = await axios.put(
        "http://localhost:5000/SellerHome/my-products/" + selectedProduct._id,
        {
          _id: selectedProduct._id,
          name: selectedProduct.name,
          model: selectedProduct.model,
          price: selectedProduct.price,
          quantity: selectedProduct.quantity,
          description: selectedProduct.description,
          specs: JSON.stringify(selectedProduct.specs),
        },
        {
          withCredentials: true,
        }
      );

      console.log(data.data);

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
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
        <div className="col-span-1">
          <SellerSideBar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center bg-violet-200 rounded-lg">
            {/* Search Bar and filter */}
            <div className="w-[40%] flex justify-center items-center rounded-lg bg-white p-0.5 gap-2">
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Search items..."
                className="outline-none border-0 px-4 py-1 w-[100%] font-normal text-base text-gray-600 rounded-lg"
              />

              <div className="flex items-center justify-center text-gray-600 text-xl rounded-md p-2 cursor-pointer">
                <BiSearch />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div class="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div className="w-full p-4 grid grid-cols-3 gap-4">
              {filteredProducts.length === 0 ? (
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    No products found!
                  </h3>
                </div>
              ) : (
                filteredProducts?.map((product, index) => (
                  <div
                    key={index}
                    className="w-full rounded-lg p-4 flex flex-col justify-between items-center bg-violet-200"
                  >
                    <div className="w-full h-auto aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        className="object-cover w-full rounded-lg hover:scale-105 ease-linear duration-200"
                        src={product.images[0]}
                        alt="/"
                      />
                    </div>

                    <div className="flex flex-col w-full justify-start">
                      <div>
                        <h2 className="text-gray-700 font-bold text-xl tracking-wide">
                          {product.name}
                        </h2>
                        <p className="truncate text-gray-500 pb-1">
                          {product.description}
                        </p>
                        <h1 className="text-2xl text-gray-700 font-bold">
                          Rs. {product.price}
                        </h1>
                      </div>
                      <div className="w-full flex justify-end gap-6">
                        <button
                          onClick={() => handleUpdateModal(product)}
                          className="p-2 rounded-md text-white text-xl bg-[#6441A5] hover:bg-violet-500 hover:scale-105 ease-in duration-200"
                        >
                          <RiEdit2Line />
                        </button>

                        <button
                          onClick={() => handleDeletePrompt(product._id)}
                          className="p-2 rounded-md text-white text-xl bg-red-500 hover:bg-red-600 hover:scale-105 ease-in duration-200"
                        >
                          <RiDeleteBin6Line />
                        </button>

                        {deletePrompt && (
                          <div class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="flex flex-col items-center py-6 px-4 bg-white rounded-xl">
                              <div>
                                <p className="text-gray-600 font-medium tracking-wide">
                                  Are you sure to delete the product?
                                </p>
                              </div>
                              <div className="flex justify-end gap-4 py-3">
                                <button
                                  onClick={handleProductDelete}
                                  className="px-6 py-1 bg-red-500 rounded-md text-white"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeletePrompt(false)}
                                  className="px-6 py-1 border-2 text-violet-500 border-violet-500 rounded-md"
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {updateModal && (
                          <div class="fixed inset-0 flex items-center justify-center p-12 bg-black/30 backdrop-blur-sm z-50">
                            <div className="flex flex-col items-center h-full p-4 bg-white rounded-xl">
                              <div className="grid col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto relative">
                                <span className="p-3 bg-white rounded-full absolute top-0 right-0">
                                  <RxCross2 />
                                </span>
                                <h1 className="text-xl text-gray-700 font-bold py-10">
                                  Update fields below
                                </h1>
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
                                        value={selectedProduct.name}
                                        className="input-field"
                                        type="text"
                                        name="name"
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <label className="py-1 pt-2 font-semibold text-black">
                                        Product Model
                                      </label>
                                      <input
                                        value={selectedProduct.model}
                                        className="input-field"
                                        type="text"
                                        name="model"
                                        required
                                        onChange={handleInputChange}
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <label className="py-1 pt-2 font-semibold text-black">
                                        Price
                                      </label>
                                      <input
                                        value={selectedProduct.price}
                                        className="input-field"
                                        type="number"
                                        name="price"
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                    <div className="flex flex-col items-start">
                                      <label className="py-1 pt-2 font-semibold text-black">
                                        Quantity
                                      </label>
                                      <input
                                        value={selectedProduct.quantity}
                                        className="input-field"
                                        type="number"
                                        name="quantity"
                                        onChange={handleInputChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="flex flex-col items-start">
                                      <label className="pt-4 font-semibold text-black">
                                        Update Top features
                                      </label>

                                      <div className="flex flex-col justify-center items-start">
                                        <div className="flex items-center mt-1">
                                          <label className="font-bold text-black">
                                            1.
                                          </label>
                                          <input
                                            className="input-field mt-1 mx-2"
                                            type="text"
                                            name="feature1"
                                            value={selectedProduct.specs[0]}
                                            required
                                            onChange={(e) =>
                                              handleSpecsChange(e, 0)
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center mt-1">
                                          <label className="font-bold text-black">
                                            2.
                                          </label>
                                          <input
                                            className="input-field mt-1 mx-2"
                                            type="text"
                                            name="feature2"
                                            value={selectedProduct.specs[1]}
                                            required
                                            onChange={(e) =>
                                              handleSpecsChange(e, 1)
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center mt-1">
                                          <label className="font-bold text-black">
                                            3.
                                          </label>
                                          <input
                                            className="input-field mt-1 mx-2"
                                            type="text"
                                            name="feature3"
                                            required
                                            value={selectedProduct.specs[2]}
                                            onChange={(e) =>
                                              handleSpecsChange(e, 2)
                                            }
                                          />
                                        </div>
                                        <div className="flex items-center mt-1">
                                          <label className="font-bold text-black">
                                            4.
                                          </label>
                                          <input
                                            className="input-field mt-1 mx-2"
                                            type="text"
                                            name="feature4"
                                            value={selectedProduct.specs[3]}
                                            required
                                            onChange={(e) =>
                                              handleSpecsChange(e, 3)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <label className="mt-4 font-semibold text-black">
                                    Description
                                  </label>
                                  <textarea
                                    className="p-1 my-2 rounded-lg h-32 w-[70%] outline-none focus:ring-2 focus:ring-violet-500 ease-in duration-200 transition"
                                    name="description"
                                    value={selectedProduct.description}
                                    onChange={handleInputChange}
                                  />

                                  <div className="flex items-center py-10 w-full">
                                    <button
                                      disabled={isLoading}
                                      onClick={handleProductUpdate}
                                      className={`h-10 w-36 rounded-lg outline-none ${
                                        isLoading
                                          ? "bg-[#b5a0dd]"
                                          : "bg-[#8359d1]"
                                      } text-lg text-white font-semibold ${
                                        isLoading ? "" : "hover:bg-[#6441A5]"
                                      } ease-in duration-100 ${
                                        isLoading ? "" : "active:scale-95"
                                      }`}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
