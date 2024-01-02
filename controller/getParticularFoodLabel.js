const foodLabel = require("../model/foodLabel").foodLabel;
const approvalSchema = require("../model/approval").approval;
const commentSchema = require("../model/comment").comments;
const loginSchema = require("../model/user").register;

async function getParticularFoodlabel(req, res) {
  try {
    let labelId = req.query.labelId;
    let countFoodLable = await foodLabel.find({ labelId: labelId });
    let labelObj = {
      labelId: countFoodLable[0].labelId,
      productName: countFoodLable[0].productName,
      ingredients: countFoodLable[0].ingredients,
      createdBy: await loginSchema.find(
        {
          userId: countFoodLable[0].createdBy,
        },
        { firstName: 1, lastName: 1, _id: 0 }
      ),
      isActive: countFoodLable[0].isActive,
      comments: await commentSchema.find(
        {
          labelId: countFoodLable[0].labelId,
        },
        { comments: 1, rating: 1, created_on: 1, createdBy: 1, _id: 0 }
      ),
      approval: await approvalSchema.find(
        {
          labelId: countFoodLable[0].labelId,
        },
        { approvedBy: 1, status: 1, approvedOn: 1, created_on: 1, _id: 0 }
      ),

      created_on: countFoodLable[0].created_on,
    };

    if (countFoodLable) {
      httpResponseSuccessHandler(
        res,
        200,
        "Data created Successfully",
        labelObj
      );
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.getParticularFoodlabel = getParticularFoodlabel;
