const reviewSchema = require("../model/review").Review;
const foodLabel = require("../model/foodLabel").foodLabel;
const approvalSchema = require("../model/approval").approval;

async function submitForReview(req, res) {
  try {
    let { userId } = req.info;
    let labelId = req.query.labelId;

    let alreadyPresentForApproval = await reviewSchema.find({ label: labelId });
    if (alreadyPresentForApproval.length > 0) {
      return httpResponseSuccessHandler(
        res,
        200,
        "It is already sent for review"
      );
    } else {
      let countFoodLable = await reviewSchema.find().count();
      let foodLabelId = countFoodLable > 0 ? countFoodLable + 1 : 1;
      let createProd = await reviewSchema.create({
        reviewId: foodLabelId,
        label: labelId,
        createdBy: userId,
      });
      let createApprove = await approvalSchema.create({
        labelId: labelId,
        status: "pending",
        labelId: foodLabelId,
        createdBy: userId,
      });
      if (createProd) {
        let updateFoodLabel = await foodLabel.findOneAndUpdate(
          { labelId: labelId },
          {
            reviewId: foodLabelId,
          }
        );
        httpResponseSuccessHandler(res, 200, "Data created Successfully", [
          createProd,
        ]);
      }
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.submitForReview = submitForReview;
