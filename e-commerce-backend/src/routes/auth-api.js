const express = require("express")
const Users = require("../models/Users")
const authApi = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const UserRole = require("../models/UserRole")

authApi.post("/register", async (request, response) => {
    const data = request.body
    console.log(request.body)


    if (data) {
        const oldUser = await Users.findOne({ email: data.email })
        if (oldUser !== null) {
            response.status(200).json({
                message: "User already exists."
            })
        } else {
            const hashedPassword = await brcypt.hash(data.password, 10)
            data.password = hashedPassword
            try {
                const user = await Users.create(data)
                const result = await user.populate("userrole")
                response.status(201).json({
                    message: "User created successfully.",
                    data: result
                })
            } catch (error) {
                response.status(500).json({
                    success: false,
                    error: error
                })
            }
            Users.create({ email: data.email, password: data.password })
                .then((data) => {
                    response.status(201).json({
                        message: "success",
                        email: data.email,
                        password: data.password
                    })
                    return
                }).catch((error) => {
                    response.status(500).json({
                        success: false,
                        error
                    })
                })

        }
    } else {
        console.log("error: Input field is empty.")
    }
})

authApi.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!(email && password)) {
            res.status(400).json({
                success: false,
                status: "Enter field the fields.",
                updated: 1,
                email: email,
                password: password,
            });
            return;
        }
        const user = await Users.findOne({ email });


        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                "MySuperDuperPrivateKey",
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json({
                success: true,
                status: "Login Success.",
                data: user,
                token: token,
            });
            return;
        }
        res.status(400).json({
            success: false,
            status: "Password did not match.",
        });
        return;
    } catch (err) {
        console.log(err);
    }
});


authApi.post('/role/create', async (req, res) => {
    const { name } = req.body

    const result = await User.create({ name })

    res.status(200).json({
        data: result
    })
})

authApi.get('/role/list', async (req, res) => {
    const result = await UserRole.find({})
    res.status(200).json({
        data: result
    })
})
module.exports = authApi