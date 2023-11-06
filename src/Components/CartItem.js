import React, { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  "./CartItem.css"
import { useCartContext } from "./Cart_context";
import CartAmountToggle from "./CartAmountToggle";
const CartItem = ({_id, name, total, counter,price ,image}) => {
    const { removeitem,Decerement,Increment } = useCartContext();
    const [counterCart, setCounterCart] = useState(0);
const {total_price} =useCartContext();
   // const Increment = () => {
     // setCounterCart(counterCart + 1);
  //  };
  
   // const Decerement = () => {
  //    setCounterCart((count) => Math.max(count - 2, 0));
  //  };


    
    
   

  return (
  <div >
   

 

 
  <div class="itemm">
  

   
    
 
   
 
    <div class="descriptions">
      <span>{name} </span>
      
    </div>
 
    <div class="quantityy">
     <CartAmountToggle
     counter={counter}
     Decerement={()=>Decerement(_id)}
     
     Increment={()=>Increment(_id)}
     />
    </div>
    

    <div class="total-pricee">{counter*price}</div>
    <div class="total-itemm"> 
    <button  onClick={() => removeitem(_id)}>
    <FontAwesomeIcon icon={faTrash} color="red" />
  </button>
  
    </div>
  </div>
 
  
 

</div>
 
  

  )
}

export default CartItem;
