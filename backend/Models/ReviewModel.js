const mongoose= require("mongoose")
const ordersSchema =new mongoose.Schema(
    {
    rating: {
        type: String
    },
  customerdata:{
    type:Array
  },
  productid:{
    type:String
  }
    

    
    }
    
)

module.exports=mongoose.model("reviews",ordersSchema)