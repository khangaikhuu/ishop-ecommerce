console.log("iShop E-Commerce Backend");
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config()
import menuApi from "./routes/menu-api";
import adminApi from "./routes/admin-api";
import authApi from "./routes/auth-api"


const app = express();
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGO_DB_URL

app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);
app.use("/auth", authApi)

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(console.log("Database successfully connected"))
    .catch((error) => console.error(error));

  console.log(
    `iShop E-Commerce application is running on http://localhost:${PORT}`
  );
});
