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
const addCommentAndReviewAndApprove = require("../controller/addCommentAndReview");

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
router.post("/addCommAndRevApprove", async (req, res) => {
  addCommentAndReviewAndApprove.addCommRevAndApproval(req, res);
});

module.exports = router;
