const foodLabel = require("../model/foodLabel").foodLabel;
//onst product = new mongoose.model("product")

async function getParticularFoodlabel(req, res) {
  try {
    let labelId = req.query.labelId;
    let countFoodLable = await foodLabel.find({ labelId: labelId });

    if (countFoodLable) {
      console.log(countFoodLable);
      httpResponseSuccessHandler(
        res,
        200,
        "Data created Successfully",
        countFoodLable
      );
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.getParticularFoodlabel = getParticularFoodlabel;
