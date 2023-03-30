const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Enter the First Name"],
  },
  lastname: {
    type: String,
    required: [true, "Enter the Last Name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  address: {
    type: String,
    required: [true, "Enter the Address"],
  },
  userrole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
});

module.exports = mongoose.model.User || mongoose.model("Users", userSchema);
