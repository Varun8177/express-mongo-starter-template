const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
