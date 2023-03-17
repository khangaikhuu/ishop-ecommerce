console.log("iShop E-Commerce Backend");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import menuApi from "./routes/menu-api";
import adminApi from "./routes/admin-api";

const app = express();
const PORT = 8181;
const MONGODB_CONNECTION_STRING =
  "mongodb+srv://blackgerelbaatarotgonmunkh:O1234567@cluster0.blpjoju.mongodb.net/ishop";

app.use(cors());
app.use(express.json());
app.use("/menu", menuApi);
app.use("/admin", adminApi);

app.listen(PORT, () => {
  mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then(console.log("Database successfully connected"))
    .catch((error) => console.error(error));

  console.log(
    `iSHop E-Commerce application is running on http://localhost:${PORT}`
  );
});
