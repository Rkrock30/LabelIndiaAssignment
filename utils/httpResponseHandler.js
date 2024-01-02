function httpResponseSuccessHandler (res, code, msg, data) {
    res.status(code).send({
      status: msg,
      result: data
    })
  }
  
  function httpResponseHandlerError (res, errorcode, errormsg) {
    if (errorcode == undefined) {
      return res.status(400).send({ message: errormsg })
    } else {
      return res.status(errorcode).send({ message: errormsg })
    }
  }
  
  module.exports.httpResponseHandlerError = httpResponseHandlerError
  module.exports.httpResponseSuccessHandler = httpResponseSuccessHandler
  