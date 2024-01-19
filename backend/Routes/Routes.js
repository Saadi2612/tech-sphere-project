const {
  postLaptop,
  getLaptops,
  deleteProduct,
  updateProducts,
  getAdminProducts,
} = require("../Controllers/LaptopController");
const express = require("express");
const router = require("express").Router();
const {
  orders,
  getorders,
  UpdateStatus,
} = require("../Controllers/ordersController");
const { reviews, getreviews } = require("../Controllers/reviewscontroller");
const { getUsers, deleteUsers } = require("../Controllers/usersController");
const {
  getSellers,
  deleteSellers,
} = require("../Controllers/sellerController");

const upload = require("../Utils/Multer");
const app = express();
router.post("/admin", upload.any("images"), postLaptop);
router.get("/laptops", getLaptops);
router.get("/orders", getorders);
router.get("/reviews", getreviews);
router.post("/Checkoutpage", orders);
router.post("/reviewpage", reviews);
router.get("/adminHome/products", getAdminProducts);
router.delete("/adminHome/products/:id", deleteProduct);
router.get("/adminHome/users", getUsers);
router.delete("/adminHome/users/:id", deleteUsers);
router.get("/adminHome/sellers", getSellers);
router.delete("/adminHome/sellers/:id", deleteSellers);
router.put("/orders/:id", UpdateStatus);
router.put("/SellerHome/my-products/:id", updateProducts);
module.exports = router;
