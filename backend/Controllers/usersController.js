const UserModel = require("../Models/userModel");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Could not get users!", status: false });
  }
};

module.exports.deleteUsers = async (req, res) => {
  console.log(req.params.id);

  const { id } = req.params;

  try {
    const result = await UserModel.findOneAndDelete({ _id: id });

    //console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users!", status: false });
  }
};
