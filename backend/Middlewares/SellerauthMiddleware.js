const JWT = require("jsonwebtoken");

const SellerrequireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
        req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.seller =decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = SellerrequireSignIn;
