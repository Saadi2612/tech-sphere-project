const userModel = require("../Models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorizaed Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
success:false,
error,
message: "error in admin  "

    })
  }
};

module.exports= isAdmin