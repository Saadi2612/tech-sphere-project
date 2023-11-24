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
      ParcelStatus,
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
      ParcelStatus,
      items,
      customerdata,
    });
  } catch (err) {
    console.log(err);
  }
};



module.exports.UpdateStatus = async (req, res) => {
  console.log(req.params.id);

  const { id } = req.params;

  try {
    const result = await ordersModel.updateOne(
      { _id: id },{ ParcelStatus: "Delivered" } );

    //console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users!", status: false });
  }
};