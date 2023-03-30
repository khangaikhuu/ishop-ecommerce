const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Enter the FIRSTNAME"],
  },
  lastname: {
    type: String,
    required: [true, "Enter the LASTNAME"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Pls Provide a password"],
    unique: false,
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  address: {
    type: String,
    required: [true, "Fill the Address"],
  },
  userrole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
