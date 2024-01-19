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
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const sorts = [
  { sort: "Sort", value: "Sort" },
  { sort: "A to Z", value: "A-Z" },
  { sort: "Z to A", value: "Z-A" },
  { sort: "Price: high to low", value: "hi-lo" },
  { sort: "Price: low to high", value: "lo-hi" },
];

const SellerProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSort, setSelectedSort] = useState(sorts[0].value);
  const [searchedProducts, setSearchedProducts] = useState(allProducts);

  const [sellerauth, setsellerAuth] = useSellerAuth();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sorting = (data) => {
    switch (selectedSort) {
      case "A-Z":
        // console.log(data.slice().sort((a, b) => a.name.localeCompare(b.name)));
        return data.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "Z-A":
        return data.slice().sort((a, b) => b.name.localeCompare(a.name));
      case "hi-lo":
        return data.sort((a, b) => a.price - b.price);
      case "lo-hi":
        return data.sort((a, b) => b.price - a.price);
      default:
        return data;
    }
  };

  // Filter posts on typing in search input
  // Update the search term state
  const handleSearchChange = () => {
    // const searchTerm = event.target.value;
    // setSearchTerm(searchTerm);

    // If search term is empty, set filtered products to original array
    if (!searchTerm.trim()) {
      setSearchedProducts(allProducts);
    } else {
      // Filter products based on the search term
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedProducts(filtered);
    }
  };

  useEffect(() => {
    handleSearchChange();
  }, [searchTerm]);

  useEffect(() => {
    const sorted = sorting(searchedProducts);

    setSearchedProducts(sorted);
  }, [selectedSort]);

  // filteredProducts = sorting(allProducts);

  const handleSortChange = (e) => {
    setSelectedSort(e.value);
  };

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
      setSearchedProducts(() =>
        products.data.filter((product) => product.SellerAuth === SellerAuth)
      );
      console.log(
        products.data.filter((product) => product.SellerAuth === SellerAuth)
      );
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
    console.log(product);
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
      setUpdateModal(false);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-white backdrop-blur-sm border-b-2 border-violet-300 z-10">
        <div className="">
          <img src={logo} alt="logo" className="h-9" />
        </div>

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
        <div>
          <h2>icons and account</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div className="col-span-1">
          <Sidebar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 bg-[#FFFDFD] overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center rounded-lg sticky top-0">
            {/* filter */}
            <div className="w-full h-full flex justify-between items-center">
              <div>
                <Link
                  to="/SellerHome"
                  className="bg-violet-100 px-3 py-2 rounded-lg"
                >
                  Add Product
                </Link>
              </div>
              <Listbox value={selectedSort} onChange={handleSortChange}>
                <div className="relative h-full w-40">
                  <Listbox.Button className="relative w-full h-full cursor-default rounded-lg bg-violet-100 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                    <span className="block truncate">{selectedSort}</span>
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
                      {sorts.map((sort, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-2 ${
                              active
                                ? "bg-sky-200/60 text-sky-700"
                                : "text-gray-700"
                            }`
                          }
                          value={sort}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected
                                    ? "font-semibold text-sky-700"
                                    : "font-normal"
                                }`}
                              >
                                {sort.sort}
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
          {isLoading ? (
            <div class="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full py-8">
                {searchedProducts.length === 0 ? (
                  <div className="w-full grid place-items-center py-10">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      No products found!
                    </h3>
                  </div>
                ) : (
                  <div className="">
                    <div className="py-4 overflow-x-auto">
                      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md shadow-black/10">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr className="bg-violet-100">
                              <th
                                scope="col"
                                className="px-5 py-3 text-sm font-semibold text-left text-violet-900 uppercase border-b border-violet-400"
                              >
                                SKU
                              </th>
                              <th
                                scope="col"
                                className="px-5 py-3 text-sm font-semibold text-left text-violet-900 uppercase border-b border-violet-400"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-5 py-3 text-sm font-semibold text-left text-violet-900 uppercase border-b border-violet-400"
                              >
                                Category
                              </th>
                              <th
                                scope="col"
                                className="px-5 py-3 text-sm font-semibold text-left text-violet-900 uppercase border-b border-violet-400"
                              >
                                Price
                              </th>

                              <th
                                scope="col"
                                className="px-5 py-3 text-sm font-semibold text-left text-violet-900 uppercase border-b border-violet-400"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchedProducts?.map((product, index) => (
                              <tr key={index} className="bg-slate-50">
                                <td className="px-5 py-5 text-sm border-t border-violet-300">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.sku}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm border-t border-violet-300">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.name}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm border-t border-violet-300">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.category}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm border-t border-violet-300">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {product.price}
                                  </p>
                                </td>

                                <td className="px-5 py-3 text-sm border-t border-violet-300">
                                  <button
                                    onClick={() => handleUpdateModal(product)}
                                    className="font-medium px-5 py-2 mx-2 rounded-md bg-blue-200/50 text-blue-600 hover:bg-blue-200 dark:text-blue-500"
                                  >
                                    Update product
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleDeletePrompt(product._id)
                                    }
                                    className="px-5 py-2 font-medium tracking-wide rounded-md bg-red-200/50 text-red-500"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <AnimatePresence>
                        {deletePrompt && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{
                              opacity: 0,
                            }}
                            className="fixed inset-0 p-16 bg-black/30 backdrop-blur-sm z-10"
                          >
                            <div className="w-full h-full grid place-items-center p-4">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.9,
                                }}
                                className="flex flex-col items-start w-full max-w-xs rounded-lg p-4 bg-white"
                              >
                                <div className="flex flex-col items-center font-sans gap-2 w-full py-2">
                                  <span className="p-2 grid place-items-center rounded-full text-orange-500 bg-orange-200">
                                    <IoWarningOutline size={24} />
                                  </span>
                                  <h1 className="px-1 text-xl font-semibold text-gray-700">
                                    Confirm Delete
                                  </h1>
                                </div>
                                <div className="py-2 px-2">
                                  <p>Are you sure you want to this product?</p>
                                  <div className="flex justify-between w-full py-4 px-6 gap-2">
                                    <button
                                      onClick={handleProductDelete}
                                      className="px-4 py-2 w-full bg-red-300/40 text-red-500 rounded-md hover:bg-red-300/70"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      onClick={() => setDeletePrompt(false)}
                                      className="px-4 py-2 w-full bg-gray-300/40 text-gray-600 rounded-md hover:bg-gray-300/70"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}

                        {updateModal && (
                          <div class="fixed inset-0 flex items-center justify-center p-12 bg-black/30 backdrop-blur-sm z-50">
                            <div className="flex flex-col items-center h-full p-4 bg-white rounded-xl">
                              <div className="grid col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto relative">
                                <span
                                  onClick={() => setUpdateModal(false)}
                                  className="p-3 bg-white rounded-full absolute top-0 right-0"
                                >
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
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
