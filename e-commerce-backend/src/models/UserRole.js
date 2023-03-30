const mongoose = require("mongoose");

// Admin хэрэглэгч бол бүх эрхтэй хэрэглэгч байна
// Customer хэрэглэгч бол Admin Panel руу нэвтрэх эрхгүй хэрэглэгч байна
// User хэрэглэгч нь зарим нэг Admin Panel дээр устгах, өөрчлөх эрхгүй
const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Role Name"],
    unique: true,
  },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;
