//register controller for

const sellerModel = require("../Models/sellerModel");
const hashpassword = require("../Utils/authUtils");

const sellerregisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }

    //check user
    const exisitingseller = await sellerModel.findOne({ email });
    //exisiting user
    if (exisitingseller) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedpassword = await hashpassword(password);
    //save
    const seller = await sellerModel.create({
      name,
      email,
      phone,
      password: hashedpassword,
      address,
    });

    res.status(201).send({
      success: true,
      message: "seller Register Successfully",
      seller,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

module.exports = sellerregisterController;
