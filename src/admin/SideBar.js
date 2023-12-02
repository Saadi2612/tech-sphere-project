import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Components/ContextAuth/Auth";

const SideBar = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
  };

  return (
    <div className="flex h-full border-r-2 border-slate-100 pt-16">
      <div className="w-full h-full p-3 flex flex-col justify-start">
        <div>
          <h1 className="text-3xl text-[#6441a5] font-bold pb-3">Dashboard</h1>
        </div>
        <div className="py-6 w-full flex flex-col gap-3 border-t-2">
          <Link
            to={"/adminHome/products"}
            className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]"
          >
            Products
          </Link>
          <Link
            to={"/adminHome/users"}
            className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]"
          >
            Users
          </Link>
          <Link
            to={"/adminHome/sellers"}
            className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] "
          >
            Sellers
          </Link>
          <Link
            to={"/adminHome/orders"}
            className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]"
          >
            Orders
          </Link>

          <Link
            onClick={handleLogout}
            to="/Login"
            className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#a54141] hover:scale-105 ease-in duration-200"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
