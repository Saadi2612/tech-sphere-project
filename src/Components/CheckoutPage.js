import React, { useState, useHistory, useEffect } from "react";
import { useCartContext } from "./Cart_context";
import "./CheckoutPageStyles.css";
import CartCheckout from "./CartCheckout";
import heroImage from "../Assets/homeBannerImg.png";
import { useAuth } from "./ContextAuth/Auth";
import Header from "./Header";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
function CheckoutPage() {
  const [auth] = useAuth();

  const { cart, total_price, shipping_fee } = useCartContext();
  let odertotal = total_price + shipping_fee;
  const [values, setValues] = useState({
    Firstname: "",
    Lastname: "",
    Address: "",
    email: "",
    City: "",
    State: "",
    Zipcode: "",
    ParcelStatus: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth.user._id;
    const cartItems = cart;
    console.log(values);
    try {
      const { data } = await axios.post("http://localhost:5000/Checkoutpage", {
        Firstnam: values.Firstname,
        Lastname: values.Lastname,
        Address: values.Address,
        email: values.email,
        City: values.City,
        State: values.State,
        Zipcode: values.Zipcode,
        ParcelStatus: "Pending",
        items: cartItems,
        customerdata: userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div class="h-20"></div>
      <div class="dividepage">
        <div>
          <div className="containerss">
            <h2>Billing Address</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="Firstname"
                placeholder="Firstname"
                required
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />

              <input
                type="text"
                name="Lastname"
                placeholder="Lastname"
                required
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />

              <div>
                <input
                  type="text"
                  name="Address"
                  placeholder="Address"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="City"
                  name="City"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="State"
                  name="State"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  class="input1"
                  type="text"
                  placeholder="Zipcode"
                  name="Zipcode"
                  required
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
                <StripeCheckout stripeKey="pk_test_51NFABoBUBBvJWKKpR9lk1alYC5cuTBBlgCh9zhc0qF0uJPUYieJpaBWqpiP74320RgzGTquSy4HiSJUHFSFCqlyn00NHWBI7Ri" />
              </div>

              <button
                type="submit"
                class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5]  hover:scale-105 ease-in duration-200"
              >
                Cash on Delievery
              </button>
            </form>
          </div>
        </div>

        {/* cart page   */}

        <div class="itemspage">
          <div class="yourcart">
            <h3> Your Cart</h3>
          </div>
          {cart.map((curElem) => {
            return <CartCheckout key={curElem.id} {...curElem} />;
          })}

          <div class="txtss">
            <div>
              <p> SubTotal: PKR {total_price}</p>
            </div>

            <div>
              <p>Shipping Fee :PKR{shipping_fee}</p>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
