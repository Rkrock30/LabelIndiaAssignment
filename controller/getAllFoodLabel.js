const foodLabel = require("../model/foodLabel").foodLabel;
const approvalSchema = require("../model/approval").approval;
const commentSchema = require("../model/comment").comments;
const loginSchema = require("../model/user").register;

async function getAllFoodLabel(req, res) {
  try {
    let arr = [];
    let countFoodLable = await foodLabel.find();
    console.log(countFoodLable[0]);

    if (countFoodLable.length > 0) {
      for (let i = 0; i < countFoodLable.length; i++) {
        arr.push({
          labelId: countFoodLable[i].labelId,
          productName: countFoodLable[i].productName,
          ingredients: countFoodLable[i].ingredients,
          createdBy: await loginSchema.find(
            {
              userId: countFoodLable[i].createdBy,
            },
            { firstName: 1, lastName: 1, _id: 0 }
          ),
          isActive: countFoodLable[i].isActive,
          comments: await commentSchema.find(
            {
              labelId: countFoodLable[i].labelId,
            },
            { comments: 1, rating: 1, created_on: 1, createdBy: 1, _id: 0 }
          ),
          approval: await approvalSchema.find(
            {
              labelId: countFoodLable[i].labelId,
            },
            { approvedBy: 1, status: 1, approvedOn: 1, created_on: 1, _id: 0 }
          ),

          created_on: countFoodLable[i].created_on,
        });
      }
      httpResponseSuccessHandler(res, 200, "Data Fetched Successfully", arr);
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.getAllFoodLabel = getAllFoodLabel;
