import React from "react";
import "./CartCheckout.css";
import { useCartContext } from "./Cart_context";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartCheckout({ _id, name, price, counter }) {


  return (
    <div calss="maindiv1">
      <div class="beautify">
        <text>{name}</text>
        <p class="txts"> Rs.{price*counter}</p>
            
        
      
      </div>

      <div>

     
      </div>
    </div>
  );
}

export default CartCheckout;
