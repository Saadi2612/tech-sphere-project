import { createContext, useEffect, useContext } from "react";
import { useReducer } from "react";
import reducer from "./CartReducer";

const CartContext = createContext();
const getlocaldata=()=>{

    let localCartData=localStorage.getItem("cartitems")
   // if(newcartdata ==[]){
    //  return []; 
  //  }else{
   // return JSON.parse(newcartdata);
   // }

   const parsedData = JSON.parse(localCartData);
   if(!Array.isArray(parsedData))return [];
   return parsedData;
    
    };






const initialState = {
  //cart: [],
  cart:getlocaldata(),
  total_item: "",
  total_amount: "",
  shipping_fee: 250,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (_id, counter, products, total) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { _id, counter, products, total },
    });
  };


  const Decerement =(_id)=>{
   dispatch({type:"SET_DECREMENT", payload:_id})

  };

  const Increment =(_id)=>{
    dispatch({type:"SET_INCREMENT", payload:_id})
 
   };
  const removeitem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  useEffect(( )=>{

    dispatch({type:" CART_TOTAL_ITEM"});
    dispatch({ type: "CART_ITEM_PRICE_TOTAL"});
   localStorage.setItem("cartitems",JSON.stringify(state.cart))
  },
  [state.cart]
  );


  return (
    <CartContext.Provider value={{ ...state, addToCart, removeitem ,Decerement,Increment }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
