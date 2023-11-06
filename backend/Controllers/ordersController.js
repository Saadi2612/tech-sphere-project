const ordersModel = require("../Models/ordersModel");


module.exports.getorders= async(req,res)=>{
    console.log("here")
    console.log(req)
    const response = await ordersModel.find();
    console.log(response)
    res.send(response)
    }


module.exports.orders = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      Firstname,
      Lastname,
      Address,
      email,
      City,
      State,
      Zipcode,
     
      items,
      customerdata,
    } = req.body;
    const user = await ordersModel.create({
      Firstname,
      Lastname,
      Address,
      email,
      City,
      State,
      Zipcode,
      items,
      customerdata,
    });
  } catch (err) {
    console.log(err);
  }
};
