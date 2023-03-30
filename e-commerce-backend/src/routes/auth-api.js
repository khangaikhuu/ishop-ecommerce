import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users";
import UserRole from "../models/UserRole";

const authApi = express.Router();

authApi.post("/register", async (request, response) => {
  const data = request.body;
  console.log(data);

  if (data) {
    const oldUser = await User.findOne({ email: data.email });

    if (oldUser) {
      return response
        .status(200)
        .json({ success: false, data: "Already registered!!!" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    try {
      const user = await User.create(data);
      const result = await user.populate("userrole");
      response.status(201).json({
        message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
        data: result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        error: error,
      });
    }

    //   User.create(data)
    //     .then((data) => {
    //       response.status(201).json({
    //         message: "Хэрэглэгч амжилттай бүртгэгдлээ.",
    //         data,
    //       });
    //       return;
    //     })
    //     .catch((error) => {
    //       return response.status(500).json({
    //         success: false,
    //         error,
    //       });
    //     });
  } else {
    return response.json({
      data: "Input field is empty",
    });
  }
});

authApi.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!(email && password)) {
      response.status(400).json({
        message: "Утгуудыг бүрэн оруулна уу.",
        updated: 1,
        email: email,
        password: password,
      });
      return;
    }

    const user = await User.findOne({ email: email });

    // hereglegch oldvol
    if (user) {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (user && isMatch) {
        const jwtBody = {
          user_id: user._id,
          email: email,
        };
        const token = jwt.sign(jwtBody, "MySuperDuperPrivateKey", {
          expiresIn: "2h",
        });
        response.status(200).json({
          success: true,
          status: "Амжилттай нэвтэрлээ",
          data: user,
          token: token,
        });
        return;
      }
    }

    // password buruu baival
    else {
      response.status(400).json({
        success: false,
        status: "Нууц үг нэр хоорондоо таарахгүй байна.",
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      data: "Алдаа гарлаа",
      error: error,
    });
  }
});

authApi.post("/role/create", async (req, res) => {
  const { name } = req.body;

  const result = await UserRole.create({ name });

  res.status(200).json({
    data: result,
  });
});

authApi.get("/role/list", async (req, res) => {
  const result = await UserRole.find({});
  res.status(200).json({
    data: result,
  });
});

module.exports = authApi;
