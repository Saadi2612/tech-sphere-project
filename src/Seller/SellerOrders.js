import React, { useState, Fragment, useRef, useEffect } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import axios from "axios";
import { Orbitals } from "react-spinners-css";

import { useSellerAuth } from "../Components/ContextAuth/Sellerauthcontext";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  filter,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";

import logo from "../Assets/TechSphere.svg";
import preview from "../Assets/headphones-category.jpg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const sorts = [
  { sort: "Sort", value: "Sort" },
  { sort: "A to Z", value: "A-Z" },
  { sort: "Z to A", value: "Z-A" },
];

const SellerOrders = () => {
  const [sellerauth] = useSellerAuth();
  const SellerAuth = sellerauth?.seller?._id;
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [StatusPrompt, setStatusPrompt] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [viewPrompt, setViewPrompt] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedSort, setSelectedSort] = useState(sorts[0].value);
  const [searchedOrders, setSearchedOrders] = useState(allOrders);

  const [itemIndex, setItemIndex] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereds = allOrders.filter((orders, index) => {
    return orders.items[0].name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const sorting = (data) => {
    switch (selectedSort) {
      case "A-Z":
        // console.log(data.slice().sort((a, b) => a.name.localeCompare(b.name)));
        return data.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "Z-A":
        return data.slice().sort((a, b) => b.name.localeCompare(a.name));
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
      setSearchedOrders(allOrders);
    } else {
      // Filter products based on the search term
      const filtered = allOrders.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedOrders(filtered);
    }
  };

  useEffect(() => {
    handleSearchChange();
  }, [searchTerm]);

  useEffect(() => {
    const sorted = sorting(searchedOrders);

    setSearchedOrders(sorted);
  }, [selectedSort]);

  // filteredProducts = sorting(allProducts);

  const handleSortChange = (e) => {
    setSelectedSort(e.value);
  };

  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const orders = await axios.get("http://localhost:5000/orders");

      // Filter items based on SellerAuth
      const filteredItems = orders.data.filter((order) => {
        return order.items.some((item) => item.SellerAuth === SellerAuth);
      });
      console.log(filteredItems);
      // Get the index of the first matching item
      //   const indexOfFirstMatch = orders.data.items.findIndex(
      //     (item) => item.SellerAuth === SellerAuth
      //   );

      setAllOrders(filteredItems);
      setSearchedOrders(filteredItems);
      // setItemIndex(indexOfFirstMatch);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewPrompt = (order) => {
    setSelectedOrder(order);
    setViewPrompt(true);
  };

  const handleStatusPrompt = (id) => {
    setStatusPrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/orders/${selectedId}`
      );

      setStatusPrompt(false);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-transparent backdrop-blur-sm border-b-2 border-violet-300 z-10">
        <div className="">
          <img src={logo} alt="logo" className="h-9" />
        </div>

        <div className="w-[40%] flex justify-center items-center rounded-lg bg-violet-100 p-0.5 gap-2">
          <input
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            placeholder="Search users..."
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

        <div className="flex flex-col col-span-4 px-4 py-16 overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center rounded-lg">
            {/* filter */}
            <div className="w-full h-full flex justify-end items-center">
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div className="w-full py-8">
              {searchedOrders.length === 0 ? (
                <div className="w-full grid place-items-center py-10">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    No Orders found!
                  </h3>
                </div>
              ) : (
                <>
                  <div className="">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Order ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Bought Items
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Buyer Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchedOrders.map((order, index) => (
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              {order._id}
                            </td>
                            <td className="px-6 py-4">
                              <p className="ps-4">{order.items.length}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="">
                                <p className="text-base font-semibold">
                                  {order.Lastname}
                                </p>
                                <p className="font-normal text-gray-500">
                                  {order.email}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    order.ParcelStatus === "Delivered"
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                  } me-2`}
                                />
                                {order.ParcelStatus}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {/* <!-- Modal toggle --> */}

                              <button
                                onClick={() => handleViewPrompt(order)}
                                className="px-5 py-2 font-medium tracking-wide rounded-md bg-green-200/50 text-green-600 hover:bg-green-200"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <AnimatePresence>
                    {viewPrompt && (
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
                            className="flex flex-col items-center justify-start w-full h-full max-w-lg rounded-lg p-4 bg-white relative z-0 overflow-hidden"
                          >
                            <span
                              onClick={() => setViewPrompt(false)}
                              className="absolute top-1 right-1 z-10 cursor-pointer"
                            >
                              <RxCross2 size={20} />
                            </span>
                            <div className="flex flex-col px-6 items-start justify-start font-sans w-full h-full max-h-fit py-2 overflow-y-auto">
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Order ID
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder._id}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Buyer Name
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.Lastname}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Email
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.email}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  City
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.City}
                                </p>
                              </div>
                              <div className="flex flex-col w-full my-2 items-start justify-start">
                                <p className="text-gray-600 font-bold tracking-tight font-sans">
                                  Address
                                </p>
                                <p className="font-medium text-gray-800">
                                  {selectedOrder.Address}
                                </p>
                              </div>

                              <div className="w-full">
                                <p className="font-bold font-sans tracking-tighter text-gray-600">
                                  Products
                                </p>
                                <Accordion allowMultiple>
                                  {selectedOrder.items.map((product, index) =>
                                    product.SellerAuth === SellerAuth ? (
                                      <AccordionItem
                                        className="bg-slate-100 px-2 rounded-md"
                                        key={index}
                                      >
                                        <h2>
                                          <AccordionButton>
                                            <span className="flex-1 text-left">
                                              {product.name}
                                            </span>
                                            <AccordionIcon />
                                          </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                          <div className="">
                                            <p className="font-bold font-sans tracking-tighter text-gray-600">
                                              Product price
                                            </p>
                                            <p className="text-gray-800">
                                              {product.price}
                                            </p>
                                          </div>
                                          <div className="my-1">
                                            <p className="font-bold font-sans tracking-tighter text-gray-600">
                                              Seller name
                                            </p>
                                            <p className="text-gray-800">
                                              {product.SellerName}
                                            </p>
                                          </div>
                                        </AccordionPanel>
                                      </AccordionItem>
                                    ) : null
                                  )}
                                </Accordion>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {StatusPrompt && (
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
                            className="flex flex-col items-center justify-start w-full h-auto max-w-md rounded-lg p-2 bg-white relative z-0"
                          >
                            <span
                              onClick={() => setStatusPrompt(false)}
                              className="absolute top-1 right-1 z-10 cursor-pointer"
                            >
                              <RxCross2 size={20} />
                            </span>
                            <div className="flex flex-col items-center font-sans gap-2 w-full py-2">
                              <span className="p-2 rounded-full text-blue-600 bg-blue-200/50">
                                <IoWarningOutline size={24} />
                              </span>
                              <h1 className="px-1 text-xl font-semibold text-gray-700">
                                Update delivery status
                              </h1>
                            </div>
                            <div className="py-2 flex flex-col items-center">
                              <p>Please select the delivery status</p>
                              <div className="flex justify-between w-full py-4 gap-2">
                                <button
                                  onClick={handleUpdateStatus}
                                  className="px-4 py-2 w-full bg-green-200/50 text-green-600 rounded-md hover:bg-green-200"
                                >
                                  Delivered
                                </button>
                                <button
                                  onClick={() => setStatusPrompt(false)}
                                  className="px-4 py-2 w-full bg-orange-200/50 text-orange-600 rounded-md hover:bg-orange-200"
                                >
                                  Pending
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
