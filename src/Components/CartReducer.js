

const CartReducer =(state, action) =>{


    if (action.type === "ADD_TO_CART") {
        let {_id, counter,products,total} = action.payload;
     
  
        
  
       let existingproduct =state.cart.find((curItem)=>curItem._id===_id) // double equal to triple equal 
      
  
      if(existingproduct){
      let updatedproduct =state.cart.map((curEItem)=>{
  
  if(curEItem._id === _id) // double equal to triple equal 
  {
    let newamount = curEItem.total + total;
    let newcounter = curEItem.counter + counter;
    return{
      ...curEItem,
      total: newamount,
      counter : newcounter,
    }
    
  }
  else
    {
  
      return curEItem;
    }
  
      });
      return{
  
        ...state,
        cart:updatedproduct,
    };
  
  
  
      }else{
  
      
  
    let cartProduct;  
    cartProduct={
_id  : products._id,
name : products.name,
total,
counter,
price: products.price,
image: products.images[0]

      }
  
    
      return{
  
          ...state,
          cart:[...state.cart,cartProduct],
      };
    }
  
      };
    if(action.type==="REMOVE_ITEM"){
        let updatedcart = state.cart.filter((curItem)=>curItem._id!==action.payload  )
          return{
            ...state,
            cart:updatedcart,
          }
        
        
        
        
            };


            if(action.type==="SET_DECREMENT"){
             let updatedproduct = state.cart.map((currentitem)=>{
             if(currentitem._id === action.payload){
             let deccounter =currentitem.counter -1;
             if (deccounter <= 1) {
              deccounter = 1;
            }
             return{
              ...currentitem,
              counter : deccounter,
             }
             }else{

              return currentitem;
             };


             });
               return{ ...state , cart : updatedproduct}
            };



            
            if(action.type==="SET_INCREMENT"){
              let updatedproduct = state.cart.map((currentitem)=>{
              if(currentitem._id === action.payload){
              let deccounter =currentitem.counter + 1;
               
              return{
               ...currentitem,
               counter : deccounter,
              }
              }else{
 
               return currentitem;
              };
 
 
              });
                return{ ...state , cart : updatedproduct}
             };
 
            if(action.type===" CART_TOTAL_ITEM"){

            let updateditemvalue = state.cart.reduce((initialVal , currentitem )=>{
              
              let {counter} =  currentitem;
              initialVal =  initialVal + counter ; 
              return initialVal;

            },0);

            return {
              ...state,
              total_item : updateditemvalue,
            }



            }




            if (action.type === "CART_ITEM_PRICE_TOTAL") {
              let { total_price } = state.cart.reduce(
                (accum, curElem) => {
                  let { price, counter } = curElem;
          
                 
                  accum.total_price += price*counter ;
          
                  return accum;
                },
                {
                 
                  total_price: 0,
                }
              );
              return {
                ...state,
               
                total_price,
              };
            }
        
        

return state;
};

export default CartReducer;

