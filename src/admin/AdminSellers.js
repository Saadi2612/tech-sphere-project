import React, { useState, Fragment, useRef, useEffect } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import axios from "axios";
import { Orbitals } from "react-spinners-css";

import logo from "../Assets/TechSphere.svg";
import notFound from "../Assets/no-data-cuate.svg";
import { motion, AnimatePresence } from "framer-motion";
import { IoWarningOutline } from "react-icons/io5";

import SideBar from "./SideBar";

const sorts = [
  { sort: "Sort", value: "Sort" },
  { sort: "A to Z", value: "A-Z" },
  { sort: "Z to A", value: "Z-A" },
];

const AdminSellers = () => {
  const [allSellers, setAllSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [selectedSort, setSelectedSort] = useState(sorts[0].value);
  const [searchedSellers, setSearchedSellers] = useState(allSellers);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereds = allSellers.filter((seller) => {
    return seller.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const fetchSellers = async () => {
    setIsLoading(true);

    try {
      const sellers = await axios.get(
        "http://localhost:5000/adminHome/sellers"
      );

      setAllSellers(sellers.data);
      setSearchedSellers(sellers.data);
      console.log(sellers.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    const sorted = sorting(searchedSellers);

    setSearchedSellers(sorted);
  }, [selectedSort]);

  useEffect(() => {
    handleSearchChange();
  }, [searchTerm]);

  const handleSearchChange = () => {
    // const searchTerm = event.target.value;
    // setSearchTerm(searchTerm);

    // If search term is empty, set filtered products to original array
    if (!searchTerm.trim()) {
      setSearchedSellers(allSellers);
    } else {
      // Filter products based on the search term
      const filtered = allSellers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedSellers(filtered);
    }
  };

  // filteredProducts = sorting(allProducts);

  const handleSortChange = (e) => {
    setSelectedSort(e.value);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleDeletePrompt = (id) => {
    setDeletePrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleSellerDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/adminHome/sellers/${selectedId}`
      );

      setDeletePrompt(false);
      fetchSellers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="flex justify-between items-center fixed w-full h-[8vh] p-4 bg-white backdrop-blur-sm border-b-2 border-violet-300 z-10">
        <div className="">
          <img src={logo} alt="logo" className="h-9" />
        </div>

        <div className="w-[40%] flex justify-center items-center rounded-lg bg-violet-100 p-0.5 gap-2">
          <input
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="outline-none border-0 px-4 py-1 mx-2 w-[100%] font-normal text-base text-gray-700 placeholder:text-slate-500 bg-transparent rounded-lg"
          />

          <div className="flex items-center justify-center text-gray-800 text-xl rounded-md p-2 cursor-pointer">
            <BiSearch />
          </div>
        </div>
        <div>
          <h2>icons and account</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div className="col-span-1">
          <SideBar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 overflow-y-auto relative">
          <div className="w-full p-2 sticky top-0 flex items-center justify-between rounded-lg">
            {/* filters */}
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
            <div class="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div classNameName="w-full p-4 grid grid-cols-3 gap-4">
              {searchedSellers.length === 0 ? (
                <div className="w-full grid place-items-center py-10">
                  <img src={notFound} alt="/" className="max-w-xs" />
                  <h3 classNameName="font-semibold text-gray-800 text-lg">
                    No users found!
                  </h3>
                </div>
              ) : (
                <div className="py-8">
                  <div className="px-4 py-4 overflow-x-auto sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md shadow-black/10">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr className="bg-violet-100">
                            <th
                              scope="col"
                              className="px-5 py-3 text-sm font-semibold text-left text-gray-600 uppercase border-b border-gray-200"
                            >
                              Seller
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-sm font-semibold text-left text-gray-600 uppercase border-b border-gray-200"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-sm font-semibold text-left text-gray-600 uppercase border-b border-gray-200"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 text-sm font-semibold text-left text-gray-600 uppercase border-b border-gray-200"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchedSellers?.map((user, index) => (
                            <tr key={index}>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                  <div className="">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {user.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.email}
                                </p>
                              </td>
                              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.phone}
                                </p>
                              </td>
                              <td className="px-5 py-3 text-sm bg-white border-b border-gray-200">
                                <button
                                  onClick={() => handleDeletePrompt(user._id)}
                                  className="px-5 py-2 font-semibold tracking-wide rounded-md bg-red-200/50 text-red-500"
                                >
                                  Delete
                                </button>

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
                                            <p>
                                              Are you sure you want to this
                                              seller?
                                            </p>
                                            <div className="flex justify-between w-full py-4 px-6 gap-2">
                                              <button
                                                onClick={handleSellerDelete}
                                                className="px-4 py-2 w-full bg-red-300/40 text-red-500 rounded-md hover:bg-red-300/70"
                                              >
                                                Delete
                                              </button>
                                              <button
                                                onClick={() =>
                                                  setDeletePrompt(false)
                                                }
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
                                </AnimatePresence>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSellers;
