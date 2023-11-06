//login controller for login

const sellerModel = require("../Models/sellerModel");
const JWT = require ("jsonwebtoken");
const comparePassword = require("../Utils/comparepassworUtils");

const sellerloginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password ",
      });
    }
    //check user
    const seller = await sellerModel.findOne({ email });
    if (!seller) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, seller.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Inavlid password ",
      });
    }

    const token = await JWT.sign({ _id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "login in sucessfully",
      seller: {
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address:seller.address,
        role: seller.role,
      },

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in login",
      error,
    });
  }
};

module.exports = sellerloginController;
