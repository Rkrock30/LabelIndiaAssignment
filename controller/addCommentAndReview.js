const commentSchema = require("../model/comment").comments;
const approvalSchema = require("../model/approval").approval;
const validatePayload = require("../utils/bodyValidation").bodyValidation;
const moment = require("moment");

async function addCommRevAndApproval(req, res) {
  try {
    let { userId, role } = req.info;
    const valSchema = Joi.object()
      .keys({
        labelId: Joi.number().required().allow(null, ""),
        comments: Joi.string().required().allow(null, ""),
        rating: Joi.number().required().allow(null, ""),
        status: Joi.string().required().allow(null, ""),
      })
      .unknown(false);

    let body = await validatePayload(res, valSchema, req.body);
    if (role == "admin") {
      let updateFoodLabel = await approvalSchema.findOneAndUpdate(
        { labelId: body.labelId },
        {
          status: body.status,
          approvedBy: userId,
          approvedOn: moment().format("YYYY-MM-DD hh:mm:ss"),
        }
      );
      let createProd = await commentSchema.create({
        labelId: body.labelId,
        comments: body.comments,
        rating: body.rating,
        createdBy: userId,
      });

      if (createProd) {
        httpResponseSuccessHandler(res, 200, "Data created Successfully", [
          createProd,
        ]);
      }
    } else {
      httpResponseSuccessHandler(
        res,
        200,
        "You are not Authorized for comment ,review and Approval "
      );
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.addCommRevAndApproval = addCommRevAndApproval;
