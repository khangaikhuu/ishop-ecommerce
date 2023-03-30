const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Enter the first name."]
    },
    lastname: {
        type: String,
        required: [true, "Enter the last name."]
    },
    email: {
        type: String,
        require: [true, "Please provide an Email"],
        unique: [true, "Email exists"]
    },
    password: {
        type: String,
        require: [true, "Please provide a password"],
        unique: false
    },
    phone: {
        type: Number,
        minimun: 0,
    },
    address: {
        type: String,
        required: [true, "Enter the address."]
    },
    userrole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole"
    }
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema)