const express = require("express")
const apiRouter = express.Router()
const auth = require("../middleware/auth")

apiRouter.post("/protected", auth, (req, res, next) => {
    res.status(200).json({
        data: "successful got the protected route",
    });
});

apiRouter.post("/unprotected", (req, res, next) => {
    res.status(200).json({
        data: "successful got the unprotected route",
    });
});

module.exports = apiRouter