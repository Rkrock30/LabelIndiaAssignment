const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/LableIndiaProduct", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

require("./foodLabel");
require("./user");
