import React from 'react'

const CartAmountToggle = ({counter , Decerement , Increment }) => {
  return (
    <div >
<button class="plus-btn" type="button" name="button" onClick={()=>Increment()}> + </button>
<text>  {counter}</text>
<button  class="minus-btn" type="button" name="button" onClick={()=>Decerement()}> - </button>  
    </div>
  )
}

export default CartAmountToggle
