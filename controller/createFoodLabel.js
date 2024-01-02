const foodLabel = require("../model/foodLabel").foodLabel;
const validatePayload = require("../utils/bodyValidation").bodyValidation;

async function createfoodLabel(req, res) {
  try {
    const valSchema = Joi.object()
      .keys({
        productName: Joi.string().required().allow(null, ""),
        ingredients: Joi.string().required().allow(null, ""),
      })
      .unknown(false);

    let body = await validatePayload(res, valSchema, req.body);
    let { userId } = req.info;
    let countFoodLable = await foodLabel.find().count();
    let foodLabelId = countFoodLable > 0 ? countFoodLable + 1 : 1;
    let createProd = await foodLabel.create({
      labelId: foodLabelId,
      productName: body.productName,
      ingredients: body.ingredients,
      createdBy: userId,
    });
    if (createProd) {
      console.log(createProd);
      httpResponseSuccessHandler(res, 200, "Data created Successfully", [
        createProd,
      ]);
    }
  } catch (error) {
    console.log(error);
    httpResponseHandlerError(res, 400, error.message);
  }
}

module.exports.createfoodLabel = createfoodLabel;
