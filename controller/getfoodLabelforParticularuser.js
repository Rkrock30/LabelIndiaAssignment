const foodLabel = require("../model/foodLabel").foodLabel;
//onst product = new mongoose.model("product")

async function getAllFoodLabelForParticularUser(req, res) {
  try {
    let { userId } = req.info;
    let countFoodLable = await foodLabel.find({ createdBy: userId });

    if (countFoodLable) {
      httpResponseSuccessHandler(
        res,
        200,
        "Data fetched Successfully",
        countFoodLable
      );
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.getAllFoodLabelForParticularUser =
  getAllFoodLabelForParticularUser;
