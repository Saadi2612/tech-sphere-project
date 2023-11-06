import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./UserProfileStyles.css";
import { useAuth } from "../ContextAuth/Auth";
import axios from "axios";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();

  const compare_id = auth?.user?._id;

  const [orders, getorders] = useState([]);
  const [Loading, setLoading] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        const newproduct = data.filter(
          (ordercustomer) => ordercustomer.customerdata[0] === compare_id
        );
        console.log(newproduct);
        getorders(newproduct);
      });
  }, []);


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
  };

  return (
    <div className="main-container">
      <div className="main">
        <div class="container">
          <div className="firstChild">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              class="rounded-circle p-5 bg-primary ml-12"
              width="200"
            ></img>
            <h1 class="mt-4 text-lg font-semibold">{auth?.user?.name}</h1>
          </div>
          <div className="secondChild">
            <div className="w-full">
              <h1 class="mb-4 ml-2 text-md font-medium mt-8">
                Name: {auth?.user?.name}
              </h1>
              <h1 class="mb-4 ml-2 text-md font-medium">
                Email Address:{auth?.user?.email}
              </h1>
              <h1 class="mb-4 ml-2 text-md font-medium">
                Address:{auth?.user?.phone}
              </h1>
            </div>
            <div className="w-full flex items-end justify-end">
              <button class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                <NavLink onClick={handleLogout} to="/login">
                  Logout
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="history">
        <h1 class="text-xl font-poppins font-semibold mb-4">Order History</h1>
        <div className="bg-gradient-to-r from-[#605596] to-[#354E57] p-2 flex">
          <p className="ml-20 text-slate-200">Products</p>
          <p className="ml-20 text-slate-200">Quantity</p>
          <p className="ml-12 text-slate-200">Price</p>
        </div>

        {orders?.map((item) => (
          <div class="item">
            <div class="description">
              <h2>{item.items[0].name}</h2>
            </div>

            <div class="quantity">
              <h2>{item.items[0].counter}</h2>
            </div>

            <div class="total-price"> {item.items[0].price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
