const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: [true, "Enter the first Name"],
  },
  lastname: {
    type: String,
    require: [true, "Enter the last name"],
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Please provide an Email!"],
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  address: {
    type: String,
    require: [true, "Enter the address"],
  },
  userrole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
