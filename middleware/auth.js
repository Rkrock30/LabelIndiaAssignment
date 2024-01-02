const { decodedToken } = require("../utils/common");
const q = require("q");
module.exports.verifyloginToken = async (req, res, next) => {
  const deferred = q.defer();
  try {
    const token = req.headers["token"];
    const resp = await decodedToken(token);

    if (resp) {
      if (resp) {
        req.info = resp;
        next();
      } else {
        httpResponseHandlerError(res, 200, "Invalid User Details");
      }
    } else {
      httpResponseHandlerError(res, 401, "Authorization Failed");
    }
  } catch (err) {
    console.log(err);
    httpResponseHandlerError(res, 401, "Authorization Failed");
  }

  return deferred.promise;
};
