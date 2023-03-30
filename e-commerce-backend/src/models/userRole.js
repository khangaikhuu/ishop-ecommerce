const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Role Name"],
    unique: true,
  },
});

const UserRole = mongoose.model("UseRole", userRoleSchema);

module.exports = UserRole;
