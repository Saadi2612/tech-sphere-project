const SellerModel = require("../Models/sellerModel");

module.exports.getSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.find();

    res.status(200).send(sellers);
  } catch (error) {
    res.status(500).send({ message: "Could not get users!", status: false });
  }
};

module.exports.deleteSellers = async (req, res) => {
  console.log(req.params.id);

  const { id } = req.params;

  try {
    const result = await SellerModel.findOneAndDelete({ _id: id });

    //console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error fetching users!", status: false });
  }
};
