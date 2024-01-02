require("../model/db");
const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth").verifyloginToken;
const registerUserController = require("../controller/registerCus");
const loginUserController = require("../controller/login").loginUser;
const createFoodLabelController = require("../controller/createFoodLabel");
const getAllFoodLabel = require("../controller/getAllFoodLabel");
const getPartFoodLabel = require("../controller/getfoodLabelforParticularuser");
const getParticularFoodLabel = require("../controller/getParticularFoodLabel");
const submitForReviewController = require("../controller/submitForReview");

router.post("/register", async (req, res) => {
  registerUserController.registerUser(req, res);
});

router.post("/login", async (req, res) => {
  loginUserController.loginUser(req, res);
});

router.use(async function middlewareFnc(req, res, next) {
  let authResposne = await authToken(req, res, next);
  if (authResposne) {
    next();
  }
});

router.post("/createFoodLabel", async (req, res) => {
  createFoodLabelController.createfoodLabel(req, res);
});

router.get("/getAllFoodLabel", async (req, res) => {
  getAllFoodLabel.getAllFoodLabel(req, res);
});

router.get("/getParticularUserFoodLabel", async (req, res) => {
  getPartFoodLabel.getAllFoodLabelForParticularUser(req, res);
});

router.get("/getParticularFoodLabel", async (req, res) => {
  getParticularFoodLabel.getParticularFoodlabel(req, res);
});
router.post("/submitForReview", async (req, res) => {
  submitForReviewController.submitForReview(req, res);
});
// const getProductController=require('../controller/getProducts')
// const createProduct=require('../controller/createProduct')
// const getSpecificController=require('../controller/getSpecificProduct')
// const updateProductController=require('../controller/updateProduct')
// const deleteController=require('../controller/deleteProduct')

// router.get("/products", async (req, res) => {
//     getProductController.getAllProducts(req, res);
//   });

// router.post("/createProduct", async (req, res) => {
//     createProduct.createProducts(req, res);
//   });

// router.get("/products/:id", async (req, res) => {
//     getSpecificController.getSpecificProducts(req, res);
//   });

// router.put("/products/:id", async (req, res) => {
//     updateProductController.updateProducts(req, res);
//   });

// router.delete("/products/:id", async (req, res) => {
//     deleteController.deleteProducts(req, res);
//   });

module.exports = router;
