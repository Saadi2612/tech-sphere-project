import React, { useState, Fragment, useRef, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import axios from "axios";
import { Orbitals } from "react-spinners-css";

import SideBar from "./SideBar";

import logo from "../Assets/TechSphere.svg";
import preview from "../Assets/headphones-category.jpg";

const AdminUsers = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [StatusPrompt, setStatusPrompt] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereds = allOrders.filter((orders, index) => {
    return orders.items[0].name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const orders = await axios.get("http://localhost:5000/orders");

      setAllOrders(orders.data);
      console.log(orders.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusPrompt = (id) => {
    setStatusPrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleUpdateDelivered = async () => {
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

        <div>
          <h2>search bar</h2>
        </div>
        <div>
          <h2>icons and account</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div className="col-span-1">
          <SideBar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 bg-[#f4effc] overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center bg-violet-200 rounded-lg">
            {/* Search Bar and filter */}
            <div className="w-[40%] flex justify-center items-center rounded-lg bg-white p-0.5 gap-2">
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
          </div>
          {isLoading ? (
            <div class="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div className="w-full p-4 grid grid-cols-3 gap-4">
              {filtereds.length === 0 ? (
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    No orders found!
                  </h3>
                </div>
              ) : (
                filtereds?.map((order, index) => (
                  <div
                    key={index}
                    className="w-full rounded-lg p-4 flex justify-between items-center bg-violet-200 border-4 border-violet-300"
                  >
                    <div className="p-2 flex flex-col w-[80%] gap-2">
                      <p className="text-gray-500 "> Order:{order._id}</p>
                      <h2 className="font-bold text-lg tracking-wider text-gray-700">
                        Product: {order.items[0].name}
                      </h2>
                      <p className="text-gray-500 truncate">
                        {" "}
                        Quantity:{order.items[0].counter}
                      </p>
                      <p className="text-gray-500 "> Email:{order.email}</p>
                      <p className="text-gray-500 "> Address:{order.Address}</p>
                      <p className="text-gray-500">
                        {" "}
                        Price: Rs.{order.items[0].price}{" "}
                      </p>
                      <p className="text-orange-500 ">
                        {" "}
                        Status:{order.ParcelStatus}
                      </p>
                    </div>

                    <div className="w-full flex justify-end ">
                      <button
                        onClick={() => handleStatusPrompt(order._id)}
                        className="p-1 rounded-md text-white text-xl bg-[#6441a5] hover:bg-red-600 hover:scale-105 ease-in duration-200"
                      >
                        status
                      </button>

                      {StatusPrompt && (
                        <div class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                          <div className="flex flex-col items-center py-6 px-4 bg-white rounded-xl">
                            <div>
                              <p className="text-gray-600 font-medium tracking-wide">
                                Order Status
                              </p>
                            </div>
                            <div className="flex justify-end gap-4 py-3">
                              <button
                                onClick={handleUpdateDelivered}
                                className="px-6 py-1 bg-green-500 rounded-md text-white"
                              >
                                Delievered
                              </button>
                              <button
                                onClick={() => setStatusPrompt(false)}
                                className="px-6 py-1 border-2 text-white-500 bg-red-500  rounded-md"
                              >
                                Pending
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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

export default AdminUsers;