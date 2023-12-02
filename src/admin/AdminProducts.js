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

const AdminProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const products = await axios.get(
        "http://localhost:5000/adminHome/products"
      );

      setAllProducts(products.data);
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
                placeholder="Search items..."
                className="outline-none border-0 px-4 py-1 w-[100%] font-normal text-base text-gray-600 rounded-lg"
              />

              <div className="flex items-center justify-center text-gray-600 text-xl rounded-md p-2 cursor-pointer">
                <BiSearch />
              </div>
            </div>
          </div>

          <div className="bg-gray-200 w-full flex justify-end items-center p-2">

          

          </div>
          {isLoading ? (
            <div class="absolute inset-0 flex items-center justify-center bg-black/10">
              <Orbitals />
            </div>
          ) : (
            <div className="w-full py-8">
              {filteredProducts.length === 0 ? (
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    No products found!
                  </h3>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right text-left">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Category
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Description
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Price
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts?.map((product, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {product.category}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 max-w-md overflow-hidden truncate">
                            <p className="truncate text-ellipsis overflow-auto">
                              {product.description}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {product.price}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <button className="px-5 py-2 rounded-md bg-red-300/40 text-red-500">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
