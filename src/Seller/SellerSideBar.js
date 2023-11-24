import React from "react";
import { Link } from "react-router-dom";
import { useSellerAuth } from "../Components/ContextAuth/Sellerauthcontext";

const SellerSideBar = () => {
  const [sellerauth, setsellerAuth] = useSellerAuth();

  const handlesellerLogout = () => {
    setsellerAuth({
      ...sellerauth,
      seller: null,
      token: "",
    });

    localStorage.removeItem("sellerauth");
  };

  return (
    <div className="flex h-full border-r-2 border-violet-300 pt-16">
      <div className="w-full h-full p-3 flex flex-col justify-start">
        <div>
          <h1 className="text-3xl text-[#6441a5] font-bold pb-3">Dashboard</h1>
        </div>
        <div className="py-6 w-full h-full flex flex-col justify-between items-center gap-3 border-t-2">
          <div className="w-full flex flex-col gap-4">
            <Link
              to={"/SellerHome"}
              className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]"
            >
              Home
            </Link>
            <Link
            to="/SellerHome/my-products"
              className="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] "
            >
              Products
            </Link>
          </div>

          <div class="w-full">
            <Link
              onClick={handlesellerLogout}
              to="/SellerLogin"
              className="w-full px-12 py-2 my-10 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#a54141] hover:scale-105 ease-in duration-200"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSideBar;
