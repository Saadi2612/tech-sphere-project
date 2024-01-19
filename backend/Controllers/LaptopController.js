const LaptopModel = require("../Models/LaptopModel");

const cloudinary = require("../Utils/Cloudinary");
// const upload = require("../Utils/Multer");

module.exports.getLaptops = async (req, res) => {
  // console.log("here");
  // console.log(req);
  const response = await LaptopModel.find();
  //console.log(response);
  res.send(response);
};

module.exports.getAdminProducts = async (req, res) => {
  // console.log("here");
  // console.log(req);
  const response = await LaptopModel.find().select(
    "sku name price category quantity specs SellerAuth SellerName"
  );
  // console.log(response);
  res.send(response);
};

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image.path, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

const multipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((img) => uploadImage(img));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

const uploadImages = async (files) => {
  const secureUrls = [];

  if (files && Array.isArray(files)) {
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        secureUrls.push(result.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    await Promise.all(uploadPromises);
  }

  return secureUrls;
};

module.exports.postLaptop = async (req, res, next) => {
  try {
    const {
      name,
      model,
      price,
      description,
      specs,
      sku,
      category,
      condition,
      threeSixtyImages,
      SellerAuth,
      SellerName,
    } = req.body;

    const files = req.files;

    console.log(files);
    console.log(req.body);

    // Upload images and await the result
    const urls = await uploadImages(files);
    console.log(urls);

    // Now you can use 'urls' to associate the secure URLs with your laptop data

    const response = await LaptopModel.create({
      name: name,
      model: model,
      price: price,

      description: description,
      specs: JSON.parse(specs),
      sku: sku,
      category: category,
      condition: condition,
      images: urls,
      threeSixtyImages: JSON.parse(threeSixtyImages),
      SellerAuth: SellerAuth,
      SellerName: SellerName,
    });

    res.send({ data: response, posted: true });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ message: "Error adding laptop.", posted: false });
  }
};

module.exports.deleteProduct = async (req, res) => {
  console.log(req.params.id);

  const { id } = req.params;

  try {
    const result = await LaptopModel.findOneAndDelete({ _id: id });

    //console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching products!", status: false });
  }
};

module.exports.updateProducts = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  const { _id, name, model, price, quantity, description, specs } = req.body;

  try {
    const result = await LaptopModel.findOneAndUpdate(
      { _id: _id },
      {
        name: name,
        model: model,
        price: price,
        quantity: quantity,
        description: description,
        specs: JSON.parse(specs),
      }
    );

    console.log(result);
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
