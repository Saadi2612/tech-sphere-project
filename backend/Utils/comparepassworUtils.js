const bcrypt = require("bcrypt");
const hashpassword = require("../Utils/authUtils");

const comparePassword = async (password, hashedpassword) => {
    return bcrypt.compare(password, hashedpassword);
  };
  
  module.exports = comparePassword;