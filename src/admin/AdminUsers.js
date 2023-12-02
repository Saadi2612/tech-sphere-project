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
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereds = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const users = await axios.get("http://localhost:5000/adminHome/users");

      setAllUsers(users.data);
      console.log(users.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeletePrompt = (id) => {
    setDeletePrompt(true);
    setSelectedId(id);
    console.log(id);
  };

  const handleUserDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/adminHome/users/${selectedId}`
      );

      setDeletePrompt(false);
      fetchUsers();
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

        {/* <div>
          <h2>search bar</h2>
        </div> */}
        <div>
          <h2>icons and account</h2>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 h-screen">
        <div className="col-span-1">
          <SideBar />
        </div>

        <div className="flex flex-col col-span-4 px-4 py-16 overflow-y-auto relative">
          <div className="w-full p-2 flex items-center justify-center shadow-lg bg-slate-100 rounded-lg">
            {/* Search Bar and filter */}
            <div className="w-[40%] flex justify-center items-center rounded-lg bg-white py-0.5 px-1 gap-2">
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Search users..."
                className="outline-none border-0 px-4 py-1 w-[100%] bg-transparent font-normal text-base text-gray-600 rounded-lg"
              />

              <div className="flex items-center justify-center text-gray-600 text-xl rounded-md p-2 cursor-pointer">
                <BiSearch />
              </div>
            </div>
          </div>

          {/* -----------------Table------------------ */}
          <div class=" mx-auto px-4 sm:px-8 w-full">
            <div class="py-8">
              <div>
                <h2 class="text-2xl font-semibold leading-tight">Users</h2>
              </div>
              <div class="my-2 flex sm:flex-row flex-col">
                <div class="flex flex-row mb-1 sm:mb-0">
                  <div class="relative">
                    <select class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>5</option>
                      <option>10</option>
                      <option>20</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                  <table class="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          User
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rol
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Created at
                        </th>
                        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                Vera Carpenter
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Admin</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Jan 21, 2020
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">Activo</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                Blake Bowman
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Editor</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Jan 01, 2020
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">Activo</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                Dana Moore
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Editor</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Jan 10, 2020
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">Suspended</span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="px-5 py-5 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                alt=""
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                Alonzo Cox
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">Admin</p>
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Jan 18, 2020
                          </p>
                        </td>
                        <td class="px-5 py-5 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">Inactive</span>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span class="text-xs xs:text-sm text-gray-900">
                      Showing 1 to 4 of 50 Entries
                    </span>
                    <div class="inline-flex mt-2 xs:mt-0">
                      <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                        Prev
                      </button>
                      <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
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
                    No users found!
                  </h3>
                </div>
              ) : (
                filtereds?.map((user, index) => (
                  <div
                    key={index}
                    className="w-full rounded-lg p-4 flex justify-between items-center bg-violet-200 border-4 border-violet-300"
                  >
                    <div className="p-2 flex flex-col w-[80%] gap-2">
                      <h2 className="font-bold text-lg tracking-wider text-gray-700">
                        Name: {user.name}
                      </h2>
                      <p className="text-gray-500 truncate">
                        Email: {user.email}
                      </p>
                      <p className="text-gray-500">Phone:{user.phone}</p>
                    </div>
                    <div className="flex items-end h-full w-[10%]">
                      <button
                        onClick={() => handleDeletePrompt(user._id)}
                        className="rounded-md p-2 text-white text-xl bg-red-500 hover:bg-red-600 hover:scale-105 ease-in duration-200"
                      >
                        <RiDeleteBin6Line />
                      </button>
                      {deletePrompt && (
                        <div class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                          <div className="flex flex-col items-center py-6 px-4 bg-white rounded-xl">
                            <div>
                              <p className="text-gray-600 font-medium tracking-wide">
                                Are you sure to delete the user?
                              </p>
                            </div>
                            <div className="flex justify-end gap-4 py-3">
                              <button
                                onClick={handleUserDelete}
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

export default AdminUsers;
