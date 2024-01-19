import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useSellerAuth } from "../Components/ContextAuth/Sellerauthcontext";

import {
  FaCubes,
  FaUserFriends,
  FaUserTag,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Products",
    path: "/SellerHome/my-products",
    icon: <FaCubes size={18} />,
  },
  {
    title: "Orders",
    path: "/SellerHome/orders",
    icon: <FaBoxes size={18} />,
  },
];

const Sidebar = () => {
  const [sellerauth, setsellerAuth] = useSellerAuth();

  const location = useLocation();
  const { hash, pathname, search } = location;
  const currentPath = pathname.split("/")[2];

  const handlesellerLogout = () => {
    setsellerAuth({
      ...sellerauth,
      seller: null,
      token: "",
    });

    localStorage.removeItem("sellerauth");
  };

  return (
    <div className="flex h-full border-r-2 border-slate-100 pt-16">
      <div className="w-full h-full p-3 flex flex-col justify-start">
        <div>
          <h1 className="text-3xl text-[#6441a5] font-bold pb-3">Dashboard</h1>
        </div>
        <div className="py-2 w-full h-full flex flex-col justify-between">
          <div className="w-full flex flex-col py-2 rounded-xl bg-violet-100 ">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="w-full px-4 py-2 flex gap-3 rounded-lg text-violet-900 group font-medium tracking-wide"
              >
                <span
                  className={`${
                    currentPath === item.title.toLocaleLowerCase()
                      ? "translate-x-4 text-black"
                      : ""
                  } duration-150`}
                >
                  {item.icon}
                </span>
                <span
                  className={` ${
                    currentPath === item.title.toLocaleLowerCase()
                      ? "translate-x-2 text-black"
                      : "group-hover:translate-x-2"
                  } duration-150`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full">
            <Link
              onClick={handlesellerLogout}
              to="/Login"
              className="w-full px-4 py-2 flex items-center gap-3 text-violet-900 group font-medium tracking-wide rounded-xl bg-violet-100"
            >
              <span className="">
                <FaSignOutAlt size={18} />
              </span>
              <span className="group-hover:translate-x-2 duration-150">
                Logout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
