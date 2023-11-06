const express = require("express");
const registerController = require("../Controllers/authController");
const loginController = require("../Controllers/loginControl");
const testController = require("../Controllers/testController");
const router = require("express").Router();
const requireSignIn = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/AdminAMiddleware");
const forgotPasswordController = require("../Controllers/forgotPassController");
const sellerregisterController = require("../Controllers/sellerregisterController");
const sellerloginController = require("../Controllers/sellerloginController");
const SellerrequireSignIn = require("../Middlewares/SellerauthMiddleware");
//register user
router.post("/register", registerController);
//login of user
router.post("/login", loginController);
//middlewares and protected routes
router.get("/test", requireSignIn, isAdmin, testController);
//forgotPassword
router.post("/forgot-password", forgotPasswordController);
//protected routes FOR USER
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//seller registration
router.post("/sellerregister", sellerregisterController);
//seller login
router.post("/sellerlogin", sellerloginController);
//protected route for seller
router.get("/seller-auth", SellerrequireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
