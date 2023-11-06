import React from "react";
import CheckoutPage from "./CheckoutPage";
import "./CartPageStyles.css";
import Header from "./Header";
import heroImage from "../Assets/homeBannerImg.png";
import { useCartContext } from "./Cart_context";
import CartItem from "./CartItem";
import Footer from "./Footer";
import { useAuth } from "./ContextAuth/Auth";
import { Link, useNavigate } from "react-router-dom";
function CartPage() {
  const { cart, total_price } = useCartContext();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(
    "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    cart
  );

  return (
    <div className="w-full overflow-hidden">
      <div>
        <Header />
      </div>
      {/* Hero Section */}
      <div className="flex justify-center items-center w-screen h-[60vh] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-black/70 z-10" />
        <img
          className="absolute z-0 object-cover blur-[2px]"
          src={heroImage}
          alt="/"
        />
        <div
          classNam
          e="absolute top-[50] left-[50] translate-x-[50] translate-y-[50] z-20 "
        >
          <h1 className="text-center text-gray-100 text-5xl font-bold tracking-wide">
            Add To Cart
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <div class="shopping-cart">
          <div class="title"></div>
          <div className="w-full h-[10vh] bg-gradient-to-r from-[#605596] to-[#354E57] p-3 flex">
            <p className="ml-20 text-slate-200">Products</p>
            <p className="ml-28 text-slate-200">Quantity</p>
            <p className="ml-24 text-slate-200">Price</p>
            <p className="ml-24 text-slate-200">Remove</p>
          </div>

          {cart.map((current_item) => {
            return <CartItem key={current_item._id} {...current_item} />;
          })}
        </div>

        {auth?.token ? (
          <Link to={"/CheckoutPage"}>
            {" "}
            <button className="py-3 px-12 bg-gradient-to-r from-[#605596] to-[#354E57] rounded-lg text-white font-semibold ">
              checkout
            </button>{" "}
          </Link>
        ) : (
          <Link to={"/Login"}>
            {" "}
            <button className="py-3 px-12 bg-gradient-to-r from-[#605596] to-[#354E57] rounded-lg text-white font-semibold ">
              {" "}
              Please Login{" "}
            </button>{" "}
          </Link>
        )}

        <div class="emptydiv"></div>
      </div>

      
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
