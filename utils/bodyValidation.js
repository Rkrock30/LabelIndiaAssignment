module.exports.bodyValidation = (res, valSchema, payload) => {


  return new Promise((resolve, reject) => {

    valSchema.validateAsync(payload, { abortEarly: false })
      .then((data) => {
        resolve(data)
      })
      .catch(validationError => {
        httpResponseHandlerError(res, 200, validationError.message)
      })
  })

}